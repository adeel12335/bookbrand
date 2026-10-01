/**
 * Thin wrapper over the GA4 gtag queue that index.html installs on the
 * production host only. Everywhere else (localhost, Vercel previews, the
 * prerender browser, /admin) window.gtag is absent and every call is a silent
 * no-op, so components never need to know whether analytics is loaded.
 */
export function trackEvent(name, params = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  if (window.location.pathname.startsWith('/admin')) return;
  window.gtag('event', name, params);
}

/**
 * page_view for a client-side navigation. Call it after document.title has
 * been updated for the new route; the served HTML's first page_view comes
 * from the gtag config call in index.html.
 */
export function trackPageView() {
  trackEvent('page_view', {
    page_location: window.location.href,
    page_title: document.title,
  });
}
