import { sql } from '../_lib/db.js';
import { json, methodNotAllowed, readJsonBody, guard } from '../_lib/http.js';
import { isAuthed, requireAdmin } from '../_lib/auth.js';
import { normalisePost, toPost } from '../_lib/posts.js';
import { triggerRebuild } from '../_lib/deploy.js';

async function posts(req, res) {
  if (req.method === 'GET') {
    const db = sql();
    const wantsDrafts = new URL(req.url, 'http://local').searchParams.get('all') === '1';
    const includeDrafts = wantsDrafts && isAuthed(req);
    const rows = includeDrafts
      ? await db`select * from posts order by published_on desc, id desc`
      : await db`select * from posts where published = true order by published_on desc, id desc`;
    return json(res, 200, { posts: rows.map(toPost) });
  }

  if (req.method === 'POST') {
    if (!requireAdmin(req, res)) return undefined;

    const body = await readJsonBody(req);
    if (!body) return json(res, 400, { error: 'Invalid request.' });

    const { post, errors } = normalisePost(body);
    if (Object.keys(errors).length) return json(res, 422, { error: 'Please check the article.', errors });

    const db = sql();

    const clash = await db`select 1 from posts where slug = ${post.slug} limit 1`;
    if (clash.length) {
      return json(res, 409, { error: 'That slug is already taken.', errors: { slug: 'Already in use.' } });
    }

    const rows = await db`
      insert into posts (slug, title, description, published_on, read_time, category, eyebrow,
                         lead, cta, image, image_alt, keywords, takeaways, sections, published)
      values (${post.slug}, ${post.title}, ${post.description}, ${post.published_on},
              ${post.read_time}, ${post.category}, ${post.eyebrow}, ${post.lead}, ${post.cta},
              ${post.image}, ${post.image_alt}, ${JSON.stringify(post.keywords)},
              ${JSON.stringify(post.takeaways)}, ${JSON.stringify(post.sections)}, ${post.published})
      returning *
    `;

    const rebuild = post.published ? await triggerRebuild() : { triggered: false, reason: 'draft' };
    return json(res, 201, { post: toPost(rows[0]), rebuild });
  }

  return methodNotAllowed(res, ['GET', 'POST']);
}

export default guard(posts, 'posts');
