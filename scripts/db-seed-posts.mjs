/**
 * Moves the four articles that currently live in src/blogPosts.js into Neon so
 * nothing is lost when the blog starts reading from the database.
 *
 *   npm run db:seed
 *
 * Re-runnable: an existing slug is updated, not duplicated. Pass --force to
 * overwrite articles that have since been edited in the admin panel.
 */
import { neon } from '@neondatabase/serverless';
import { loadEnv } from './load-env.mjs';
import { staticBlogPosts } from '../src/blogPosts.static.js';
import { BLOG_REDIRECTS } from '../src/blogRedirects.js';

loadEnv();

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set. Copy .env.example to .env and add your Neon connection string.');
  process.exit(1);
}

const force = process.argv.includes('--force');
const sql = neon(process.env.DATABASE_URL);

let created = 0;
let updated = 0;
let skipped = 0;

for (const post of staticBlogPosts) {
  const existing = await sql`select slug, updated_at, created_at from posts where slug = ${post.slug} limit 1`;

  if (existing.length && !force) {
    // Only refresh rows the admin has not touched since the seed created them.
    const row = existing[0];
    const edited = new Date(row.updated_at).getTime() - new Date(row.created_at).getTime() > 1000;
    if (edited) {
      console.log(`  skip   ${post.slug} (edited in admin; use --force to overwrite)`);
      skipped += 1;
      continue;
    }
  }

  const values = [
    post.slug,
    post.title,
    post.description || '',
    post.date,
    post.readTime || '6 min read',
    post.category || 'Guides',
    post.eyebrow || '',
    post.lead || '',
    post.cta || '',
    post.image || '',
    post.imageAlt || '',
    JSON.stringify(post.keywords || []),
    JSON.stringify(post.takeaways || []),
    JSON.stringify(post.sections || []),
  ];

  const result = await sql.query(
    `insert into posts (slug, title, description, published_on, read_time, category, eyebrow,
                        lead, cta, image, image_alt, keywords, takeaways, sections, published)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14, true)
     on conflict (slug) do update set
       title = excluded.title, description = excluded.description,
       published_on = excluded.published_on, read_time = excluded.read_time,
       category = excluded.category, eyebrow = excluded.eyebrow, lead = excluded.lead,
       cta = excluded.cta, image = excluded.image, image_alt = excluded.image_alt,
       keywords = excluded.keywords, takeaways = excluded.takeaways,
       sections = excluded.sections, published = true
     returning (xmax = 0) as inserted`,
    values,
  );

  if (result[0].inserted) { created += 1; console.log(`  create ${post.slug}`); }
  else { updated += 1; console.log(`  update ${post.slug}`); }
}

for (const [fromSlug, toSlug] of Object.entries(BLOG_REDIRECTS)) {
  const retired = await sql`update posts set published = false where slug = ${fromSlug} returning slug`;
  if (retired.length) console.log(`  unpublish ${fromSlug} → /blog/${toSlug}`);
}

console.log(`\nSeed complete — ${created} created, ${updated} updated, ${skipped} skipped.`);
