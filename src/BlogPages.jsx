import React, { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { IconArrow, IconArrowUpRight, IconMail, IconPhone } from './icons.jsx';
import { blogIndex, blogPosts, getPostBySlug } from './blogPosts.js';
import { siteContact, footerBrand } from './data.js';

const SITE = 'https://ebookwriters.us';

function setPageMeta({ title, description, path, type = 'article' }) {
  document.title = title;

  const ensure = (selector, create) => {
    let node = document.querySelector(selector);
    if (!node) {
      node = create();
      document.head.appendChild(node);
    }
    return node;
  };

  const desc = ensure('meta[name="description"]', () => {
    const el = document.createElement('meta');
    el.setAttribute('name', 'description');
    return el;
  });
  desc.setAttribute('content', description);

  const canonical = ensure('link[rel="canonical"]', () => {
    const el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    return el;
  });
  canonical.setAttribute('href', `${SITE}${path}`);

  const pairs = [
    ['property', 'og:title', title],
    ['property', 'og:description', description],
    ['property', 'og:url', `${SITE}${path}`],
    ['property', 'og:type', type],
    ['name', 'twitter:title', title],
    ['name', 'twitter:description', description],
  ];

  pairs.forEach(([attr, key, value]) => {
    const el = ensure(`meta[${attr}="${key}"]`, () => {
      const meta = document.createElement('meta');
      meta.setAttribute(attr, key);
      return meta;
    });
    el.setAttribute('content', value);
  });
}

function BlogChrome({ children }) {
  return (
    <div className="blog-page">
      <a className="skip-link" href="#blog-main">Skip to content</a>
      <header className="blog-top">
        <div className="shell blog-top-inner">
          <Link className="wordmark" to="/" aria-label="ebookwriters.us — home">
            <img
              src="/assets/brand/logo-dark.png"
              alt="ebookwriters.us — Write. Publish. Grow."
              width="970"
              height="189"
            />
          </Link>
          <nav className="blog-top-nav" aria-label="Blog">
            <Link to="/">Home</Link>
            <Link to="/blog">Blog</Link>
            <Link className="blog-top-cta" to="/contact">Start Your Project</Link>
          </nav>
        </div>
      </header>
      <main id="blog-main">{children}</main>
      <footer className="blog-foot">
        <div className="shell blog-foot-inner">
          <div>
            <p className="blog-foot-brand">ebookwriters.us</p>
            <p>{footerBrand.blurb}</p>
          </div>
          <div className="blog-foot-contact">
            <a href={`mailto:${siteContact.email}`}><IconMail /> {siteContact.email}</a>
            <a href={siteContact.phoneHref}><IconPhone /> {siteContact.phone}</a>
            <p>{siteContact.address}</p>
          </div>
          <Link className="blog-foot-home" to="/">
            Back to home <IconArrowUpRight />
          </Link>
        </div>
      </footer>
    </div>
  );
}

export function BlogIndexPage() {
  useEffect(() => {
    setPageMeta({
      title: 'Blog — Ebook Writing & Publishing Guides | ebookwriters.us',
      description: blogIndex.lead,
      path: '/blog',
      type: 'website',
    });
    window.scrollTo(0, 0);
  }, []);

  return (
    <BlogChrome>
      <section className="blog-hero">
        <div className="shell">
          <p className="eyebrow"><span>Blog</span><i aria-hidden="true" /></p>
          <h1>
            {blogIndex.title}
            <br />
            <em>{blogIndex.titleEm}</em>
          </h1>
          <p className="blog-hero-lead">{blogIndex.lead}</p>
        </div>
      </section>

      <section className="blog-list-section">
        <div className="shell">
          <ul className="blog-list">
            {blogPosts.map(post => (
              <li key={post.slug}>
                <article className="blog-card">
                  <p className="blog-card-meta">
                    <span>{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={post.date}>{post.dateLabel}</time>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                  </p>
                  <h2>
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p>{post.description}</p>
                  <Link className="blog-card-link" to={`/blog/${post.slug}`}>
                    Read article <IconArrow aria-hidden="true" />
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </BlogChrome>
  );
}

export function BlogPostPage() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  useEffect(() => {
    if (!post) return undefined;
    setPageMeta({
      title: `${post.title} | ebookwriters.us`,
      description: post.description,
      path: `/blog/${post.slug}`,
      type: 'article',
    });

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'blog-article-jsonld';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      author: { '@type': 'Organization', name: 'ebookwriters.us' },
      publisher: {
        '@type': 'Organization',
        name: 'ebookwriters.us',
        url: SITE,
      },
      mainEntityOfPage: `${SITE}/blog/${post.slug}`,
    });
    document.getElementById('blog-article-jsonld')?.remove();
    document.head.appendChild(script);
    window.scrollTo(0, 0);

    return () => {
      document.getElementById('blog-article-jsonld')?.remove();
    };
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <BlogChrome>
      <article className="blog-article">
        <header className="blog-article-head">
          <div className="shell blog-article-head-inner">
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

          <p className="blog-back">
            <Link to="/blog"><IconArrow className="blog-back-arrow" /> All articles</Link>
          </p>
        </div>
      </article>
    </BlogChrome>
  );
}
