/**
 * Static HTML injected into #root at stamp time so non-JS crawlers (GPTBot,
 * Perplexity, etc.) see real copy even when Playwright prerender is skipped
 * (e.g. on Vercel). React createRoot replaces this on hydrate for humans.
 */
import { faqs, plans, services, servicesIntro } from '../src/data.js';
import { SITE_EMAIL, SITE_PHONE_DISPLAY } from '../src/site.js';
import { blogPosts } from '../src/blogPosts.js';

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function nav() {
  return `<nav aria-label="Primary">
  <a href="/">Home</a>
  <a href="/services">Services</a>
  <a href="/pricing">Pricing</a>
  <a href="/blog">Blog</a>
  <a href="/contact">Contact</a>
  <a href="/faq">FAQ</a>
  <a href="/about">About</a>
</nav>`;
}

function packagesBlock() {
  const items = plans.map(plan => {
    const features = plan.features.map(f => `<li>${esc(f)}</li>`).join('');
    return `<article>
  <h3>${esc(plan.name)} — $${esc(plan.price)}</h3>
  <p>${esc(plan.words)}. ${esc(plan.copy)} Timeline: ${esc(plan.timeline)}.</p>
  <ul>${features}</ul>
</article>`;
  }).join('\n');
  return `<section>
  <h2>Ebook writing packages — $699 to $3,999</h2>
  <p>Ghostwriting packages with editing, cover design, and retailer-ready files included. Fixed quotes — no surprise invoices.</p>
  ${items}
</section>`;
}

function servicesBlock() {
  const items = services.map(s => `<article>
  <h3>${esc(s.title || s.name)}</h3>
  <p>${esc(s.copy || s.lead || '')}</p>
</article>`).join('\n');
  return `<section>
  <h2>${esc(servicesIntro.title)} ${esc(servicesIntro.titleEm)}</h2>
  <p>${esc(servicesIntro.lead)}</p>
  ${items}
</section>`;
}

function faqBlock(items = faqs) {
  const entries = items.map(item => `<article>
  <h3>${esc(item.q)}</h3>
  <p>${esc(item.a)}</p>
</article>`).join('\n');
  return `<section>
  <h2>Ebook writing &amp; publishing FAQ</h2>
  ${entries}
</section>`;
}

function contactBlock() {
  return `<section>
  <h2>Contact ebookwriters.us</h2>
  <p>Tell us about your book or project. Email ${esc(SITE_EMAIL)} or call ${esc(SITE_PHONE_DISPLAY)}. Iowa, USA.</p>
  <p>Send enquiry for a fixed ebook writing or ghostwriting quote. We typically reply within 1–2 business days.</p>
  <form action="/contact" method="get">
    <label>Your name <input name="name" /></label>
    <label>Your email <input name="email" type="email" /></label>
    <label>Tell us about your book or project <textarea name="message"></textarea></label>
    <button type="submit">Send enquiry</button>
  </form>
</section>`;
}

function blogIndexBlock() {
  const items = blogPosts.slice(0, 12).map(post => `<article>
  <h3><a href="/blog/${esc(post.slug)}">${esc(post.title)}</a></h3>
  <p>${esc(post.description)}</p>
</article>`).join('\n');
  return `<section>
  <h2>Blog</h2>
  ${items}
</section>`;
}

/**
 * @param {{ path: string, title: string, description: string }} page
 */
export function getCrawlMarkup(page) {
  const path = page.path;
  const chunks = [
    `<main data-seo-crawl="1">`,
    nav(),
    `<h1>${esc(page.title.replace(/\s*\|\s*ebookwriters\.us$/, ''))}</h1>`,
    `<p>${esc(page.description)}</p>`,
  ];

  if (path === '/' || path === '/services' || path === '/ebook-ghostwriting-services' || path === '/hire-ebook-writer') {
    chunks.push(servicesBlock());
  }
  if (path === '/' || path === '/pricing') {
    chunks.push(packagesBlock());
  }
  if (path === '/' || path === '/faq' || path === '/pricing') {
    chunks.push(faqBlock(path === '/pricing' ? faqs.slice(0, 4) : faqs));
  }
  if (path === '/contact') {
    chunks.push(contactBlock());
  }
  if (path === '/blog') {
    chunks.push(blogIndexBlock());
  }
  if (path.startsWith('/blog/') && path !== '/blog') {
    chunks.push(`<section><p>Article on ebookwriters.us. <a href="/blog">All articles</a> · <a href="/contact">Contact</a></p></section>`);
  }

  chunks.push(`<p><a href="/contact">Contact</a> · <a href="/pricing">Pricing</a> · <a href="/services">Services</a> · Email ${esc(SITE_EMAIL)}</p>`);
  chunks.push(`</main>`);
  return chunks.join('\n');
}
