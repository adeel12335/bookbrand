import { neon } from '@neondatabase/serverless';

let cached = null;

/**
 * Neon's HTTP driver — one round trip per query, no pool to keep warm, which is
 * what a serverless function wants. Throws a readable error rather than a
 * driver stack trace when the connection string is missing.
 */
export function sql() {
  if (cached) return cached;
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL is not set. Copy .env.example to .env and add your Neon connection string.');
  }
  cached = neon(url);
  return cached;
}

export function hasDatabase() {
  return Boolean(process.env.DATABASE_URL);
}
