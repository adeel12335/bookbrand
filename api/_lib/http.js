/** Small helpers shared by the serverless handlers. */

export function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

export function methodNotAllowed(res, allowed) {
  res.setHeader('Allow', allowed.join(', '));
  return json(res, 405, { error: 'Method not allowed' });
}

/**
 * Vercel parses JSON bodies for us, but `vercel dev` and the Vite dev
 * middleware do not always agree on that, so accept either shape.
 */
export async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string' && req.body) {
    try { return JSON.parse(req.body); } catch { return null; }
  }
  const chunks = [];
  let size = 0;
  for await (const chunk of req) {
    size += chunk.length;
    if (size > 128 * 1024) throw new Error('Payload too large');
    chunks.push(chunk);
  }
  if (!chunks.length) return null;
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { return null; }
}

export function clientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded) return forwarded.split(',')[0].trim();
  return req.socket?.remoteAddress || '';
}

/** Trims, collapses whitespace and caps length so one field cannot flood a row. */
export function str(value, max) {
  return String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
}

/** Same, but newlines survive — for message bodies and article paragraphs. */
export function text(value, max) {
  return String(value ?? '').replace(/\r\n/g, '\n').trim().slice(0, max);
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isEmail(value) {
  return EMAIL.test(String(value ?? ''));
}

/**
 * Wraps a public handler so a thrown error never reaches the visitor as a
 * stack trace or a configuration hint ("DATABASE_URL is not set"). The real
 * error goes to the function log, where it belongs.
 */
export function guard(handler, label) {
  return async (req, res) => {
    try {
      return await handler(req, res);
    } catch (error) {
      console.error(`[${label}] ${req.method} failed:`, error);
      if (res.headersSent) return undefined;
      return json(res, 500, { error: 'Something went wrong on our side. Please try again shortly.' });
    }
  };
}
