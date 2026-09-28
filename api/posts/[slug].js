import { sql } from '../_lib/db.js';
import { json, methodNotAllowed, readJsonBody, str, guard } from '../_lib/http.js';
import { isAuthed, requireAdmin } from '../_lib/auth.js';
import { columnWarning, normalisePost, toPost, updatePostRow } from '../_lib/posts.js';
import { triggerRebuild } from '../_lib/deploy.js';

function slugFrom(req) {
  if (req.query?.slug) return str(req.query.slug, 120);
  const path = new URL(req.url, 'http://local').pathname.replace(/\/+$/, '');
  return str(decodeURIComponent(path.slice(path.lastIndexOf('/') + 1)), 120);
}

async function post(req, res) {
  const slug = slugFrom(req);
  if (!slug) return json(res, 400, { error: 'Missing slug.' });

  if (req.method === 'GET') {
    const db = sql();
    const rows = isAuthed(req)
      ? await db`select * from posts where slug = ${slug} limit 1`
      : await db`select * from posts where slug = ${slug} and published = true limit 1`;
    if (!rows.length) return json(res, 404, { error: 'Not found.' });
    return json(res, 200, { post: toPost(rows[0]) });
  }

  if (req.method === 'PUT') {
    if (!requireAdmin(req, res)) return undefined;

    const body = await readJsonBody(req);
    if (!body) return json(res, 400, { error: 'Invalid request.' });

    const { post, errors } = normalisePost(body, { slugFallback: slug });
    if (Object.keys(errors).length) return json(res, 422, { error: 'Please check the article.', errors });

    const db = sql();

    if (post.slug !== slug) {
      const clash = await db`select 1 from posts where slug = ${post.slug} limit 1`;
      if (clash.length) {
        return json(res, 409, { error: 'That slug is already taken.', errors: { slug: 'Already in use.' } });
      }
    }

    const { row, skipped } = await updatePostRow(db, post, slug);
    if (!row) return json(res, 404, { error: 'Not found.' });

    const rebuild = await triggerRebuild();
    const warning = columnWarning(skipped);
    return json(res, 200, { post: toPost(row), rebuild, ...(warning ? { warning } : {}) });
  }

  if (req.method === 'DELETE') {
    if (!requireAdmin(req, res)) return undefined;
    const db = sql();
    const rows = await db`delete from posts where slug = ${slug} returning slug, published`;
    if (!rows.length) return json(res, 404, { error: 'Not found.' });
    const rebuild = rows[0].published ? await triggerRebuild() : { triggered: false, reason: 'draft' };
    return json(res, 200, { ok: true, rebuild });
  }

  return methodNotAllowed(res, ['GET', 'PUT', 'DELETE']);
}

export default guard(post, 'posts/[slug]');
