-- ebookwriters.us — Neon (Postgres) schema.
-- Idempotent: safe to run on every deploy. Applied by `npm run db:migrate`.

create table if not exists leads (
  id            bigserial primary key,
  name          text        not null,
  email         text        not null,
  message       text        not null,
  timeline      text,
  source_path   text,
  user_agent    text,
  created_at    timestamptz not null default now()
);

create index if not exists leads_created_at_idx on leads (created_at desc);
create index if not exists leads_email_idx      on leads (email);

-- Blog posts. The nested parts of a post (keywords, takeaways, sections) keep
-- the exact shape the front end already renders, so they are stored as jsonb
-- rather than shredded into side tables that nothing would query on its own.
create table if not exists posts (
  id            bigserial primary key,
  slug          text        not null unique,
  title         text        not null,
  description   text        not null default '',
  published_on  date        not null default current_date,
  read_time     text        not null default '6 min read',
  category      text        not null default 'Guides',
  eyebrow       text        not null default '',
  lead          text        not null default '',
  cta           text        not null default '',
  image         text        not null default '',
  image_alt     text        not null default '',
  keywords      jsonb       not null default '[]'::jsonb,
  takeaways     jsonb       not null default '[]'::jsonb,
  sections      jsonb       not null default '[]'::jsonb,
  published     boolean     not null default false,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists posts_published_idx on posts (published, published_on desc);

-- Studio operators. Passwords are scrypt hashes (see api/_lib/auth.js).
create table if not exists admin_users (
  id            bigserial primary key,
  email         text        not null unique,
  name          text        not null default 'Studio admin',
  password_hash text        not null,
  created_at    timestamptz not null default now(),
  last_login_at timestamptz
);

create index if not exists admin_users_email_idx on admin_users (lower(email));

create or replace function set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists posts_set_updated_at on posts;
create trigger posts_set_updated_at
  before update on posts
  for each row execute function set_updated_at();
