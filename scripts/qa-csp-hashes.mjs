/**
 * Inline <script> blocks in index.html run only if vercel.json's CSP lists
 * their sha256. Any edit to one of those lines (even whitespace) changes the
 * hash and silently disables the script in production, so this check
 * recomputes every hash and asserts each CSP header carries it.
 *
 *   npm run qa:csp            # source index.html (+ dist/index.html if built)
 */
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const sources = ['index.html', 'dist/index.html'].map(p => join(root, p)).filter(existsSync);

const vercel = JSON.parse(readFileSync(join(root, 'vercel.json'), 'utf8'));
const csps = [];
for (const rule of vercel.headers || []) {
  for (const header of rule.headers || []) {
    if (header.key === 'Content-Security-Policy') csps.push({ source: rule.source, value: header.value });
  }
}
if (csps.length === 0) throw new Error('vercel.json has no Content-Security-Policy header');

let failed = false;
let checked = 0;
for (const file of sources) {
  const html = readFileSync(file, 'utf8');
  // Inline scripts only: external ones are allowed by host, JSON-LD is data.
  const re = /<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = re.exec(html))) {
    const [, attrs, body] = match;
    if (/type\s*=\s*["']application\/ld\+json["']/i.test(attrs)) continue;
    const hash = `'sha256-${createHash('sha256').update(body).digest('base64')}'`;
    const label = body.trim().slice(0, 56);
    for (const csp of csps) {
      const ok = csp.value.includes(hash);
      checked++;
      if (!ok) failed = true;
      console.log(`${ok ? 'ok  ' : 'FAIL'} ${relative(root, file)}  ${csp.source}  ${hash}  ${label}...`);
    }
  }
}
if (checked === 0) throw new Error('no inline scripts found to check');
if (failed) {
  console.error('\nCSP hash mismatch: update vercel.json with the hash(es) printed above.');
  process.exit(1);
}
console.log(`\nAll ${checked} inline-script/CSP pairs match.`);
