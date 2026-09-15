import React, { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { IconArrow, IconCheck } from './icons.jsx';
import {
  blogArticle,
  blogIndex,
  blogPosts,
  getNeighborPosts,
  getPostBySlug,
  getRelatedPosts,
  headingId,
} from './blogPosts.js';

const SITE = 'https://ebookwriters.us';
const FALLBACK_OG = `${SITE}/assets/brand/faq-editorial-v2.png`;

function ensureMeta(selector, create) {
  let node = document.querySelector(selector);
  if (!node) {
    node = create();
    document.head.appendChild(node);
  }
  return node;
}

function setPageMeta({ title, description, path, type = 'article', image }) {
  document.title = title;
  const ogImage = image ? `${SITE}${image}` : FALLBACK_OG;

  ensureMeta('meta[name="description"]', () => {
    const el = document.createElement('meta');
    el.setAttribute('name', 'description');
    return el;
  }).setAttribute('content', description);

  ensureMeta('link[rel="canonical"]', () => {
    const el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    return el;
  }).setAttribute('href', `${SITE}${path}`);

  const pairs = [
    ['property', 'og:title', title],
    ['property', 'og:description', description],
    ['property', 'og:url', `${SITE}${path}`],
    ['property', 'og:type', type],
    ['property', 'og:image', ogImage],
    ['name', 'twitter:title', title],
    ['name', 'twitter:description', description],
    ['name', 'twitter:image', ogImage],
    ['name', 'twitter:card', 'summary_large_image'],
  ];

  pairs.forEach(([attr, key, value]) => {
    ensureMeta(`meta[${attr}="${key}"]`, () => {
      const meta = document.createElement('meta');
      meta.setAttribute(attr, key);
      return meta;
    }).setAttribute('content', value);
  });
}

function upsertJsonLd(id, data) {
  document.getElementById(id)?.remove();
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = id;
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
}

function BlogCard({ post, heading: Heading = 'h2' }) {
  return (
    <article className="blog-card">
      {post.image ? (
        <Link className="blog-card-media" to={`/blog/${post.slug}`} tabIndex={-1} aria-hidden="true">
          <img src={post.image} alt="" width="720" height="450" loading="lazy" />
        </Link>
      ) : null}
      <div className="blog-card-body">
        <p className="blog-card-meta">
          <span>{post.category}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.date}>{post.dateLabel}</time>
        </p>
        <Heading>
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </Heading>
        <p>{post.description}</p>
        <div className="blog-card-foot">
          <span>{post.readTime}</span>
          <Link className="blog-card-link" to={`/blog/${post.slug}`}>
            Read article <IconArrow aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function BlogIndexPage() {
  useEffect(() => {
    setPageMeta({
      title: blogIndex.metaTitle,
      description: blogIndex.metaDescription,
      path: '/blog',
      type: 'website',
    });

    upsertJsonLd('blog-index-jsonld', {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'ebookwriters.us Blog',
      description: blogIndex.metaDescription,
      url: `${SITE}/blog`,
      publisher: {
        '@type': 'Organization',
        name: 'ebookwriters.us',
        url: SITE,
      },
      blogPost: blogPosts.map(post => ({
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        url: `${SITE}/blog/${post.slug}`,
        image: post.image ? `${SITE}${post.image}` : undefined,
      })),
    });

    upsertJsonLd('blog-breadcrumb-jsonld', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
      ],
    });

    window.scrollTo(0, 0);
    return () => {
      document.getElementById('blog-index-jsonld')?.remove();
      document.getElementById('blog-breadcrumb-jsonld')?.remove();
    };
  }, []);

  return (
    <div className="blog-page">
      <section className="blog-hero" aria-labelledby="blog-index-title">
        <div className="shell">
          <p className="eyebrow"><span>Blog</span><i aria-hidden="true" /></p>
          <h1 id="blog-index-title">
            {blogIndex.title}
            <br />
            <em>{blogIndex.titleEm}</em>
          </h1>
          <p className="blog-hero-lead">{blogIndex.lead}</p>
        </div>
      </section>

      <section className="blog-list-section" aria-label="All articles">
        <div className="shell">
          <ul className="blog-grid">
            {blogPosts.map(post => (
              <li key={post.slug}>
                <BlogCard post={post} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export function BlogPostPage() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  const related = post ? getRelatedPosts(post) : [];
  const neighbors = post ? getNeighborPosts(post) : { newer: null, older: null };

  useEffect(() => {
    if (!post) return undefined;
    setPageMeta({
      title: `${post.title} | ebookwriters.us`,
      description: post.description,
      path: `/blog/${post.slug}`,
      type: 'article',
      image: post.image,
    });

    upsertJsonLd('blog-article-jsonld', {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      image: post.image ? `${SITE}${post.image}` : FALLBACK_OG,
      author: { '@type': 'Organization', name: 'ebookwriters.us', url: SITE },
      publisher: {
        '@type': 'Organization',
        name: 'ebookwriters.us',
        url: SITE,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE}/assets/brand/logo-dark.png`,
        },
      },
      mainEntityOfPage: `${SITE}/blog/${post.slug}`,
      keywords: post.keywords?.join(', '),
    });

    upsertJsonLd('blog-breadcrumb-jsonld', {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
        {
          '@type': 'ListItem',
          position: 3,
          name: post.title,
          item: `${SITE}/blog/${post.slug}`,
        },
      ],
    });

    window.scrollTo(0, 0);
    return () => {
      document.getElementById('blog-article-jsonld')?.remove();
      document.getElementById('blog-breadcrumb-jsonld')?.remove();
    };
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <div className="blog-page" key={post.slug}>
      <article className="blog-article">
        <header className="blog-article-head">
          <div className="shell blog-article-head-grid">
            <div className="blog-article-copy">
              <nav className="blog-crumbs" aria-label="Breadcrumb">
                <Link to="/">Home</Link>
                <span aria-hidden="true">/</span>
                <Link to="/blog">Blog</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">{post.category}</span>
              </nav>
              <p className="eyebrow"><span>{post.eyebrow}</span><i aria-hidden="true" /></p>
              <h1>{post.title}</h1>
              <p className="blog-article-lead">{post.lead}</p>
              <p className="blog-article-meta">
                <span>{blogArticle.authorRole}</span>
                <span aria-hidden="true">·</span>
                <span>{post.category}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={post.date}>{post.dateLabel}</time>
                <span aria-hidden="true">·</span>
                <span>{post.readTime}</span>
              </p>
            </div>
            {post.image ? (
              <figure className="blog-article-photo">
                <img
                  src={post.image}
                  alt={post.imageAlt || ''}
                  width="960"
                  height="720"
                  fetchPriority="high"
                  decoding="async"
                />
              </figure>
            ) : null}
          </div>
        </header>

        <div className="shell blog-article-layout">
          <aside className="blog-toc" aria-label={blogArticle.tocLabel}>
            <p className="blog-toc-label">{blogArticle.tocLabel}</p>
            <ol>
              {post.sections.map((section, index) => (
                <li key={section.heading}>
                  <a href={`#${headingId(section.heading)}`}>
                    <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <div className="blog-article-body">
            {post.takeaways?.length ? (
              <div className="blog-takeaways">
                <p className="blog-takeaways-label">{blogArticle.takeawaysLabel}</p>
                <ul>
                  {post.takeaways.map(item => (
                    <li key={item}>
                      <IconCheck className="tick" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {post.sections.map((section, index) => (
              <section
                key={section.heading}
                id={headingId(section.heading)}
                className="blog-section"
              >
                <h2>
                  <span className="blog-section-n" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {section.heading}
                </h2>
                {section.paragraphs.map(paragraph => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
                {section.bullets ? (
                  <ul>
                    {section.bullets.map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            {(neighbors.older || neighbors.newer) ? (
              <nav className="blog-pager" aria-label="More articles">
                {neighbors.older ? (
                  <Link className="blog-pager-item" to={`/blog/${neighbors.older.slug}`}>
                    <span>{blogArticle.prevLabel}</span>
                    <strong>{neighbors.older.title}</strong>
                  </Link>
                ) : null}
                {neighbors.newer ? (
                  <Link className="blog-pager-item blog-pager-item--next" to={`/blog/${neighbors.newer.slug}`}>
                    <span>{blogArticle.nextLabel}</span>
                    <strong>{neighbors.newer.title}</strong>
                  </Link>
                ) : null}
              </nav>
            ) : null}
          </div>
        </div>
      </article>

      <section className="blog-close" aria-labelledby="blog-close-title">
        <div className="shell blog-close-inner">
          <p className="eyebrow eyebrow-light"><span>{blogArticle.ctaEyebrow}</span><i aria-hidden="true" /></p>
          <h2 id="blog-close-title">
            {blogArticle.ctaTitle}
            {' '}
            <em>{blogArticle.ctaTitleEm}</em>
          </h2>
          <p>{blogArticle.ctaLead}</p>
          <Link className="cta cta-solid" to="/contact">
            <span>{post.cta}</span>
            <IconArrow className="cta-arrow" />
          </Link>
        </div>
      </section>

      {related.length ? (
        <section className="blog-related" aria-labelledby="related-title">
          <div className="shell">
            <header className="blog-related-head">
              <p className="eyebrow"><span>{blogArticle.relatedEyebrow}</span><i aria-hidden="true" /></p>
              <h2 id="related-title">
                {blogArticle.relatedTitle} <em>{blogArticle.relatedTitleEm}</em>
              </h2>
              <p>{blogArticle.relatedLead}</p>
            </header>
            <ul className="blog-grid">
              {related.map(item => (
                <li key={item.slug}>
                  <BlogCard post={item} heading="h3" />
                </li>
              ))}
            </ul>
            <p className="blog-back">
              <Link to="/blog">
                <IconArrow className="blog-back-arrow" /> {blogArticle.allArticles}
              </Link>
            </p>
          </div>
        </section>
      ) : null}
    </div>
  );
}
