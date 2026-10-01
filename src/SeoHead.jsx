import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from './analytics.js';

function ensure(selector, create) {
  let node = document.querySelector(selector);
  if (!node) {
    node = create();
    document.head.appendChild(node);
  }
  return node;
}

function setNamedMeta(attr, key, value) {
  ensure(`meta[${attr}="${key}"]`, () => {
    const meta = document.createElement('meta');
    meta.setAttribute(attr, key);
    return meta;
  }).setAttribute('content', value);
}

function applyHead({ absoluteAsset, absoluteUrl, resolveSeo }, pathname) {
  const page = resolveSeo(pathname);
  const isNotFound = page.path === '/404';
  const url = absoluteUrl(isNotFound ? pathname : page.path);
  const image = absoluteAsset(page.image);

  document.title = page.title;

  ensure('meta[name="description"]', () => {
    const el = document.createElement('meta');
    el.setAttribute('name', 'description');
    return el;
  }).setAttribute('content', page.description);

  ensure('meta[name="robots"]', () => {
    const el = document.createElement('meta');
    el.setAttribute('name', 'robots');
    return el;
  }).setAttribute('content', page.robots);

  ensure('link[rel="canonical"]', () => {
    const el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    return el;
  }).setAttribute('href', url);

  const pairs = [
    ['property', 'og:title', page.title],
    ['property', 'og:description', page.description],
    ['property', 'og:url', url],
    ['property', 'og:type', page.type],
    ['property', 'og:image', image],
    ['property', 'og:image:alt', page.imageAlt],
    ['name', 'twitter:title', page.title],
    ['name', 'twitter:description', page.description],
    ['name', 'twitter:image', image],
    ['name', 'twitter:image:alt', page.imageAlt],
    ['name', 'twitter:card', 'summary_large_image'],
  ];
  pairs.forEach(([attr, key, value]) => setNamedMeta(attr, key, value));

  document.querySelectorAll('script[type="application/ld+json"]').forEach(node => node.remove());
  (page.jsonLd || []).forEach((data, index) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.seo = `route-${index}`;
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  });
}

export function SeoHead() {
  const { pathname } = useLocation();
  // The route the served HTML was for: its page_view already went out from the
  // gtag config call in index.html, with the right title in <head>.
  const lastTracked = useRef(pathname);

  useEffect(() => {
    let cancelled = false;
    // seo.js reaches the full copy of every article and landing page, so it is
    // loaded on demand instead of riding in the main bundle. The served HTML
    // already carries the first route's head; only client-side navigations wait.
    import('./seo.js').then(seo => {
      if (cancelled) return;
      applyHead(seo, pathname);
      // Report client-side navigations only after the title has changed, so GA4
      // never files the previous page's title under the new URL. Enhanced
      // measurement's history-change page_view is switched off in the GA4
      // stream for the same reason; this is the single source of SPA page_views.
      if (pathname !== lastTracked.current) {
        lastTracked.current = pathname;
        trackPageView();
      }
    });
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return null;
}
