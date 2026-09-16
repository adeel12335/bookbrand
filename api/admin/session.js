import { json, methodNotAllowed, readJsonBody, str, guard, clientIp } from '../_lib/http.js';
import { enforceLimit } from '../_lib/ratelimit.js';
import {
  adminConfigError,
  authenticateAdmin,
  clearCookie,
  issueCookie,
  isAuthed,
  readSession,
} from '../_lib/auth.js';
import { sql, hasDatabase } from '../_lib/db.js';

async function sessionUser(req) {
  const session = readSession(req);
  if (!session?.adminId || session.adminId === '0' || !hasDatabase()) {
    return session ? { signedIn: true, admin: null } : null;
  }
  const db = sql();
  const rows = await db`
    select id, email, name, last_login_at
    from admin_users
    where id = ${Number(session.adminId)}
    limit 1
  `;
  if (!rows[0]) return { signedIn: true, admin: null };
  return {
    signedIn: true,
    admin: {
      id: rows[0].id,
      email: rows[0].email,
      name: rows[0].name,
      lastLoginAt: rows[0].last_login_at,
    },
  };
}

async function session(req, res) {
  if (req.method === 'GET') {
    const missing = adminConfigError();
    if (missing) return json(res, 200, { signedIn: false, configured: false, missing });
    if (!isAuthed(req)) return json(res, 200, { signedIn: false, configured: true, missing: null });
    const user = await sessionUser(req);
    return json(res, 200, { ...user, configured: true, missing: null });
  }

  if (req.method === 'POST') {
    if (!enforceLimit(req, res, `login:${clientIp(req)}`, { limit: 8, windowMs: 10 * 60 * 1000 })) {
      return undefined;
    }

    const missing = adminConfigError();
    if (missing) {
      res.statusCode = 503;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify({
        error: `Admin sign-in is not configured — ${missing.join(' and ')} `
          + `${missing.length > 1 ? 'are' : 'is'} missing.`,
        missing,
      }));
      return undefined;
    }

    const body = await readJsonBody(req);
    const email = str(body?.email, 200);
    const password = str(body?.password, 200);
    const admin = await authenticateAdmin(email, password);
    if (!admin) {
      await new Promise(resolve => setTimeout(resolve, 600));
      return json(res, 401, { error: 'Wrong email or password.' });
    }
    res.setHeader('Set-Cookie', issueCookie(req, admin));
    return json(res, 200, {
      signedIn: true,
      admin: { id: admin.id, email: admin.email, name: admin.name },
    });
  }

  if (req.method === 'DELETE') {
    res.setHeader('Set-Cookie', clearCookie());
    return json(res, 200, { signedIn: false });
  }

  return methodNotAllowed(res, ['GET', 'POST', 'DELETE']);
}

export default guard(session, 'admin/session');
