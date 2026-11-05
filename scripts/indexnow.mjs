/**
 * Tell IndexNow search engines (Bing, Yandex, Seznam, Naver) that the site's
 * URLs changed, so they recrawl now instead of in a few weeks. Bing's index
 * also feeds ChatGPT search, Microsoft Copilot and other answer engines.
 *
 *   npm run indexnow                 every URL in public/sitemap.xml
 *   npm run indexnow -- /blog/a /x   only these paths
 *
 * Run it after a deploy is live: the engines fetch the key file from the
 * production host to verify the request.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const KEY = '750ae0591c991e9c354efcd5a4fb05c4';
const HOST = 'www.ebookwriters.us';
const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');

const args = process.argv.slice(2);
const urlList = args.length
  ? args.map(path => `https://${HOST}${path.startsWith('/') ? path : `/${path}`}`)
  : [...readFileSync(join(root, 'public', 'sitemap.xml'), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

const keyCheck = await fetch(`https://${HOST}/${KEY}.txt`);
if (!keyCheck.ok || (await keyCheck.text()).trim() !== KEY) {
  console.error(`[indexnow] key file is not live at https://${HOST}/${KEY}.txt yet. Deploy first.`);
  process.exit(1);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
console.log(`[indexnow] submitted ${urlList.length} URL(s): HTTP ${res.status} ${res.statusText}`);
if (res.status >= 400) {
  console.error(await res.text());
  process.exit(1);
}
