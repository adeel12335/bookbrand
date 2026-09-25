import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { books, getBookBySlug, portfolioPage } from './data.js';

export function PortfolioPage() {
  const page = portfolioPage;
  const [genre, setGenre] = useState('All');
  const genres = ['All', ...page.work.genres];
  const visible = genre === 'All' ? books : books.filter(book => book.genre === genre);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="br_portfolio_page">
      <section
        className="br_page_hero"
        aria-labelledby="pf-title"
        style={{ '--bgImage': `url('${page.heroImage}')` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="br_page_hero_content">
                <p className="br-eyebrow br-eyebrow-light">{page.eyebrow}</p>
                <h1 id="pf-title" className="br-primary-heading">
                  {page.title} <span>{page.titleEm}</span>
                </h1>
                <p>{page.lead}</p>
                <div className="br_wrapper_buttons">
                  <Link className="btn" to="/contact">{page.cta}</Link>
                  <Link className="btn-outline" to="/services">See services</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="br_section br_trust" aria-labelledby="pf-trust-title">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="br_section_head">
                <div className="br_section_head_copy">
                  <p className="br-eyebrow">Why authors choose us</p>
                  <h2 id="pf-trust-title">
                    Work you can <span>put your name on.</span>
                  </h2>
                  <p>{page.trustNote}</p>
                </div>
                <Link className="btn" to="/about">About the studio</Link>
              </div>
            </div>
          </div>
          <div className="row br_grid">
            {page.pillars.map((item, index) => (
              <div className="col-md-6 col-lg-3" key={item.title}>
                <article className="br_trust_item">
                  <span className="br_trust_n" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="br_section br_section--paper" aria-labelledby="pf-work-title">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="br_section_head">
                <div className="br_section_head_copy">
                  <p className="br-eyebrow">{page.work.eyebrow}</p>
                  <h2 id="pf-work-title">
                    {page.work.title} <span>{page.work.titleEm}</span>
                  </h2>
                  <p>{page.work.lead}</p>
                </div>
                <Link className="btn" to="/contact">{page.cta}</Link>
              </div>
              <div className="br_cover_bar">
                <ul className="br_post_tags" aria-label="Genres">
                  {genres.map(item => (
                    <li key={item}>
                      <button
                        type="button"
                        className={item === genre ? 'is-on' : undefined}
                        aria-pressed={item === genre}
                        onClick={() => setGenre(item)}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
                <p className="br_cover_count">{visible.length} {visible.length === 1 ? 'cover' : 'covers'}</p>
              </div>
            </div>
          </div>
          <div className="row br_grid br_covers">
            {visible.map((book, index) => (
              <div className="col-md-6 col-lg-3" key={book.slug}>
                <article className="br_cover_card">
                  <Link className="br_cover_hit" to={`/portfolio/${book.slug}`}>
                    <span className="br_cover_frame">
                      <img
                        src={book.image}
                        alt={`${book.title} by ${book.author} — ${book.genre} cover`}
                        loading={index < 4 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                    </span>
                    <span className="br_cover_meta">
                      <span className="br_cover_genre">{book.genre}</span>
                      <h3>{book.title}</h3>
                      <p>{book.author}</p>
                    </span>
                  </Link>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="br_section br_section--dark" aria-labelledby="pf-process-title">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="br_section_head">
                <div className="br_section_head_copy">
                  <p className="br-eyebrow br-eyebrow-light">{page.process.eyebrow}</p>
                  <h2 id="pf-process-title">
                    {page.process.title} <span>{page.process.titleEm}</span>
                  </h2>
                  <p>{page.process.lead}</p>
                </div>
                <Link className="btn" to="/contact">Request a quote</Link>
              </div>
            </div>
          </div>
          <ol className="row br_grid">
            {page.process.steps.map(step => (
              <li className="col-md-6 col-lg-3" key={step.n}>
                <div className="br_about_stage">
                  <span className="br_about_stage_n" aria-hidden="true">{step.n}</span>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="br_cta" aria-labelledby="pf-close-title">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="br_section_head">
                <div className="br_section_head_copy">
                  <h2 id="pf-close-title">
                    {page.closing.title} {page.closing.titleEm}
                  </h2>
                  <p>{page.closing.lead}</p>
                </div>
                <Link className="btn" to="/contact">{page.closing.cta}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function PortfolioBookPage() {
  const { slug } = useParams();
  const book = getBookBySlug(slug);
  const others = books.filter(item => item.slug !== slug).slice(0, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!book) return <Navigate to="/portfolio" replace />;

  return (
    <div className="br_portfolio_page br_book_page">
      <section className="br_section br_book_detail" aria-labelledby="book-title">
        <div className="container">
          <nav className="br_book_crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/portfolio">Portfolio</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{book.title}</span>
          </nav>
          <div className="row br_book_layout">
            <div className="col-md-5 col-lg-4">
              <img
                className="br_book_cover"
                src={book.image}
                alt={`${book.title} by ${book.author}`}
              />
            </div>
            <div className="col-md-7 col-lg-8">
              <p className="br-eyebrow">{book.genre}</p>
              <h1 id="book-title" className="br-primary-heading">{book.title}</h1>
              {book.subtitle ? <p className="br_book_sub">{book.subtitle}</p> : null}
              <p className="br_book_by">By {book.author}</p>
              <p className="br_book_lead">{book.summary}</p>
              <dl className="br_book_facts">
                <div>
                  <dt>Studio role</dt>
                  <dd>{book.role}</dd>
                </div>
                <div>
                  <dt>Format</dt>
                  <dd>{book.format}</dd>
                </div>
              </dl>
              <div className="br_wrapper_buttons">
                <a className="btn" href={book.amazonUrl} target="_blank" rel="noopener noreferrer">View on Amazon</a>
                <Link className="btn-outline" to="/ebook-cover-design">Start a cover</Link>
              </div>
            </div>
          </div>
          <div className="br_book_note">
            <h2>About this cover</h2>
            <p>{book.detail}</p>
          </div>
        </div>
      </section>

      {others.length ? (
        <section className="br_section br_section--paper" aria-labelledby="more-covers-title">
          <div className="container">
            <div className="br_section_head">
              <div className="br_section_head_copy">
                <p className="br-eyebrow">More covers</p>
                <h2 id="more-covers-title">Other titles in the set</h2>
              </div>
              <Link className="btn" to="/portfolio">All covers</Link>
            </div>
            <div className="row br_grid">
              {others.map(item => (
                <div className="col-md-4" key={item.slug}>
                  <article className="br_cover_card">
                    <Link className="br_cover_hit" to={`/portfolio/${item.slug}`}>
                      <span className="br_cover_frame">
                        <img src={item.image} alt={`${item.title} by ${item.author}`} />
                      </span>
                      <span className="br_cover_meta">
                        <span className="br_cover_genre">{item.genre}</span>
                        <h3>{item.title}</h3>
                        <p>{item.author}</p>
                      </span>
                    </Link>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
