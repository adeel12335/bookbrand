const VERIFY_URL = 'https://www.google.com/recaptcha/api/siteverify';

/**
 * reCAPTCHA v3 returns a score rather than a pass/fail, so the threshold is
 * ours to choose. 0.5 is Google's suggested starting point; raise it if spam
 * still lands, lower it if real authors get turned away.
 *
 * Two deliberate behaviours:
 *  - No secret configured -> skipped. The form keeps working before the keys
 *    are added, rather than rejecting every enquiry with a confusing error.
 *  - Google unreachable -> allowed, and logged. A outage at Google must not
 *    take the studio's only enquiry form down with it; a determined spammer
 *    cannot cause that failure from outside anyway.
 */
export async function verifyRecaptcha(token, { ip, action } = {}) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return { ok: true, skipped: true };
  if (!token) return { ok: false, reason: 'missing-token' };

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set('remoteip', ip);

  let data;
  try {
    const response = await fetch(VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      signal: AbortSignal.timeout(5000),
    });
    data = await response.json();
  } catch (error) {
    console.error('[recaptcha] verification unreachable, allowing through:', error.message);
    return { ok: true, degraded: true };
  }

  if (!data.success) {
    return { ok: false, reason: (data['error-codes'] || ['rejected']).join(', ') };
  }
  if (action && data.action && data.action !== action) {
    return { ok: false, reason: `action-mismatch (${data.action})` };
  }

  const min = Number(process.env.RECAPTCHA_MIN_SCORE || 0.5);
  if (typeof data.score === 'number' && data.score < min) {
    return { ok: false, reason: 'low-score', score: data.score };
  }
  return { ok: true, score: data.score };
}
