import { str, text } from './http.js';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

/**
 * A Postgres `date` arrives as a JS Date pinned to local midnight. Reading it
 * back with toISOString() shifts it into UTC and loses a day for anyone west of
 * Greenwich — so a build on this machine and a build on Vercel would stamp
 * different dates on the same article. Use the local calendar accessors, which
 * give the stored day in both cases.
 */
function isoDate(value) {
  if (value instanceof Date) {
    const y = value.getFullYear();
    const m = String(value.getMonth() + 1).padStart(2, '0');
    const d = String(value.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  return String(value ?? '').slice(0, 10);
}

function dateLabel(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

/** Database row -> the exact shape BlogPages.jsx and seo.js already consume. */
export function toPost(row) {
  const date = isoDate(row.published_on);
  return {
    slug: row.slug,
    title: row.title,
    description: row.description,
    date,
    dateLabel: dateLabel(date),
    readTime: row.read_time,
    category: row.category,
    eyebrow: row.eyebrow,
    keywords: row.keywords || [],
    lead: row.lead,
    cta: row.cta,
    image: row.image,
    imageAlt: row.image_alt,
    takeaways: row.takeaways || [],
    sections: row.sections || [],
    published: row.published,
    updatedAt: row.updated_at,
    format: row.format === 'v2' ? 'v2' : '',
    author: str(row.author, 160),
  };
}

export function slugify(value) {
  return String(value ?? '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}

function stringList(value, max, itemMax) {
  if (!Array.isArray(value)) return [];
  return value.map(item => str(item, itemMax)).filter(Boolean).slice(0, max);
}

function sectionList(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map(section => ({
      heading: str(section?.heading, 200),
      paragraphs: Array.isArray(section?.paragraphs)
        ? section.paragraphs.map(p => text(p, 4000)).filter(Boolean).slice(0, 20)
        : [],
      bullets: Array.isArray(section?.bullets)
        ? section.bullets.map(b => str(b, 300)).filter(Boolean).slice(0, 20)
        : [],
      ...(Array.isArray(section?.bulletGroups) && section.bulletGroups.length
        ? {
            bulletGroups: section.bulletGroups
              .map(g => ({ after: Math.trunc(Number(g?.after)), count: Math.trunc(Number(g?.count)) }))
              .filter(g => Number.isFinite(g.after) && g.after >= -1 && Number.isFinite(g.count) && g.count > 0)
              .slice(0, 30),
          }
        : {}),
    }))
    .filter(section => section.heading || section.paragraphs.length)
    .slice(0, 30);
}

/**
 * Validates and normalises an admin payload. Returns { post, errors } so the
 * handler can answer with field-level messages instead of a bare 400.
 */
export function normalisePost(body, { slugFallback = '' } = {}) {
  const errors = {};
  const title = str(body?.title, 200);
  if (!title) errors.title = 'A title is required.';

  const slug = slugify(body?.slug || slugFallback || title);
  if (!slug) errors.slug = 'A slug is required.';

  const description = str(body?.description, 320);
  if (!description) errors.description = 'A meta description is required — it is what Google shows.';

  const sections = sectionList(body?.sections);
  if (!sections.length) errors.sections = 'Add at least one section with a heading or a paragraph.';

  const rawDate = isoDate(body?.date);
  const published_on = /^\d{4}-\d{2}-\d{2}$/.test(rawDate) ? rawDate : new Date().toISOString().slice(0, 10);

  return {
    errors,
    post: {
      slug,
      title,
      description,
      published_on,
      read_time: str(body?.readTime, 40) || '6 min read',
      category: str(body?.category, 60) || 'Guides',
      eyebrow: str(body?.eyebrow, 80),
      lead: text(body?.lead, 1200),
      cta: str(body?.cta, 120),
      image: str(body?.image, 300),
      image_alt: str(body?.imageAlt, 300),
      keywords: stringList(body?.keywords, 20, 120),
      takeaways: stringList(body?.takeaways, 12, 400),
      sections,
      published: Boolean(body?.published),
      format: str(body?.format, 16).toLowerCase() === 'v2' ? 'v2' : '',
      author: str(body?.author, 160),
    },
  };
}

const OPTIONAL_POST_COLUMNS = ['format', 'author'];

/** Which of the optional post columns exist. Missing columns must not break saves. */
export async function postsColumnSet(db) {
  const rows = await db`
    select column_name
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'posts'
      and column_name in ('format', 'author')
  `;
  return new Set(rows.map(row => row.column_name));
}

export function skippedPostFields(post, columnSet) {
  return OPTIONAL_POST_COLUMNS.filter(name => post[name] && !columnSet.has(name));
}

export function columnWarning(skipped) {
  if (!skipped?.length) return '';
  return `Saved the article, but ${skipped.join(' and ')} could not be stored until the posts table has those columns.`;
}

function jsonb(value) {
  return JSON.stringify(value);
}

function insertColumns(post, columnSet) {
  const columns = [
    'slug', 'title', 'description', 'published_on', 'read_time', 'category', 'eyebrow',
    'lead', 'cta', 'image', 'image_alt', 'keywords', 'takeaways', 'sections', 'published',
  ];
  const values = [
    post.slug, post.title, post.description, post.published_on, post.read_time,
    post.category, post.eyebrow, post.lead, post.cta, post.image, post.image_alt,
    jsonb(post.keywords), jsonb(post.takeaways), jsonb(post.sections), post.published,
  ];
  for (const name of OPTIONAL_POST_COLUMNS) {
    if (!columnSet.has(name)) continue;
    columns.push(name);
    values.push(post[name] || '');
  }
  return { columns, values };
}

export async function insertPostRow(db, post) {
  const columnSet = await postsColumnSet(db);
  const { columns, values } = insertColumns(post, columnSet);
  const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');
  const rows = await db.query(
    `insert into posts (${columns.join(', ')}) values (${placeholders}) returning *`,
    values,
  );
  return { row: rows[0], skipped: skippedPostFields(post, columnSet) };
}

export async function updatePostRow(db, post, whereSlug) {
  const columnSet = await postsColumnSet(db);
  const assignments = [
    ['slug', post.slug],
    ['title', post.title],
    ['description', post.description],
    ['published_on', post.published_on],
    ['read_time', post.read_time],
    ['category', post.category],
    ['eyebrow', post.eyebrow],
    ['lead', post.lead],
    ['cta', post.cta],
    ['image', post.image],
    ['image_alt', post.image_alt],
    ['keywords', jsonb(post.keywords)],
    ['takeaways', jsonb(post.takeaways)],
    ['sections', jsonb(post.sections)],
    ['published', post.published],
  ];
  for (const name of OPTIONAL_POST_COLUMNS) {
    if (columnSet.has(name)) assignments.push([name, post[name] || '']);
  }
  const values = assignments.map(([, value]) => value);
  values.push(whereSlug);
  const setSql = assignments.map(([name], index) => `${name} = $${index + 1}`).join(', ');
  const rows = await db.query(
    `update posts set ${setSql} where slug = $${values.length} returning *`,
    values,
  );
  return { row: rows[0], skipped: skippedPostFields(post, columnSet) };
}
