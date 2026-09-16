import React from 'react';
import { Link } from 'react-router-dom';
import { IconArrow } from './icons.jsx';

const DEFAULT_HERO = '/assets/brand/hero-desk.jpg';

/**
 * Shared page hero: full-bleed photo + left copy panel.
 * Used on portfolio, blog, about, services, pricing, landers, legal.
 */
export function PageHero({
  eyebrow,
  title,
  titleEm,
  lead,
  image = DEFAULT_HERO,
  imageAlt = '',
  actions,
  meta,
  children,
  id = 'page-hero-title',
}) {
  return (
    <section className="pf-hero pf-hero--bg page-hero" aria-labelledby={id}>
      <div className="pf-hero-media" aria-hidden={imageAlt ? undefined : true}>
        <img
          src={image}
          alt={imageAlt}
          width="1600"
          height="900"
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <div className="shell pf-hero-shell">
        <div className="pf-hero-copy">
          {eyebrow ? (
            <p className="eyebrow">
              <span>{eyebrow}</span>
              <i aria-hidden="true" />
            </p>
          ) : null}
          <h1 id={id}>
            {title}
            {titleEm ? (
              <>
                {' '}
                <em>{titleEm}</em>
              </>
            ) : null}
          </h1>
          {lead ? <p className="pf-hero-lead">{lead}</p> : null}
          {meta || null}
          {actions?.length ? (
            <div className="pf-hero-actions content-page-actions">
              {actions.map(action => (
                <Link
                  key={action.href + action.label}
                  className={`cta ${action.variant === 'gold' ? 'cta-gold' : 'cta-solid'}`}
                  to={action.href}
                >
                  <span>{action.label}</span>
                  <IconArrow className="cta-arrow" />
                </Link>
              ))}
            </div>
          ) : null}
          {children}
        </div>
      </div>
    </section>
  );
}
