import { json, methodNotAllowed, readJsonBody, str, guard, clientIp } from '../_lib/http.js';
import { enforceLimit } from '../_lib/ratelimit.js';
import { adminConfigError, checkPassword, clearCookie, issueCookie, isAuthed } from '../_lib/auth.js';

async function session(req, res) {
  if (req.method === 'GET') {
    const missing = adminConfigError();
    return json(res, 200, { signedIn: missing ? false : isAuthed(req), configured: !missing, missing });
  }

  if (req.method === 'POST') {
    // The per-request delay below slows one attacker down; it does nothing
    // about twenty requests in flight at once. This does.
    if (!enforceLimit(req, res, `login:${clientIp(req)}`, { limit: 8, windowMs: 10 * 60 * 1000 })) {
      return undefined;
    }

    const missing = adminConfigError();
    if (missing) {
      res.statusCode = 503;
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      res.end(JSON.stringify({
        error: `Admin sign-in is not configured on this deployment — ${missing.join(' and ')} `
          + `${missing.length > 1 ? 'are' : 'is'} missing from the environment.`,
        missing,
      }));
      return undefined;
    }

    const body = await readJsonBody(req);
    const password = str(body?.password, 200);
    if (!password || !checkPassword(password)) {
      // One deliberate delay so the endpoint is not a fast password oracle.
      await new Promise(resolve => setTimeout(resolve, 600));
      return json(res, 401, { error: 'Wrong password.' });
    }
    res.setHeader('Set-Cookie', issueCookie(req));
    return json(res, 200, { signedIn: true });
  }

  if (req.method === 'DELETE') {
    res.setHeader('Set-Cookie', clearCookie());
    return json(res, 200, { signedIn: false });
  }

  return methodNotAllowed(res, ['GET', 'POST', 'DELETE']);
}

export default guard(session, 'admin/session');
