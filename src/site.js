/** Canonical public origin. Matches live 308s to the www host. */
export const SITE_ORIGIN = 'https://www.ebookwriters.us';
export const SITE_NAME = 'ebookwriters.us';
export const SITE_EMAIL = 'info@ebookwriters.us';
export const SITE_PHONE = '+1-712-414-0542';
export const SITE_PHONE_DISPLAY = '+1 712-414-0542';
export const DEFAULT_OG_PATH = '/assets/brand/hero-desk.jpg';
export const DEFAULT_OG_ALT = 'ebookwriters.us publishing studio desk — Write. Publish. Grow.';

export function absoluteUrl(path = '/') {
  if (!path || path === '/') return `${SITE_ORIGIN}/`;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalized}`;
}

export function absoluteAsset(path) {
  if (!path) return absoluteUrl(DEFAULT_OG_PATH);
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${SITE_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`;
}
