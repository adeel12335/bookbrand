import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
  IconArrow, IconArrowUpRight, IconBook, IconChart, IconCheck, IconClose,
  IconMail, IconMenu, IconPhone, IconPlus, IconQuote, IconStar, IconWriters,
  serviceIcons,
} from './icons.jsx';
import {
  books, faqs, footerLinks, heroTrust, navigation, plans, platforms,
  services, stats, steps, testimonials, values,
} from './data.js';
import './fonts.css';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const heroTrustIcons = { book: IconBook, writers: IconWriters, chart: IconChart };

const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------------ helpers */

function useInView(options = {}) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node || seen) return undefined;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSeen(true);
        io.disconnect();
      }
    }, { threshold: 0.2, rootMargin: '0px 0px -6% 0px', ...options });
    io.observe(node);
    return () => io.disconnect();
  }, [seen, options.threshold, options.rootMargin]);
  return [ref, seen];
}

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
        <Wordmark />
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
            Start Your Project <IconArrowUpRight />
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
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-line > span', { yPercent: 108, duration: 1.05, stagger: 0.11 }, 0.1)
        .from('.hero .eyebrow', { opacity: 0, x: -14, duration: 0.7 }, 0.1)
        .from('.hero-lead', { opacity: 0, y: 18, duration: 0.8 }, 0.55)
        .from('.hero-actions > *', { opacity: 0, y: 18, duration: 0.7, stagger: 0.08 }, 0.68)
        .from('.hero-trust li', { opacity: 0, y: 16, duration: 0.7, stagger: 0.08 }, 0.82)
        .from('.hero-media', { clipPath: 'inset(0 0 0 100%)', duration: 1.25, ease: 'power4.inOut' }, 0)
        .from(imageRef.current, { scale: 1.16, duration: 1.6, ease: 'power3.out' }, 0);

      gsap.to(imageRef.current, {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="top" ref={rootRef}>
      <div className="hero-grid">
        <div className="hero-copy">
          <Eyebrow>Ideas become impact</Eyebrow>
          <h1>
            <span className="hero-line"><span>Turn Your Ideas</span></span>
            <span className="hero-line"><span>Into a <em>Published Book.</em></span></span>
          </h1>
          <p className="hero-lead">
            We help experts, entrepreneurs and aspiring authors bring their ideas to life through
            professional ebook writing, ghostwriting, editing, formatting and publishing support.
          </p>
          <div className="hero-actions">
            <Cta variant="gold">Start Your Project</Cta>
            <Cta href="#services" variant="ghost">View Services</Cta>
          </div>
          <ul className="hero-trust">
            {heroTrust.map(item => {
              const Icon = heroTrustIcons[item.icon];
              return (
                <li key={item.title}>
                  <Icon className="hero-trust-icon" />
                  <span><strong>{item.title}</strong>{item.sub}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="hero-media">
          <img
            ref={imageRef}
            src="/assets/brand/hero-desk.jpg"
            alt="A dark green hardback reading “A Brighter Story Awaits” resting on a stack of cream books labelled Ideas, Strategy, Writing and Publishing, beside a fountain pen and a mug."
            width="1313"
            height="1179"
            fetchPriority="high"
            decoding="async"
          />
          <div className="hero-media-veil" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- platforms */

function PlatformStrip() {
  const row = useMemo(() => [...platforms, ...platforms], []);
  return (
    <section className="platforms" aria-label="Publishing platforms we work with">
      <div className="shell platforms-head">
        <p>We publish to every major store</p>
      </div>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {row.map((name, i) => (
            <span key={`${name}-${i}`} className="marquee-item">
              {name}<i />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- stats */

function Counter({ to, suffix }) {
  const [ref, seen] = useInView({ threshold: 0.45 });
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!seen) return undefined;
    if (reduceMotion()) {
      setValue(to);
      return undefined;
    }
    const box = { n: 0 };
    const tween = gsap.to(box, {
      n: to,
      duration: 1.6,
      ease: 'power2.out',
      onUpdate: () => setValue(Math.round(box.n)),
    });
    return () => tween.kill();
  }, [seen, to]);
  return <span ref={ref} className="stat-value">{value.toLocaleString('en-US')}<i>{suffix}</i></span>;
}

function Stats() {
  return (
    <section className="stats" aria-label="Studio at a glance">
      <div className="shell stats-grid">
        {stats.map((stat, i) => (
          <Reveal as="div" className="stat" key={stat.label} delay={i * 80}>
            <Counter to={stat.value} suffix={stat.suffix} />
            <p className="stat-label">{stat.label}</p>
            <p className="stat-note">{stat.note}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- services */

function Services() {
  return (
    <section className="section services" id="services">
      <div className="shell">
        <div className="services-intro">
          <Reveal className="section-head">
            <Eyebrow>What we do</Eyebrow>
            <h2>Everything your book needs,<br /><em>under one roof.</em></h2>
            <p className="section-lead">
              Six services that cover the whole journey, from the first outline to the day your book
              goes live. Take one, or hand us the lot.
            </p>
          </Reveal>
          <Reveal className="services-editorial" delay={120}>
            <img
              src="/assets/brand/why-stack.jpg"
              alt="Ivory books labelled Ideas, Strategy, Writing and Publishing beside a fountain pen"
              loading="lazy"
              width="1200"
              height="594"
            />
            <span>From first thought<br />to finished book.</span>
          </Reveal>
        </div>
        <div className="service-grid">
          {services.map((service, i) => {
            const Icon = serviceIcons[service.key];
            return (
              <Reveal as="article" className={`service-card${i === 0 ? ' is-featured' : ''}`} key={service.title} delay={(i % 3) * 90}>
                <span className="service-n">{service.n}</span>
                <span className="service-icon"><Icon /></span>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
                <ul>
                  {service.points.map(point => (
                    <li key={point}><IconCheck className="tick" />{point}</li>
                  ))}
                </ul>
                <a className="service-link" href="#contact">
                  Discuss this service <IconArrowUpRight />
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ process */

function Process() {
  const railRef = useRef(null);
  useEffect(() => {
    const rail = railRef.current;
    if (!rail || reduceMotion()) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo('.process-rail-fill',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: rail, start: 'top 72%', end: 'bottom 65%', scrub: 0.6 },
        });
    }, rail);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section process" id="process">
      <div className="shell">
        <Reveal className="section-head section-head-split">
          <div>
            <Eyebrow>How it works</Eyebrow>
            <h2>Four steps.<br /><em>No guesswork.</em></h2>
          </div>
          <p className="section-lead">
            You always know what is happening, what comes next and when it lands. Here is the
            whole process, start to finish.
          </p>
        </Reveal>
        <div className="process-rail" ref={railRef}>
          <div className="process-rail-line" aria-hidden="true">
            <span className="process-rail-fill" />
          </div>
          <ol className="process-grid">
            {steps.map((step, i) => (
              <Reveal as="li" className="process-step" key={step.n} delay={i * 110}>
                <span className="process-badge" aria-hidden="true">{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </Reveal>
            ))}
          </ol>
        </div>
        <Reveal className="process-foot">
          <p>Not sure which step you are on? That is what the discovery call is for.</p>
          <Cta variant="line">Book a free call</Cta>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- why / us */

function WhyUs() {
  return (
    <section className="section why" id="why">
      <div className="why-wash" aria-hidden="true" />
      <div className="shell why-inner">
        <Reveal className="why-copy">
          <Eyebrow tone="light">Our manifesto</Eyebrow>
          <h2>A publisher&rsquo;s standard,<br /><em>without the publisher.</em></h2>
          <p className="section-lead">
            You keep the rights, the royalties and the final say. We bring the editorial team,
            the production quality and twelve years of knowing what actually sells.
          </p>
          <p className="why-signoff"><span>Your story matters</span>A thoughtful partner at every chapter.</p>
        </Reveal>
        <Reveal className="why-media" delay={100}>
          <img
            src="/assets/brand/manifesto-books.png"
            alt="A forest-green hardback on ivory books beside a black-and-gold fountain pen"
            loading="lazy"
            width="1122"
            height="1402"
          />
          <span className="why-media-caption">Ideas today.<br />A brighter tomorrow.</span>
        </Reveal>
        <ol className="why-list">
          {values.map((value, i) => {
            return (
              <Reveal as="li" className="why-item" key={value.title} delay={i * 90}>
                <span className="why-number">{i + 1}</span>
                <div>
                  <h3>{value.title}</h3>
                  <p>{value.copy}</p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- portfolio */

function Portfolio() {
  return (
    <section className="section portfolio" id="portfolio">
      <div className="shell">
        <Reveal className="section-head section-head-split">
          <div>
            <Eyebrow>Recent work</Eyebrow>
            <h2>Books we helped<br /><em>bring into the world.</em></h2>
          </div>
          <p className="section-lead">
            Different authors, different genres, the same standard of finish. A small selection
            of recent titles and cover work.
          </p>
        </Reveal>
        <div className="book-grid">
          {books.map((book, i) => (
            <Reveal as="article" className="book-card" key={book.title} delay={i * 110}>
              <div className="book-visual">
                <img src={book.image} alt={`Cover concept for ${book.title}`} loading="lazy" />
              </div>
              <div className="book-meta">
                <span className="book-genre">{book.genre}</span>
                <h3>{book.title}</h3>
                <p>{book.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- testimonials */

function Testimonials() {
  const [index, setIndex] = useState(0);
  const count = testimonials.length;
  const go = useCallback(next => setIndex(((next % count) + count) % count), [count]);
  const current = testimonials[index];

  return (
    <section className="section quotes" aria-label="What our authors say">
      <div className="shell quotes-inner">
        <Reveal className="quotes-head">
          <Eyebrow tone="light">Author stories</Eyebrow>
          <h2>Real books.<br /><em>Real results.</em></h2>
          <div className="quotes-rating">
            <span className="stars" aria-hidden="true">
              {Array.from({ length: 5 }, (_, i) => <IconStar key={i} />)}
            </span>
            <p>4.9 out of 5 &mdash; across 210 reviews</p>
          </div>
        </Reveal>
        <Reveal className="quotes-stage" delay={120}>
          <IconQuote className="quotes-mark" />
          <blockquote key={current.name}>
            <p>{current.quote}</p>
            <footer>
              <span className="quote-avatar">
                <img
                  src={current.avatar}
                  alt={`Portrait of ${current.name}`}
                  width="240"
                  height="236"
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className="quote-who">
                <strong>{current.name}</strong>
                <span>{current.role}</span>
              </span>
            </footer>
          </blockquote>
          <div className="quotes-controls">
            <button type="button" onClick={() => go(index - 1)} aria-label="Previous testimonial">
              <IconArrow className="flip" />
            </button>
            <div className="quotes-dots" role="tablist" aria-label="Choose a testimonial">
              {testimonials.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Testimonial from ${item.name}`}
                  className={i === index ? 'is-on' : ''}
                  onClick={() => go(i)}
                />
              ))}
            </div>
            <button type="button" onClick={() => go(index + 1)} aria-label="Next testimonial">
              <IconArrow />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ pricing */

function Pricing({ onSelect }) {
  return (
    <section className="section pricing" id="pricing">
      <div className="shell">
        <Reveal className="section-head">
          <Eyebrow>Packages</Eyebrow>
          <h2>Clear pricing.<br /><em>No surprise invoices.</em></h2>
          <p className="section-lead">
            One fixed price per package, agreed before we start. Everything below includes the
            writing, the editing, the cover and the files.
          </p>
        </Reveal>
        <div className="plan-grid">
          {plans.map((plan, i) => (
            <Reveal as="article" className={`plan${plan.featured ? ' is-featured' : ''}`} key={plan.name} delay={i * 80}>
              {plan.featured ? <span className="plan-flag">Most chosen</span> : null}
              <header className="plan-head">
                <h3>{plan.name}</h3>
                <p>{plan.copy}</p>
              </header>
              <p className="plan-price"><i>$</i>{plan.price}</p>
              <dl className="plan-specs">
                <div><dt>Length</dt><dd>{plan.words}</dd></div>
                <div><dt>Timeline</dt><dd>{plan.timeline}</dd></div>
              </dl>
              <ul className="plan-features">
                {plan.features.map(feature => (
                  <li key={feature}><IconCheck className="tick" />{feature}</li>
                ))}
              </ul>
              <a className="plan-cta" href="#contact" onClick={() => onSelect(plan.name)}>
                Choose {plan.name} <IconArrowUpRight />
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal className="pricing-note">
          <p>
            Working on something larger, or a series? <a href="#contact">Ask for a bespoke quote</a>
            {' '}&mdash; most custom projects are scoped within two working days.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------- faq */

function FaqItem({ item, open, onToggle }) {
  const panelId = useId();
  const buttonId = useId();
  const panelRef = useRef(null);
  return (
    <div className={`faq-item${open ? ' is-open' : ''}`}>
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span>{item.q}</span>
          <IconPlus className="faq-sign" />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="faq-panel"
        ref={panelRef}
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div><p>{item.a}</p></div>
      </div>
    </div>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section faq" id="faq">
      <div className="shell faq-inner">
        <Reveal className="faq-head">
          <Eyebrow>Questions</Eyebrow>
          <h2>Everything authors<br /><em>ask us first.</em></h2>
          <p className="section-lead">
            Still unsure about something? Send it over and we will answer plainly, without a
            sales pitch attached.
          </p>
          <Cta variant="line">Ask us directly</Cta>
        </Reveal>
        <Reveal className="faq-list" delay={100}>
          {faqs.map((item, i) => (
            <FaqItem
              key={item.q}
              item={item}
              open={open === i}
              onToggle={() => setOpen(open === i ? -1 : i)}
            />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- cta strip */

function CtaBanner() {
  return (
    <section className="cta-banner" aria-label="Start your project">
      <div className="cta-banner-wash" aria-hidden="true" />
      <div className="shell cta-banner-inner">
        <Reveal className="cta-banner-copy">
          <Eyebrow tone="light">Your story matters</Eyebrow>
          <h2>Ready to build your next book?</h2>
          <p>Let us turn your ideas into a published work you are proud of.</p>
        </Reveal>
        <Reveal className="cta-banner-action" delay={120}>
          <Cta variant="gold">Start Your Project</Cta>
          <p className="cta-banner-tag">Write &middot; Publish &middot; Grow</p>
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
    <section className="section contact" id="contact">
      <div className="shell contact-grid">
        <Reveal className="contact-copy">
          <Eyebrow>Let us talk</Eyebrow>
          <h2>Every great book<br /><em>starts with a conversation.</em></h2>
          <p className="section-lead">
            Tell us what you want to write and who it is for. You will hear back from a real
            editor within one working day, with a straight answer on scope, price and timing.
          </p>
          <ul className="contact-points">
            <li><IconCheck className="tick" />Free 30-minute discovery call</li>
            <li><IconCheck className="tick" />NDA signed before you share anything</li>
            <li><IconCheck className="tick" />Fixed quote, no hourly billing</li>
          </ul>
          <div className="contact-direct">
            <a href="mailto:hello@ebookwriters.us"><IconMail /> hello@ebookwriters.us</a>
            <a href="tel:+18005550142"><IconPhone /> +1 (800) 555-0142</a>
          </div>
        </Reveal>

        <Reveal className="contact-panel" delay={120}>
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
            <form className="contact-form" onSubmit={handleSubmit} noValidate={false}>
              <div className="field-row">
                <label className="field">
                  <span>Your name</span>
                  <input name="name" autoComplete="name" required maxLength={120} placeholder="Alex Morgan" />
                </label>
                <label className="field">
                  <span>Email address</span>
                  <input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="alex@company.com" />
                </label>
              </div>
              <div className="field-row">
                <label className="field">
                  <span>Package of interest</span>
                  <select name="interest" value={selectedPlan} onChange={e => onSelect(e.target.value)}>
                    <option value="">Help me choose</option>
                    {plans.map(plan => (
                      <option key={plan.name} value={plan.name}>{plan.name} — ${plan.price}</option>
                    ))}
                  </select>
                </label>
                <label className="field">
                  <span>Ideal timeline</span>
                  <select name="timeline" defaultValue="Within 3 months">
                    <option>As soon as possible</option>
                    <option>Within 3 months</option>
                    <option>Within 6 months</option>
                    <option>Just exploring</option>
                  </select>
                </label>
              </div>
              <label className="field">
                <span>Tell us about your book</span>
                <textarea
                  name="message"
                  rows={5}
                  required
                  maxLength={4000}
                  placeholder="The idea, who it is for, and what you want it to do for you."
                  onInput={e => e.target.setCustomValidity('')}
                />
              </label>
              <div className="form-foot">
                <button type="submit" className="cta cta-solid">
                  <span>Prepare my brief</span><IconArrow className="cta-arrow" />
                </button>
                <p>Builds a brief you can copy. No message is sent from this demo form.</p>
              </div>
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
              <a href="mailto:hello@ebookwriters.us"><IconMail /> hello@ebookwriters.us</a>
              <a href="tel:+18005550142"><IconPhone /> +1 (800) 555-0142</a>
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

/* ---------------------------------------------------------------------- app */

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

    // `anchors` is required: without it Lenis animates back to its own target and
    // every in-page nav link snaps straight back to the top of the document.
    const lenis = new Lenis({
      autoRaf: false,
      lerp: 0.085,
      wheelMultiplier: 0.95,
      anchors: true,  // gap under the sticky header comes from `scroll-padding-top`
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
        <PlatformStrip />
        <Stats />
        <Services />
        <Process />
        <WhyUs />
        <Portfolio />
        <Testimonials />
        <Pricing onSelect={setSelectedPlan} />
        <Faq />
        <CtaBanner />
        <Contact selectedPlan={selectedPlan} onSelect={setSelectedPlan} />
      </main>
      <Footer />
    </>
  );
}

const container = document.getElementById('root');
// Reuse the root across HMR updates; a fresh createRoot() per reload warns in dev.
container._reactRoot ??= createRoot(container);
container._reactRoot.render(<App />);
