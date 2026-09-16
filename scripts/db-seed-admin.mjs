/**
 * Ensures at least one admin_users row exists from ADMIN_EMAIL + ADMIN_PASSWORD.
 * Safe to re-run; does not overwrite an existing operator's hash.
 */
import { neon } from '@neondatabase/serverless';
import { loadEnv } from './load-env.mjs';
import { hashPassword } from '../api/_lib/auth.js';

loadEnv();

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not set.');
  process.exit(1);
}

const password = process.env.ADMIN_PASSWORD;
const email = (process.env.ADMIN_EMAIL || 'admin@ebookwriters.us').trim().toLowerCase();

if (!password || password.length < 10) {
  console.error('Set ADMIN_PASSWORD in .env (10+ characters) before seeding an admin user.');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const existing = await sql`select id, email from admin_users where lower(email) = ${email} limit 1`;

if (existing[0]) {
  console.log(`[admin] Operator already exists: ${existing[0].email}`);
  process.exit(0);
}

const rows = await sql`
  insert into admin_users (email, name, password_hash)
  values (${email}, ${'Studio admin'}, ${hashPassword(password)})
  returning id, email
`;

console.log(`[admin] Created operator ${rows[0].email} (id ${rows[0].id}).`);
