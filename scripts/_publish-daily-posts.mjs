/**
 * Publish daily SEO posts to Neon (ebookwriters.us).
 * Run from project root on USER Windows machine:
 *   node scripts/_publish-daily-posts.mjs
 */
import { neon } from '@neondatabase/serverless';
import { loadEnv } from './load-env.mjs';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

loadEnv();

const __dirname = dirname(fileURLToPath(import.meta.url));
const jsonPath = process.argv[2]
  ? join(process.cwd(), process.argv[2])
  : join(__dirname, 'daily-posts-2026-09-25.json');
if (!existsSync(jsonPath)) {
  console.error('Missing', jsonPath);
  process.exit(1);
}
const posts = JSON.parse(readFileSync(jsonPath, 'utf8'));

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL missing after loadEnv()');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

function toSections(post) {
  // Neon/frontend expects sections array of { heading, paragraphs, bullets? }
  return (post.sections || []).map((s) => ({
    heading: s.heading || s.title || '',
    paragraphs: s.paragraphs || [],
    bullets: s.bullets || [],
  }));
}

async function upsertPost(post) {
  const publishedOn = post.date || post.published_on || '2026-09-24';
  const readTime = post.readTime || post.read_time || '8 min read';
  const imageAlt = post.imageAlt || post.image_alt || post.title;
  const keywords = JSON.stringify(post.keywords || []);
  const takeaways = JSON.stringify(post.takeaways || []);
  const sections = JSON.stringify(toSections(post));
  const published = post.published !== false;

  await sql.query(
    `insert into posts (slug, title, description, published_on, read_time, category, eyebrow,
                        lead, cta, image, image_alt, keywords, takeaways, sections, published)
     values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12::jsonb,$13::jsonb,$14::jsonb,$15)
     on conflict (slug) do update set
       title = excluded.title,
       description = excluded.description,
       published_on = excluded.published_on,
       read_time = excluded.read_time,
       category = excluded.category,
       eyebrow = excluded.eyebrow,
       lead = excluded.lead,
       cta = excluded.cta,
       image = excluded.image,
       image_alt = excluded.image_alt,
       keywords = excluded.keywords,
       takeaways = excluded.takeaways,
       sections = excluded.sections,
       published = excluded.published,
       updated_at = now()
     returning slug, published`,
    [
      post.slug,
      post.title,
      post.description || '',
      publishedOn,
      readTime,
      post.category || 'Guides',
      post.eyebrow || '',
      post.lead || '',
      post.cta || '',
      post.image || '',
      imageAlt,
      keywords,
      takeaways,
      sections,
      published,
    ],
  );
}

const slugs = posts.map((p) => p.slug);
for (const post of posts) {
  await upsertPost(post);
  console.log('upserted', post.slug);
}

const rows = await sql`
  SELECT slug, published, title, published_on
  FROM posts
  WHERE slug = ANY(${slugs})
  ORDER BY slug
`;
console.log('verify:', rows);
const ok =
  rows.length === posts.length &&
  rows.every((r) => r.published === true) &&
  slugs.every((s) => rows.some((r) => r.slug === s));
if (!ok) {
  console.error('VERIFY FAILED');
  process.exit(1);
}
console.log('OK: all slugs published=true');
