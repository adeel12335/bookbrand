import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IconArrow, IconCheck, serviceIcons } from './icons.jsx';
import { plans, pricingIntro, services, servicesIntro } from './data.js';
import { Contact } from './ContactSection.jsx';
import { CompareTable, EditSample, QuickAnswer } from './CompareTable.jsx';
import { headingId } from './blogPosts.js';
import {
  aboutPage,
  coverPage,
  editingPage,
  editorialDeskPage,
  editorialPolicyPage,
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

function ArticlePage({ page, children, hideFaqHeading = false }) {
  const sections = page.sections || [];
  const tocItems = [
    ...sections.map(section => ({ id: headingId(section.heading), label: section.heading })),
    ...(page.faqs?.length && !hideFaqHeading ? [{ id: 'page-faqs', label: 'Frequently asked questions' }] : []),
    ...(page.links?.length ? [{ id: 'page-links', label: 'Keep reading' }] : []),
  ];

  return (
    <div className="br_legal_page">
      <ScrollTop />

      <section className="br_post_banner" aria-labelledby="legal-title">
        <div className="container">
          <div className="row">
            <div className="col-md-10">
              <nav className="br_post_crumbs" aria-label="Breadcrumb">
                <Link to="/">Home</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">{page.eyebrow}</span>
              </nav>
              <p className="br-eyebrow br-eyebrow-light">{page.eyebrow}</p>
              <h1 id="legal-title" className="br-primary-heading">{page.title}</h1>
              <p className="br_post_intro">{page.lead}</p>
              {page.updated ? (
                <p className="br_post_meta">Last updated {page.updated}</p>
              ) : null}
              {page.actions?.length ? (
                <div className="br_wrapper_buttons">
                  {page.actions.map(action => (
                    <Link
                      key={action.href}
                      className={action.variant === 'gold' ? 'btn-outline' : 'btn'}
                      to={action.href}
                    >
                      {action.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="br_section br_post_body">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <aside className="br_sidebar" aria-label="On this page">
                <h2 className="br_sidebar_eyebrow">On this page</h2>
                <ol className="br_post_toc">
                  {tocItems.map((item, index) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`}>
                        <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ol>
                <Link className="btn-outline br_sidebar_cta" to="/contact">Ask a question</Link>
              </aside>
            </div>

            <div className="col-md-9 br_col_post_content">
              <div className="br_wrapper_post_content">
                {children}

                {sections.map((section, index) => (
                  <div
                    className={`br_block br_text_block${index ? ' br_border_top' : ''}`}
                    id={headingId(section.heading)}
                    key={section.heading}
                  >
                    <h2>{section.heading}</h2>
                    {section.paragraphs?.map(paragraph => (
                      <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                    ))}
                    {section.bullets?.length ? (
                      <ul className="br_duo_list">
                        {section.bullets.map(item => (
                          <li key={item}>
                            <IconCheck aria-hidden="true" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <CompareTable table={section.table} />
                    <EditSample sample={section.sample} />
                  </div>
                ))}

                {page.faqs?.length ? (
                  <div className="br_block br_border_top" id="page-faqs">
                    {hideFaqHeading ? null : <h2>Frequently asked questions</h2>}
                    <dl className="br_legal_faq">
                      {page.faqs.map(item => (
                        <div key={item.q}>
                          <dt>{item.q}</dt>
                          <dd>{item.a}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ) : null}

                {page.links?.length ? (
                  <div className="br_block br_border_top" id="page-links">
                    <h2>Keep reading</h2>
                    <ul className="row br_grid">
                      {page.links.map(link => (
                        <li className="col-md-6" key={link.href}>
                          <Link className="br_about_link" to={link.href}>
                            <span>{link.label}</span>
                            <IconArrow aria-hidden="true" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ServiceDetail({ page, closeTitle, closeLead, closeCta, closeTo = '/contact' }) {
  return (
    <div className="br_service_page">
      <ScrollTop />

      <section
        className="br_page_hero"
        aria-labelledby="service-title"
        style={{ '--bgImage': `url('${page.heroImage}')` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="br_page_hero_content">
                <p className="br-eyebrow br-eyebrow-light">{page.eyebrow}</p>
                <h1 id="service-title" className="br-primary-heading">{page.title}</h1>
                <p>{page.lead}</p>
                <QuickAnswer text={page.quickAnswer} />
                <div className="br_wrapper_buttons">
                  {page.actions?.map(action => (
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

      {page.sections?.length ? (
        <section className="br_section br_service_sections" aria-label="What is included">
          <div className="container">
            {page.sections.map((section, i) => (
              <div className="row br_service_block" key={section.heading}>
                <div className="col-md-4">
                  <div className="br_service_block_head">
                    <span className="br_about_index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <h2>{section.heading}</h2>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="br_service_block_copy">
                    {section.paragraphs?.map(paragraph => (
                      <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                    ))}
                    {section.bullets?.length ? (
                      <ul className="br_duo_list">
                        {section.bullets.map(item => (
                          <li key={item}>
                            <IconCheck aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <CompareTable table={section.table} />
                    <EditSample sample={section.sample} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {page.covers?.length ? (
        <section className="br_section br_section--paper" aria-labelledby="cover-proof-title">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="br_section_head">
                  <div className="br_section_head_copy">
                    <p className="br-eyebrow">Cover work</p>
                    <h2 id="cover-proof-title">Cover case studies from published titles</h2>
                    <p>The same jackets as the portfolio. Open a title for the brief, the format, and the Amazon listing.</p>
                  </div>
                  <Link className="btn" to="/portfolio">View portfolio</Link>
                </div>
              </div>
            </div>
            <ul className="row br_grid br_cover_proof">
              {page.covers.map(cover => (
                <li className="col-md-6 col-lg-3" key={cover.title}>
                  <figure className="br_cover_card">
                    {cover.href ? (
                      <Link to={cover.href}>
                        <img src={cover.image} alt={`${cover.title} — ${cover.genre} ebook cover`} loading="lazy" />
                      </Link>
                    ) : (
                      <img src={cover.image} alt={`${cover.title} — ${cover.genre} ebook cover`} loading="lazy" />
                    )}
                    <figcaption>
                      <span>{cover.genre}</span>
                      <strong>
                        {cover.href ? <Link to={cover.href}>{cover.title}</Link> : cover.title}
                      </strong>
                      {cover.note ? <p>{cover.note}</p> : null}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {page.faqs?.length ? (
        <section className="br_section br_section--paper" aria-labelledby="service-faq-title">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="br_section_head">
                  <div className="br_section_head_copy">
                    <p className="br-eyebrow">Questions</p>
                    <h2 id="service-faq-title">Frequently asked questions</h2>
                  </div>
                  <Link className="btn" to="/faq">Read the full FAQ</Link>
                </div>
              </div>
            </div>
            <div className="row br_grid">
              {page.faqs.map(item => (
                <div className="col-md-6" key={item.q}>
                  <article className="br_about_pillar">
                    <h3>{item.q}</h3>
                    <p>{item.a}</p>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {page.links?.length ? (
        <section className="br_section" aria-labelledby="service-links-title">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="br_section_head">
                  <div className="br_section_head_copy">
                    <p className="br-eyebrow">Keep reading</p>
                    <h2 id="service-links-title">Related pages</h2>
                  </div>
                </div>
              </div>
            </div>
            <ul className="row br_grid">
              {page.links.map(link => (
                <li className="col-md-6 col-lg-4" key={link.href + link.label}>
                  <Link className="br_about_link" to={link.href}>
                    <span>{link.label}</span>
                    <IconArrow aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="br_cta" aria-labelledby="service-cta-title">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="br_section_head">
                <div className="br_section_head_copy">
                  <h2 id="service-cta-title">{closeTitle}</h2>
                  <p>{closeLead}</p>
                </div>
                <Link className="btn" to={closeTo}>{closeCta}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function CloseBand({ title, lead, to = '/contact', cta = 'Start Your Project' }) {
  return (
    <section className="br_cta" aria-labelledby="content-close-title">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="br_section_head">
              <div className="br_section_head_copy">
                <h2 id="content-close-title">{title}</h2>
                <p>{lead}</p>
              </div>
              <Link className="btn" to={to}>{cta}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutPage() {
  const page = aboutPage;

  return (
    <div className="br_about">
      <ScrollTop />

      <section
        className="br_page_hero"
        aria-labelledby="about-title"
        style={{ '--bgImage': `url('${page.heroImage}')` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="br_page_hero_content">
                <p className="br-eyebrow br-eyebrow-light">{page.eyebrow}</p>
                <h1 id="about-title" className="br-primary-heading">
                  {page.title} <span>{page.titleEm}</span>
                </h1>
                <p>{page.lead}</p>
                <div className="br_wrapper_buttons">
                  {page.actions.map(action => (
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

      <section className="br_section br_about_intro" aria-labelledby="about-intro-title">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="br_about_intro_copy">
                <p className="br-eyebrow">About us</p>
                <h2 id="about-intro-title">
                  One studio. One schedule. <span>Your name on the cover.</span>
                </h2>
                <p>{page.lead}</p>
                <p>{page.principles[0].paragraphs[0]}</p>
                <ul className="br_duo_list">
                  {page.pillars.map(pillar => (
                    <li key={pillar.label}>
                      <IconCheck aria-hidden="true" />
                      <span><strong>{pillar.label}.</strong> {pillar.copy}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <figure className="br_about_image">
                <img src={page.portrait.image} alt={page.portrait.alt} loading="lazy" />
                <figcaption>{page.portrait.caption}</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section className="br_section br_section--paper br_about_offer" aria-label="What the studio offers">
        <div className="container">
          <div className="row br_grid">
            <div className="col-md-6">
              <article className="br_duo_card br_duo_card--light">
                <p className="br_duo_kicker"><span>01</span>Services</p>
                <h3>{servicesIntro.title} {servicesIntro.titleEm}</h3>
                <p className="br_duo_lead">{servicesIntro.lead}</p>
                <Link className="btn" to="/services">Explore services</Link>
              </article>
            </div>
            <div className="col-md-6">
              <article className="br_duo_card br_duo_card--light">
                <p className="br_duo_kicker"><span>02</span>Pricing</p>
                <h3>{pricingIntro.title} {pricingIntro.titleEm}</h3>
                <p className="br_duo_lead">{pricingIntro.lead}</p>
                <Link className="btn" to="/pricing">See packages</Link>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="br_section br_about_story" aria-labelledby="about-story-title">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="br_section_head">
                <div className="br_section_head_copy">
                  <p className="br-eyebrow">Who we are</p>
                  <h2 id="about-story-title">How the studio works</h2>
                </div>
                <Link className="btn" to="/contact">Talk to a Specialist</Link>
              </div>
            </div>
          </div>
          <div className="row br_grid">
            {page.principles.map(item => (
              <div className="col-md-4" key={item.index}>
                <article className="br_about_pillar">
                  <span className="br_about_index" aria-hidden="true">{item.index}</span>
                  <h3>{item.heading}</h3>
                  {item.paragraphs.map(paragraph => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="br_section br_section--dark br_about_stages" aria-labelledby="about-stages-title">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="br_section_head">
                <div className="br_section_head_copy">
                  <p className="br-eyebrow br-eyebrow-light">The path</p>
                  <h2 id="about-stages-title">
                    From discovery to <span>retailer-ready</span> files
                  </h2>
                </div>
                <Link className="btn" to="/contact">Request a quote</Link>
              </div>
            </div>
          </div>
          <ol className="row br_grid">
            {page.stages.map(stage => (
              <li className="col-md-6 col-lg-3" key={stage.n}>
                <div className="br_about_stage">
                  <span className="br_about_stage_n" aria-hidden="true">{stage.n}</span>
                  <h3>{stage.title}</h3>
                  <p>{stage.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="br_section br_about_links" aria-labelledby="about-links-title">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="br_section_head">
                <div className="br_section_head_copy">
                  <p className="br-eyebrow">Keep reading</p>
                  <h2 id="about-links-title">Explore the studio</h2>
                </div>
              </div>
            </div>
          </div>
          <ul className="row br_grid">
            {page.links.map(link => (
              <li className="col-md-6 col-lg-3" key={link.href}>
                <Link className="br_about_link" to={link.href}>
                  <span>{link.label}</span>
                  <IconArrow aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="br_cta" aria-labelledby="about-cta-title">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="br_section_head">
                <div className="br_section_head_copy">
                  <h2 id="about-cta-title">{page.closeTitle}</h2>
                  <p>{page.closeLead}</p>
                </div>
                <Link className="btn" to="/contact">Start Your Project</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function PricingPage() {
  const page = pricingPage;

  return (
    <div className="br_pricing_page">
      <ScrollTop />

      <section
        className="br_page_hero"
        aria-labelledby="pricing-title"
        style={{ '--bgImage': `url('${page.heroImage}')` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="br_page_hero_content">
                <p className="br-eyebrow br-eyebrow-light">{page.eyebrow}</p>
                <h1 id="pricing-title" className="br-primary-heading">
                  Ebook writing packages <span>$699 to $3,999.</span>
                </h1>
                <p>{page.lead}</p>
                <div className="br_wrapper_buttons">
                  {page.actions.map(action => (
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

      <section className="br_section" aria-labelledby="pricing-plans-title">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="br_section_head">
                <div className="br_section_head_copy">
                  <p className="br-eyebrow">Packages</p>
                  <h2 id="pricing-plans-title">{page.plansHeading}</h2>
                  <p>{pricingIntro.lead}</p>
                </div>
                <Link className="btn" to="/contact">Talk to a Specialist</Link>
              </div>
            </div>
          </div>
          <div className="row br_grid" aria-label="Publishing packages">
            {plans.map(plan => (
              <div className="col-md-6 col-lg-3" key={plan.name}>
                <article className={`br_price_card${plan.featured ? ' is-featured' : ''}`}>
                  {plan.featured ? <span className="br_price_badge">Most popular</span> : null}
                  <h3>{plan.name}</h3>
                  <p className="br_price_amount"><sup>$</sup>{plan.price}</p>
                  <p className="br_price_copy">{plan.copy}</p>
                  <dl className="br_price_meta">
                    <div><dt>Length</dt><dd>{plan.words}</dd></div>
                    <div><dt>Timeline</dt><dd>{plan.timeline}</dd></div>
                  </dl>
                  <ul className="br_price_features">
                    {plan.features.map(feature => (
                      <li key={feature}><IconCheck aria-hidden="true" />{feature}</li>
                    ))}
                  </ul>
                  <Link
                    className={plan.featured ? 'btn' : 'btn-outline'}
                    to={`/contact?plan=${encodeURIComponent(plan.name)}`}
                  >
                    {plan.featured ? 'Get started' : `Choose ${plan.name}`}
                  </Link>
                </article>
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col-md-12">
              <p className="br_price_note">{page.note}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="br_section br_section--paper" aria-labelledby="pricing-why-title">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="br_section_head">
                <div className="br_section_head_copy">
                  <p className="br-eyebrow">Pricing honesty</p>
                  <h2 id="pricing-why-title">{page.why.heading}</h2>
                  <p>{page.why.lead}</p>
                </div>
              </div>
            </div>
          </div>
          {page.why.paragraphs.map(paragraph => (
            <div className="row" key={paragraph.slice(0, 40)}>
              <div className="col-md-10">
                <p className="br_price_why_copy">{paragraph}</p>
              </div>
            </div>
          ))}
          <div className="row br_grid">
            <div className="col-md-6">
              <article className="br_price_split">
                <h3>{page.why.includedTitle}</h3>
                <ul className="br_duo_list">
                  {page.why.included.map(item => (
                    <li key={item}><IconCheck aria-hidden="true" />{item}</li>
                  ))}
                </ul>
              </article>
            </div>
            <div className="col-md-6">
              <article className="br_price_split">
                <h3>{page.why.excludedTitle}</h3>
                <ul className="br_duo_list">
                  {page.why.excluded.map(item => (
                    <li key={item}><IconCheck aria-hidden="true" />{item}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </div>
      </section>

      <Contact />

      <section className="br_cta" aria-labelledby="pricing-cta-title">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="br_section_head">
                <div className="br_section_head_copy">
                  <h2 id="pricing-cta-title">Need a recommendation?</h2>
                  <p>{page.closing}</p>
                </div>
                <Link className="btn" to="/contact">Request a quote</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function ServicesPage() {
  const page = servicesPage;
  const related = [
    { label: 'Ebook ghostwriting services', href: '/ebook-ghostwriting-services' },
    { label: 'Ebook editing services', href: '/ebook-editing-services' },
    { label: 'Ebook cover design', href: '/ebook-cover-design' },
    { label: 'Hire an ebook writer', href: '/hire-ebook-writer' },
    { label: 'Amazon KDP ebook writing', href: '/amazon-kdp-ebook-writing' },
  ];

  return (
    <div className="br_services_page">
      <ScrollTop />

      <section
        className="br_page_hero"
        aria-labelledby="services-title"
        style={{ '--bgImage': `url('${page.heroImage}')` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="br_page_hero_content">
                <p className="br-eyebrow br-eyebrow-light">{page.eyebrow}</p>
                <h1 id="services-title" className="br-primary-heading">
                  Ebook writing, editing, design <span>and publishing.</span>
                </h1>
                <p>{page.lead}</p>
                <div className="br_wrapper_buttons">
                  {page.actions.map(action => (
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

      <section className="br_section" aria-labelledby="services-list-title">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="br_section_head">
                <div className="br_section_head_copy">
                  <p className="br-eyebrow">What we do</p>
                  <h2 id="services-list-title">Everything your book needs, under one roof</h2>
                </div>
                <Link className="btn" to="/contact">Get a writing quote</Link>
              </div>
            </div>
          </div>
          <div className="row br_grid">
            {services.map(service => {
              const Icon = serviceIcons[service.key] || IconArrow;
              const target = serviceHrefs[service.key] || service.href || '/contact';
              const href = target === '/services' ? '/contact' : target;
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

      <section className="br_section br_section--paper" aria-labelledby="services-brief-title">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="br_section_head">
                <div className="br_section_head_copy">
                  <p className="br-eyebrow">Page job</p>
                  <h2 id="services-brief-title">{page.briefing.heading}</h2>
                  <p>{page.briefing.lead}</p>
                </div>
              </div>
            </div>
          </div>
          {page.briefing.paragraphs.map(paragraph => (
            <div className="row" key={paragraph.slice(0, 40)}>
              <div className="col-md-10">
                <p>{paragraph}</p>
              </div>
            </div>
          ))}
          <div className="row">
            <div className="col-md-12">
              <p className="br_price_preview_cta">
                {page.pricingNote}{' '}
                <Link className="btn" to={page.pricingHref}>{page.pricingCta}</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="br_section br_section--paper" aria-labelledby="services-chooser-title">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="br_section_head">
                <div className="br_section_head_copy">
                  <p className="br-eyebrow">Start in the right place</p>
                  <h2 id="services-chooser-title">{page.chooser.heading}</h2>
                  <p>{page.chooser.lead}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row br_grid">
            {page.chooser.items.map(item => (
              <div className="col-md-6" key={item.title}>
                <article className="br_about_pillar">
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="br_section br_section--paper" aria-labelledby="services-related-title">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="br_section_head">
                <div className="br_section_head_copy">
                  <p className="br-eyebrow">Keep reading</p>
                  <h2 id="services-related-title">Explore a service in detail</h2>
                </div>
              </div>
            </div>
          </div>
          <ul className="row br_grid">
            {related.map(link => (
              <li className="col-md-6 col-lg-4" key={link.href}>
                <Link className="br_about_link" to={link.href}>
                  <span>{link.label}</span>
                  <IconArrow aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="br_cta" aria-labelledby="services-cta-title">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="br_section_head">
                <div className="br_section_head_copy">
                  <h2 id="services-cta-title">{page.pricingNote}</h2>
                  <p>Full feature lists live on pricing. Share the idea, length, and deadline if you want a quote instead.</p>
                </div>
                <div className="br_wrapper_buttons">
                  <Link className="btn" to="/contact">Start Your Project</Link>
                  <Link className="btn-outline" to="/pricing">{page.pricingCta}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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
      <ArticlePage page={faqPage} hideFaqHeading />
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

export function EditorialPolicyPage() {
  return <ArticlePage page={editorialPolicyPage} />;
}

export function EditorialDeskPage() {
  return <ArticlePage page={editorialDeskPage} />;
}

export function TermsPage() {
  return <ArticlePage page={termsPage} />;
}

export function NotFoundPage() {
  return (
    <div className="br_notfound_page">
      <ScrollTop />

      <section
        className="br_page_hero"
        aria-labelledby="notfound-title"
        style={{ '--bgImage': `url('${notFoundPage.heroImage}')` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="br_page_hero_content">
                <p className="br-eyebrow br-eyebrow-light">{notFoundPage.eyebrow}</p>
                <h1 id="notfound-title" className="br-primary-heading">{notFoundPage.title}</h1>
                <p>{notFoundPage.lead}</p>
                <div className="br_wrapper_buttons">
                  <Link className="btn" to="/">Back to home</Link>
                  <Link className="btn-outline" to="/blog">Read the blog</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="br_section" aria-labelledby="notfound-links-title">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="br_section_head">
                <div className="br_section_head_copy">
                  <p className="br-eyebrow">Popular pages</p>
                  <h2 id="notfound-links-title">Try one of these</h2>
                </div>
              </div>
            </div>
          </div>
          <ul className="row br_grid">
            {notFoundPage.links.map(link => (
              <li className="col-md-6 col-lg-3" key={link.href}>
                <Link className="br_about_link" to={link.href}>
                  <span>{link.label}</span>
                  <IconArrow aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
