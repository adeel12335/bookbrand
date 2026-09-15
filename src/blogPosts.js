/**
 * The blog's public surface.
 *
 * `blogPosts` is whatever scripts/fetch-posts.mjs baked into src/generated at
 * build time — the published rows from Neon, or the seed articles when the
 * database is not reachable. Everything downstream (BlogPages, seo.js,
 * stamp-html) keeps importing from here and does not care which it got.
 */
import { posts } from './generated/posts.js';

export { blogIndex, blogArticle } from './blogPosts.static.js';

export const blogPosts = posts;

export function getPostBySlug(slug) {
  return blogPosts.find(post => post.slug === slug) || null;
}

export function headingId(heading) {
  return heading
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getRelatedPosts(post, limit = 3) {
  const others = blogPosts.filter(item => item.slug !== post.slug);
  const ranked = others
    .map(item => {
      let score = 0;
      if (item.category === post.category) score += 5;
      const shared = (item.keywords || []).filter(keyword =>
        (post.keywords || []).includes(keyword),
      );
      score += shared.length * 2;
      return { item, score };
    })
    .sort((a, b) => b.score - a.score || new Date(b.item.date) - new Date(a.item.date));
  return ranked.map(entry => entry.item).slice(0, limit);
}

export function getNeighborPosts(post) {
  const index = blogPosts.findIndex(item => item.slug === post.slug);
  if (index < 0) return { newer: null, older: null };
  return {
    newer: index > 0 ? blogPosts[index - 1] : null,
    older: index < blogPosts.length - 1 ? blogPosts[index + 1] : null,
  };
}
