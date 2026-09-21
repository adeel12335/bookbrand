import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import {
  IconArrow, IconArrowUpRight, IconBook, IconCheck, IconClose,
  IconConfidential, IconMenu, IconSearch,
  IconWriting, IconWriters, IconPublishing,
  IconCalendar, IconLeaf, IconEditing, IconFormatting, IconBranding,
  serviceIcons,
} from './icons.jsx';
import {
  books, footerLinks, navigation, plans,
  services, hero,
  siteContact,
  portfolioIntro, servicesIntro, benefits, pathBand, dualOffer,
  pricingIntro, contactIntro, footerBrand,
} from './data.js';
import { blogPosts } from './blogPosts.js';
import { Contact, Eyebrow, Reveal, reduceMotion, useRecaptcha } from './ContactSection.jsx';
import { SeoHead } from './SeoHead.jsx';
import './css/fonts.css';
import './css/base.css';
import './css/styles.css';
import './css/Responsive.css';
import './css/Tablet.css';

const BlogIndexPage = lazy(() => import('./BlogPages.jsx').then(m => ({ default: m.BlogIndexPage })));
const BlogPostPage = lazy(() => import('./BlogPages.jsx').then(m => ({ default: m.BlogPostPage })));
const PortfolioPage = lazy(() => import('./PortfolioPage.jsx').then(m => ({ default: m.PortfolioPage })));
const AdminPage = lazy(() => import('./AdminPage.jsx'));
const AboutPage = lazy(() => import('./ContentPages.jsx').then(m => ({ default: m.AboutPage })));
const CoverDesignPage = lazy(() => import('./ContentPages.jsx').then(m => ({ default: m.CoverDesignPage })));
const EditingPage = lazy(() => import('./ContentPages.jsx').then(m => ({ default: m.EditingPage })));
const FaqPage = lazy(() => import('./ContentPages.jsx').then(m => ({ default: m.FaqPage })));
const GhostwritingPage = lazy(() => import('./ContentPages.jsx').then(m => ({ default: m.GhostwritingPage })));
const HireWriterPage = lazy(() => import('./ContentPages.jsx').then(m => ({ default: m.HireWriterPage })));
const KdpPage = lazy(() => import('./ContentPages.jsx').then(m => ({ default: m.KdpPage })));
const NotFoundPage = lazy(() => import('./ContentPages.jsx').then(m => ({ default: m.NotFoundPage })));
const PricingPage = lazy(() => import('./ContentPages.jsx').then(m => ({ default: m.PricingPage })));
const PrivacyPage = lazy(() => import('./ContentPages.jsx').then(m => ({ default: m.PrivacyPage })));
const EditorialPolicyPage = lazy(() => import('./ContentPages.jsx').then(m => ({ default: m.EditorialPolicyPage })));
const ServicesPage = lazy(() => import('./ContentPages.jsx').then(m => ({ default: m.ServicesPage })));
const TermsPage = lazy(() => import('./ContentPages.jsx').then(m => ({ default: m.TermsPage })));
const SearchPage = lazy(() => import('./SearchPage.jsx'));

function RouteFallback() {
  return <div className="container" style={{ padding: '4rem 0' }} aria-busy="true">Loading…</div>;
}

/*
 * GSAP, ScrollTrigger and Lenis only drive enhancements (smooth scroll, the
 * progress bar, magnetic CTAs), so they load after first paint instead of
 * riding in the main bundle. One shared promise; callers must tolerate the
 * libraries arriving late.
 */
let motionLibs;
function loadMotion() {
  motionLibs ??= Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
    import('lenis'),
  ]).then(([{ gsap }, { ScrollTrigger }, { default: Lenis }]) => {
    gsap.registerPlugin(ScrollTrigger);
    return { gsap, ScrollTrigger, Lenis };
  });
  return motionLibs;
}

/* ------------------------------------------------------------------ helpers */

/** Cursor-following pull on primary calls to action. Pointer-fine devices only. */
function useMagnetic(strength = 0.28) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || reduceMotion()) return undefined;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;
    let gsap = null;
    loadMotion().then(libs => { gsap = libs.gsap; });
    const move = event => {
      if (!gsap) return;
      const rect = node.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      gsap.to(node, { x: x * strength, y: y * strength, duration: 0.5, ease: 'power3.out' });
    };
    const reset = () => gsap?.to(node, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
    node.addEventListener('pointermove', move);
    node.addEventListener('pointerleave', reset);
    return () => {
      node.removeEventListener('pointermove', move);
      node.removeEventListener('pointerleave', reset);
      gsap?.killTweensOf(node);
    };
  }, [strength]);
  return ref;
}

function Cta({ href = '/contact', variant = 'solid', className = '', children, onClick }) {
  const ref = useMagnetic(variant === 'solid' ? 0.24 : 0.16);
  return (
    <a ref={ref} className={`cta cta-${variant} ${className}`.trim()} href={href} onClick={onClick}>
      <span>{children}</span>
      <IconArrow className="cta-arrow" />
    </a>
  );
}

function Wordmark({ light = false, className = '' }) {
  return (
    <Link className={`wordmark ${className}`.trim()} to="/" aria-label="ebookwriters.us — home">
      <img
        src={light ? '/assets/brand/logo-light.png' : '/assets/brand/logo-dark-new.png'}
        alt="ebookwriters.us — Write. Publish. Grow."
      />
    </Link>
  );
}

/* ------------------------------------------------------------------- header */

function navHref(href) {
  if (href.startsWith('#')) return `/${href}`;
  return href;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [active, setActive] = useState('');
  const toggleRef = useRef(null);
  const location = useLocation();
  const onHome = location.pathname === '/';

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
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle('nav-open', open);
    return () => document.body.classList.remove('nav-open');
  }, [open]);

  return (
    <>
      <div className="alert-bar">
        <div className="container">
          Fixed packages from $699 — you keep 100% of the rights and royalties.
        </div>
      </div>
      <header
        className={`site-header${onHome ? ' site-header--home' : ''}${stuck ? ' is-stuck' : ''}${open ? ' is-open' : ''}`}
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
        <div className="container">
          <div className="header-inner">
            <Wordmark />
            <nav id="primary-nav" className="primary-nav" aria-label="Primary">
              <ul>
                {navigation.map(item => {
                  const href = onHome ? item.href : navHref(item.href);
                  const isRoute = href.startsWith('/') && !href.startsWith('/#');
                  const prefixes = item.match || [href];
                  const isCurrent = isRoute && prefixes.some(prefix => (
                    location.pathname === prefix
                    || (prefix !== '/' && location.pathname.startsWith(`${prefix}/`))
                  ));
                  return (
                    <li key={item.href}>
                      {isRoute ? (
                        <Link
                          to={href}
                          onClick={() => setOpen(false)}
                          aria-current={isCurrent ? 'page' : undefined}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <a
                          href={href}
                          onClick={() => setOpen(false)}
                          aria-current={onHome && active === item.href ? 'true' : undefined}
                        >
                          {item.label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
              <Link className="nav-cta" to="/contact" onClick={() => setOpen(false)}>
                Start Your Project
              </Link>
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
        </div>
      </header>
    </>
  );
}

/* --------------------------------------------------------------------- hero */

function Hero() {
  const title = hero.lines.slice(0, -1).join(' ');
  const accent = hero.lines[hero.lines.length - 1];

  return (
    <section
      className="hero-section"
      id="top"
      style={{
        '--bgDesktop': "url('/assets/brand/hero-desktop.png')",
        '--bgMobile': "url('/assets/brand/hero-mob.png')",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="br_wrapper_content_hero_home">
              <div className="content">
                <h1 className="br-primary-heading">{title} <span>{accent}</span></h1>
                <p>{hero.leadVisible}</p>
                <div className="br_wrapper_buttons">
                  <a className="btn" href="/contact">{hero.cta}</a>
                  <a className="btn-outline" href={hero.link.href}>{hero.link.label}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- services */

const benefitIcons = {
  writers: IconWriters,
  nda: IconConfidential,
  ownership: IconBook,
  included: IconEditing,
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
      <div className="container">
        <div className="row">
          <div className="col-md-12">
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
        </div>
      </div>
    </section>
  );
}

function PathBand() {
  return (
    <section className="ed-path" id="why" aria-labelledby="why-title">
      <div className="container">
        <div className="row">
          <Reveal className="col-md-6 ed-path-copy">
            <div className="content">
              <Eyebrow tone="light">{pathBand.eyebrow}</Eyebrow>
              <h2 id="why-title">
                {pathBand.title}{' '}
                <em>{pathBand.titleEm}</em>
              </h2>
              <p>{pathBand.lead}</p>
              <a className="btn br_path_cta" href="/contact">{pathBand.cta}</a>
              <ol className="br_path_steps">
                {pathBand.journey.map((label, i) => {
                  const Icon = journeyIcons[i] || IconCheck;
                  return (
                    <li key={label}>
                      <span className="br_path_step_icon" aria-hidden="true"><Icon /></span>
                      <span className="br_path_step_label">{label}</span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </Reveal>
          <Reveal className="col-md-6 ed-path-visual" delay={100}>
            <img
              src={pathBand.image}
              alt={pathBand.imageAlt}
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
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="ed-svc" id="services" aria-labelledby="services-title">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
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
                    <Link
                      className="ed-svc-orb"
                      to={service.href || '/contact'}
                      aria-label={`Learn more about ${service.title}`}
                    >
                      <IconArrow aria-hidden="true" />
                    </Link>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- portfolio */

function Portfolio() {
  const shelf = books.slice(0, 6).map(book => ({ ...book, cover: book.image }));
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
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Reveal className="br_section_head">
              <div className="br_section_head_copy">
                <Eyebrow>{portfolioIntro.eyebrow}</Eyebrow>
                <h2 id="portfolio-title">{portfolioIntro.title}</h2>
                <p>{portfolioIntro.meta}</p>
              </div>
              <a className="btn" href={portfolioIntro.linkHref}>{portfolioIntro.linkLabel}</a>
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
                          alt={`${book.title} by ${book.author} — ${book.genre} book cover`}
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
                    <a href="/contact">
                      Start a similar project
                      <IconArrow aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- dual offer */

function DualCard({ offer, tone }) {
  return (
    <article className={`br_duo_card br_duo_card--${tone}`}>
      <p className="br_duo_kicker">
        <span>{offer.index}</span>
        {offer.tag}
      </p>
      <h3>{offer.title}</h3>
      <p className="br_duo_lead">{offer.lead}</p>
      <ul className="br_duo_list">
        {offer.checklist.map(item => (
          <li key={item}><IconCheck aria-hidden="true" />{item}</li>
        ))}
      </ul>
      <a className={tone === 'dark' ? 'btn' : 'btn-outline'} href={offer.href}>{offer.cta}</a>
    </article>
  );
}

function DualOffer() {
  const { intro, publish, market } = dualOffer;

  return (
    <section className="br_duo" id="publish" aria-labelledby="ed-duo-title">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Reveal className="br_duo_head">
              <Eyebrow>{intro.eyebrow}</Eyebrow>
              <h2 id="ed-duo-title">
                {intro.title} <span>{intro.titleEm}</span>
              </h2>
              <p>{intro.lead}</p>
              <p className="br_duo_note">{intro.note}</p>
            </Reveal>
          </div>
        </div>
        <div className="row br_grid">
          <Reveal className="col-md-6">
            <DualCard offer={publish} tone="dark" />
          </Reveal>
          <Reveal className="col-md-6" delay={100}>
            <DualCard offer={market} tone="light" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ pricing */

function PricingPreview() {
  return (
    <section className="br_price_preview" id="pricing" aria-labelledby="pricing-title">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Reveal className="br_pricing_head">
              <Eyebrow>{pricingIntro.eyebrow}</Eyebrow>
              <h2 id="pricing-title">
                {pricingIntro.title} <span>{pricingIntro.titleEm}</span>
              </h2>
              <p>Fixed starting prices by manuscript length. Full feature lists, revision rounds, and what is not included live on the pricing page.</p>
            </Reveal>
          </div>
        </div>
        <div className="row">
          <div className="col-md-10">
            <div className="br_compare_scroll">
              <table className="br_compare">
                <thead>
                  <tr>
                    <th scope="col">Package</th>
                    <th scope="col">Starting from</th>
                    <th scope="col">Length</th>
                    <th scope="col">Timeline</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map(plan => (
                    <tr key={plan.name}>
                      <th scope="row">{plan.name}</th>
                      <td>${plan.price}</td>
                      <td>{plan.words}</td>
                      <td>{plan.timeline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="br_price_preview_cta">
              <Link className="btn" to="/pricing">View full pricing</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Latest() {
  const posts = blogPosts.slice(0, 3);
  if (!posts.length) return null;

  return (
    <section className="br_latest" aria-labelledby="latest-title">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Reveal className="br_section_head">
              <div className="br_section_head_copy">
                <Eyebrow>From the blog</Eyebrow>
                <h2 id="latest-title">The latest</h2>
              </div>
              <Link className="btn" to="/blog">View all articles</Link>
            </Reveal>
          </div>
        </div>
        <div className="row br_grid">
          {posts.map((post, i) => (
            <Reveal className="col-md-4" key={post.slug} delay={i * 70}>
              <article className="br_post_card">
                <Link to={`/blog/${post.slug}`}>
                  {post.image ? (
                    <img src={post.image} alt={post.imageAlt || post.title} loading="lazy" />
                  ) : null}
                  <ul className="br_post_tags">
                    <li>{post.category}</li>
                    {post.eyebrow ? <li>{post.eyebrow}</li> : null}
                  </ul>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <time className="br_post_date" dateTime={post.date}>{post.dateLabel}</time>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- footer */

function FooterSignup() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const getRecaptchaToken = useRecaptcha();

  async function handleSubmit(event) {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get('email');
    setStatus('sending');
    try {
      const recaptchaToken = await getRecaptchaToken('contact');
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Newsletter subscriber',
          email,
          message: 'Newsletter signup from the website footer.',
          timeline: 'Newsletter',
          recaptchaToken,
          sourcePath: `${window.location.pathname}#newsletter`,
        }),
      });
      setStatus(response.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <p className="br_footer_thanks" role="status">
        Thanks for signing up — we will send you our latest publishing tips.
      </p>
    );
  }

  return (
    <div className="br_footer_signup">
      <h2>Sign up to get the latest</h2>
      <form className="br_footer_form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          required
          maxLength={254}
          placeholder="Enter your email..."
          aria-label="Your email address"
          autoComplete="email"
        />
        <button type="submit" className="btn" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Subscribe'}
        </button>
      </form>
      {status === 'error' ? (
        <p className="br_footer_error" role="status">
          Something went wrong. Please try again or email {siteContact.email}.
        </p>
      ) : null}
    </div>
  );
}

function FooterSearch() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const q = String(new FormData(event.currentTarget).get('q') || '').trim();
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : '/search');
  }

  return (
    <form className="br_footer_search" role="search" onSubmit={handleSubmit}>
      <input type="search" name="q" placeholder="Search..." aria-label="Search the site" autoComplete="off" />
      <button type="submit" aria-label="Search">
        <IconSearch aria-hidden="true" />
      </button>
    </form>
  );
}

function Footer() {
  const location = useLocation();
  const onHome = location.pathname === '/';

  return (
    <footer className="br_footer">
      <div className="container br_footer_top">
        <div className="row align-items-center">
          <div className="col-md-3">
            <Wordmark light />
          </div>
          <div className="col-md-9">
            <FooterSignup />
          </div>
        </div>
      </div>

      <div className="container br_footer_menus">
        <div className="row">
          {footerLinks.map(column => (
            <nav className="col-md-4" key={column.title} aria-label={column.title}>
              <ul className={`br_footer_menu${column.links.length > 6 ? ' br_footer_menu--split' : ''}`}>
                <li className="br_footer_menu_title">{column.title}</li>
                {column.links.map(link => {
                  const href = link.href.startsWith('#') && !onHome ? navHref(link.href) : link.href;
                  const isRoute = href.startsWith('/') && !href.startsWith('/#');
                  return (
                    <li key={link.label}>
                      {isRoute ? <Link to={href}>{link.label}</Link> : <a href={href}>{link.label}</a>}
                    </li>
                  );
                })}
              </ul>
            </nav>
          ))}
          <div className="col-md-4">
            <ul className="br_footer_menu">
              <li className="br_footer_menu_title">Get in touch</li>
              <li><a href={`mailto:${siteContact.email}`}>{siteContact.email}</a></li>
              <li><a href={siteContact.phoneHref}>{siteContact.phone}</a></li>
              <li><Link to="/contact">{footerBrand.ctaLabel}</Link></li>
            </ul>
            <FooterSearch />
          </div>
        </div>
      </div>

      <div className="container br_footer_bottom">
        <div className="row align-items-center">
          <div className="col-md-8">
            <p>{footerBrand.blurb}</p>
            <p className="br_footer_policy">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </p>
            <p>&copy; {new Date().getFullYear()} ebookwriters.us. All rights reserved.</p>
          </div>
          <div className="col-md-4 br_footer_backtop">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion() ? 'auto' : 'smooth' })}
            >
              Back to top <IconArrowUpRight aria-hidden="true" />
            </button>
          </div>
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
    const heroCta = document.querySelector('.hero-section .btn');
    const pathCard = document.querySelector('.ed-path-card');
    const portfolio = document.getElementById('portfolio');
    const faq = document.getElementById('faq');
    const contact = document.getElementById('contact');
    const footer = document.querySelector('.footer');
    const state = {
      hero: Boolean(heroCta),
      path: false,
      portfolio: false,
      faq: false,
      contact: false,
      footer: false,
    };

    const sync = () => {
      const navOpen = document.body.classList.contains('nav-open');
      setHidden(
        navOpen
        || state.hero
        || state.path
        || state.portfolio
        || state.faq
        || state.contact
        || state.footer,
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
    watch(pathCard, 'path', { threshold: 0.15, rootMargin: '40px 0px 40px 0px' });
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
      <a className="mobile-bar-cta" href="/contact" tabIndex={hidden ? -1 : 0}>
        Start Your Project
      </a>
    </div>
  );
}

function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView();
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, search, hash]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SeoHead />
      <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogShell><BlogIndexPage /></BlogShell>} />
        <Route path="/blog/:slug" element={<BlogShell><BlogPostPage /></BlogShell>} />
        <Route path="/portfolio" element={<BlogShell><PortfolioPage /></BlogShell>} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/about" element={<BlogShell><AboutPage /></BlogShell>} />
        <Route path="/pricing" element={<BlogShell><PricingPage /></BlogShell>} />
        <Route path="/services" element={<BlogShell><ServicesPage /></BlogShell>} />
        <Route path="/ebook-ghostwriting-services" element={<BlogShell><GhostwritingPage /></BlogShell>} />
        <Route path="/ghostwriting" element={<Navigate to="/ebook-ghostwriting-services" replace />} />
        <Route path="/hire-ebook-writer" element={<BlogShell><HireWriterPage /></BlogShell>} />
        <Route path="/amazon-kdp-ebook-writing" element={<BlogShell><KdpPage /></BlogShell>} />
        <Route path="/ebook-editing-services" element={<BlogShell><EditingPage /></BlogShell>} />
        <Route path="/ebook-cover-design" element={<BlogShell><CoverDesignPage /></BlogShell>} />
        <Route path="/faq" element={<BlogShell><FaqPage /></BlogShell>} />
        <Route path="/privacy" element={<BlogShell><PrivacyPage /></BlogShell>} />
        <Route path="/editorial-policy" element={<BlogShell><EditorialPolicyPage /></BlogShell>} />
        <Route path="/terms" element={<BlogShell><TermsPage /></BlogShell>} />
        <Route path="/search" element={<BlogShell><SearchPage /></BlogShell>} />
        <Route path="*" element={<BlogShell><NotFoundPage /></BlogShell>} />
      </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

function BlogShell({ children }) {
  return (
    <div className="blog-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="grain" aria-hidden="true" />
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}

function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="contact-page">
      <a className="skip-link" href="#contact">Skip to content</a>
      <div className="grain" aria-hidden="true" />
      <Header />
      <main id="main">
        <Contact asPage />
      </main>
      <Footer />
    </div>
  );
}

function HomePage() {
  const progressRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let teardown = () => {};
    loadMotion().then(({ gsap, ScrollTrigger, Lenis }) => {
      if (cancelled) return;
      const bar = progressRef.current;
      const progress = ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: self => { if (bar) bar.style.transform = `scaleX(${self.progress})`; },
      });
      if (reduceMotion()) {
        teardown = () => progress.kill();
        return;
      }

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
      teardown = () => {
        progress.kill();
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    });
    return () => {
      cancelled = true;
      teardown();
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
        <PricingPreview />
        <Latest />
        <Contact />
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
