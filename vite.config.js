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

export default defineConfig({
  plugins: [react(), seoStampPlugin()],
  server: {
    host: '0.0.0.0',
    port: 5173
  }
});
