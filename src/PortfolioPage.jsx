import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IconArrow, IconCheck } from "./icons.jsx";
import { books, portfolioPage, services, testimonials } from "./data.js";

const SITE = "https://ebookwriters.us";
const OG_IMAGE = `${SITE}/assets/brand/portfolio-hero-bg.png`;

function ensureMeta(selector, create) {
  let node = document.querySelector(selector);
  if (!node) {
    node = create();
    document.head.appendChild(node);
  }
  return node;
}

function setPageMeta({ title, description, path }) {
  document.title = title;
  ensureMeta("meta[name=\"description\"]", () => {
    const el = document.createElement("meta");
    el.setAttribute("name", "description");
    return el;
  }).setAttribute("content", description);
  ensureMeta("link[rel=\"canonical\"]", () => {
    const el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    return el;
  }).setAttribute("href", `${SITE}${path}`);

  [
    ["property", "og:title", title],
    ["property", "og:description", description],
    ["property", "og:url", `${SITE}${path}`],
    ["property", "og:type", "website"],
    ["property", "og:image", OG_IMAGE],
    ["name", "twitter:title", title],
    ["name", "twitter:description", description],
    ["name", "twitter:image", OG_IMAGE],
    ["name", "twitter:card", "summary_large_image"],
  ].forEach(([attr, key, value]) => {
    ensureMeta(`meta[${attr}="${key}"]`, () => {
      const meta = document.createElement("meta");
      meta.setAttribute(attr, key);
      return meta;
    }).setAttribute("content", value);
  });
}

function PortfolioCarousel() {
  const [active, setActive] = useState(0);
  const reduceMotion =
    typeof window !== "undefined"
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const selected = books[active] || books[0];

  return (
    <div className="pf-carousel">
      <Swiper
        className="pf-swiper"
        modules={[Autoplay, Navigation, Pagination, A11y]}
        slidesPerView={1.15}
        spaceBetween={16}
        centeredSlides
        loop
        speed={700}
        autoplay={reduceMotion ? false : { delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true }}
        navigation={{
          prevEl: ".pf-carousel-prev",
          nextEl: ".pf-carousel-next",
        }}
        pagination={{ el: ".pf-carousel-dots", clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2.1, spaceBetween: 18 },
          900: { slidesPerView: 3, spaceBetween: 22 },
          1100: { slidesPerView: 3.4, spaceBetween: 24 },
        }}
        onSlideChange={(swiper) => setActive(swiper.realIndex)}
        a11y={{
          prevSlideMessage: "Previous book",
          nextSlideMessage: "Next book",
        }}
      >
        {books.map((book) => (
          <SwiperSlide key={book.title}>
            <article className="pf-book pf-book--slide">
              <div className="pf-book-cover">
                <img
                  src={book.image}
                  alt={`${book.title} by ${book.author} — ${book.genre} book cover`}
                  width="320"
                  height="480"
                  loading="lazy"
                  draggable="false"
                />
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="pf-carousel-foot">
        <div className="pf-carousel-selected" aria-live="polite">
          <span>{selected.genre}</span>
          <h3>{selected.title}</h3>
          <p>Written by {selected.author}</p>
        </div>
        <div className="pf-carousel-controls">
          <button type="button" className="pf-carousel-prev" aria-label="Previous book">
            <IconArrow aria-hidden="true" />
          </button>
          <div className="pf-carousel-dots" />
          <button type="button" className="pf-carousel-next" aria-label="Next book">
            <IconArrow aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function PortfolioPage() {
  const page = portfolioPage;

  useEffect(() => {
    setPageMeta({
      title: page.metaTitle,
      description: page.metaDescription,
      path: "/portfolio",
    });

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "portfolio-jsonld";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: page.metaTitle,
      description: page.metaDescription,
      url: `${SITE}/portfolio`,
      isPartOf: { "@type": "WebSite", name: "ebookwriters.us", url: SITE },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: books.map((book, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${book.title} by ${book.author}`,
          url: `${SITE}/portfolio`,
        })),
      },
    });
    document.getElementById("portfolio-jsonld")?.remove();
    document.head.appendChild(script);
    window.scrollTo(0, 0);
    return () => document.getElementById("portfolio-jsonld")?.remove();
  }, [page]);

  return (
    <div className="pf-page">
      <section className="pf-hero pf-hero--bg" aria-labelledby="pf-title">
        <div className="pf-hero-media" aria-hidden="true">
          <img
            src={page.heroImage}
            alt=""
            width="1600"
            height="900"
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <div className="shell pf-hero-shell">
          <div className="pf-hero-copy">
            <p className="eyebrow"><span>{page.eyebrow}</span><i aria-hidden="true" /></p>
            <h1 id="pf-title">
              {page.title}
              <br />
              <em>{page.titleEm}</em>
            </h1>
            <p className="pf-hero-lead">{page.lead}</p>
            <div className="pf-hero-actions">
              <Link className="cta cta-solid" to="/contact">
                <span>{page.cta}</span>
                <IconArrow className="cta-arrow" />
              </Link>
              <p className="pf-trust-note">{page.trustNote}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pf-pillars" aria-label="Why authors trust our portfolio work">
        <div className="shell">
          <ul className="pf-pillar-grid">
            {page.pillars.map((item) => (
              <li key={item.title}>
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

          <PortfolioCarousel />
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
          <header className="pf-section-head">
            <p className="eyebrow eyebrow-light"><span>{page.process.eyebrow}</span><i aria-hidden="true" /></p>
            <h2 id="pf-process-title">
              {page.process.title} <em>{page.process.titleEm}</em>
            </h2>
            <p>{page.process.lead}</p>
          </header>
          <ol className="pf-process-grid">
            {page.process.steps.map((step) => (
              <li key={step.n}>
                <span aria-hidden="true">{step.n}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>
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
          <ul className="pf-voice-grid">
            {testimonials.map((item) => (
              <li key={item.name}>
                <blockquote>
                  <p>&ldquo;{item.quote}&rdquo;</p>
                  <footer>
                    <strong>{item.name}</strong>
                    <span>{item.role}</span>
                  </footer>
                </blockquote>
              </li>
            ))}
          </ul>
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
