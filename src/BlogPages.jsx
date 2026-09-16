import React, { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { IconArrow, IconCheck } from './icons.jsx';
import { PageHero } from './PageHero.jsx';
import {
  blogArticle,
  blogIndex,
  blogPosts,
  getNeighborPosts,
  getPostBySlug,
  getRelatedPosts,
  headingId,
} from './blogPosts.js';

function BlogCard({ post, heading: Heading = 'h2', index = null, featured = false }) {
  return (
    <article className={`blog-card blog-card--text${featured ? ' blog-card--featured' : ''}`}>
      <div className="blog-card-body">
        <div className="blog-card-top">
          {index != null ? (
            <span className="blog-card-index" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
          ) : null}
          <p className="blog-card-meta">
            <span className="blog-card-cat">{post.category}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{post.dateLabel}</time>
          </p>
        </div>
        <Heading>
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </Heading>
        <p className="blog-card-desc">{post.description}</p>
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
    window.scrollTo(0, 0);
  }, []);

  const [featured, ...rest] = blogPosts;

  return (
    <div className="blog-page">
      <PageHero
        eyebrow="Blog"
        title={blogIndex.title}
        titleEm={blogIndex.titleEm}
        lead={blogIndex.lead}
        image={blogIndex.heroImage}
        imageAlt={blogIndex.heroImageAlt}
        id="blog-index-title"
      />

      <section className="blog-list-section" aria-label="All articles">
        <div className="shell">
          <header className="blog-list-head">
            <p className="eyebrow"><span>Latest writing</span><i aria-hidden="true" /></p>
            <h2 className="blog-list-title">
              Guides from the <em>studio</em>
            </h2>
          </header>
          {featured ? (
            <div className="blog-featured">
              <BlogCard post={featured} featured index={0} />
            </div>
          ) : null}
          {rest.length > 0 ? (
            <ul className="blog-grid blog-grid--editorial">
              {rest.map((post, i) => (
                <li key={post.slug}>
                  <BlogCard post={post} index={i + 1} />
                </li>
              ))}
            </ul>
          ) : null}
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
    window.scrollTo(0, 0);
    return undefined;
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <div className="blog-page" key={post.slug}>
      <article className="blog-article">
        <header className="blog-article-head blog-article-head--solo">
          <div className="shell">
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
