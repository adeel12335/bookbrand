import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { loadEnv } from './load-env.mjs';

/**
 * Runs the /api serverless handlers inside `vite dev` and `vite preview`.
 *
 * On Vercel these files are deployed as functions and this plugin is not
 * involved; it only exists so local development hits the same code instead of
 * a mock. Resolution follows Vercel's own file conventions:
 *
 *   /api/leads            -> api/leads.js
 *   /api/posts            -> api/posts/index.js
 *   /api/posts/my-article -> api/posts/[slug].js   (req.query.slug = 'my-article')
 */
function resolveHandler(apiDir, segments) {
  const direct = join(apiDir, `${segments.join('/')}.js`);
  if (existsSync(direct)) return { file: direct, params: {} };

  const index = join(apiDir, ...segments, 'index.js');
  if (existsSync(index)) return { file: index, params: {} };

  // Fall back to a single dynamic segment in the parent directory.
  if (segments.length >= 1) {
    const parent = join(apiDir, ...segments.slice(0, -1));
    const last = segments[segments.length - 1];
    if (existsSync(parent)) {
      const dynamic = readdirSync(parent).find(name => /^\[[^\]]+\]\.js$/.test(name));
      if (dynamic) {
        const param = dynamic.slice(1, dynamic.indexOf(']'));
        return { file: join(parent, dynamic), params: { [param]: last } };
      }
    }
  }
  return null;
}

export function apiPlugin() {
  const apiDir = join(process.cwd(), 'api');
  let devServer = null;

  /**
   * In dev, load through Vite's own module runner: a plain `import()` caches
   * each module by URL, so editing a shared file under api/_lib would keep
   * serving the stale copy no matter how the handler's URL is cache-busted.
   * The preview server has no runner and serves a finished build, so a dynamic
   * import is correct there.
   */
  async function load(file) {
    if (devServer?.ssrLoadModule) return devServer.ssrLoadModule(pathToFileURL(file).href);
    return import(pathToFileURL(file).href);
  }

  const middleware = async (req, res, next) => {
    const url = req.url || '/';
    if (!url.startsWith('/api/')) return next();

    const pathname = url.split('?')[0].replace(/\/+$/, '');
    const segments = pathname.slice('/api/'.length).split('/').filter(Boolean);
    if (!segments.length || segments.some(s => s === '..' || s.startsWith('_'))) return next();

    const match = resolveHandler(apiDir, segments);
    if (!match) return next();

    try {
      const mod = await load(match.file);
      req.query = { ...match.params, ...Object.fromEntries(new URL(url, 'http://local').searchParams) };
      await mod.default(req, res);
    } catch (error) {
      console.error(`[api] ${req.method} ${pathname} failed:`, error);
      if (!res.headersSent) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
      }
      res.end(JSON.stringify({ error: error.message }));
    }
    return undefined;
  };

  return {
    name: 'local-api-functions',
    configResolved() {
      loadEnv();
    },
    configureServer(server) {
      devServer = server;
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}
