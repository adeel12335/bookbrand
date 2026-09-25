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
  books, benefits, contactIntro, faqs, footerBrand, footerLinks, hero, plans, portfolioPage, pricingIntro, services,
  servicesIntro, siteContact,
} from '../src/data.js';
import {
  aboutPage, coverPage, editingPage, editorialDeskPage, editorialPolicyPage, faqPage, landers, notFoundPage,
  pricingPage, privacyPage, servicesPage, termsPage,
} from '../src/pageContent.js';
import { SITE_EMAIL, SITE_PHONE_DISPLAY } from '../src/site.js';
import { articleByline, articleSectionParagraphs, articleSections, articleSources, articleTakeaways, blogIndex, blogPosts, quickAnswerFor } from '../src/blogPosts.js';
import { inlineHtml } from '../src/inlineMarkup.js';

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
  return `<ul>${items.map(item => `<li>${inlineHtml(item, esc)}</li>`).join('')}</ul>`;
}

function tableBlock(table) {
  if (!table?.rows?.length) return '';
  const columns = table.columns || [];
  const head = columns.length
    ? `<thead><tr>${columns.map(column => `<th>${esc(column)}</th>`).join('')}</tr></thead>`
    : '';
  const body = table.rows.map(row => `<tr>${row.map((cell, index) => (
    index === 0 ? `<th scope="row">${esc(cell)}</th>` : `<td>${esc(cell)}</td>`
  )).join('')}</tr>`).join('');
  const caption = table.caption ? `<caption>${esc(table.caption)}</caption>` : '';
  return `<table>${caption}${head}<tbody>${body}</tbody></table>`;
}

function paragraphHtml(p) {
  const trimmed = String(p || '').trim();
  const h3 = trimmed.match(/^#{3}\s+(.+)/);
  if (h3) return `<h3>${esc(h3[1].replace(/\*\*/g, ''))}</h3>`;
  const h4 = trimmed.match(/^#{4}\s+(.+)/);
  if (h4) return `<h4>${esc(h4[1].replace(/\*\*/g, ''))}</h4>`;
  const strongOnly = trimmed.match(/^\*\*(.+)\*\*$/);
  if (strongOnly) return `<h4>${esc(strongOnly[1])}</h4>`;
  return `<p>${inlineHtml(p, esc)}</p>`;
}

function sectionsBlock(sections = []) {
  return sections.map(section => `<section>
  <h2>${esc(section.heading)}</h2>
  ${(section.paragraphs || []).map(paragraphHtml).join('\n  ')}
  ${list(section.bullets)}
  ${tableBlock(section.table)}
  ${section.sample?.before ? `<figure><figcaption>Before</figcaption><p>${esc(section.sample.before)}</p></figure><figure><figcaption>After</figcaption><p>${esc(section.sample.after)}</p></figure>${section.sample.note ? `<p><strong>Editor’s note.</strong> ${esc(section.sample.note)}</p>` : ''}` : ''}
</section>`).join('\n');
}

function linksBlock(links = [], label = 'Related pages') {
  if (!links.length) return '';
  return `<nav aria-label="${esc(label)}">
  ${links.map(link => `<a href="${esc(link.href)}">${esc(link.label)}</a>`).join('\n  ')}
</nav>`;
}

function compactPackagesBlock() {
  const rows = plans.map(plan => `<tr>
  <th scope="row">${esc(plan.name)}</th>
  <td>${esc(plan.words)}</td>
  <td>$${esc(plan.price)}</td>
</tr>`).join('');
  return `<section>
  <h2>${esc(pricingIntro.previewTitle || 'Starting prices by length')}</h2>
  <p>${esc(pricingIntro.previewLead || 'Fixed starting prices by manuscript length. Full feature lists live on the pricing page.')}</p>
  <table>
    <thead><tr><th>Package</th><th>Words</th><th>Starting</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
  <p><a href="/pricing">${esc(pricingIntro.previewCta || 'Compare packages')}</a></p>
</section>`;
}

function packagesBlock() {
  const items = plans.map(plan => `<article>
  <h3>${esc(plan.name)} — $${esc(plan.price)}</h3>
  <p>${esc(plan.words)}. ${esc(plan.copy)} Timeline: ${esc(plan.timeline)}.</p>
  ${list(plan.features)}
</article>`).join('\n');
  return `<section>
  <h2>${esc(pricingPage.plansHeading || "What's included in each package")}</h2>
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
  <p data-speakable="1">${esc(item.a)}</p>
</article>`).join('\n');
  if (!heading) return `<section>${entries}</section>`;
  return `<section>
  <h2>${esc(heading)}</h2>
  ${entries}
</section>`;
}

function contactBlock() {
  const page = contactIntro.page;
  return `<section>
  <p data-speakable="1">${esc(contactIntro.lead)}</p>
  ${list(contactIntro.points)}
  <p>${esc(contactIntro.pricingNote)} <a href="${esc(contactIntro.pricingHref)}">${esc(contactIntro.pricingCta)}</a></p>
  <p>Email ${esc(SITE_EMAIL)} or call ${esc(SITE_PHONE_DISPLAY)}. ${esc(siteContact.address)}.</p>
  <h2>${esc(page.howTitle)}</h2>
  <p>${esc(page.howLead)}</p>
  ${list(page.how)}
  <h2>${esc(page.nextTitle)}</h2>
  <p>${esc(page.nextLead)}</p>
  ${list(page.next)}
  ${page.extra.map(p => `<p>${esc(p)}</p>`).join('\n')}
  <p>Send an enquiry for a fixed ebook writing or ghostwriting quote. We typically reply within 1–2 business days.</p>
  <form action="/contact" method="get">
    <label>Your name <input name="name" /></label>
    <label>Your email <input name="email" type="email" /></label>
    <label>Tell us about your book or project <textarea name="message"></textarea></label>
    <button type="submit">Send enquiry</button>
  </form>
</section>`;
}

function servicesIndexBlock() {
  const landerPages = [...Object.values(landers), editingPage, coverPage];
  const landerList = landerPages.map(item => `<li><a href="${esc(item.path)}">${esc(item.title)}</a></li>`).join('\n  ');
  return [
    servicesBlock(),
    `<section>
  <h2>${esc(servicesPage.briefing.heading)}</h2>
  <p>${esc(servicesPage.briefing.lead)}</p>
  ${servicesPage.briefing.paragraphs.map(p => `<p>${esc(p)}</p>`).join('\n  ')}
  <p>${esc(servicesPage.pricingNote)} <a href="${esc(servicesPage.pricingHref)}">${esc(servicesPage.pricingCta)}</a></p>
</section>`,
    `<section>
  <h2>Dedicated service pages</h2>
  <ul>
  ${landerList}
  </ul>
</section>`,
    `<section>
  <h2>${esc(servicesPage.chooser.heading)}</h2>
  <p>${esc(servicesPage.chooser.lead)}</p>
  ${servicesPage.chooser.items.map(item => `<article><h3>${esc(item.title)}</h3><p>${esc(item.copy)}</p></article>`).join('\n')}
</section>`,
  ].join('\n');
}

function blogIndexBlock() {
  const items = blogPosts.map(post => `<article>
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
  const quick = content.quickAnswer
    ? `<section data-speakable="1"><h2>Quick answer</h2><p>${esc(content.quickAnswer)}</p></section>`
    : '';
  const covers = content.covers?.length
    ? `<section>
  <h2>Cover case studies from published titles</h2>
  <ul>${content.covers.map(cover => `<li>
    <strong>${esc(cover.title)}</strong> — ${esc(cover.genre)}.
    ${cover.brief ? ` Brief: ${esc(cover.brief)}` : ''}
    ${cover.type ? ` Typography: ${esc(cover.type)}` : ''}
    ${cover.thumbnail ? ` Thumbnail: ${esc(cover.thumbnail)}` : ''}
    ${cover.note ? ` ${esc(cover.note)}` : ''}
  </li>`).join('')}</ul>
</section>`
    : '';
  return [
    quick,
    sectionsBlock(content.sections),
    covers,
    faqBlock(content.faqs, 'Frequently asked questions'),
    linksBlock(content.links),
  ].filter(Boolean).join('\n');
}

/*
 * path -> { h1, lead, body() }. h1 and lead match what the React page shows;
 * body() is the rest of that page's copy.
 */
const routes = {
  '/': {
    h1: hero.h1,
    lead: hero.lead,
    body: () => [
      `<ul>${hero.trust.map(item => `<li>${esc(item)}</li>`).join('')}${benefits.map(item => `<li><strong>${esc(item.title)}.</strong> ${esc(item.copy)}</li>`).join('')}</ul>`,
      servicesBlock(),
      compactPackagesBlock(),
      `<p>Questions on rights, cost, and timelines: <a href="/faq">read the full FAQ</a>.</p>`,
    ].join('\n'),
  },
  '/about': { h1: joinTitle(aboutPage), lead: aboutPage.lead, body: aboutBlock },
  '/services': { h1: servicesPage.title, lead: servicesPage.lead, body: servicesIndexBlock },
  '/pricing': {
    h1: pricingPage.title,
    lead: pricingPage.lead,
    body: () => [
      packagesBlock(),
      `<section>
  <h2>${esc(pricingPage.why.heading)}</h2>
  <p>${esc(pricingPage.why.lead)}</p>
  ${pricingPage.why.paragraphs.map(p => `<p>${esc(p)}</p>`).join('\n')}
  <h3>${esc(pricingPage.why.includedTitle)}</h3>
  ${list(pricingPage.why.included)}
  <h3>${esc(pricingPage.why.excludedTitle)}</h3>
  ${list(pricingPage.why.excluded)}
</section>`,
      `<p>${esc(pricingPage.note)}</p>\n<p>${esc(pricingPage.closing)}</p>`,
    ].join('\n'),
  },
  '/portfolio': { h1: joinTitle(portfolioPage), lead: portfolioPage.lead, body: portfolioBlock },
  '/blog': { h1: joinTitle(blogIndex), lead: blogIndex.lead, body: blogIndexBlock },
  '/contact': { h1: contactIntro.pageTitle, lead: null, body: contactBlock },
  '/faq': {
    h1: faqPage.title,
    lead: faqPage.lead,
    body: () => [faqBlock(faqPage.faqs, ''), sectionsBlock(faqPage.sections), linksBlock(faqPage.links)].join('\n'),
  },
  '/privacy': {
    h1: privacyPage.title,
    lead: privacyPage.lead,
    body: () => `<p>Last updated ${esc(privacyPage.updated)}.</p>\n${sectionsBlock(privacyPage.sections)}`,
  },
  '/editorial-policy': {
    h1: editorialPolicyPage.title,
    lead: editorialPolicyPage.lead,
    body: () => `<p>Last updated ${esc(editorialPolicyPage.updated)}.</p>\n${sectionsBlock(editorialPolicyPage.sections)}\n${linksBlock(editorialPolicyPage.links)}`,
  },
  '/authors/editorial-desk': {
    h1: editorialDeskPage.title,
    lead: editorialDeskPage.lead,
    body: () => `<p>Last updated ${esc(editorialDeskPage.updated)}.</p>\n${sectionsBlock(editorialDeskPage.sections)}\n${linksBlock(editorialDeskPage.links)}`,
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

function articleBylineHtml(post) {
  const meta = articleByline(post);
  const updated = meta.updated
    ? ` Updated <time datetime="${esc(meta.updatedDate || meta.date)}">${esc(meta.updated)}</time>.`
    : '';
  return `<p>Written by <a href="${esc(meta.href)}">${esc(meta.author)}</a>. Published <time datetime="${esc(meta.date)}">${esc(meta.published)}</time>.${updated} ${esc(meta.readTime)}</p>`;
}

function blogPostRoute(slug) {
  const post = blogPosts.find(item => item.slug === slug);
  if (!post) return null;
  return {
    h1: post.title,
    lead: post.lead || post.description,
    body: () => {
      const answer = quickAnswerFor(post);
      const quick = answer
        ? `<section data-speakable="1"><h2>Quick answer</h2><p>${esc(answer)}</p></section>`
        : '';
      const takeaways = articleTakeaways(post);
      const takeawayBlock = takeaways.length
        ? `<section><h2>Key takeaways</h2>${list(takeaways)}</section>`
        : '';
      const sections = articleSections(post).map(section => ({
        ...section,
        paragraphs: articleSectionParagraphs(post, section),
      }));
      const sources = articleSources(post.slug);
      const sourceBlock = sources.length
        ? `<section><h2>Primary sources</h2><ul>${sources.map(source => `<li><a href="${esc(source.href)}">${esc(source.label)}</a></li>`).join('')}</ul></section>`
        : '';
      return [
        quick,
        takeawayBlock,
        sectionsBlock(sections),
        sourceBlock,
        `<p>Publishing guides follow the <a href="/editorial-policy">ebookwriters.us editorial policy</a>.</p>`,
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
  const slug = path.startsWith('/blog/') ? path.slice('/blog/'.length) : '';
  const bookSlug = path.startsWith('/portfolio/') ? path.slice('/portfolio/'.length) : '';
  const book = bookSlug ? books.find(item => item.slug === bookSlug) : null;
  const post = slug ? blogPosts.find(item => item.slug === slug) : null;
  const route = routes[path]
    || (book && {
      h1: book.title,
      lead: book.summary,
      body: () => `<p>By ${esc(book.author)}. ${esc(book.genre)} ${esc(book.role).toLowerCase()}. ${esc(book.format)}.</p>${book.subtitle ? `<p>${esc(book.subtitle)}</p>` : ''}<p>${esc(book.detail)}</p><p><a href="${esc(book.amazonUrl)}">View ${esc(book.title)} on Amazon</a></p>`,
    })
    || (post && blogPostRoute(slug))
    || { h1: page.title.replace(/\s*[|—]\s*ebookwriters\.us$/, ''), lead: page.description, body: () => '' };

  const chunks = [
    `<main data-seo-crawl="1">`,
    nav(),
    `<h1>${esc(route.h1)}</h1>`,
    post ? articleBylineHtml(post) : '',
    route.lead ? `<p data-speakable="1">${inlineHtml(route.lead, esc)}</p>` : '',
    route.body(),
    `</main>`,
    footer(),
  ];
  return chunks.filter(Boolean).join('\n');
}
