import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IconArrow, IconCheck, IconQuote } from './icons.jsx';
import { books, portfolioPage, services, testimonials } from './data.js';
import { PageHero } from './PageHero.jsx';

export function PortfolioPage() {
  const page = portfolioPage;
  const [activeStep, setActiveStep] = useState(0);
  const [activeVoice, setActiveVoice] = useState(0);
  const voice = testimonials[activeVoice] || testimonials[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stepPrev = () => {
    setActiveStep(i => (i - 1 + page.process.steps.length) % page.process.steps.length);
  };
  const stepNext = () => {
    setActiveStep(i => (i + 1) % page.process.steps.length);
  };
  const voicePrev = () => {
    setActiveVoice(i => (i - 1 + testimonials.length) % testimonials.length);
  };
  const voiceNext = () => {
    setActiveVoice(i => (i + 1) % testimonials.length);
  };

  return (
    <div className="pf-page pf-page--v2">
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        titleEm={page.titleEm}
        lead={page.lead}
        image={page.heroImage}
        imageAlt={page.heroImageAlt}
        id="pf-title"
        actions={[{ label: page.cta, href: '/contact' }]}
      >
        <p className="pf-trust-note">{page.trustNote}</p>
      </PageHero>

      <section className="pf-pillars" aria-label="Why authors trust our portfolio work">
        <div className="shell">
          <ul className="pf-pillar-grid">
            {page.pillars.map((item, index) => (
              <li key={item.title}>
                <span className="pf-pillar-n" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <IconCheck className="tick" aria-hidden="true" />
                <h2>{item.title}</h2>
                <p>{item.copy}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pf-work" aria-labelledby="pf-work-title">
        <div className="shell">
          <header className="pf-section-head">
            <p className="eyebrow"><span>{page.work.eyebrow}</span><i aria-hidden="true" /></p>
            <h2 id="pf-work-title">
              {page.work.title} <em>{page.work.titleEm}</em>
            </h2>
            <p>{page.work.lead}</p>
            <ul className="pf-genres" aria-label="Genres">
              {page.work.genres.map((genre) => (
                <li key={genre}>{genre}</li>
              ))}
            </ul>
          </header>

          <ul className="pf-cover-grid">
            {books.map((book, index) => (
              <li key={book.title}>
                <article className="pf-cover-item">
                  <div className="pf-cover-frame">
                    <img
                      src={book.image}
                      alt={`${book.title} by ${book.author} — ${book.genre} book cover`}
                      width="320"
                      height="480"
                      loading={index < 3 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                  </div>
                  <div className="pf-cover-meta">
                    <span>{book.genre}</span>
                    <h3>{book.title}</h3>
                    <p>{book.author}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pf-offer" aria-labelledby="pf-offer-title">
        <div className="shell">
          <header className="pf-section-head pf-section-head--split">
            <div>
              <p className="eyebrow"><span>{page.offer.eyebrow}</span><i aria-hidden="true" /></p>
              <h2 id="pf-offer-title">
                {page.offer.title}
                <br />
                <em>{page.offer.titleEm}</em>
              </h2>
            </div>
            <p>{page.offer.lead}</p>
          </header>
          <ul className="pf-offer-grid">
            {services.map((service) => (
              <li key={service.key}>
                <span>{service.n}</span>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pf-process" aria-labelledby="pf-process-title">
        <div className="shell">
          <header className="pf-section-head pf-process-head">
            <p className="eyebrow eyebrow-light"><span>{page.process.eyebrow}</span><i aria-hidden="true" /></p>
            <h2 id="pf-process-title">
              {page.process.title} <em>{page.process.titleEm}</em>
            </h2>
            <p>{page.process.lead}</p>
          </header>

          <div className="pf-process-board">
            <div className="pf-process-track" aria-hidden="true">
              <i style={{ '--pf-step': activeStep, '--pf-steps': page.process.steps.length }} />
            </div>
            <ol className="pf-process-grid" role="tablist" aria-label={page.process.eyebrow}>
              {page.process.steps.map((step, index) => {
                const selected = index === activeStep;
                return (
                  <li key={step.n} role="presentation">
                    <button
                      type="button"
                      role="tab"
                      id={`pf-step-tab-${step.n}`}
                      className={`pf-process-tab${selected ? ' is-active' : ''}`}
                      aria-selected={selected}
                      aria-controls="pf-step-panel"
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setActiveStep(index)}
                      onMouseEnter={() => setActiveStep(index)}
                      onFocus={() => setActiveStep(index)}
                    >
                      <span className="pf-process-n" aria-hidden="true">{step.n}</span>
                      <h3>{step.title}</h3>
                      <p>{step.copy}</p>
                    </button>
                  </li>
                );
              })}
            </ol>
            <div
              className="pf-process-panel"
              id="pf-step-panel"
              role="tabpanel"
              aria-labelledby={`pf-step-tab-${page.process.steps[activeStep]?.n}`}
            >
              <p className="pf-process-panel-kicker">
                Step {page.process.steps[activeStep]?.n}
              </p>
              <h3>{page.process.steps[activeStep]?.title}</h3>
              <p>{page.process.steps[activeStep]?.copy}</p>
              <div className="pf-process-nav">
                <button type="button" className="pf-seek" onClick={stepPrev} aria-label="Previous step">
                  <IconArrow aria-hidden="true" />
                </button>
                <button type="button" className="pf-seek pf-seek--next" onClick={stepNext} aria-label="Next step">
                  <IconArrow aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pf-voices" aria-labelledby="pf-voices-title">
        <div className="shell">
          <header className="pf-section-head">
            <p className="eyebrow"><span>{page.voices.eyebrow}</span><i aria-hidden="true" /></p>
            <h2 id="pf-voices-title">
              {page.voices.title} <em>{page.voices.titleEm}</em>
            </h2>
            <p>{page.voices.lead}</p>
          </header>

          <div className="pf-voice-stage">
            <blockquote className="pf-voice-feature" aria-live="polite">
              <IconQuote className="pf-voice-mark" aria-hidden="true" />
              <p>&ldquo;{voice.quote}&rdquo;</p>
              <footer>
                <span className="pf-voice-mono" aria-hidden="true">{voice.initials}</span>
                <div>
                  <strong>{voice.name}</strong>
                  <span>{voice.role}</span>
                </div>
              </footer>
            </blockquote>

            <div className="pf-voice-side">
              <ul className="pf-voice-pickers" role="tablist" aria-label="Author voices">
                {testimonials.map((item, index) => {
                  const selected = index === activeVoice;
                  return (
                    <li key={item.name} role="presentation">
                      <button
                        type="button"
                        role="tab"
                        className={`pf-voice-pick${selected ? ' is-active' : ''}`}
                        aria-selected={selected}
                        tabIndex={selected ? 0 : -1}
                        onClick={() => setActiveVoice(index)}
                      >
                        <span className="pf-voice-mono" aria-hidden="true">{item.initials}</span>
                        <span className="pf-voice-pick-copy">
                          <strong>{item.name}</strong>
                          <span>{item.role}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="pf-voice-nav">
                <button type="button" className="pf-seek" onClick={voicePrev} aria-label="Previous testimonial">
                  <IconArrow aria-hidden="true" />
                </button>
                <button type="button" className="pf-seek pf-seek--next" onClick={voiceNext} aria-label="Next testimonial">
                  <IconArrow aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pf-close" aria-labelledby="pf-close-title">
        <div className="shell pf-close-inner">
          <h2 id="pf-close-title">
            {page.closing.title}
            <br />
            <em>{page.closing.titleEm}</em>
          </h2>
          <p>{page.closing.lead}</p>
          <Link className="cta cta-gold" to="/contact">
            <span>{page.closing.cta}</span>
            <IconArrow className="cta-arrow" />
          </Link>
        </div>
      </section>
    </div>
  );
}
