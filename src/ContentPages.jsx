import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconArrow, IconCheck, serviceIcons } from './icons.jsx';
import { plans, services } from './data.js';
import { PageHero } from './PageHero.jsx';
import {
  aboutPage,
  coverPage,
  editingPage,
  faqPage,
  landers,
  notFoundPage,
  pricingPage,
  privacyPage,
  serviceHrefs,
  servicesPage,
  termsPage,
} from './pageContent.js';

function ScrollTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return null;
}

function RelatedLinks({ links }) {
  if (!links?.length) return null;
  return (
    <ul className="content-related">
      {links.map(link => (
        <li key={link.href + link.label}>
          <Link to={link.href}>
            {link.label}
            <IconArrow aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Sections({ sections }) {
  if (!sections?.length) return null;
  return (
    <div className="shell content-body">
      {sections.map(section => (
        <section key={section.heading} className="blog-section">
          <h2>{section.heading}</h2>
          {section.paragraphs?.map(paragraph => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
          {section.bullets ? (
            <ul>
              {section.bullets.map(item => (
                <li key={item}>
                  <IconCheck className="tick" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </div>
  );
}

function PageFaqs({ faqs, title = 'Frequently asked questions' }) {
  if (!faqs?.length) return null;
  return (
    <div className="shell content-body content-faq">
      <section className="blog-section" aria-label={title}>
        <h2>{title}</h2>
        <dl className="content-faq-list">
          {faqs.map(item => (
            <div key={item.q} className="content-faq-item">
              <dt>{item.q}</dt>
              <dd>{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}

function ArticlePage({ page, children }) {
  return (
    <div className="blog-page content-page">
      <ScrollTop />
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        lead={page.lead}
        image={page.heroImage}
        imageAlt={page.heroImageAlt}
        actions={page.actions}
        meta={page.updated ? <p className="content-updated">Last updated {page.updated}</p> : null}
      />
      {children}
      <Sections sections={page.sections} />
      <PageFaqs faqs={page.faqs} />
      {page.links ? (
        <div className="shell content-related-wrap">
          <RelatedLinks links={page.links} />
        </div>
      ) : null}
    </div>
  );
}

function CloseBand({ title, lead, to = '/contact', cta = 'Start Your Project' }) {
  return (
    <section className="blog-close" aria-labelledby="content-close-title">
      <div className="shell blog-close-inner">
        <h2 id="content-close-title">{title}</h2>
        <p>{lead}</p>
        <Link className="cta cta-solid" to={to}>
          <span>{cta}</span>
          <IconArrow className="cta-arrow" />
        </Link>
      </div>
    </section>
  );
}

export function AboutPage() {
  return (
    <>
      <ArticlePage page={aboutPage} />
      <CloseBand
        title="Ready to talk through your book?"
        lead="A 30-minute discovery call, an NDA, and a fixed quote. No hourly billing."
      />
    </>
  );
}

export function PricingPage() {
  return (
    <div className="blog-page content-page">
      <ScrollTop />
      <PageHero
        eyebrow={pricingPage.eyebrow}
        title={pricingPage.title}
        lead={pricingPage.lead}
        image={pricingPage.heroImage}
        imageAlt={pricingPage.heroImageAlt}
        actions={pricingPage.actions}
      />
      <section className="ed-price content-price" aria-label="Publishing packages">
        <div className="shell">
          <div className="ed-price-sheet">
            {plans.map(plan => (
              <article
                className={`ed-price-card${plan.featured ? ' is-featured' : ''}`}
                key={plan.name}
              >
                {plan.featured ? <span className="ed-price-flag">Most popular</span> : null}
                <h2>{plan.name}</h2>
                <p className="ed-price-amt">
                  <i>$</i>
                  {plan.price}
                </p>
                <p className="ed-price-copy">{plan.copy}</p>
                <dl className="ed-price-meta">
                  <div>
                    <dt>Length</dt>
                    <dd>{plan.words}</dd>
                  </div>
                  <div>
                    <dt>Timeline</dt>
                    <dd>{plan.timeline}</dd>
                  </div>
                </dl>
                <ul className="ed-price-features">
                  {plan.features.map(feature => (
                    <li key={feature}>
                      <IconCheck className="tick" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link className="ed-price-cta" to={`/contact?plan=${encodeURIComponent(plan.name)}`}>
                  <span>{plan.featured ? 'Get started' : `Choose ${plan.name}`}</span>
                  <IconArrow aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
          <p className="content-price-note">{pricingPage.note}</p>
        </div>
      </section>
      <CloseBand title="Need a recommendation?" lead={pricingPage.closing} cta="Request a quote" />
    </div>
  );
}

export function ServicesPage() {
  return (
    <div className="blog-page content-page">
      <ScrollTop />
      <PageHero
        eyebrow={servicesPage.eyebrow}
        title={servicesPage.title}
        lead={servicesPage.lead}
        image={servicesPage.heroImage}
        imageAlt={servicesPage.heroImageAlt}
        actions={servicesPage.actions}
      />
      <section className="ed-svc content-svc" aria-label="Service list">
        <div className="shell">
          <ul className="ed-svc-cards">
            {services.map(service => {
              const Icon = serviceIcons[service.key] || IconArrow;
              const href = serviceHrefs[service.key] || service.href || '/contact';
              return (
                <li className="ed-svc-card" key={service.title}>
                  <span className="ed-svc-icon" aria-hidden="true"><Icon /></span>
                  <div className="ed-svc-body">
                    <h2>{service.title}</h2>
                    <p>{service.copy}</p>
                  </div>
                  <Link
                    className="ed-svc-orb"
                    to={href}
                    aria-label={`${href === '/contact' ? 'Inquire about' : 'Learn more about'} ${service.title}`}
                  >
                    <IconArrow aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <div className="shell content-related-wrap">
        <RelatedLinks
          links={[
            { label: 'Ebook ghostwriting services', href: '/ebook-ghostwriting-services' },
            { label: 'Ebook editing services', href: '/ebook-editing-services' },
            { label: 'Ebook cover design', href: '/ebook-cover-design' },
            { label: 'Hire an ebook writer', href: '/hire-ebook-writer' },
            { label: 'Amazon KDP ebook writing', href: '/amazon-kdp-ebook-writing' },
            { label: 'Pricing', href: '/pricing' },
          ]}
        />
      </div>
      <CloseBand
        title="Tell us what you need written."
        lead="We will come back with a fixed scope, price, and timeline — or a clear no if we cannot staff it well."
      />
    </div>
  );
}

function Lander({ page }) {
  return (
    <>
      <ArticlePage page={page} />
      <CloseBand
        title="Start with a fixed quote."
        lead="Share the idea, target length, and deadline. You will hear back within one working day."
        cta="Contact the studio"
      />
    </>
  );
}

export function GhostwritingPage() {
  return <Lander page={landers.ghostwriting} />;
}

export function HireWriterPage() {
  return <Lander page={landers.hire} />;
}

export function KdpPage() {
  return <Lander page={landers.kdp} />;
}

export function EditingPage() {
  return (
    <>
      <ArticlePage page={editingPage} />
      <CloseBand
        title="Send the draft."
        lead="Tell us the length, genre, and which edit you need. You will get a fixed editing quote."
        cta="Request an editing quote"
      />
    </>
  );
}

export function CoverDesignPage() {
  return (
    <>
      <ArticlePage page={coverPage} />
      <CloseBand
        title="Brief the cover."
        lead="Share the genre, title direction, and whether you need ebook, print, or both."
        cta="Request a cover quote"
      />
    </>
  );
}

export function FaqPage() {
  return (
    <>
      <ArticlePage page={faqPage} />
      <CloseBand
        title="Still have a question?"
        lead="Ask about your manuscript, timeline, or package — we reply within one working day."
        cta="Contact the studio"
      />
    </>
  );
}

export function PrivacyPage() {
  return <ArticlePage page={privacyPage} />;
}

export function TermsPage() {
  return <ArticlePage page={termsPage} />;
}

export function NotFoundPage() {
  return (
    <div className="blog-page content-page">
      <ScrollTop />
      <PageHero
        eyebrow={notFoundPage.eyebrow}
        title={notFoundPage.title}
        lead={notFoundPage.lead}
        image={notFoundPage.heroImage}
        imageAlt={notFoundPage.heroImageAlt}
      >
        <div className="page-hero-links">
          <RelatedLinks links={notFoundPage.links} />
        </div>
      </PageHero>
    </div>
  );
}
