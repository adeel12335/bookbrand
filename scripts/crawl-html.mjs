/**
 * Static HTML injected into #root at stamp time so non-JS crawlers (GPTBot,
 * Perplexity, etc.) see real copy even when Playwright prerender is skipped
 * (e.g. on Vercel). React createRoot replaces this on hydrate for humans.
 *
 * Every route mirrors the page it stands in for: the same h1 and the same
 * copy, read from the same data the React page renders. A route that only
 * gets its meta description here reads as a thin page to a crawler.
 */
import {
  books, contactIntro, faqs, footerBrand, footerLinks, hero, plans, portfolioPage, services,
  servicesIntro, siteContact,
} from '../src/data.js';
import {
  aboutPage, coverPage, editingPage, faqPage, landers, notFoundPage,
  pricingPage, privacyPage, servicesPage, termsPage,
} from '../src/pageContent.js';
import { SITE_EMAIL, SITE_PHONE_DISPLAY } from '../src/site.js';
import { blogIndex, blogPosts } from '../src/blogPosts.js';

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const joinTitle = ({ title, titleEm }) => (titleEm ? `${title} ${titleEm}` : title);

function nav() {
  return `<nav aria-label="Primary">
  <a href="/">Home</a>
  <a href="/about">About</a>
  <a href="/services">Services</a>
  <a href="/portfolio">Portfolio</a>
  <a href="/pricing">Pricing</a>
  <a href="/blog">Blog</a>
  <a href="/faq">FAQ</a>
  <a href="/contact">Contact</a>
</nav>`;
}

/* The site footer, as every rendered page shows it. */
function footer() {
  const columns = footerLinks.map(column => linksBlock(column.links, column.title)).join('\n');
  return `<footer data-seo-crawl="1">
  <p>${esc(footerBrand.blurb)}</p>
  <p>${esc(footerBrand.ctaCopy)} <a href="/contact">${esc(footerBrand.ctaLabel)}</a></p>
  <p>Email <a href="mailto:${esc(SITE_EMAIL)}">${esc(SITE_EMAIL)}</a> · ${esc(SITE_PHONE_DISPLAY)} · ${esc(siteContact.address)}</p>
  ${columns}
</footer>`;
}

function list(items) {
  if (!items?.length) return '';
  return `<ul>${items.map(item => `<li>${esc(item)}</li>`).join('')}</ul>`;
}

function sectionsBlock(sections = []) {
  return sections.map(section => `<section>
  <h2>${esc(section.heading)}</h2>
  ${(section.paragraphs || []).map(p => `<p>${esc(p)}</p>`).join('\n  ')}
  ${list(section.bullets)}
</section>`).join('\n');
}

function linksBlock(links = [], label = 'Related pages') {
  if (!links.length) return '';
  return `<nav aria-label="${esc(label)}">
  ${links.map(link => `<a href="${esc(link.href)}">${esc(link.label)}</a>`).join('\n  ')}
</nav>`;
}

function packagesBlock() {
  const items = plans.map(plan => `<article>
  <h3>${esc(plan.name)} — $${esc(plan.price)}</h3>
  <p>${esc(plan.words)}. ${esc(plan.copy)} Timeline: ${esc(plan.timeline)}.</p>
  ${list(plan.features)}
</article>`).join('\n');
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
  ${list(s.points)}
</article>`).join('\n');
  return `<section>
  <h2>${esc(joinTitle(servicesIntro))}</h2>
  <p>${esc(servicesIntro.lead)}</p>
  ${items}
</section>`;
}

function faqBlock(items = faqs, heading = 'Ebook writing & publishing FAQ') {
  if (!items?.length) return '';
  const entries = items.map(item => `<article>
  <h3>${esc(item.q)}</h3>
  <p>${esc(item.a)}</p>
</article>`).join('\n');
  return `<section>
  <h2>${esc(heading)}</h2>
  ${entries}
</section>`;
}

function contactBlock() {
  return `<section>
  <h2>${esc(joinTitle(contactIntro))}</h2>
  <p>${esc(contactIntro.lead)}</p>
  ${list(contactIntro.points)}
  <p>Email ${esc(SITE_EMAIL)} or call ${esc(SITE_PHONE_DISPLAY)}. ${esc(siteContact.address)}.</p>
  <p>Send an enquiry for a fixed ebook writing or ghostwriting quote. We typically reply within 1–2 business days.</p>
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
  <h2><a href="/blog/${esc(post.slug)}">${esc(post.title)}</a></h2>
  <p>${esc(post.description)}</p>
</article>`).join('\n');
  return `<section>
  ${items}
</section>`;
}

function aboutBlock() {
  const pillars = aboutPage.pillars.map(p => `<li><strong>${esc(p.label)}.</strong> ${esc(p.copy)}</li>`).join('');
  const stages = aboutPage.stages.map(s => `<li><strong>${esc(s.title)}.</strong> ${esc(s.copy)}</li>`).join('');
  return `<p>${esc(aboutPage.manifesto)}</p>
<ul>${pillars}</ul>
${sectionsBlock(aboutPage.principles)}
<section>
  <h2>How a project runs</h2>
  <ol>${stages}</ol>
</section>
<section>
  <h2>${esc(aboutPage.closeTitle)}</h2>
  <p>${esc(aboutPage.closeLead)}</p>
</section>
${linksBlock(aboutPage.links)}`;
}

function portfolioBlock() {
  const { pillars, work, process, closing } = portfolioPage;
  const titles = books.map(book => `<li>${esc(book.title)} by ${esc(book.author)} — ${esc(book.genre)}</li>`).join('');
  const steps = process.steps.map(s => `<li><strong>${esc(s.title)}.</strong> ${esc(s.copy)}</li>`).join('');
  return `<p>${esc(portfolioPage.trustNote)}</p>
<ul>${pillars.map(p => `<li><strong>${esc(p.title)}.</strong> ${esc(p.copy)}</li>`).join('')}</ul>
<section>
  <h2>${esc(joinTitle(work))}</h2>
  <p>${esc(work.lead)}</p>
  <p>Genres: ${esc(work.genres.join(', '))}.</p>
  <ul>${titles}</ul>
</section>
${servicesBlock()}
<section>
  <h2>${esc(joinTitle(process))}</h2>
  <p>${esc(process.lead)}</p>
  <ol>${steps}</ol>
</section>
<section>
  <h2>${esc(joinTitle(closing))}</h2>
  <p>${esc(closing.lead)}</p>
</section>`;
}

function contentPageBlock(content) {
  return [
    sectionsBlock(content.sections),
    faqBlock(content.faqs, 'Frequently asked questions'),
    linksBlock(content.links),
  ].filter(Boolean).join('\n');
}

/*
 * path -> { h1, lead, body() }. h1 and lead match what the React page shows;
 * body() is the rest of that page's copy.
 */
const routes = {
  '/': { h1: hero.h1, lead: hero.lead, body: () => [servicesBlock(), packagesBlock(), faqBlock()].join('\n') },
  '/about': { h1: joinTitle(aboutPage), lead: aboutPage.lead, body: aboutBlock },
  '/services': { h1: servicesPage.title, lead: servicesPage.lead, body: servicesBlock },
  '/pricing': {
    h1: pricingPage.title,
    lead: pricingPage.lead,
    body: () => [
      packagesBlock(),
      `<p>${esc(pricingPage.note)}</p>\n<p>${esc(pricingPage.closing)}</p>`,
      faqBlock(faqs.slice(0, 4)),
    ].join('\n'),
  },
  '/portfolio': { h1: joinTitle(portfolioPage), lead: portfolioPage.lead, body: portfolioBlock },
  '/blog': { h1: joinTitle(blogIndex), lead: blogIndex.lead, body: blogIndexBlock },
  '/contact': { h1: contactIntro.pageTitle, lead: null, body: contactBlock },
  '/faq': {
    h1: faqPage.title,
    lead: faqPage.lead,
    body: () => [faqBlock(faqPage.faqs), sectionsBlock(faqPage.sections), linksBlock(faqPage.links)].join('\n'),
  },
  '/privacy': {
    h1: privacyPage.title,
    lead: privacyPage.lead,
    body: () => `<p>Last updated ${esc(privacyPage.updated)}.</p>\n${sectionsBlock(privacyPage.sections)}`,
  },
  '/terms': {
    h1: termsPage.title,
    lead: termsPage.lead,
    body: () => `<p>Last updated ${esc(termsPage.updated)}.</p>\n${sectionsBlock(termsPage.sections)}`,
  },
  '/404': { h1: notFoundPage.title, lead: notFoundPage.lead, body: () => linksBlock(notFoundPage.links, 'Suggested pages') },
};

for (const content of [...Object.values(landers), editingPage, coverPage]) {
  routes[content.path] = { h1: content.title, lead: content.lead, body: () => contentPageBlock(content) };
}

function blogPostRoute(slug) {
  const post = blogPosts.find(item => item.slug === slug);
  if (!post) return null;
  return {
    h1: post.title,
    lead: post.lead || post.description,
    body: () => {
      const takeaways = post.takeaways?.length
        ? `<section><h2>Key takeaways</h2>${list(post.takeaways)}</section>`
        : '';
      return [
        takeaways,
        sectionsBlock(post.sections),
        `<p><a href="/blog">All articles</a> · <a href="/contact">${esc(post.cta || 'Contact')}</a></p>`,
      ].join('\n');
    },
  };
}

/**
 * @param {{ path: string, title: string, description: string }} page
 */
export function getCrawlMarkup(page) {
  const path = page.path;
  const route = routes[path]
    || (path.startsWith('/blog/') && blogPostRoute(path.slice('/blog/'.length)))
    || { h1: page.title.replace(/\s*[|—]\s*ebookwriters\.us$/, ''), lead: page.description, body: () => '' };

  const chunks = [
    `<main data-seo-crawl="1">`,
    nav(),
    `<h1>${esc(route.h1)}</h1>`,
    route.lead ? `<p>${esc(route.lead)}</p>` : '',
    route.body(),
    `</main>`,
    footer(),
  ];
  return chunks.filter(Boolean).join('\n');
}
