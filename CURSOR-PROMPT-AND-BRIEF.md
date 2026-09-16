# ebookwriters.us — Cursor prompt + SEO content brief
Site: https://www.ebookwriters.us/
Owner brief: strengthen money pages and fill missing intent pages. Do not invent search volumes, rankings, or fake testimonials. Keep fixed packages and 100% author ownership. Drafts only until the owner approves publish.

---

## CODEBASE AUDIT (verified in repo — do not contradict)

| Fact | Status in code |
|------|----------------|
| Stack | **Vite + React SPA** (not Next.js). Routes in `src/main.jsx`. Deployed on Vercel. SEO HTML stamped via `src/seo.js` + `scripts/stamp-html.mjs`. |
| Packages | `src/data.js` `plans`: Starter $699 / 15k / 3w · Professional $1,499 / 30k / 5w · Premium $2,499 / 50k / 8w · Elite $3,999 / 100k / 12w |
| KDP in packages | Professional includes KDP setup. Premium includes KDP + IngramSpark. Elite = global distribution. Starter = files only (no KDP setup claim). |
| Existing landers | `/ebook-ghostwriting-services`, `/hire-ebook-writer`, `/amazon-kdp-ebook-writing` — thin but real copy in `landers` (`src/pageContent.js`). **Expand, do not delete/rebuild from scratch.** |
| Missing routes | `/ebook-editing-services`, `/ebook-cover-design`, `/faq` — not in `main.jsx` or `seo.js` |
| FAQ | Homepage section `#faq` + footer `/#faq`. FAQPage schema already on home in `seo.js`. Need crawlable `/faq` + footer/home teaser links. |
| Services cards | `src/data.js` `services[]` + `serviceHrefs` in `pageContent.js`. **Key trap:** `formatting` = Cover Design (not interior formatting). `publishing` = Publishing & Formatting → KDP lander. Editing + cover currently deep-link to `/services`. |
| Blog (4 posts) | Already live — do not duplicate: package includes · timeline · ghostwriting vs freelancer · **how-much-does-it-cost-to-hire-an-ebook-writer**. New posts must differentiate. |
| Page chrome | Shared `PageHero` (`src/PageHero.jsx`). New pages should reuse it + `ArticlePage` / lander pattern in `ContentPages.jsx`. |

### Where to edit (file map)

| Concern | File(s) |
|---------|---------|
| Lander / new page copy | `src/pageContent.js` |
| Plans, FAQs, footer, nav, services cards | `src/data.js` |
| Page components / new exports | `src/ContentPages.jsx` |
| Routes | `src/main.jsx` |
| Titles, meta, JSON-LD, sitemap/prerender list | `src/seo.js` |
| Blog articles | `src/blogPosts.static.js` (and regenerate/seed if using Neon) |
| Styles (only if layout needs it) | `src/styles.css` — append; last layer wins |
| Nav match paths for new service URLs | `navigation` in `src/data.js` |

---

## PASTE THIS INTO CURSOR (implementation prompt)

```
You are working on the Vite + React (SPA) site for https://www.ebookwriters.us/ (Tennessee US ebook writing studio), deployed on Vercel. This is NOT Next.js.

GOAL
Improve SEO and conversion without inventing metrics, reviews, or case studies. Use only real offers already on the site. Expand existing landers — do not wipe them and rewrite from zero.

LIVE FACTS (do not contradict)
- Services: ghostwriting, editing/proofreading, cover design, formatting, KDP + IngramSpark setup, ISBN/copyright help, light marketing support
- Packages in src/data.js plans:
  - Starter $699 — up to 15k words — ~3 weeks (writing + edit pass + standard cover + EPUB/PDF; NO KDP setup in features)
  - Professional $1,499 — up to 30k — ~5 weeks (includes KDP publishing setup)
  - Premium $2,499 — up to 50k — ~8 weeks (KDP + IngramSpark)
  - Elite $3,999 — up to 100k — ~12 weeks (global distribution / hardcover-ready)
- USP: fixed fee, 100% author ownership, NDA, retailer-ready files, client keeps KDP account/royalties
- Existing money pages: /ebook-ghostwriting-services, /hire-ebook-writer, /amazon-kdp-ebook-writing, /services, /pricing, /portfolio, /about, /contact, /blog
- FAQ currently only on homepage /#faq (footer links there)
- Blog has 4 posts already — see BRIEF 7 for overlap rules
- Service card key trap: services[].key "formatting" = Cover Design; "publishing" = Publishing & Formatting

FILE MAP (edit these)
- Copy for landers/new pages → src/pageContent.js
- Plans, homepage FAQs, footerLinks, navigation, services[] → src/data.js
- Components → src/ContentPages.jsx (reuse PageHero + ArticlePage/Lander patterns)
- Routes → src/main.jsx
- SEO / FAQPage / prerender → src/seo.js
- Blog → src/blogPosts.static.js
- Styles only if needed → append to src/styles.css

DO THIS IN ORDER
1) Audit routes in main.jsx and SEO entries in seo.js for the URLs below.
2) Strengthen (expand existing landers in pageContent.js landers.*; keep URLs) using briefs:
   - /ebook-ghostwriting-services
   - /hire-ebook-writer
   - /amazon-kdp-ebook-writing
   Add missing sections only (packages snapshot, genres, ownership, on-page FAQ where brief asks). Keep current H1 direction.
3) Create new crawlable pages with unique title/H1/meta:
   - /ebook-editing-services
   - /ebook-cover-design
   - /faq
   Wire routes, pageContent, ContentPages exports, seo.js prerender/meta/JSON-LD, PageHero images (reuse existing brand assets).
4) Internal links: update serviceHrefs + services[].href so:
   - writing → /ebook-ghostwriting-services
   - editing → /ebook-editing-services
   - formatting (Cover Design) → /ebook-cover-design
   - publishing → /amazon-kdp-ebook-writing
   Footer FAQ → /faq; homepage FAQ teaser/link to /faq; navigation.match includes new paths.
5) FAQPage schema: on /faq (full list). On money pages only if that URL visibly shows FAQ blocks. Do not invent FAQs that contradict data.js faqs.
6) Home FAQ: keep a short teaser or the section, but point “see all” / footer to /faq.
7) Do NOT change package prices. Do NOT invent testimonials, client names, rankings, or “#1” claims. Label owner-needed proof as TODO. Do NOT spam keyword density.

OUTPUT
- Code changes (commit-ready)
- Short summary of URLs changed
- List any copy that still needs a real testimonial/screenshot/AI-policy answer from the owner
```

---

## BRIEF 1 — Strengthen `/ebook-ghostwriting-services` (TOP PRIORITY)

**Already in code:** who this is for · what’s included · how it works · CTAs · related links.  
**Add/expand:** packages snapshot · ownership/NDA block · genres · on-page FAQ (5–7) · meta/title polish in `seo.js`.

**Primary terms:** ebook ghostwriting services, ebook ghostwriter, hire ebook ghostwriter  
**Secondary:** ghostwrite my ebook, confidential ebook writer, ebook in your voice  
**Audience:** first-time and busy authors (coaches, founders, memoir/nonfiction) who want the byline and rights  
**Job of page:** convert “researching ghostwriters” → request quote on /contact

### Title / H1 / meta (draft)
- Title: `Ebook Ghostwriting Services — Your Voice, Your Name | ebookwriters.us`
- H1: keep close to current: `Ebook ghostwriting services in your voice`
- Meta: `Hire ebook ghostwriters on a fixed fee. Outline to manuscript, revisions, NDA, and 100% ownership. Packages from $699.`

### Must-include sections
1. **Who this is for** — idea but no time; expertise but not a writer; wants confidentiality *(exists — tighten)*  
2. **What’s included** — research, outline, full manuscript, revisions, NDA, rights transfer *(exists)*  
3. **How it works** — discovery call → outline approval → chapter drafts → revisions → final files *(exists)*  
4. **Packages snapshot** — link to /pricing; Starter→Elite from `plans`; no new prices  
5. **Ownership & NDA** — you keep copyright, royalties, KDP account  
6. **Genres we write** — align with portfolio genres in `data.js` books (self-development, memoir, business, health, etc.) — do not invent bestsellers  
7. **FAQ** (5–7 Qs) — rights, revisions, AI policy only if owner confirmed (else TODO), timeline, what you must provide  
8. **CTA** — Request a ghostwriting quote → /contact; secondary → /pricing  

### Proof needed from owner (placeholders OK labeled TODO)
- 1–2 anonymized before/after samples or chapter excerpts  
- Real turnaround examples  
- Any true review quotes  
- Written AI-use policy if you want that FAQ answered  

### Internal links
→ /pricing, /hire-ebook-writer, /amazon-kdp-ebook-writing, /portfolio, /contact, existing cost blog `/blog/how-much-does-it-cost-to-hire-an-ebook-writer`

### Do not
Keyword stuff. Fake “bestseller” claims. Open-ended “custom quote only” as the only pricing story (fixed packages are the edge).

---

## BRIEF 2 — Strengthen `/hire-ebook-writer`

**Already in code:** fixed-fee pitch · studio vs marketplace · how to brief · CTAs.  
**Add/expand:** clearer genre matching · packages table teaser from `plans` · timeline mapped to packages · optional FAQ.

**Primary terms:** hire ebook writer, hire an ebook writer, professional ebook writers  
**Angle:** fixed fee, not hourly / not marketplace gamble  

### Sections
- Why hire a studio vs Fiverr/Upwork (quality control, coordinated delivery, retailer-ready path) — factual, not smear *(exists — keep tone)*  
- Matching by genre  
- What’s in the fee (writing + path to publish; scope can be writing-only if asked)  
- Packages table teaser → /pricing  
- Timeline expectations (3–12 weeks per package)  
- CTA: Hire an ebook writer → /contact  

---

## BRIEF 3 — Strengthen `/amazon-kdp-ebook-writing`

**Already in code:** writing + KDP as one project · ownership · package notes · bullets.  
**Confirm in copy (from plans, not invent):** Professional = KDP setup; Premium = KDP + IngramSpark; Elite = broader distribution; Starter = files without listing “KDP setup”.

**Primary terms:** Amazon KDP ebook writing, KDP publishing services, Kindle ebook writer  
**Angle:** writing + KDP setup as one project; client keeps account & royalties  

### Sections
- Manuscript + EPUB/print + categories/keywords/metadata + KDP setup *(exists — expand)*  
- What you still own (account, royalties)  
- Which packages include KDP setup (see table above)  
- CTA: Plan KDP publishing → /contact  

---

## BRIEF 4 — NEW `/ebook-editing-services`

**Primary terms:** ebook editing services, ebook proofreading, developmental editing ebook  
**Audience:** authors who already have a draft  
**Match services card:** Developmental edit · Line & copy edit · Final proofread (`services` key `editing`)

### Sections
- Developmental vs line/copy vs proofreading  
- Who it’s for  
- Deliverables & revision rounds — if policy not documented, say “quoted per manuscript” / TODO; do not invent “unlimited”  
- Link to ghostwriting if they need writing, not only editing  
- CTA → /contact  
- SEO entry + breadcrumbs Home → Services → Ebook Editing  

---

## BRIEF 5 — NEW `/ebook-cover-design`

**Primary terms:** ebook cover design, Kindle cover design  
**Match services card:** key `formatting` title “Cover Design” — Custom cover · Front, spine & back · Genre-matched art direction  

### Sections
- Custom cover; front/spine/back for print (already claimed on services card)  
- Genre fit + thumbnail readability on Amazon  
- What’s delivered (file types — confirm; until then: “print- and retailer-ready cover files as scoped in your quote” / TODO)  
- CTA → /contact; cross-link `/amazon-kdp-ebook-writing`  
- SEO entry + breadcrumbs  

---

## BRIEF 6 — NEW `/faq`

Move/copy homepage FAQ content from `data.js` `faqs` into a crawlable `/faq` page; keep homepage FAQ section or a short teaser with link “Full FAQ → /faq”.  
Update `footerLinks` FAQ href from `/#faq` → `/faq`.  
Cover: ownership, pricing range, timelines, revisions, publishing support, niches (reuse existing answers — don’t rewrite into contradictions).  
Add FAQPage schema on `/faq` in `seo.js`. CTA → /contact  

---

## BRIEF 7 — Blog posts to write next (content, not thin SEO)

**Already published — do NOT create near-duplicates:**

| Existing slug | Topic |
|---------------|--------|
| `what-is-included-in-a-professional-ebook-writing-package` | Package checklist |
| `how-long-does-it-take-to-write-and-publish-a-book` | Timeline |
| `ghostwriting-vs-hiring-a-freelancer` | Studio vs freelancer |
| `how-much-does-it-cost-to-hire-an-ebook-writer` | Cost to hire a writer |

Write as **new** articles only if they add a distinct angle; link into money pages. Do not invent statistics.

1. **How much does an ebook ghostwriter cost?** — OK if framed as *ghostwriter* market ranges + studio packages (differentiate from existing “hire an ebook writer” cost post; cross-link both)  
2. **How to hire an ebook writer** — checklist (NDA, rights, samples, milestones, KDP) → `/hire-ebook-writer` (process/checklist angle, not another price article)  
3. **Ebook writing timeline: 3 to 12 weeks** — only if it maps packages more explicitly than the existing timeline post; otherwise expand the existing article instead of a 5th thin post  
4. **KDP publishing checklist for first-time authors** → `/amazon-kdp-ebook-writing` (net-new checklist — good gap)

Prefer shipping (2) and (4) first if capacity is limited.

---

## OFF-PAGE (for humans / another bot — not Cursor code)

- Google Business Profile if US studio is real and eligible  
- 2–3 guest posts or podcast pitches on “cost of ghostwriting” / “hire ebook writer”  
- Directory listings (legit author/publishing dirs only)  
- Collect real reviews (Google/Trustpilot)  
- No PBNs, no paid link farms, no fake reviews  

---

## SUCCESS CHECKLIST
- [ ] 3 money pages expanded (not replaced) with unique missing sections  
- [ ] Editing, cover, FAQ routes live, in `seo.js` prerender, and linked  
- [ ] `/services` + `serviceHrefs`: editing → editing page; cover (`formatting`) → cover page; writing → ghostwriting; publishing → KDP  
- [ ] Footer + nav aware of new URLs; FAQ → `/faq`  
- [ ] FAQPage schema on `/faq` (and on-page FAQs only where visible)  
- [ ] No invented metrics/testimonials; prices unchanged  
- [ ] Blog plan respects existing 4 posts (no duplicate cost/timeline fluff)  
- [ ] Owner reviews copy before treating as final publish  
