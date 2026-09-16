import { createHmac, timingSafeEqual, randomBytes, scryptSync } from 'node:crypto';
import { sql, hasDatabase } from './db.js';

const COOKIE = 'ebw_admin';
const MAX_AGE = 60 * 60 * 8; // eight hours
const SCRYPT_KEYLEN = 64;

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
    timingSafeEqual(left, left);
    return false;
  }
  return timingSafeEqual(left, right);
}

export function hashPassword(password) {
  const salt = randomBytes(16).toString('base64url');
  const hash = scryptSync(String(password), salt, SCRYPT_KEYLEN).toString('base64url');
  return `scrypt$${salt}$${hash}`;
}

export function verifyPassword(password, stored) {
  if (!stored || typeof stored !== 'string') return false;
  const [algo, salt, hash] = stored.split('$');
  if (algo !== 'scrypt' || !salt || !hash) return false;
  const next = scryptSync(String(password), salt, SCRYPT_KEYLEN).toString('base64url');
  return safeEqual(next, hash);
}

/**
 * A deployment missing these cannot sign anybody in. Saying so is not a leak —
 * the request already fails visibly either way — and it saves the operator
 * hunting through function logs to find a blank environment variable.
 */
export function adminConfigError() {
  const missing = [];
  if (!process.env.SESSION_SECRET || process.env.SESSION_SECRET.length < 24) missing.push('SESSION_SECRET');
  if (!hasDatabase()) missing.push('DATABASE_URL');
  return missing.length ? missing : null;
}

/**
 * Authenticate against admin_users in Neon. Falls back once to ADMIN_PASSWORD
 * only when the table has no rows yet (bootstrap), then seeds that operator.
 */
export async function authenticateAdmin(email, password) {
  const cleanEmail = String(email || '').trim().toLowerCase();
  const cleanPassword = String(password || '');
  if (!cleanPassword) return null;

  const users = await sql`
    select id, email, name, password_hash
    from admin_users
    order by id asc
    limit 50
  `;

  if (users.length) {
    const user = cleanEmail
      ? users.find(row => row.email.toLowerCase() === cleanEmail)
      : users[0];
    if (!user || !verifyPassword(cleanPassword, user.password_hash)) return null;
    await sql`update admin_users set last_login_at = now() where id = ${user.id}`;
    return { id: user.id, email: user.email, name: user.name };
  }

  // Bootstrap: empty table + env password creates the first operator.
  const bootstrapPassword = process.env.ADMIN_PASSWORD;
  const bootstrapEmail = (process.env.ADMIN_EMAIL || 'admin@ebookwriters.us').trim().toLowerCase();
  if (!bootstrapPassword || !safeEqual(cleanPassword, bootstrapPassword)) return null;
  if (cleanEmail && cleanEmail !== bootstrapEmail) return null;

  const inserted = await sql`
    insert into admin_users (email, name, password_hash, last_login_at)
    values (
      ${bootstrapEmail},
      ${'Studio admin'},
      ${hashPassword(bootstrapPassword)},
      now()
    )
    returning id, email, name
  `;
  return inserted[0] ? { id: inserted[0].id, email: inserted[0].email, name: inserted[0].name } : null;
}

export function issueCookie(req, admin = {}) {
  const expires = Date.now() + MAX_AGE * 1000;
  const id = admin.id ? String(admin.id) : '0';
  const payload = `${expires}.${id}.${randomBytes(9).toString('base64url')}`;
  const token = `${payload}.${sign(payload)}`;
  const flags = [
    `${COOKIE}=${token}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Strict',
    `Max-Age=${MAX_AGE}`,
  ];
  const proto = req?.headers?.['x-forwarded-proto'];
  if (process.env.NODE_ENV === 'production' || (typeof proto === 'string' && proto.split(',')[0] === 'https')) {
    flags.push('Secure');
  }
  return flags.join('; ');
}

export function clearCookie() {
  return `${COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`;
}

export function readSession(req) {
  const header = req.headers.cookie || '';
  const match = header.split(';').map(p => p.trim()).find(p => p.startsWith(`${COOKIE}=`));
  if (!match) return null;
  const token = match.slice(COOKIE.length + 1);
  const cut = token.lastIndexOf('.');
  if (cut < 1) return null;
  const payload = token.slice(0, cut);
  const signature = token.slice(cut + 1);
  if (!safeEqual(signature, sign(payload))) return null;
  const [expiresRaw, adminId] = payload.split('.');
  const expires = Number(expiresRaw);
  if (!Number.isFinite(expires) || expires <= Date.now()) return null;
  return { adminId: adminId || null, expires };
}

export function isAuthed(req) {
  return Boolean(readSession(req));
}

/** Guard for the write endpoints. Returns true when the request may continue. */
export function requireAdmin(req, res) {
  if (isAuthed(req)) return true;
  res.statusCode = 401;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify({ error: 'Not signed in' }));
  return false;
}
