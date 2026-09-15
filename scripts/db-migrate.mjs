/**
 * Applies db/schema.sql to the Neon database in DATABASE_URL.
 * Idempotent — every statement is CREATE ... IF NOT EXISTS or CREATE OR REPLACE.
 *
 *   npm run db:migrate
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { neon } from '@neondatabase/serverless';
import { loadEnv } from './load-env.mjs';

loadEnv();

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..');

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set. Copy .env.example to .env and add your Neon connection string.');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const schema = readFileSync(join(root, 'db', 'schema.sql'), 'utf8');

// The function body uses $$ ... $$, so split on statement boundaries that are
// not inside a dollar-quoted block rather than on every semicolon.
const statements = schema
  .split(/;\s*(?=(?:[^$]*\$\$[^$]*\$\$)*[^$]*$)/)
  .map(s => s.trim())
  .filter(s => s && !s.split('\n').every(line => line.trim().startsWith('--')));

console.log(`Applying ${statements.length} statements to Neon...`);
for (const statement of statements) {
  const label = statement.replace(/\s+/g, ' ').slice(0, 72);
  try {
    await sql.query(statement);
    console.log('  ok   ', label);
  } catch (error) {
    console.error('  FAIL ', label);
    console.error('        ', error.message);
    process.exit(1);
  }
}

const [{ leads }] = await sql`select count(*)::int as leads from leads`;
const [{ posts }] = await sql`select count(*)::int as posts from posts`;
console.log(`\nSchema is up to date. leads: ${leads}, posts: ${posts}`);
