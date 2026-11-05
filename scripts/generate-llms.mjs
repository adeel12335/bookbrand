/**
 * Answer-engine files, written after `vite build` so they always match the
 * articles this build shipped:
 *
 *   dist/llms.txt       public/llms.txt plus a generated "Guides" index of every post
 *   dist/llms-full.txt  the studio facts plus the full text of every guide, as markdown
 *
 * AI crawlers (GPTBot, ClaudeBot, PerplexityBot) do not run JavaScript, and
 * some assistants fetch llms.txt / llms-full.txt directly, so these files give
 * them the whole knowledge base in one clean request.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const distDir = join(root, 'dist');
const { posts } = await import(new URL('../src/generated/posts.js', import.meta.url));
const { SITE_ORIGIN } = await import(new URL('../src/site.js', import.meta.url));
const { BLOG_REDIRECTS } = await import(new URL('../src/blogRedirects.js', import.meta.url));

if (!existsSync(join(distDir, 'llms.txt'))) {
  console.error('[llms] dist/llms.txt not found, run after `vite build`.');
  process.exit(1);
}

const live = posts.filter(post => !BLOG_REDIRECTS[post.slug]);
const url = slug => `${SITE_ORIGIN}/blog/${slug}`;
// Relative site links become absolute so the text still works out of context.
const absolute = text => String(text || '').replace(/\]\((\/[^)]*)\)/g, (m, path) => `](${SITE_ORIGIN}${path})`);

const categories = [...new Set(live.map(post => post.category))];
const guides = categories.map(category => {
  const lines = live
    .filter(post => post.category === category)
    .map(post => `- [${post.title}](${url(post.slug)}): ${post.description}`);
  return `### ${category}\n\n${lines.join('\n')}`;
}).join('\n\n');

const base = readFileSync(join(distDir, 'llms.txt'), 'utf8').replace(/\r\n/g, '\n').trimEnd();
const index = `${base}

## Guides

Full text of every guide in one file: ${SITE_ORIGIN}/llms-full.txt

${guides}
`;
writeFileSync(join(distDir, 'llms.txt'), index, 'utf8');

const article = post => {
  const meta = [
    `URL: ${url(post.slug)}`,
    `Category: ${post.category}`,
    `Published: ${post.date}`,
    post.updated ? `Updated: ${post.updated}` : '',
  ].filter(Boolean).join('\n');
  const body = (post.sections || []).map(section => {
    const paragraphs = (section.paragraphs || []).map(p => absolute(p));
    const bullets = (section.bullets || []).map(b => `- ${absolute(b)}`);
    return [`## ${section.heading}`, ...paragraphs, bullets.join('\n')].filter(Boolean).join('\n\n');
  }).join('\n\n');
  return `# ${post.title}\n\n${meta}\n\n${absolute(post.lead)}\n\n${body}`;
};

const full = `${base}

---

${live.map(article).join('\n\n---\n\n')}
`;
writeFileSync(join(distDir, 'llms-full.txt'), full, 'utf8');
console.log(`[llms] wrote dist/llms.txt (+${live.length} guides) and dist/llms-full.txt (${Math.round(full.length / 1024)} KB).`);
