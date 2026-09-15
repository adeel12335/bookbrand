import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { stampHtml } from './scripts/stamp-html.mjs';

function seoStampPlugin() {
  return {
    name: 'seo-stamp-html',
    apply: 'build',
    closeBundle: {
      sequential: true,
      order: 'post',
      handler() {
        stampHtml();
      },
    },
  };
}

function servePrerenderedRoutes() {
  const distDir = join(process.cwd(), 'dist');
  const rewrite = (req, _res, next) => {
    const raw = req.url || '/';
    const [pathname, search] = raw.split('?');
    if (!pathname || pathname === '/' || pathname.includes('.')) return next();
    const clean = pathname.replace(/\/+$/, '') || '/';
    if (clean.startsWith('/assets') || clean.startsWith('/fonts')) return next();
    const nested = join(distDir, clean.replace(/^\//, ''), 'index.html');
    if (existsSync(nested)) {
      req.url = `${clean}/index.html${search ? `?${search}` : ''}`;
    } else if (existsSync(join(distDir, '404.html'))) {
      req.url = `/404.html${search ? `?${search}` : ''}`;
    }
    next();
  };
  return {
    name: 'serve-prerendered-routes',
    configurePreviewServer(server) {
      server.middlewares.use(rewrite);
    },
  };
}

export default defineConfig({
  plugins: [react(), seoStampPlugin(), servePrerenderedRoutes()],
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  preview: {
    host: '0.0.0.0',
    port: 4173
  }
});
