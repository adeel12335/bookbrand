import { createHmac, timingSafeEqual, randomBytes } from 'node:crypto';

const COOKIE = 'ebw_admin';
const MAX_AGE = 60 * 60 * 8; // eight hours

function secret() {
  const value = process.env.SESSION_SECRET;
  if (!value || value.length < 24) {
    throw new Error('SESSION_SECRET is missing or too short (need 24+ characters).');
  }
  return value;
}

function sign(payload) {
  return createHmac('sha256', secret()).update(payload).digest('base64url');
}

/** Constant-time compare that does not leak length through an early return. */
function safeEqual(a, b) {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));
  if (left.length !== right.length) {
    // Still burn a comparison so the timing does not advertise a length mismatch.
    timingSafeEqual(left, left);
    return false;
  }
  return timingSafeEqual(left, right);
}

/**
 * A deployment missing these cannot sign anybody in. Saying so is not a leak —
 * the request already fails visibly either way — and it saves the operator
 * hunting through function logs to find a blank environment variable.
 */
export function adminConfigError() {
  const missing = [];
  if (!process.env.ADMIN_PASSWORD) missing.push('ADMIN_PASSWORD');
  if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 24) missing.push('SESSION_SECRET');
  return missing.length ? missing : null;
}

export function checkPassword(candidate) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) throw new Error('ADMIN_PASSWORD is not set.');
  return safeEqual(candidate, expected);
}

export function issueCookie(req) {
  const expires = Date.now() + MAX_AGE * 1000;
  const payload = `${expires}.${randomBytes(9).toString('base64url')}`;
  const token = `${payload}.${sign(payload)}`;
  const flags = [
    `${COOKIE}=${token}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Strict',
    `Max-Age=${MAX_AGE}`,
  ];
  // Trust the proxy's protocol header as well as NODE_ENV: any deployment
  // reached over https must set Secure, however it was built.
  const proto = req?.headers?.['x-forwarded-proto'];
  if (process.env.NODE_ENV === 'production' || (typeof proto === 'string' && proto.split(',')[0] === 'https')) {
    flags.push('Secure');
  }
  return flags.join('; ');
}

export function clearCookie() {
  return `${COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`;
}

export function isAuthed(req) {
  const header = req.headers.cookie || '';
  const match = header.split(';').map(p => p.trim()).find(p => p.startsWith(`${COOKIE}=`));
  if (!match) return false;
  const token = match.slice(COOKIE.length + 1);
  const cut = token.lastIndexOf('.');
  if (cut < 1) return false;
  const payload = token.slice(0, cut);
  const signature = token.slice(cut + 1);
  if (!safeEqual(signature, sign(payload))) return false;
  const expires = Number(payload.split('.')[0]);
  return Number.isFinite(expires) && expires > Date.now();
}

/** Guard for the write endpoints. Returns true when the request may continue. */
export function requireAdmin(req, res) {
  if (isAuthed(req)) return true;
  res.statusCode = 401;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify({ error: 'Not signed in' }));
  return false;
}
