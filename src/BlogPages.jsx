import React, { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { IconArrow } from './icons.jsx';
import { blogIndex, blogPosts, getPostBySlug } from './blogPosts.js';

const SITE = 'https://ebookwriters.us';
const OG_IMAGE = `${SITE}/assets/brand/hero-desk.jpg`;

function ensureMeta(selector, create) {
  let node = document.querySelector(selector);
  if (!node) {
    node = create();
    document.head.appendChild(node);
  }
  return node;
}

function setPageMeta({ title, description, path, type = 'article' }) {
  document.title = title;

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
    ['property', 'og:image', OG_IMAGE],
    ['name', 'twitter:title', title],
    ['name', 'twitter:description', description],
    ['name', 'twitter:image', OG_IMAGE],
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

function relatedPosts(post, limit = 3) {
  return blogPosts.filter(p => p.slug !== post.slug).slice(0, limit);
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
                <article className="blog-card">
                  <p className="blog-card-meta">
                    <span>{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={post.date}>{post.dateLabel}</time>
                  </p>
                  <h2>
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p>{post.description}</p>
                  <div className="blog-card-foot">
                    <span>{post.readTime}</span>
                    <Link className="blog-card-link" to={`/blog/${post.slug}`}>
                      Read article <IconArrow aria-hidden="true" />
                    </Link>
                  </div>
                </article>
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
  const related = post ? relatedPosts(post) : [];

  useEffect(() => {
    if (!post) return undefined;
    setPageMeta({
      title: `${post.title} | ebookwriters.us`,
      description: post.description,
      path: `/blog/${post.slug}`,
      type: 'article',
    });

    upsertJsonLd('blog-article-jsonld', {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      image: OG_IMAGE,
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
    <div className="blog-page">
      <article className="blog-article">
        <header className="blog-article-head">
          <div className="shell blog-article-head-inner">
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
            <p className="blog-card-meta">
              <span>{post.category}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.date}>{post.dateLabel}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readTime}</span>
            </p>
          </div>
        </header>

        <div className="shell blog-article-body">
          {post.sections.map(section => (
            <section key={section.heading} className="blog-section">
              <h2>{section.heading}</h2>
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

          <aside className="blog-cta-band">
            <h2>Ready for a clear quote?</h2>
            <p>
              Tell us your idea, target length, and timeline. We will come back with a fixed
              ebook writing package — no hourly surprises.
            </p>
            <Link className="cta cta-solid" to="/contact">
              <span>{post.cta}</span>
              <IconArrow className="cta-arrow" />
            </Link>
          </aside>

          {related.length ? (
            <section className="blog-related" aria-labelledby="related-title">
              <h2 id="related-title">Related guides</h2>
              <ul className="blog-related-grid">
                {related.map(item => (
                  <li key={item.slug}>
                    <Link to={`/blog/${item.slug}`}>
                      <span className="blog-related-cat">{item.category}</span>
                      <strong>{item.title}</strong>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <p className="blog-back">
            <Link to="/blog"><IconArrow className="blog-back-arrow" /> All articles</Link>
          </p>
        </div>
      </article>
    </div>
  );
}
