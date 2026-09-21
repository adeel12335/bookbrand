import { blogArticle, blogIndex, blogPosts } from './blogPosts.js';
import { books, faqs, plans, portfolioPage } from './data.js';
import { coverPage, editingPage, editorialPolicyPage, faqPage, landers } from './pageContent.js';
import {
  DEFAULT_OG_ALT,
  DEFAULT_OG_PATH,
  SITE_EMAIL,
  SITE_NAME,
  SITE_ORIGIN,
  SITE_PHONE,
  SITE_SAME_AS,
  absoluteAsset,
  absoluteUrl,
} from './site.js';

export { SITE_ORIGIN, absoluteUrl, absoluteAsset } from './site.js';

const LASTMOD = '2026-09-21';
const DEFAULT_ROBOTS = 'index, follow, max-image-preview:large';
const ORG_LOGO = '/assets/brand/logo-dark.png';
const TITLE_MAX = 60;
const DESC_MAX = 160;
const TITLE_SUFFIX = ` | ${SITE_NAME}`;

function clipPlain(text, max) {
  const value = String(text || '').replace(/\s+/g, ' ').trim();
  if (value.length <= max) return value;
  const window = value.slice(0, max);
  const at = window.lastIndexOf(' ');
  const cut = (at > Math.floor(max * 0.55) ? window.slice(0, at) : window).trim();
  return cut.replace(/[.,;:–—\-\s]+$/g, '');
}

function organization() {
  return {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': `${SITE_ORIGIN}/#organization`,
    name: SITE_NAME,
    alternateName: 'Ebook Writers',
    url: absoluteUrl('/'),
    email: SITE_EMAIL,
    telephone: SITE_PHONE,
    image: absoluteAsset(DEFAULT_OG_PATH),
    logo: absoluteAsset(ORG_LOGO),
    priceRange: '$699 - $3,999',
    areaServed: { '@type': 'Country', name: 'United States' },
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'IA',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: SITE_EMAIL,
      telephone: SITE_PHONE,
      areaServed: 'US',
      availableLanguage: 'English',
    },
    knowsAbout: [
      'Ebook ghostwriting',
      'Amazon KDP publishing',
      'Book editing',
      'Ebook cover design',
    ],
    ...(SITE_SAME_AS.length ? { sameAs: SITE_SAME_AS } : {}),
  };
}

function editorialPerson() {
  return {
    '@type': 'Person',
    '@id': `${SITE_ORIGIN}/#editorial`,
    name: blogArticle.authorRole,
    jobTitle: 'Editorial desk',
    url: absoluteUrl('/about'),
    worksFor: { '@id': `${SITE_ORIGIN}/#organization` },
  };
}

function webSite() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: absoluteUrl('/'),
    description: 'Professional ebook writers and ghostwriting studio for writing, editing, design, and publishing.',
    publisher: { '@id': `${SITE_ORIGIN}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_ORIGIN}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

function breadcrumbs(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

function serviceSchema({ name, description, path }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: absoluteUrl(path),
    provider: organization(),
    areaServed: { '@type': 'Country', name: 'United States' },
  };
}

function webPageSchema({ type = 'WebPage', name, description, path, speakable = false }) {
  const node = {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: absoluteUrl('/') },
  };
  if (speakable) {
    node.speakable = {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '[data-speakable]', '.br_quick'],
    };
  }
  return node;
}

function faqPageSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

function stripRich(text) {
  return String(text || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\*\*/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function faqsFromMarkdownBlocks(blocks) {
  const faqs = [];
  const blob = (blocks || []).join('\n');
  for (const part of blob.split(/###\s+/).slice(1)) {
    const nl = part.search(/\r?\n/);
    const q = stripRich(nl === -1 ? part : part.slice(0, nl));
    const a = stripRich(nl === -1 ? '' : part.slice(nl + 1));
    if (!q.endsWith('?') || q.length > 140 || a.length < 40) continue;
    faqs.push({ q, a: a.slice(0, 500) });
  }
  return faqs;
}

function extractPostFaqs(post) {
  if (Array.isArray(post.faqs) && post.faqs.length) return post.faqs.slice(0, 8);
  const sections = post.sections || [];
  const named = sections.filter(section => /faq/i.test(section.heading || ''));
  const target = named.length ? named : sections;
  const faqs = [];
  for (const section of target) {
    faqs.push(...faqsFromMarkdownBlocks([...(section.paragraphs || []), ...(section.bullets || [])]));
  }
  return faqs.slice(0, 8);
}

function pricingOfferSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Ebook writing and ghostwriting packages',
    description:
      'Fixed ebook writing packages from $699 to $3,999 including writing, editing, cover design, and retailer-ready files.',
    provider: organization(),
    url: absoluteUrl('/pricing'),
    areaServed: { '@type': 'Country', name: 'United States' },
    offers: {
      '@type': 'AggregateOffer',
      url: absoluteUrl('/pricing'),
      priceCurrency: 'USD',
      lowPrice: '699',
      highPrice: '3999',
      offerCount: String(plans.length),
      availability: 'https://schema.org/InStock',
      offers: plans.map(plan => ({
        '@type': 'Offer',
        name: `${plan.name} package`,
        price: plan.price.replace(',', ''),
        priceCurrency: 'USD',
        description: `${plan.words}. ${plan.copy}`,
        url: absoluteUrl('/pricing'),
        availability: 'https://schema.org/InStock',
      })),
    },
  };
}

function page({
  path,
  title,
  description,
  image = DEFAULT_OG_PATH,
  imageAlt = DEFAULT_OG_ALT,
  type = 'website',
  robots = DEFAULT_ROBOTS,
  changefreq = 'monthly',
  priority = 0.7,
  lastmod = LASTMOD,
  sitemap = true,
  jsonLd = [],
}) {
  return {
    path,
    title: clipPlain(title, TITLE_MAX),
    description: clipPlain(description, DESC_MAX),
    image,
    imageAlt,
    type,
    robots,
    changefreq,
    priority,
    lastmod,
    sitemap,
    jsonLd,
  };
}

const staticPages = [
  page({
    path: '/',
    title: 'Ebook Writers & Ghostwriting | ebookwriters.us',
    description:
      'Hire ebook writers and ghostwriters for writing, editing, cover design, and KDP publishing. Packages from $699. You keep 100% of the rights.',
    changefreq: 'weekly',
    priority: 1,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        ...organization(),
        description:
          'Professional ebook writing, ghostwriting, editing, cover design, formatting, and KDP publishing support for experts, entrepreneurs, and aspiring authors.',
        slogan: 'Write. Publish. Grow.',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Ebook writing and publishing services',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Ebook & Book Ghostwriting' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Editing & Proofreading' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cover Design' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Publishing & Formatting' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'ISBN & Copyright Support' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Book Marketing' } },
          ],
        },
      },
      webPageSchema({
        name: 'Ebook Writers and Ghostwriting Studio',
        description:
          'Hire ebook writers and ghostwriters for writing, editing, cover design, and KDP publishing. Packages from $699.',
        path: '/',
        speakable: true,
      }),
      webSite(),
    ],
  }),
  page({
    path: '/contact',
    title: 'Contact for a Book Quote | ebookwriters.us',
    description:
      'Contact ebookwriters.us for a fixed ebook writing or ghostwriting quote. Email info@ebookwriters.us or call +1 712-414-0542. Iowa, USA.',
    image: '/assets/brand/contact-consultation-v2.webp',
    imageAlt: 'Author consultation — notebook and publishing notes on a warm desk',
    changefreq: 'monthly',
    priority: 0.9,
    jsonLd: [
      webPageSchema({
        type: 'ContactPage',
        name: 'Contact — Book Writing Quote',
        description:
          'Request a fixed ebook writing or ghostwriting quote from ebookwriters.us.',
        path: '/contact',
      }),
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'Contact', path: '/contact' },
      ]),
    ],
  }),
  page({
    path: '/portfolio',
    title: portfolioPage.metaTitle,
    description: portfolioPage.metaDescription,
    image: '/assets/brand/portfolio-hero-bg.png',
    imageAlt: portfolioPage.heroImageAlt,
    changefreq: 'weekly',
    priority: 0.8,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: portfolioPage.metaTitle,
        description: portfolioPage.metaDescription,
        url: absoluteUrl('/portfolio'),
        isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: absoluteUrl('/') },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: books.map((book, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: `${book.title} by ${book.author}`,
          })),
        },
      },
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'Portfolio', path: '/portfolio' },
      ]),
    ],
  }),
  page({
    path: '/blog',
    title: blogIndex.metaTitle,
    description: blogIndex.metaDescription,
    image: '/assets/brand/faq-editorial-v2.webp',
    changefreq: 'weekly',
    priority: 0.8,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'ebookwriters.us Blog',
        description: blogIndex.metaDescription,
        url: absoluteUrl('/blog'),
        publisher: organization(),
      },
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
      ]),
    ],
  }),
  page({
    path: '/about',
    title: 'About the Writing Studio | ebookwriters.us',
    description:
      'ebookwriters.us is an Iowa ebook writing studio. Genre-matched writers named after NDA, 100% author ownership, and fixed packages through KDP publishing.',
    priority: 0.8,
    jsonLd: [
      webPageSchema({
        type: 'AboutPage',
        name: 'About Our Ebook Writing Studio',
        description:
          'Meet the ebookwriters.us studio — ghostwriting, editing, design, and KDP publishing under one roof.',
        path: '/about',
      }),
      {
        '@context': 'https://schema.org',
        ...editorialPerson(),
      },
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
      ]),
    ],
  }),
  page({
    path: '/pricing',
    title: 'Ebook Writing Packages from $699 | ebookwriters.us',
    description:
      'Fixed ebook writing and ghostwriting packages from $699 to $3,999. Writing, editing, cover design, and retailer-ready files included. Get a quote on /contact.',
    priority: 0.9,
    jsonLd: [
      webPageSchema({
        name: 'Ebook Writing Packages from $699',
        description:
          'Transparent ghostwriting packages with editing, cover design, and KDP-ready files.',
        path: '/pricing',
        speakable: true,
      }),
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'Pricing', path: '/pricing' },
      ]),
      pricingOfferSchema(),
    ],
  }),
  page({
    path: '/privacy',
    title: 'Privacy Policy | ebookwriters.us',
    description:
      'How ebookwriters.us collects, uses, and protects information when you browse the site or request an ebook writing quote.',
    priority: 0.3,
    changefreq: 'yearly',
    jsonLd: [
      webPageSchema({
        name: 'Privacy Policy',
        description: 'Privacy policy for ebookwriters.us.',
        path: '/privacy',
      }),
    ],
  }),
  page({
    path: '/editorial-policy',
    title: 'Editorial Policy | ebookwriters.us',
    description: editorialPolicyPage.lead,
    image: editorialPolicyPage.heroImage,
    priority: 0.5,
    changefreq: 'yearly',
    jsonLd: [
      webPageSchema({
        name: 'Editorial Policy',
        description: editorialPolicyPage.lead,
        path: '/editorial-policy',
      }),
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'Editorial Policy', path: '/editorial-policy' },
      ]),
    ],
  }),
  page({
    path: '/terms',
    title: 'Terms of Service | ebookwriters.us',
    description:
      'Terms for using ebookwriters.us, requesting a quote, and working with our ebook writing and ghostwriting studio.',
    priority: 0.3,
    changefreq: 'yearly',
    jsonLd: [
      webPageSchema({
        name: 'Terms of Service',
        description: 'Terms of service for ebookwriters.us.',
        path: '/terms',
      }),
    ],
  }),
  page({
    path: '/services',
    title: 'Ebook Writing & Publishing Services | ebookwriters.us',
    description:
      'Ghostwriting, editing, cover design, Amazon KDP formatting, ISBN support, and book marketing — one studio from outline to published ebook.',
    priority: 0.9,
    jsonLd: [
      webPageSchema({
        name: 'Ebook Writing, Editing & Publishing Services',
        description: 'Full-service ebook writing and publishing support.',
        path: '/services',
      }),
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
      ]),
    ],
  }),
  page({
    path: '/ebook-ghostwriting-services',
    title: 'Ebook Ghostwriting Services | ebookwriters.us',
    description:
      'Hire ebook ghostwriters on a fixed fee. Outline to manuscript, revisions, NDA, and 100% ownership. Packages from $699.',
    priority: 0.9,
    jsonLd: [
      serviceSchema({
        name: 'Ebook Ghostwriting Services',
        description:
          'Ghostwriters who research, outline, and write your ebook in your voice, with NDA and full rights transfer.',
        path: '/ebook-ghostwriting-services',
      }),
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Ebook Ghostwriting', path: '/ebook-ghostwriting-services' },
      ]),
      faqPageSchema(landers.ghostwriting.faqs),
    ],
  }),
  page({
    path: '/hire-ebook-writer',
    title: 'Hire an Ebook Writer | ebookwriters.us',
    description:
      'Hire an ebook writer for a fixed-fee manuscript — not hourly guesswork. Matched genre specialists, revision rounds, and KDP-ready files. Packages from $699.',
    priority: 0.9,
    jsonLd: [
      serviceSchema({
        name: 'Hire an Ebook Writer',
        description:
          'Hire a professional ebook writer with a fixed quote, dated schedule, and 100% author ownership.',
        path: '/hire-ebook-writer',
      }),
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Hire an Ebook Writer', path: '/hire-ebook-writer' },
      ]),
      faqPageSchema(landers.hire.faqs),
    ],
  }),
  page({
    path: '/amazon-kdp-ebook-writing',
    title: 'Amazon KDP Ebook Writing | ebookwriters.us',
    description:
      'Amazon KDP ebook writing, formatting, categories, and publishing setup. Manuscript through retailer-ready files. You keep the KDP account and 100% of royalties.',
    priority: 0.9,
    jsonLd: [
      serviceSchema({
        name: 'Amazon KDP Ebook Writing and Publishing',
        description:
          'Write, format, and publish an ebook on Amazon KDP with category research, metadata, and retailer-ready files.',
        path: '/amazon-kdp-ebook-writing',
      }),
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Amazon KDP Publishing', path: '/amazon-kdp-ebook-writing' },
      ]),
      faqPageSchema(landers.kdp.faqs),
    ],
  }),
  page({
    path: '/ebook-editing-services',
    title: 'Ebook Editing Services | ebookwriters.us',
    description:
      editingPage.lead,
    priority: 0.9,
    jsonLd: [
      serviceSchema({
        name: 'Ebook Editing Services',
        description: editingPage.lead,
        path: '/ebook-editing-services',
      }),
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Ebook Editing', path: '/ebook-editing-services' },
      ]),
      faqPageSchema(editingPage.faqs),
    ],
  }),
  page({
    path: '/ebook-cover-design',
    title: 'Ebook Cover Design | ebookwriters.us',
    description: coverPage.lead,
    priority: 0.9,
    jsonLd: [
      serviceSchema({
        name: 'Ebook Cover Design',
        description: coverPage.lead,
        path: '/ebook-cover-design',
      }),
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Ebook Cover Design', path: '/ebook-cover-design' },
      ]),
      faqPageSchema(coverPage.faqs),
    ],
  }),
  page({
    path: '/faq',
    title: 'Ebook Writing FAQ | ebookwriters.us',
    description: faqPage.lead,
    priority: 0.8,
    changefreq: 'monthly',
    jsonLd: [
      webPageSchema({
        name: 'Ebook Writing and Publishing FAQ',
        description: faqPage.lead,
        path: '/faq',
        speakable: true,
      }),
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'FAQ', path: '/faq' },
      ]),
      faqPageSchema(faqs),
    ],
  }),
  page({
    path: '/search',
    title: 'Search | ebookwriters.us',
    description: 'Search ebookwriters.us for services, pricing, articles, and answers about ebook writing and publishing.',
    robots: 'noindex, follow',
    sitemap: false,
    jsonLd: [],
  }),
  // The admin panel is a real prerendered file rather than a rewrite: with
  // cleanUrls on, a rewrite to /index.html never resolved and /admin 404ed.
  // A file also lets the served HTML carry its own noindex instead of the
  // home page's meta.
  page({
    path: '/admin',
    title: 'Studio admin — ebookwriters.us',
    description: 'Private studio tools.',
    robots: 'noindex, nofollow',
    sitemap: false,
    jsonLd: [],
  }),
];

/**
 * A search title must be a complete phrase — a search engine cannot expand
 * "A Practical…" back into the headline. Keep the brand suffix while it fits,
 * drop it before cutting words, use the lead clause when that is shorter, and
 * only then clip on a word boundary so the tag never exceeds TITLE_MAX.
 */
export function articleTitle(headline) {
  const title = headline.trim();
  const fit = text => (
    text.length + TITLE_SUFFIX.length <= TITLE_MAX ? `${text}${TITLE_SUFFIX}`
      : text.length <= TITLE_MAX ? text
        : null
  );
  const whole = fit(title);
  if (whole) return whole;
  const lead = title.split(/(?<=\?)\s|:\s|\s[—–]\s|\s\(/)[0].trim();
  if (lead !== title && lead.length >= 20) {
    const fitted = fit(lead);
    if (fitted) return fitted;
  }
  const shortened = title.replace(/\s+(that|which|without)\s+.+$/i, '').trim();
  if (shortened !== title && shortened.length >= 20) {
    const fitted = fit(shortened);
    if (fitted) return fitted;
  }
  return clipPlain(title, TITLE_MAX);
}

function blogPostPage(post) {
  const description = clipPlain(post.description, DESC_MAX);
  const postFaqs = extractPostFaqs(post);
  return page({
    path: `/blog/${post.slug}`,
    title: articleTitle(post.title),
    description,
    image: post.image || '/assets/brand/faq-editorial-v2.webp',
    imageAlt: post.imageAlt || DEFAULT_OG_ALT,
    type: 'article',
    changefreq: 'monthly',
    priority: 0.7,
    lastmod: post.date || LASTMOD,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description,
        datePublished: post.date,
        dateModified: post.date,
        image: absoluteAsset(post.image || '/assets/brand/faq-editorial-v2.webp'),
        author: editorialPerson(),
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME,
          url: absoluteUrl('/'),
          logo: {
            '@type': 'ImageObject',
            url: absoluteAsset(ORG_LOGO),
          },
        },
        mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
        keywords: post.keywords?.join(', '),
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', '[data-speakable]', '.br_quick'],
        },
      },
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: post.title, path: `/blog/${post.slug}` },
      ]),
      ...(postFaqs.length ? [faqPageSchema(postFaqs)] : []),
    ],
  });
}

export const notFoundSeo = page({
  path: '/404',
  title: 'Page not found | ebookwriters.us',
  description: 'That URL is not a page on ebookwriters.us. Try services, pricing, or contact.',
  robots: 'noindex, follow',
  sitemap: false,
  jsonLd: [],
});

const byPath = new Map(staticPages.map(item => [item.path, item]));

export function normalizePath(pathname) {
  if (!pathname) return '/';
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

export function resolveSeo(pathname) {
  const path = normalizePath(pathname);
  if (byPath.has(path)) return byPath.get(path);
  if (path.startsWith('/blog/')) {
    const slug = path.slice('/blog/'.length);
    const post = blogPosts.find(item => item.slug === slug);
    if (post) return blogPostPage(post);
  }
  return notFoundSeo;
}

export function getPrerenderPages() {
  return [...staticPages, ...blogPosts.map(blogPostPage), notFoundSeo];
}

export function getSitemapEntries() {
  return getPrerenderPages()
    .filter(item => item.sitemap)
    .map(item => ({
      loc: absoluteUrl(item.path),
      lastmod: item.lastmod,
      changefreq: item.changefreq,
      priority: item.priority,
    }));
}
