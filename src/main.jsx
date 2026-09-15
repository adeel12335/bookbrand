import React, { useEffect, useId, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
  IconArrow, IconArrowUpRight, IconBook, IconCheck, IconClose,
  IconMail, IconMenu, IconPhone, IconPlus,
  IconWriting, IconWriters, IconPublishing,
  IconCoins, IconCalendar, IconLeaf, IconEditing, IconFormatting, IconBranding,
  serviceIcons,
} from './icons.jsx';
import {
  books, faqs, footerLinks, navigation, plans,
  services, testimonials, testimonialsIntro, hero,
  siteContact,
  portfolioIntro, servicesIntro, benefits, pathBand, dualOffer,
} from './data.js';
import './fonts.css';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------------ helpers */

/** Scroll-reveal wrapper. Adds .is-in once the element enters the viewport. */
function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (reduceMotion()) {
      node.classList.add('is-in');
      return undefined;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('is-in');
        io.disconnect();
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    io.observe(node);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${className}`.trim()} style={{ '--reveal-delay': `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

/** Cursor-following pull on primary calls to action. Pointer-fine devices only. */
function useMagnetic(strength = 0.28) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || reduceMotion()) return undefined;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    const move = event => {
      const rect = node.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      gsap.to(node, { x: x * strength, y: y * strength, duration: 0.5, ease: 'power3.out' });
    };
    const reset = () => gsap.to(node, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    node.addEventListener('pointermove', move);
    node.addEventListener('pointerleave', reset);
    return () => {
      node.removeEventListener('pointermove', move);
      node.removeEventListener('pointerleave', reset);
      gsap.killTweensOf(node);
    };
  }, [strength]);
  return ref;
}

function Cta({ href = '#contact', variant = 'solid', className = '', children, onClick }) {
  const ref = useMagnetic(variant === 'solid' ? 0.24 : 0.16);
  return (
    <a ref={ref} className={`cta cta-${variant} ${className}`.trim()} href={href} onClick={onClick}>
      <span>{children}</span>
      <IconArrow className="cta-arrow" />
    </a>
  );
}

function Eyebrow({ children, tone }) {
  return (
    <p className={`eyebrow${tone ? ` eyebrow-${tone}` : ''}`}>
      <span>{children}</span>
      <i aria-hidden="true" />
    </p>
  );
}

function Wordmark({ light = false, className = '' }) {
  return (
    <a className={`wordmark ${className}`.trim()} href="#top" aria-label="ebookwriters.us — home">
      <img
        src={light ? '/assets/brand/logo-light.png' : '/assets/brand/logo-dark.png'}
        alt="ebookwriters.us — Write. Publish. Grow."
        width="970"
        height="189"
      />
    </a>
  );
}

/* ------------------------------------------------------------------- header */

function Header() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [active, setActive] = useState('');
  const toggleRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(`#${entry.target.id}`); });
    }, { rootMargin: '-20% 0px -70% 0px' });
    document.querySelectorAll('main section[id]').forEach(s => io.observe(s));
    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('nav-open', open);
    return () => document.body.classList.remove('nav-open');
  }, [open]);

  return (
    <header
      className={`site-header${stuck ? ' is-stuck' : ''}${open ? ' is-open' : ''}`}
      onKeyDown={event => {
        if (event.key === 'Escape' && open) {
          setOpen(false);
          toggleRef.current?.focus();
        }
      }}
    >
      <div
        className="nav-scrim"
        aria-hidden="true"
        onClick={() => setOpen(false)}
      />
      <div className="shell header-inner">
        <Wordmark light />
        <nav id="primary-nav" className="primary-nav" aria-label="Primary">
          <ul>
            {navigation.map(item => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active === item.href ? 'true' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>
            Start Your Project
          </a>
        </nav>
        <button
          ref={toggleRef}
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="primary-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen(v => !v)}
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>
    </header>
  );
}

/* --------------------------------------------------------------------- hero */

function Hero() {
  const rootRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduceMotion()) return undefined;
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from('.hx-live .hx-visual', { opacity: 0, duration: 1.15, ease: 'power2.out' }, 0)
        .from(imageRef.current, { scale: 1.08, duration: 1.7 }, 0)
        .from('.hx-live .hx-kicker', { opacity: 0, y: 12, duration: 0.65 }, 0.18)
        .from('.hx-live .hx-line > span', { yPercent: 110, duration: 1.05, stagger: 0.1 }, 0.22)
        .from('.hx-live .hx-lead', { opacity: 0, y: 16, duration: 0.75 }, 0.55)
        .from('.hx-live .hx-actions > *', { opacity: 0, y: 12, duration: 0.65, stagger: 0.08 }, 0.68)
        .from('.hx-live .hx-proof, .hx-live .hx-trust', { opacity: 0, y: 10, duration: 0.55 }, 0.88)
        .from('.hx-live .hx-rim', { opacity: 0, duration: 1.2 }, 0.35);

      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 4,
          ease: 'none',
          scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
        });
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hx" id="top" ref={rootRef} aria-labelledby="hero-title">
      {/* Desktop: pixel-matched to the approved concept art */}
      <div className="hx-exact">
        <img
          src="/assets/brand/hero-v2-exact.png"
          alt=""
          width="1586"
          height="888"
          fetchPriority="high"
          decoding="async"
        />
        <h1 id="hero-title" className="sr-only">
          Turn Your Ideas Into a Published Book.
        </h1>
        <p className="sr-only">{hero.lead}</p>
        <a className="hx-exact-hit hx-exact-hit--cta" href="#contact">
          Start Your Project
        </a>
        <a className="hx-exact-hit hx-exact-hit--link" href={hero.link.href}>
          Explore our services
        </a>
      </div>

      {/* Mobile / tablet: live HTML layout */}
      <div className="hx-live">
        <svg className="hx-clip-defs" width="0" height="0" aria-hidden="true" focusable="false">
          <defs>
            <clipPath id="hx-arch" clipPathUnits="objectBoundingBox">
              <path d="M0,1 C0,0.72 0.01,0.52 0.04,0.38 C0.09,0.18 0.22,0.05 0.42,0 L1,0 L1,1 Z" />
            </clipPath>
          </defs>
        </svg>

        <div className="hx-stage">
          <div className="hx-visual" aria-hidden="true">
            <div className="hx-photo">
              <picture>
                <source media="(min-width: 861px)" srcSet="/assets/brand/hero-study-wide.jpg" />
                <img
                  ref={imageRef}
                  src="/assets/brand/hero-study.jpg"
                  alt=""
                  width="920"
                  height="992"
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
            </div>
            <svg className="hx-rim" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path
                d="M0,100 C0,72 1,52 4,38 C9,18 22,5 42,0"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.45"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          <div className="hx-inner">
            <div className="hx-copy">
              <p className="hx-kicker">{hero.kicker}</p>
              <h2 className="hx-title">
                {hero.lines.map((line, i) => (
                  <span className="hx-line" key={line}>
                    <span>{i === hero.lines.length - 1 ? <em>{line}</em> : line}</span>
                  </span>
                ))}
              </h2>
              <p className="hx-lead hx-lead--desk">{hero.lead}</p>
              <p className="hx-lead hx-lead--mob">{hero.leadMobile}</p>
              <div className="hx-glass">
                <div className="hx-actions">
                  <a className="hx-cta" href="#contact">{hero.cta}</a>
                  <a className="hx-link" href={hero.link.href}>
                    {hero.link.label}
                    <IconArrow aria-hidden="true" />
                  </a>
                </div>
                <p className="hx-proof">{hero.trust.join(' · ')}</p>
              </div>
              <ul className="hx-trust" aria-hidden="true">
                {hero.trust.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        </div>

        <div className="hx-fold" aria-hidden="true">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path
              className="hx-fold-fill"
              d="M0,80 L0,36 C320,36 520,36 720,8 C920,36 1120,36 1440,36 L1440,80 Z"
            />
          </svg>
          <span className="hx-fold-tick" />
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- services */

const benefitIcons = {
  ownership: IconBook,
  fees: IconCoins,
  specialists: IconWriters,
  time: IconCalendar,
};

const journeyIcons = [
  IconWriting,
  IconEditing,
  IconFormatting,
  IconPublishing,
  IconBranding,
  IconLeaf,
];

function TrustBar() {
  return (
    <section className="ed-trust" aria-label="Why authors trust us">
      <div className="shell">
        <ul className="ed-trust-grid">
          {benefits.map((item, i) => {
            const Icon = benefitIcons[item.key] || IconCheck;
            return (
              <Reveal as="li" className="ed-trust-item" key={item.title} delay={i * 60}>
                <span className="ed-trust-icon" aria-hidden="true"><Icon /></span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function PathBand() {
  return (
    <section className="ed-path" id="why" aria-labelledby="why-title">
      <div className="ed-path-split">
        <Reveal className="ed-path-copy">
          <Eyebrow tone="light">{pathBand.eyebrow}</Eyebrow>
          <h2 id="why-title">
            {pathBand.title}{' '}
            <em>{pathBand.titleEm}</em>
          </h2>
          <p>{pathBand.lead}</p>
          <a className="ed-path-cta" href="#contact">
            <span>{pathBand.cta}</span>
            <span className="ed-path-cta-orb" aria-hidden="true"><IconArrow /></span>
          </a>
          <ol className="ed-path-journey">
            {pathBand.journey.map((label, i) => {
              const Icon = journeyIcons[i] || IconCheck;
              return (
                <li key={label}>
                  <span className="ed-path-dot" aria-hidden="true"><Icon /></span>
                  <span>{label}</span>
                </li>
              );
            })}
          </ol>
        </Reveal>
        <Reveal className="ed-path-visual" delay={100}>
          <img
            src={pathBand.image}
            alt={pathBand.imageAlt}
            width="900"
            height="1100"
            loading="lazy"
          />
          <aside className="ed-path-card">
            <div className="ed-path-card-head">
              <IconLeaf aria-hidden="true" />
              <h3>{pathBand.roadmap.title}</h3>
            </div>
            <ol>
              {pathBand.roadmap.steps.map((step, i) => (
                <li key={step}>
                  <span aria-hidden="true">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="ed-svc" id="services" aria-labelledby="services-title">
      <div className="shell">
        <Reveal className="ed-svc-head ed-svc-head--split">
          <div>
            <Eyebrow>{servicesIntro.eyebrow}</Eyebrow>
            <h2 id="services-title">
              {servicesIntro.title}
              <br />
              <em>{servicesIntro.titleEm}</em>
            </h2>
          </div>
          <p>{servicesIntro.lead}</p>
        </Reveal>
        <ul className="ed-svc-cards">
          {services.map((service, i) => {
            const Icon = serviceIcons[service.key] || IconWriting;
            return (
              <Reveal as="li" className="ed-svc-card" key={service.title} delay={(i % 3) * 70}>
                <span className="ed-svc-icon" aria-hidden="true"><Icon /></span>
                <div className="ed-svc-body">
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                </div>
                <a
                  className="ed-svc-orb"
                  href="#contact"
                  aria-label={`Inquire about ${service.title}`}
                >
                  <IconArrow aria-hidden="true" />
                </a>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- portfolio */

function Portfolio() {
  const shelf = books.slice(0, 6).map((book, index) => ({
    ...book,
    cover: `/assets/brand/portfolio-shelf-book-${index + 1}.png`,
  }));
  const [activeBook, setActiveBook] = useState(2);
  const [paused, setPaused] = useState(false);
  const stageRef = useRef(null);
  const inViewRef = useRef(true);
  const holdUntilRef = useRef(0);
  const selected = shelf[activeBook];
  const dwellMs = 3200;

  const moveSelection = direction => {
    holdUntilRef.current = performance.now() + 5000;
    setActiveBook(current => (current + direction + shelf.length) % shelf.length);
  };

  const selectBook = index => {
    holdUntilRef.current = performance.now() + 5000;
    setActiveBook(index);
  };

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return undefined;
    const io = new IntersectionObserver(([entry]) => {
      inViewRef.current = entry.isIntersecting;
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion() || paused) return undefined;
    const id = window.setInterval(() => {
      if (!inViewRef.current) return;
      if (performance.now() < holdUntilRef.current) return;
      setActiveBook(current => (current + 1) % shelf.length);
    }, dwellMs);
    return () => window.clearInterval(id);
  }, [paused, shelf.length]);

  return (
    <section className="ed-folio ed-folio--showcase" id="portfolio" aria-labelledby="portfolio-title">
      <div className="shell">
        <Reveal className="ed-folio-head">
          <Eyebrow>{portfolioIntro.eyebrow}</Eyebrow>
          <div className="ed-folio-head-row">
            <h2 id="portfolio-title">{portfolioIntro.title}</h2>
            <div className="ed-folio-meta">
              <p>{portfolioIntro.meta}</p>
              <a className="ed-folio-link" href={portfolioIntro.linkHref}>
                {portfolioIntro.linkLabel}
                <span className="ed-folio-link-orb" aria-hidden="true"><IconArrow /></span>
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal
          className="ed-folio-theater"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={event => {
            if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
          }}
        >
          <div ref={stageRef} className="ed-folio-theater-inner">
            <div
              className="ed-folio-coverflow"
              role="group"
              aria-label="Select a published book"
              onKeyDown={event => {
                if (event.key === 'ArrowRight') {
                  event.preventDefault();
                  moveSelection(1);
                }
                if (event.key === 'ArrowLeft') {
                  event.preventDefault();
                  moveSelection(-1);
                }
              }}
            >
              {shelf.map((book, index) => {
                const n = shelf.length;
                let offset = index - activeBook;
                if (offset > n / 2) offset -= n;
                if (offset < -n / 2) offset += n;
                const abs = Math.abs(offset);
                const far = abs > 2;
                const x = reduceMotion()
                  ? `calc(-50% + ${offset} * 8.1rem)`
                  : `calc(-50% + ${offset} * clamp(5.8rem, 11.5vw, 9.25rem))`;
                const y = abs === 0 ? '-1.1rem' : `${abs * 0.35}rem`;
                const scale = reduceMotion()
                  ? (activeBook === index ? 1.06 : 0.9)
                  : Math.max(0.68, 1.08 - abs * 0.14);
                const rot = reduceMotion() ? 0 : offset * -26;
                const depth = reduceMotion() ? 0 : -abs * 110;
                return (
                  <button
                    type="button"
                    key={book.title}
                    className={`ed-folio-book${activeBook === index ? ' is-active' : ''}${far ? ' is-far' : ''}`}
                    style={{
                      '--offset': offset,
                      zIndex: 40 - abs,
                      transform: `translate3d(${x}, ${y}, ${depth}px) rotateY(${rot}deg) scale(${scale})`,
                      opacity: far ? 0.22 : 1 - abs * 0.14,
                    }}
                    aria-label={`${book.title} by ${book.author}`}
                    aria-pressed={activeBook === index}
                    onClick={() => selectBook(index)}
                    onFocus={() => selectBook(index)}
                  >
                    <span className="ed-folio-book-spine" aria-hidden="true" />
                    <img
                      src={book.cover}
                      alt=""
                      width="320"
                      height="480"
                      loading={abs <= 1 ? 'eager' : 'lazy'}
                      draggable="false"
                    />
                    <span className="ed-folio-book-shade" aria-hidden="true" />
                  </button>
                );
              })}
            </div>

            <div className="ed-folio-stage-glow" aria-hidden="true" />

            <div className="ed-folio-theater-foot">
              <div className="ed-folio-dots" role="tablist" aria-label="Published titles">
                {shelf.map((book, index) => (
                  <button
                    key={book.title}
                    type="button"
                    role="tab"
                    aria-selected={activeBook === index}
                    aria-label={`Show ${book.title}`}
                    className={activeBook === index ? 'is-active' : undefined}
                    onClick={() => selectBook(index)}
                  />
                ))}
              </div>
              <div className="ed-folio-selected">
                <span>{selected.genre}</span>
                <h3>{selected.title}</h3>
                <p>Written by {selected.author}</p>
              </div>
              <div className="ed-folio-actions">
                <div className="ed-folio-arrows">
                  <button type="button" onClick={() => moveSelection(-1)} aria-label="Previous book">
                    <IconArrow aria-hidden="true" />
                  </button>
                  <button type="button" onClick={() => moveSelection(1)} aria-label="Next book">
                    <IconArrow aria-hidden="true" />
                  </button>
                </div>
                <a href="#contact">
                  Start a similar project
                  <IconArrow aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- dual offer */

function DualCard({ offer, tone }) {
  return (
    <article className={`ed-duo-card ed-duo-card--${tone}`}>
      <p className="ed-duo-card-kicker">
        <span>{offer.index}</span>
        <i aria-hidden="true" />
        <span>{offer.tag}</span>
      </p>
      <h3 className="ed-duo-card-title">{offer.title}</h3>
      <p className="ed-duo-card-lead">{offer.lead}</p>
      <ul className="ed-duo-card-list">
        {offer.checklist.map(item => (
          <li key={item}>
            <span className="ed-duo-card-tick" aria-hidden="true"><IconCheck /></span>
            {item}
          </li>
        ))}
      </ul>
      <a className="ed-duo-card-cta" href={offer.href}>
        {offer.cta}
        <IconArrow aria-hidden="true" />
      </a>
      <p className="ed-duo-card-fig">{offer.caption}</p>
    </article>
  );
}

function DualOffer() {
  const { intro, publish, market, stage } = dualOffer;

  return (
    <section className="ed-duo ed-duo--stage" id="publish" aria-labelledby="ed-duo-title">
      <div className="ed-duo-stage" aria-hidden="true">
        <img
          src={stage.image}
          alt=""
          width="1600"
          height="1068"
          loading="lazy"
          decoding="async"
        />
        <span className="ed-duo-stage-veil" />
      </div>

      <div className="shell ed-duo-shell">
        <Reveal className="ed-duo-head">
          <div className="ed-duo-head-main">
            <Eyebrow tone="light">{intro.eyebrow}</Eyebrow>
            <h2 id="ed-duo-title">
              {intro.title}
              {' '}
              <em>{intro.titleEm}</em>
            </h2>
          </div>
          <div className="ed-duo-head-aside">
            <p>{intro.lead}</p>
            <p className="ed-duo-note">{intro.note}</p>
          </div>
        </Reveal>

        <div className="ed-duo-board">
          <svg className="ed-duo-arc" viewBox="0 0 640 120" preserveAspectRatio="none" aria-hidden="true">
            <path
              d="M40,96 C180,16 460,16 600,96"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
            />
            <circle cx="40" cy="96" r="4.5" fill="currentColor" />
            <circle cx="600" cy="96" r="4.5" fill="currentColor" />
          </svg>

          <Reveal className="ed-duo-board-col">
            <DualCard offer={publish} tone="dark" />
          </Reveal>
          <Reveal className="ed-duo-board-col" delay={100}>
            <DualCard offer={market} tone="light" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- testimonials */

function Testimonials() {
  return (
    <section className="ed-voices ed-voices--min" aria-labelledby="voices-title">
      <div className="shell">
        <Reveal className="ed-voices-min-head">
          <Eyebrow tone="light">{testimonialsIntro.eyebrow}</Eyebrow>
          <h2 id="voices-title">{testimonialsIntro.title}</h2>
        </Reveal>

        <ul className="ed-voices-min-grid">
          {testimonials.map((item, i) => (
            <Reveal as="li" className="ed-voices-min-card" key={item.name} delay={i * 70}>
              <blockquote>
                <p>“{item.quote}”</p>
              </blockquote>
              <footer>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </footer>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ pricing */

function Pricing({ onSelect }) {
  return (
    <section className="ed-price" id="pricing" aria-labelledby="pricing-title">
      <div className="shell">
        <Reveal className="ed-price-head">
          <div>
            <Eyebrow>Investment</Eyebrow>
            <h2 id="pricing-title">
              One price. <em>Agreed up front.</em>
            </h2>
          </div>
          <p>
            Writing, editing, cover, and files included. No surprise invoices —
            choose the chapter that matches your manuscript.
          </p>
        </Reveal>
        <div className="ed-price-sheet" aria-label="Publishing packages">
          {plans.map((plan, i) => (
            <Reveal
              as="article"
              className={`ed-price-card${plan.featured ? ' is-featured' : ''}`}
              key={plan.name}
              delay={i * 70}
            >
              {plan.featured ? <span className="ed-price-flag">Most popular</span> : null}
              <h3>{plan.name}</h3>
              <p className="ed-price-amt"><i>$</i>{plan.price}</p>
              <p className="ed-price-copy">{plan.copy}</p>
              <dl className="ed-price-meta">
                <div><dt>Length</dt><dd>{plan.words}</dd></div>
                <div><dt>Timeline</dt><dd>{plan.timeline}</dd></div>
              </dl>
              <ul className="ed-price-features">
                {plan.features.slice(0, 3).map(feature => (
                  <li key={feature}><IconCheck className="tick" aria-hidden="true" />{feature}</li>
                ))}
              </ul>
              <a className="ed-price-cta" href="#contact" onClick={() => onSelect(plan.name)}>
                <span>{plan.featured ? 'Get started' : `Choose ${plan.name}`}</span>
                <IconArrow aria-hidden="true" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- faq */

function FaqItem({ item, index, open, onToggle, progress }) {
  const panelId = useId();
  const buttonId = useId();
  return (
    <div className={`ed-faq-item${open ? ' is-open' : ''}`} role="listitem">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="ed-faq-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <span className="ed-faq-q">{item.q}</span>
          <span className="ed-faq-toggle" aria-hidden="true">
            {open ? <IconClose /> : <IconPlus />}
          </span>
        </button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={buttonId} className="ed-faq-a" hidden={!open}>
        <p>{item.a}</p>
      </div>
      {open ? (
        <i className="ed-faq-progress" style={{ '--p': `${Math.round(progress * 100)}%` }} aria-hidden="true" />
      ) : null}
    </div>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef(null);
  const inViewRef = useRef(false);
  const holdUntilRef = useRef(0);
  const dwellMs = 5200;

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;
    const io = new IntersectionObserver(([entry]) => {
      inViewRef.current = entry.isIntersecting && entry.intersectionRatio >= 0.25;
    }, { threshold: [0.2, 0.35, 0.5] });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduceMotion() || paused) {
      setProgress(0);
      return undefined;
    }
    let start = performance.now();
    let frame = 0;
    let lastPaintedProgress = -1;
    const tick = now => {
      if (!inViewRef.current || now < holdUntilRef.current) {
        start = now;
        if (lastPaintedProgress !== 0) {
          setProgress(0);
          lastPaintedProgress = 0;
        }
        frame = requestAnimationFrame(tick);
        return;
      }
      const ratio = Math.min(1, (now - start) / dwellMs);
      if (ratio - lastPaintedProgress >= 0.02 || ratio >= 1) {
        setProgress(ratio);
        lastPaintedProgress = ratio;
      }
      if (ratio >= 1) {
        setOpen(current => (current + 1) % faqs.length);
        start = now;
        setProgress(0);
        lastPaintedProgress = 0;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [open, paused]);

  function selectItem(index) {
    holdUntilRef.current = performance.now() + 8000;
    setProgress(0);
    setOpen(index);
  }

  return (
    <section
      ref={sectionRef}
      className="ed-faq"
      id="faq"
      aria-labelledby="faq-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <div className="shell ed-faq-shell">
        <Reveal className="ed-faq-copy">
          <p className="ed-faq-volume" aria-hidden="true">Vol. VI · Answers</p>
          <Eyebrow>Frequently asked questions</Eyebrow>
          <h2 id="faq-title">
            Straight answers for
            <br />
            <em>your next chapter.</em>
          </h2>
          <p>
            The quiet objections authors ask before they begin. Open any row — or let the
            index turn the page for you.
          </p>
          <a className="ed-faq-cta" href="#contact">
            Still unsure? Ask us directly
            <IconArrow aria-hidden="true" />
          </a>
        </Reveal>

        <Reveal className="ed-faq-board" delay={90}>
          <div className="ed-faq-list" role="list">
            {faqs.map((item, i) => (
              <FaqItem
                key={item.q}
                item={item}
                index={i}
                open={open === i}
                progress={open === i ? progress : 0}
                onToggle={() => selectItem(i)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ contact */

function Contact({ selectedPlan, onSelect }) {
  const [brief, setBrief] = useState(null);
  const [copied, setCopied] = useState('');
  const resultRef = useRef(null);

  useEffect(() => { if (brief) resultRef.current?.focus(); }, [brief]);

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const message = String(data.get('message') || '').trim();
    if (!message) {
      form.elements.message.setCustomValidity('Please tell us a little about your book.');
      form.elements.message.reportValidity();
      return;
    }
    setBrief([
      'ebookwriters.us — project brief',
      '',
      `Name:      ${String(data.get('name')).trim()}`,
      `Email:     ${String(data.get('email')).trim()}`,
      `Package:   ${data.get('interest') || 'Help me choose'}`,
      `Timeline:  ${data.get('timeline')}`,
      '',
      'About the book',
      '--------------',
      message,
    ].join('\n'));
    setCopied('');
  }

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(brief);
      setCopied('Brief copied to your clipboard.');
    } catch {
      setCopied('Clipboard unavailable — select the text above and copy it manually.');
    }
  }

  return (
    <section className="section contact ct" id="contact" aria-labelledby="contact-title">
      <div className="ct-shell">
        <Reveal className="ct-aside">
          <img
            className="ct-photo"
            src="/assets/brand/contact-consultation-v2.png"
            alt=""
            loading="lazy"
          />
          <div className="ct-aside-copy">
            <Eyebrow tone="light">Let’s bring your story to life</Eyebrow>
            <h2 id="contact-title">
              Every great book
              <br />
              <em>starts with a conversation.</em>
            </h2>
            <p>
              Tell us what you want to write and who it is for. You will hear back within one
              working day with a clear answer on scope, price and timing.
            </p>
            <ul className="ct-points">
              <li><IconCheck className="tick" />Free 30-minute discovery call</li>
              <li><IconCheck className="tick" />NDA before you share anything</li>
              <li><IconCheck className="tick" />Fixed quote, no hourly billing</li>
            </ul>
            <div className="ct-direct">
              <a href={`mailto:${siteContact.email}`}><IconMail /> {siteContact.email}</a>
              <a href={siteContact.phoneHref}><IconPhone /> {siteContact.phone}</a>
            </div>
          </div>
        </Reveal>

        <Reveal className="ct-panel" delay={120}>
          {brief ? (
            <div className="brief" ref={resultRef} tabIndex={-1}>
              <h3>Your brief is ready</h3>
              <p className="brief-note">
                Nothing has been sent. Copy this and email it to us, or connect the form to your
                own endpoint before launch.
              </p>
              <pre>{brief}</pre>
              <div className="brief-actions">
                <button type="button" className="cta cta-solid" onClick={copyBrief}>
                  <span>Copy brief</span><IconArrow className="cta-arrow" />
                </button>
                <button type="button" className="link-button" onClick={() => setBrief(null)}>
                  Edit details
                </button>
              </div>
              <p role="status" className="brief-status">{copied}</p>
            </div>
          ) : (
            <form className="ct-form" onSubmit={handleSubmit}>
              <label className="field">
                <span>Your name</span>
                <input name="name" autoComplete="name" required maxLength={120} placeholder="Alex Morgan" />
              </label>
              <label className="field">
                <span>Your email</span>
                <input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="alex@company.com" />
              </label>
              <label className="field">
                <span>What service are you interested in?</span>
                <select name="interest" value={selectedPlan} onChange={e => onSelect(e.target.value)}>
                  <option value="">Help me choose</option>
                  {plans.map(plan => (
                    <option key={plan.name} value={plan.name}>{plan.name} — ${plan.price}</option>
                  ))}
                </select>
              </label>
              <input type="hidden" name="timeline" value="Within 3 months" />
              <label className="field">
                <span>Tell us about your book or project</span>
                <textarea
                  name="message"
                  rows={5}
                  required
                  maxLength={4000}
                  placeholder="The idea, who it is for, and what you want it to do for you."
                  onInput={e => e.target.setCustomValidity('')}
                />
              </label>
              <button type="submit" className="ct-submit">
                Prepare inquiry <IconArrow aria-hidden="true" />
              </button>
              <p className="ct-note">We typically respond within 1–2 business days.</p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- footer */

function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-top">
          <div className="footer-brand">
            <Wordmark light />
            <p>
              A small publishing studio for people with something worth saying. We write, edit,
              design and publish books that earn their place on a shelf.
            </p>
            <div className="footer-contact">
              <a href={`mailto:${siteContact.email}`}><IconMail /> {siteContact.email}</a>
              <a href={siteContact.phoneHref}><IconPhone /> {siteContact.phone}</a>
            </div>
          </div>
          {footerLinks.map(column => (
            <nav className="footer-col" key={column.title} aria-label={column.title}>
              <h3>{column.title}</h3>
              <ul>
                {column.links.map(link => (
                  <li key={link.label}><a href={link.href}>{link.label}</a></li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="footer-col footer-cta">
            <h3>Start something</h3>
            <p>Your first chapter is one conversation away.</p>
            <Cta variant="gold">Start Your Project</Cta>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ebookwriters.us. All rights reserved.</p>
          <p className="footer-tag">Write &middot; Publish &middot; Grow</p>
          <a className="footer-top-link" href="#top">Back to top <IconArrowUpRight /></a>
        </div>
      </div>
    </footer>
  );
}

/* Phone sticky CTA: hidden around primary CTAs and interactive sections so it
   never stacks duplicate actions or covers portfolio / accordion controls. */
function MobileBar() {
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    const heroCta = document.querySelector('.hx-live .hx-cta');
    const portfolio = document.getElementById('portfolio');
    const faq = document.getElementById('faq');
    const contact = document.getElementById('contact');
    const footer = document.querySelector('.footer');
    const state = {
      hero: Boolean(heroCta),
      portfolio: false,
      faq: false,
      contact: false,
      footer: false,
    };

    const sync = () => {
      const navOpen = document.body.classList.contains('nav-open');
      setHidden(
        navOpen || state.hero || state.portfolio || state.faq || state.contact || state.footer,
      );
    };

    const observers = [];
    const watch = (el, key, options) => {
      if (!el) return;
      const io = new IntersectionObserver(([entry]) => {
        state[key] = entry.isIntersecting;
        sync();
      }, options);
      io.observe(el);
      observers.push(io);
    };

    watch(heroCta, 'hero', { threshold: 0.2, rootMargin: '0px 0px 0px 0px' });
    watch(portfolio, 'portfolio', { threshold: 0.02 });
    watch(faq, 'faq', { threshold: 0.02 });
    watch(contact, 'contact', { rootMargin: '0px 0px -20% 0px' });
    watch(footer, 'footer', { threshold: 0.02 });

    const mo = new MutationObserver(sync);
    mo.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    sync();

    return () => {
      observers.forEach(io => io.disconnect());
      mo.disconnect();
    };
  }, []);

  return (
    <div className={`mobile-bar${hidden ? ' is-away' : ''}`} aria-hidden={hidden}>
      <p className="mobile-bar-price">
        <strong>From $699</strong>
        <span>Fixed fee, 100% royalties yours</span>
      </p>
      <a className="mobile-bar-cta" href="#contact" tabIndex={hidden ? -1 : 0}>
        Start Your Project
      </a>
    </div>
  );
}

function App() {
  const [selectedPlan, setSelectedPlan] = useState('');
  const progressRef = useRef(null);

  useEffect(() => {
    const bar = progressRef.current;
    const progress = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: self => { if (bar) bar.style.transform = `scaleX(${self.progress})`; },
    });
    if (reduceMotion()) return () => progress.kill();

    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.085,
      wheelMultiplier: 0.95,
      anchors: true,
    });
    const tick = time => lenis.raf(time * 1000);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      progress.kill();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="grain" aria-hidden="true" />
      <div className="scroll-progress" ref={progressRef} aria-hidden="true" />
      <Header />
      <main id="main">
        <Hero />
        <TrustBar />
        <PathBand />
        <Services />
        <Portfolio />
        <DualOffer />
        <Testimonials />
        <Pricing onSelect={setSelectedPlan} />
        <Faq />
        <Contact selectedPlan={selectedPlan} onSelect={setSelectedPlan} />
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}

const container = document.getElementById('root');
// Reuse the root across HMR updates; a fresh createRoot() per reload warns in dev.
container._reactRoot ??= createRoot(container);
container._reactRoot.render(<App />);
