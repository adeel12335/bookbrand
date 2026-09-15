import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { absoluteAsset, absoluteUrl, resolveSeo } from './seo.js';

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

export function SeoHead() {
  const { pathname } = useLocation();

  useEffect(() => {
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
  }, [pathname]);

  return null;
}
