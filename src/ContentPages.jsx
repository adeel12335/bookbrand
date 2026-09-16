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

function ServiceDetail({ page, closeTitle, closeLead, closeCta, closeTo = '/contact' }) {
  return (
    <div className="blog-page content-page sd-page">
      <ScrollTop />
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        lead={page.lead}
        image={page.heroImage}
        imageAlt={page.heroImageAlt}
        actions={page.actions}
      />

      {page.sections?.length ? (
        <div className="sd-sections">
          <div className="shell sd-rail">
            {page.sections.map((section, i) => (
              <section
                key={section.heading}
                className={`sd-block${section.bullets?.length ? ' sd-block--with-points' : ''}`}
              >
                <header className="sd-head">
                  <span className="sd-n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <h2>{section.heading}</h2>
                </header>
                <div className="sd-copy">
                  {section.paragraphs?.map(paragraph => (
                    <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                  ))}
                </div>
                {section.bullets?.length ? (
                  <ul className="sd-points">
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
        </div>
      ) : null}

      {page.faqs?.length ? (
        <section className="sd-faq" aria-labelledby="sd-faq-title">
          <div className="shell sd-rail">
            <header className="sd-faq-head">
              <p className="eyebrow"><span>Questions</span><i aria-hidden="true" /></p>
              <h2 id="sd-faq-title">Frequently asked questions</h2>
            </header>
            <dl className="sd-faq-list">
              {page.faqs.map(item => (
                <div key={item.q} className="sd-faq-item">
                  <dt>{item.q}</dt>
                  <dd>{item.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      ) : null}

      {page.links?.length ? (
        <section className="sd-links" aria-label="Related pages">
          <div className="shell">
            <p className="eyebrow"><span>Keep reading</span><i aria-hidden="true" /></p>
            <RelatedLinks links={page.links} />
          </div>
        </section>
      ) : null}

      <CloseBand
        title={closeTitle}
        lead={closeLead}
        to={closeTo}
        cta={closeCta}
      />
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
  const page = aboutPage;

  return (
    <div className="blog-page content-page about-page">
      <ScrollTop />
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        titleEm={page.titleEm}
        lead={page.lead}
        image={page.heroImage}
        imageAlt={page.heroImageAlt}
        actions={page.actions}
      />

      <section className="about-manifesto" aria-label="Studio promise">
        <div className="shell about-manifesto-inner">
          <p className="about-manifesto-quote">{page.manifesto}</p>
          <ul className="about-pillars">
            {page.pillars.map(pillar => (
              <li key={pillar.label}>
                <p className="about-pillar-label">{pillar.label}</p>
                <p>{pillar.copy}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="about-split" aria-label="Studio story">
        <div className="shell about-split-grid">
          <div className="about-principles">
            {page.principles.map(item => (
              <article key={item.index} className="about-principle">
                <span className="about-principle-index" aria-hidden="true">{item.index}</span>
                <div>
                  <h2>{item.heading}</h2>
                  {item.paragraphs.map(paragraph => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <figure className="about-portrait">
            <img src={page.portrait.image} alt={page.portrait.alt} loading="lazy" />
            <figcaption>{page.portrait.caption}</figcaption>
          </figure>
        </div>
      </section>

      <section className="about-stages" aria-labelledby="about-stages-title">
        <div className="shell">
          <header className="about-stages-head">
            <p className="eyebrow"><span>The path</span><i aria-hidden="true" /></p>
            <h2 id="about-stages-title">
              From discovery to <em>retailer-ready</em> files
            </h2>
          </header>
          <ol className="about-stage-list">
            {page.stages.map(stage => (
              <li key={stage.n}>
                <span className="about-stage-n" aria-hidden="true">{stage.n}</span>
                <h3>{stage.title}</h3>
                <p>{stage.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="about-links" aria-label="Explore the studio">
        <div className="shell">
          <p className="eyebrow"><span>Keep reading</span><i aria-hidden="true" /></p>
          <ul className="about-link-grid">
            {page.links.map(link => (
              <li key={link.href}>
                <Link to={link.href}>
                  <span>{link.label}</span>
                  <IconArrow aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CloseBand title={page.closeTitle} lead={page.closeLead} />
    </div>
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
    <div className="blog-page content-page svc-page">
      <ScrollTop />
      <PageHero
        eyebrow={servicesPage.eyebrow}
        title={servicesPage.title}
        lead={servicesPage.lead}
        image={servicesPage.heroImage}
        imageAlt={servicesPage.heroImageAlt}
        actions={servicesPage.actions}
      />
      <section className="svc-list" aria-label="Service list">
        <div className="shell">
          <ol className="svc-list-grid">
            {services.map(service => {
              const Icon = serviceIcons[service.key] || IconArrow;
              const href = serviceHrefs[service.key] || service.href || '/contact';
              return (
                <li key={service.title}>
                  <Link className="svc-item" to={href}>
                    <span className="svc-item-n" aria-hidden="true">{service.n}</span>
                    <span className="svc-item-icon" aria-hidden="true"><Icon /></span>
                    <div className="svc-item-body">
                      <h2>{service.title}</h2>
                      <p>{service.copy}</p>
                    </div>
                    <span className="svc-item-go" aria-hidden="true">
                      <IconArrow />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
      <section className="svc-links" aria-label="Explore services">
        <div className="shell">
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
      </section>
      <CloseBand
        title="Tell us what you need written."
        lead="We will come back with a fixed scope, price, and timeline — or a clear no if we cannot staff it well."
      />
    </div>
  );
}

function Lander({ page }) {
  return (
    <ServiceDetail
      page={page}
      closeTitle="Start with a fixed quote."
      closeLead="Share the idea, target length, and deadline. You will hear back within one working day."
      closeCta="Contact the studio"
    />
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
    <ServiceDetail
      page={editingPage}
      closeTitle="Send the draft."
      closeLead="Tell us the length, genre, and which edit you need. You will get a fixed editing quote."
      closeCta="Request an editing quote"
    />
  );
}

export function CoverDesignPage() {
  return (
    <ServiceDetail
      page={coverPage}
      closeTitle="Brief the cover."
      closeLead="Share the genre, title direction, and whether you need ebook, print, or both."
      closeCta="Request a cover quote"
    />
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
