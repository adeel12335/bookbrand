import React, { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { IconBook, IconCheck } from './icons.jsx';
import {
  blogArticle,
  blogIndex,
  blogPosts,
  getPostBySlug,
  headingId,
} from './blogPosts.js';

const STEP = 4;

export function BlogIndexPage() {
  const [draft, setDraft] = useState('');
  const [query, setQuery] = useState('');
  const [count, setCount] = useState(STEP);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [featured, ...rest] = blogPosts;

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const pool = query ? blogPosts : rest;
    if (!terms.length) return pool;
    return pool.filter(post => {
      const haystack = [post.title, post.description, post.category, ...(post.keywords || [])]
        .join(' ')
        .toLowerCase();
      return terms.every(term => haystack.includes(term));
    });
  }, [query, rest]);

  const visible = results.slice(0, count);

  function handleSearch(event) {
    event.preventDefault();
    setQuery(draft.trim());
    setCount(STEP);
  }

  function clearSearch() {
    setDraft('');
    setQuery('');
    setCount(STEP);
  }

  return (
    <div className="blog-page">
      <section className="br_page_hero br_page_hero--split" aria-labelledby="blog-index-title">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="br_page_hero_content">
                <h1 id="blog-index-title" className="br-primary-heading">
                  {blogIndex.title} <span>{blogIndex.titleEm}</span>
                </h1>
                <span className="br_hero_rule" aria-hidden="true" />
                <p>{blogIndex.lead}</p>
              </div>
            </div>
            <div className="col-md-6">
              <figure className="br_hero_media">
                <img src={blogIndex.heroImage} alt={blogIndex.heroImageAlt} />
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section className="br_section br_all_posts" aria-label="All articles">
        <div className="container">
          {!query && featured ? (
            <div className="row">
              <div className="col-md-12">
                <Link className="br_featured" to={`/blog/${featured.slug}`}>
                  <div className="br_featured_copy">
                    <p className="br-eyebrow">Featured guide</p>
                    <h2>{featured.title}</h2>
                    <p>{featured.description}</p>
                    <ul className="br_post_tags">
                      <li>{featured.category}</li>
                      <li>{featured.readTime}</li>
                    </ul>
                  </div>
                  {featured.image ? (
                    <div className="br_featured_media">
                      <img
                        src={featured.image}
                        alt={featured.imageAlt || featured.title}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ) : null}
                </Link>
              </div>
            </div>
          ) : null}

          <div className="row">
            <div className="col-md-8 br_all_posts_intro">
              <h2 className="br_heading_icon">
                <IconBook aria-hidden="true" />
                Our Guide
              </h2>
              <p>{blogIndex.lead}</p>
            </div>
          </div>

          <hr className="br_separator" />

          <div className="row">
            <div className="col-md-3">
              <aside className="br_sidebar">
                <h3 className="br_sidebar_eyebrow">Search</h3>
                <form className="br_sidebar_search" role="search" onSubmit={handleSearch}>
                  <label className="sr-only" htmlFor="blog-search">Search articles</label>
                  <input
                    id="blog-search"
                    type="search"
                    name="k"
                    value={draft}
                    onChange={event => setDraft(event.target.value)}
                    placeholder="Search..."
                    autoComplete="off"
                  />
                  <button type="submit">Go</button>
                </form>
                {query ? (
                  <button type="button" className="br_sidebar_clear" onClick={clearSearch}>
                    Clear search
                  </button>
                ) : null}
              </aside>
            </div>

            <div className="col-md-9">
              {query ? (
                <p className="br_posts_count" role="status">
                  {results.length
                    ? `${results.length} article${results.length === 1 ? '' : 's'} for “${query}”`
                    : `No articles match “${query}”.`}
                </p>
              ) : null}

              <div className="row br_grid">
                {visible.map(post => (
                  <article className="col-md-6" key={post.slug}>
                    <Link className="br_post_link" to={`/blog/${post.slug}`}>
                      {post.image ? (
                        <img
                          className="br_post_thumb"
                          src={post.image}
                          alt={post.imageAlt || post.title}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : null}
                      <ul className="br_post_tags">
                        <li>{post.category}</li>
                      </ul>
                      <h3>{post.title}</h3>
                      <p>{post.description}</p>
                      <time dateTime={post.date}>{post.dateLabel}</time>
                    </Link>
                  </article>
                ))}
              </div>

              {visible.length < results.length ? (
                <div className="br_posts_more">
                  <button type="button" className="btn-outline br_load_more" onClick={() => setCount(n => n + STEP)}>
                    Load More
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function RichText({ text }) {
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : <React.Fragment key={i}>{part}</React.Fragment>
  );
}

export function BlogPostPage() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  const latest = blogPosts.filter(item => item.slug !== slug).slice(0, 3);

  useEffect(() => {
    if (!post) return undefined;
    window.scrollTo(0, 0);
    return undefined;
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <div className="br_post_page" key={post.slug}>
      <section className="br_post_banner" aria-labelledby="post-title">
        <div className="container">
          <div className="row">
            <div className="col-md-10">
              <nav className="br_post_crumbs" aria-label="Breadcrumb">
                <Link to="/">Home</Link>
                <span aria-hidden="true">/</span>
                <Link to="/blog">Blog</Link>
              </nav>
              <p className="br-eyebrow br-eyebrow-light">{post.category}</p>
              <h1 id="post-title" className="br-primary-heading">{post.title}</h1>
              <p className="br_post_intro"><RichText text={post.description} /></p>
              <p className="br_post_meta">
                <time dateTime={post.date}>{post.dateLabel}</time>
                <span aria-hidden="true">·</span>
                <span>{post.readTime}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="br_section br_post_body">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <aside className="br_sidebar" aria-label={blogArticle.tocLabel}>
                <h2 className="br_sidebar_eyebrow">{blogArticle.tocLabel}</h2>
                <ol className="br_post_toc">
                  {post.sections.map((section, index) => (
                    <li key={section.heading}>
                      <a href={`#${headingId(section.heading)}`}>
                        <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ol>
                <Link className="btn-outline br_sidebar_cta" to="/contact">Get a quote</Link>
              </aside>
            </div>

            <div className="col-md-9 br_col_post_content">
              <div className="br_wrapper_post_content">
                <div className="br_block br_text_block">
                  <p className="br_post_lead"><RichText text={post.lead} /></p>
                </div>

                {post.takeaways?.length ? (
                  <div className="br_block br_border_top">
                    <h4>{blogArticle.takeawaysLabel}</h4>
                    <ul className="br_duo_list">
                      {post.takeaways.map(item => (
                        <li key={item}>
                          <IconCheck aria-hidden="true" />
                          <RichText text={item} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {post.sections.map(section => (
                  <div
                    className="br_block br_border_top br_text_block"
                    id={headingId(section.heading)}
                    key={section.heading}
                  >
                    <h2>{section.heading}</h2>
                    {section.paragraphs.map(paragraph => (
                      <p key={paragraph.slice(0, 48)}><RichText text={paragraph} /></p>
                    ))}
                    {section.bullets?.length ? (
                      <ul>
                        {section.bullets.map(item => (
                          <li key={item}><RichText text={item} /></li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}

                <div className="br_block br_border_top br_post_cta">
                  <h4>{blogArticle.ctaTitle} {blogArticle.ctaTitleEm}</h4>
                  <p>{blogArticle.ctaLead}</p>
                  <Link className="btn" to="/contact">{post.cta}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {latest.length ? (
        <section className="br_section br_section--paper" aria-labelledby="latest-posts-title">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="br_section_head">
                  <div className="br_section_head_copy">
                    <p className="br-eyebrow">{blogArticle.relatedEyebrow}</p>
                    <h2 id="latest-posts-title">Latest guides</h2>
                  </div>
                  <Link className="btn" to="/blog">{blogArticle.allArticles}</Link>
                </div>
              </div>
            </div>
            <div className="row br_grid">
              {latest.map(item => (
                <article className="col-md-4" key={item.slug}>
                  <Link className="br_post_link" to={`/blog/${item.slug}`}>
                    {item.image ? (
                      <img
                        className="br_post_thumb"
                        src={item.image}
                        alt={item.imageAlt || item.title}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : null}
                    <ul className="br_post_tags">
                      <li>{item.category}</li>
                    </ul>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <time dateTime={item.date}>{item.dateLabel}</time>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
