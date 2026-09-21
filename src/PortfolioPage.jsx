import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconArrow, IconCheck, serviceIcons } from './icons.jsx';
import { books, portfolioPage, services } from './data.js';
import { serviceHrefs } from './pageContent.js';

export function PortfolioPage() {
  const page = portfolioPage;

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
              <ul className="br_post_tags" aria-label="Genres">
                {page.work.genres.map(genre => (
                  <li key={genre}>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="row br_grid br_covers">
            {books.map((book, index) => (
              <div className="col-md-4 col-lg-2" key={book.title}>
                <article className="br_cover_card">
                  <img
                    src={book.image}
                    alt={`${book.title} by ${book.author} — ${book.genre} book cover`}
                    loading={index < 3 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                  <span className="br_cover_genre">{book.genre}</span>
                  <h3>{book.title}</h3>
                  <p>{book.author}</p>
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

      <section className="br_section" aria-labelledby="pf-offer-title">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="br_section_head">
                <div className="br_section_head_copy">
                  <p className="br-eyebrow">{page.offer.eyebrow}</p>
                  <h2 id="pf-offer-title">
                    {page.offer.title} <span>{page.offer.titleEm}</span>
                  </h2>
                  <p>{page.offer.lead}</p>
                </div>
                <Link className="btn" to="/services">Explore services</Link>
              </div>
            </div>
          </div>
          <div className="row br_grid">
            {services.map(service => {
              const Icon = serviceIcons[service.key] || IconArrow;
              const href = serviceHrefs[service.key] || service.href || '/contact';
              return (
                <div className="col-md-6" key={service.title}>
                  <Link className="ed-svc-card" to={href}>
                    <span className="ed-svc-icon" aria-hidden="true"><Icon /></span>
                    <div className="ed-svc-body">
                      <h3>{service.title}</h3>
                      <p>{service.copy}</p>
                    </div>
                    <span className="ed-svc-orb" aria-hidden="true"><IconArrow /></span>
                  </Link>
                </div>
              );
            })}
          </div>
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
