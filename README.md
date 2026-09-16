# ebookwriters.us — Website

A premium one-page marketing site for ebookwriters.us, built to the approved brand sheet:
deep emerald, gold foil and warm paper, Cormorant Garamond over DM Sans.

## Stack

React + Vite · React Router · GSAP/ScrollTrigger · Lenis smooth scroll
Neon (Postgres) + Resend behind Vercel serverless functions in `api/`

## Run

```bash
npm install
npm run dev
```

```bash
npm run build
```

## Backend

Enquiries and blog articles live in Neon; the studio is notified by Resend. The API is
plain Vercel functions under `api/`, and `npm run dev` runs those same files through a
Vite middleware, so local and production hit identical code.

```text
api/leads.js            POST  save an enquiry + email it   · GET (admin) list enquiries
api/posts/index.js      GET   published articles           · POST (admin) create
api/posts/[slug].js     GET   one article                  · PUT/DELETE (admin)
api/admin/session.js    password sign-in, signed HttpOnly cookie
api/_lib/               db, auth, validation, error guard
db/schema.sql           the whole schema, idempotent
```

### Setup

1. `cp .env.example .env` and fill in the blanks. **Never commit `.env`.**
   - `DATABASE_URL` — Neon dashboard → your project → pooled connection string
   - `RESEND_API_KEY` — resend.com/api-keys
   - `LEAD_NOTIFY_FROM` — must be on a domain verified in Resend
   - `ADMIN_PASSWORD` — anything long and random; it gates `/admin`
   - `SESSION_SECRET` — already generated in `.env`
2. `npm run db:migrate` — creates the `leads` and `posts` tables.
3. `npm run db:seed` — copies the four seed articles into Neon.
4. Add the same variables in Vercel → Project Settings → Environment Variables.

### How the blog stays indexable

Articles are stored in Neon but still ship as prerendered HTML, because that is what
crawlers read. `npm run build` runs `scripts/fetch-posts.mjs` first, which pulls the
published rows into `src/generated/posts.js`; everything downstream imports from there.
Without `DATABASE_URL` it falls back to `src/blogPosts.static.js`, so a build never
depends on the database being up.

The consequence: **writing an article is not enough — the site has to rebuild.** Set
`DEPLOY_HOOK_URL` to a Vercel deploy hook and publishing does that automatically;
without it, redeploy by hand after publishing.

### SEO / AEO: HTML bots can read

`npm run build` is:

1. `fetch-posts` — Neon → `src/generated/posts.js`
2. `vite build` — SPA bundle + **stamp-html** (unique title/meta/JSON-LD/sitemap per route)
3. `prerender` — locally, Playwright hydrates each route into `dist/**/index.html`.
   On **Vercel**, Playwright is skipped (`VERCEL=1`); stamp already injects a full
   crawlable `<main data-seo-crawl>` inside `#root` so AI bots that skip JS still see
   services, pricing, FAQs, and contact copy. React `createRoot` replaces that shell for visitors.

Verify locally after a build:

```bash
npm run qa:seo-html
```

Or open `dist/pricing/index.html` and confirm package names appear without running JS.

### Google Search Console (ops checklist)

1. Add property `https://www.ebookwriters.us` (URL-prefix) and verify DNS/HTML tag.
2. Submit sitemap: `https://www.ebookwriters.us/sitemap.xml` (also linked from
   [`public/robots.txt`](public/robots.txt)).
3. URL Inspection → Live Test on `/`, `/services`, `/pricing`, `/contact`, and one `/blog/…`
   URL — confirm **HTML** (not only screenshot) contains body copy.
4. Phone/address NAP: `+1 712-414-0542` with Iowa (`IA`) — aligned to the phone area code.

### Spam protection

Three layers, cheapest first: an off-screen honeypot field, a per-IP rate limit
(5 enquiries per 10 minutes), and reCAPTCHA v3.

reCAPTCHA is scored rather than pass/fail, so `RECAPTCHA_MIN_SCORE` (default
0.5) is the threshold — raise it if spam still lands, lower it if real authors
get turned away. Two deliberate behaviours: with no `RECAPTCHA_SECRET_KEY` the
check is skipped so the form works before the keys are added, and if Google
itself is unreachable the submission is allowed through and logged rather than
taking the only enquiry form down during an outage.

The floating badge is hidden in CSS; Google's terms allow that as long as the
disclosure under the form names them, which it does.


### Security notes

- `/admin` is one shared password, not user accounts. Rotating `ADMIN_PASSWORD`
  does **not** sign existing sessions out — rotate `SESSION_SECRET` for that.
- Sign-in and the enquiry form are rate limited per IP (8 sign-ins and 5
  enquiries per 10 minutes). The counter lives in the function instance, so a
  burst spread across cold starts gets a fresh budget; move it to Neon if you
  ever need a hard global limit.
- Article text is escaped before it reaches the prerendered JSON-LD. Do not
  reintroduce raw `JSON.stringify` into a `<script>` block — a `</script>` in a
  title would otherwise ship as live markup on every blog page.
- Security headers (HSTS, nosniff, Referrer-Policy, frame-ancestors) are set in
  `vercel.json` and only take effect on Vercel, not in `vite preview`.


### Admin

`/admin` — sign in with `ADMIN_PASSWORD` to write articles and read enquiries. It is
`noindex` and disallowed in `robots.txt`. There is one shared password, no user accounts.


## Structure

```text
src/main.jsx     all sections + interaction
src/data.js      every piece of copy (edit content here, not in the components)
src/icons.jsx    the brand line-icon set
src/styles.css   design tokens + all styling
public/assets/brand/   the images the site actually ships
```

## Sections

Top bar · header · hero · retailer marquee · stats · services · process · why us ·
portfolio · testimonials · pricing · FAQ · CTA banner · contact · footer

## Assets

`ebookwriters_assets/` holds the raw crops taken from the approved mockup. What shipped:

| Shipped file | Source |
| --- | --- |
| `brand/logo-dark.png` | `01-logo-header.png`, trimmed |
| `brand/logo-light.png` | recoloured from the same logo for the emerald surfaces |
| `brand/hero-desk.jpg` | `02-hero-image.png`, with the stray `k.` sliver on the left edge cropped off |
| `brand/why-stack.jpg` | editorial crop of the same hero photograph |
| `brand/cover-*.jpg` | generated cover mockups in the brand palette |
| `brand/favicon*` | generated from the `e.` mark on the brand sheet |

Not shipped, and why:

- `06`–`19` (service icons, why-us icons, step badges) were cropped past their own
  edges in the source export — missing pencil tips, clipped glyphs, half-circles. They
  are redrawn as vectors in `src/icons.jsx`, same line weight and palette, crisp at any size.
- `03`–`05` (testimonial portraits) are cut off at the chin in the source files, so the
  testimonials use monogram avatars instead.
- `20-logo-footer.png` has a dark band baked into the crop; the recoloured header logo is
  used on dark backgrounds instead.
- `21`/`22` are full-section reference screenshots, used as the design target only.

Everything previously in `public/assets/` was moved to `design/unused-source-assets/`.
It was either the old black-and-gold Readora palette or carried a different studio's
logo (`theebookstudio.com`) on the mug and tablet in shot. Do not put those back.

## Before launch

- Set the environment variables in Vercel, then run `npm run db:migrate` and
  `npm run db:seed` against the production database — the contact form returns a
  generic error until `DATABASE_URL` is set.
- Verify a sending domain in Resend and point `LEAD_NOTIFY_FROM` at it. The default
  `onboarding@resend.dev` only delivers to the address that owns the Resend account.
- Placeholder details to replace: `hello@ebookwriters.us`, `+1 (800) 555-0142`, the
  stat figures, the three testimonials and the three portfolio titles.
- `index.html` carries the JSON-LD `ProfessionalService` block — update the rating and
  price range to match reality before it goes live.
