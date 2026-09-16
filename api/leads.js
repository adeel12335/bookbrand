import { Resend } from 'resend';
import { sql } from './_lib/db.js';
import { json, methodNotAllowed, readJsonBody, str, text, isEmail, guard, clientIp } from './_lib/http.js';
import { requireAdmin } from './_lib/auth.js';
import { enforceLimit } from './_lib/ratelimit.js';
import { verifyRecaptcha } from './_lib/recaptcha.js';

const NOTIFY_TO = process.env.LEAD_NOTIFY_TO || 'info@ebookwriters.us';
const NOTIFY_FROM = process.env.LEAD_NOTIFY_FROM || 'ebookwriters.us <onboarding@resend.dev>';

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function notificationHtml(lead) {
  const rows = [
    ['Name', lead.name],
    ['Email', lead.email],
    ['Timeline', lead.timeline || '—'],
    ['Came from', lead.source_path || '—'],
  ]
    .map(([label, value]) => `<tr><td style="padding:4px 16px 4px 0;color:#5C6963">${label}</td><td style="padding:4px 0"><strong>${escapeHtml(value)}</strong></td></tr>`)
    .join('');

  return `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:#071b16">
  <h2 style="margin:0 0 16px">New enquiry — ebookwriters.us</h2>
  <table style="border-collapse:collapse;margin-bottom:20px">${rows}</table>
  <h3 style="margin:0 0 8px">About the book</h3>
  <p style="white-space:pre-wrap;line-height:1.6;margin:0">${escapeHtml(lead.message)}</p>
</div>`;
}

async function leads(req, res) {
  // The admin panel reads the enquiry list from here; the public form writes to it.
  if (req.method === 'GET') {
    if (!requireAdmin(req, res)) return undefined;
    const rows = await sql()`
      select id, name, email, message, timeline, source_path, created_at
      from leads order by created_at desc limit 200
    `;
    return json(res, 200, { leads: rows });
  }

  if (req.method !== 'POST') return methodNotAllowed(res, ['GET', 'POST']);

  // Without this one address can file an enquiry every minute, but a script
  // cycling addresses can fill the table and burn the Resend quota freely.
  if (!enforceLimit(req, res, `lead:${clientIp(req)}`, { limit: 5, windowMs: 10 * 60 * 1000 })) {
    return undefined;
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    return json(res, 413, { error: 'That message is too long.' });
  }
  if (!body) return json(res, 400, { error: 'Invalid request.' });

  // Bots fill every field they find; real browsers leave this one empty.
  if (str(body.company, 80)) return json(res, 200, { ok: true });

  const lead = {
    name: str(body.name, 120),
    email: str(body.email, 254).toLowerCase(),
    message: text(body.message, 4000),
    timeline: str(body.timeline, 80),
    source_path: str(body.sourcePath, 200),
    user_agent: str(req.headers['user-agent'], 300),
  };

  const errors = {};
  if (!lead.name) errors.name = 'Please tell us your name.';
  if (!isEmail(lead.email)) errors.email = 'Please enter a valid email address.';
  if (lead.message.length < 10) errors.message = 'Please tell us a little about your book.';
  if (Object.keys(errors).length) return json(res, 422, { error: 'Please check the form.', errors });

  // After the cheap checks, before touching the database.
  const captcha = await verifyRecaptcha(str(body.recaptchaToken, 4000), {
    ip: clientIp(req),
    action: 'contact',
  });
  if (!captcha.ok) {
    console.warn('[leads] recaptcha rejected:', captcha.reason, captcha.score ?? '');
    return json(res, 403, {
      error: 'We could not verify that you are human. Please reload the page and try again, '
        + `or email ${NOTIFY_TO} directly.`,
    });
  }

  const db = sql();

  // Cheap double-submit guard: the same address twice inside a minute is a
  // duplicate click, not a second enquiry.
  const recent = await db`
    select 1 from leads
    where email = ${lead.email} and created_at > now() - interval '1 minute'
    limit 1
  `;
  if (recent.length) return json(res, 200, { ok: true, duplicate: true });

  const inserted = await db`
    insert into leads (name, email, message, timeline, source_path, user_agent)
    values (${lead.name}, ${lead.email}, ${lead.message}, ${lead.timeline},
            ${lead.source_path}, ${lead.user_agent})
    returning id, created_at
  `;

  // The lead is already safe in Neon at this point. Email is best effort: a
  // Resend outage must not tell the author their enquiry failed.
  let emailed = false;
  let emailError = null;
  if (!process.env.RESEND_API_KEY) {
    console.error('[leads] RESEND_API_KEY is not set — lead', inserted[0].id, 'saved without email');
  } else {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const sent = await resend.emails.send({
        from: NOTIFY_FROM,
        to: NOTIFY_TO,
        replyTo: lead.email,
        subject: `New enquiry — ${lead.name}`,
        html: notificationHtml(lead),
      });
      if (sent.error) emailError = sent.error.message || 'Resend rejected the message';
      else emailed = true;
    } catch (error) {
      emailError = error.message;
    }
    if (emailError) console.error('[leads] email failed:', emailError, '(lead', inserted[0].id, 'was saved)');
  }

  return json(res, 201, { ok: true, id: inserted[0].id, emailed });
}

export default guard(leads, 'leads');
