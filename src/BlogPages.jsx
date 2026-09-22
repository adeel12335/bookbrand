import React, { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { IconArrow, IconBook, IconCheck, IconSearch } from './icons.jsx';
import {
  BLOG_REDIRECTS,
  articleByline,
  articleSectionParagraphs,
  articleSections,
  articleSources,
  articleTakeaways,
  blogArticle,
  blogIndex,
  blogPosts,
  getPostBySlug,
  headingId,
  quickAnswerFor,
} from './blogPosts.js';
import { CompareTable, QuickAnswer } from './CompareTable.jsx';
import { PostCard } from './PostCard.jsx';
import { comparisons } from './data.js';
import { appPath, tokenizeInline } from './inlineMarkup.js';

const STEP = 6;
const ALL = 'All';

export function BlogIndexPage() {
  const [draft, setDraft] = useState('');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(ALL);
  const [count, setCount] = useState(STEP);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [featured] = blogPosts;

  const categories = useMemo(
    () => [ALL, ...Array.from(new Set(blogPosts.map(post => post.category).filter(Boolean)))],
    [],
  );

  const showFeatured = Boolean(featured) && !query && category === ALL;

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const pool = query || category !== ALL ? blogPosts : blogPosts.slice(1);
    return pool.filter(post => {
      if (category !== ALL && post.category !== category) return false;
      if (!terms.length) return true;
      const haystack = [post.title, post.description, post.category, ...(post.keywords || [])]
        .join(' ')
        .toLowerCase();
      return terms.every(term => haystack.includes(term));
    });
  }, [query, category]);

  const visible = results.slice(0, count);

  function handleSearch(event) {
    event.preventDefault();
    setQuery(draft.trim());
    setCount(STEP);
  }

  function clearFilters() {
    setDraft('');
    setQuery('');
    setCategory(ALL);
    setCount(STEP);
  }

  function pickCategory(next) {
    setCategory(next);
    setCount(STEP);
  }

  return (
    <div className="blog-page">
      <section
        className="br_page_hero"
        aria-labelledby="blog-index-title"
        style={{ '--bgImage': `url('${blogIndex.heroImage}')` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="br_page_hero_content">
                <p className="br-eyebrow br-eyebrow-light">{blogIndex.eyebrow}</p>
                <h1 id="blog-index-title" className="br-primary-heading">
                  {blogIndex.title} <span>{blogIndex.titleEm}</span>
                </h1>
                <p>{blogIndex.lead}</p>
                <div className="br_wrapper_buttons">
                  {blogIndex.actions?.map(action => (
                    <Link
                      key={action.href}
                      className={action.variant === 'gold' ? 'btn-outline' : 'btn'}
                      to={action.href}
                    >
                      {action.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showFeatured ? (
        <section className="br_section br_featured_band" aria-label="Featured guide">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <Link className="br_featured" to={`/blog/${featured.slug}`}>
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
                  <div className="br_featured_copy">
                    <span className="br-eyebrow">Featured guide</span>
                    <h2>{featured.title}</h2>
                    <p>{featured.description}</p>
                    <ul className="br_post_tags">
                      <li>{featured.category}</li>
                      <li>{featured.readTime}</li>
                    </ul>
                    <span className="br_featured_cue">
                      Read the guide
                      <IconArrow aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="br_section br_all_posts" aria-label="All articles">
        <div className="container">
          <div className="br_posts_head">
            <div className="br_posts_head_copy">
              <p className="br-eyebrow">
                <IconBook aria-hidden="true" />
                All guides
              </p>
              <h2>Our Guide</h2>
            </div>
            <form className="br_posts_search" role="search" onSubmit={handleSearch}>
              <label className="sr-only" htmlFor="blog-search">Search articles</label>
              <IconSearch aria-hidden="true" />
              <input
                id="blog-search"
                type="search"
                name="k"
                value={draft}
                onChange={event => setDraft(event.target.value)}
                placeholder="Search guides..."
                autoComplete="off"
              />
              <button type="submit">Search</button>
            </form>
          </div>

          <div className="br_posts_filters">
            <ul className="br_post_chips">
              {categories.map(item => (
                <li key={item}>
                  <button
                    type="button"
                    className={item === category ? 'is-active' : undefined}
                    aria-pressed={item === category}
                    onClick={() => pickCategory(item)}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
            <p className="br_posts_count" role="status">
              {query
                ? `${results.length} result${results.length === 1 ? '' : 's'} for “${query}”`
                : `${results.length} article${results.length === 1 ? '' : 's'}`}
            </p>
          </div>

          {results.length ? (
            <div className="row br_grid">
              {visible.map(post => (
                <article className="col-md-4" key={post.slug}>
                  <PostCard post={post} />
                </article>
              ))}
            </div>
          ) : (
            <div className="br_posts_empty">
              <p>No guides match that search yet.</p>
              <button type="button" className="btn-outline" onClick={clearFilters}>
                Clear filters
              </button>
            </div>
          )}

          {visible.length < results.length ? (
            <div className="br_posts_more">
              <button type="button" className="btn-outline br_load_more" onClick={() => setCount(n => n + STEP)}>
                Load More
              </button>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}

function RichText({ text }) {
  return tokenizeInline(text).map((token, i) => {
    if (token.type === 'strong') return <strong key={i}>{token.value}</strong>;
    if (token.type === 'link') {
      const href = appPath(token.href);
      if (href.startsWith('/')) {
        return <Link key={i} to={href}>{token.value}</Link>;
      }
      return (
        <a key={i} href={href} rel="noopener noreferrer">
          {token.value}
        </a>
      );
    }
    return <React.Fragment key={i}>{token.value}</React.Fragment>;
  });
}

function SectionCopy({ text }) {
  const trimmed = String(text || '').trim();
  const h3 = trimmed.match(/^#{3}\s+(.+)/);
  if (h3) return <h3>{h3[1].replace(/\*\*/g, '')}</h3>;
  const h4 = trimmed.match(/^#{4}\s+(.+)/);
  if (h4) return <h4>{h4[1].replace(/\*\*/g, '')}</h4>;
  const strongOnly = trimmed.match(/^\*\*(.+)\*\*$/);
  if (strongOnly) return <h4>{strongOnly[1]}</h4>;
  return <p><RichText text={text} /></p>;
}

export function BlogPostPage() {
  const { slug } = useParams();
  const redirected = BLOG_REDIRECTS[slug];
  const post = redirected ? null : getPostBySlug(slug);
  const latest = post ? blogPosts.filter(item => item.slug !== slug).slice(0, 3) : [];
  const byline = post ? articleByline(post) : null;
  const takeaways = post ? articleTakeaways(post) : [];
  const sections = post ? articleSections(post) : [];

  useEffect(() => {
    if (!post) return undefined;
    window.scrollTo(0, 0);
    return undefined;
  }, [post]);

  if (redirected) return <Navigate to={`/blog/${redirected}`} replace />;
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
              <dl className="br_byline">
                <div>
                  <dt>{blogArticle.writtenLabel}</dt>
                  <dd><Link to={byline.href}>{byline.author}</Link></dd>
                </div>
                <div>
                  <dt>{blogArticle.publishedLabel}</dt>
                  <dd><time dateTime={post.date}>{post.dateLabel}</time></dd>
                </div>
                {byline.updated ? (
                  <div>
                    <dt>{blogArticle.updatedLabel}</dt>
                    <dd>
                      <time dateTime={byline.updatedDate || byline.date}>{byline.updated}</time>
                    </dd>
                  </div>
                ) : null}
                <div>
                  <dt>Read time</dt>
                  <dd>{post.readTime}</dd>
                </div>
              </dl>
              <QuickAnswer text={quickAnswerFor(post)} />
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
                  {sections.map((section, index) => (
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

                {takeaways.length ? (
                  <div className="br_block br_border_top">
                    <h4>{blogArticle.takeawaysLabel}</h4>
                    <ul className="br_duo_list">
                      {takeaways.map(item => (
                        <li key={item}>
                          <IconCheck aria-hidden="true" />
                          <RichText text={item} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {post.slug === 'ghostwriting-vs-hiring-a-freelancer' ? (
                  <div className="br_block br_border_top">
                    <h2>Freelancer vs writing studio</h2>
                    <CompareTable table={comparisons.studioVsFreelancer} />
                  </div>
                ) : null}

                {post.slug === 'developmental-editing-vs-copyediting' ? (
                  <div className="br_block br_border_top">
                    <h2>Editing types at a glance</h2>
                    <CompareTable table={comparisons.editingTypes} />
                  </div>
                ) : null}

                {sections.map(section => (
                  <div
                    className="br_block br_border_top br_text_block"
                    id={headingId(section.heading)}
                    key={section.heading}
                  >
                    <h2>{section.heading}</h2>
                    {articleSectionParagraphs(post, section).map(paragraph => (
                      <SectionCopy key={paragraph.slice(0, 48)} text={paragraph} />
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

                {articleSources(post.slug).length ? (
                  <div className="br_block br_border_top">
                    <h2>Primary sources</h2>
                    <ul>
                      {articleSources(post.slug).map(source => (
                        <li key={source.href}>
                          <a href={source.href} rel="noopener noreferrer">{source.label}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <p className="br_post_policy">
                  Publishing guides follow the{' '}
                  <Link to="/editorial-policy">ebookwriters.us editorial policy</Link>.
                </p>
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
                  <PostCard post={item} />
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
