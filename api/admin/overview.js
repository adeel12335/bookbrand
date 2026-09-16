import { json, methodNotAllowed, guard } from '../_lib/http.js';
import { requireAdmin } from '../_lib/auth.js';
import { sql } from '../_lib/db.js';

async function overview(req, res) {
  if (req.method !== 'GET') return methodNotAllowed(res, ['GET']);
  if (!requireAdmin(req, res)) return undefined;

  const db = sql();
  const [postStats] = await db`
    select
      count(*)::int as total,
      count(*) filter (where published)::int as published,
      count(*) filter (where not published)::int as drafts
    from posts
  `;
  const [leadStats] = await db`
    select
      count(*)::int as total,
      count(*) filter (where created_at > now() - interval '7 days')::int as week,
      count(*) filter (where created_at > now() - interval '30 days')::int as month
    from leads
  `;
  const recentLeads = await db`
    select id, name, email, message, timeline, source_path, created_at
    from leads
    order by created_at desc
    limit 5
  `;
  const recentPosts = await db`
    select slug, title, published, published_on, updated_at
    from posts
    order by updated_at desc
    limit 5
  `;

  return json(res, 200, {
    posts: postStats || { total: 0, published: 0, drafts: 0 },
    leads: leadStats || { total: 0, week: 0, month: 0 },
    recentLeads,
    recentPosts,
  });
}

export default guard(overview, 'admin/overview');
