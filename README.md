# ebookwriters.us — Website

A premium one-page marketing site for ebookwriters.us, built to the approved brand sheet:
deep emerald, gold foil and warm paper, Cormorant Garamond over DM Sans.

## Stack

React + Vite · GSAP/ScrollTrigger · Lenis smooth scroll

## Run

```bash
npm install
npm run dev
```

```bash
npm run build
```

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

- The contact form is frontend-only: it builds a brief the visitor can copy, and sends
  nothing. Point `handleSubmit` in `src/main.jsx` at Formspree, HubSpot or your own endpoint.
- Placeholder details to replace: `hello@ebookwriters.us`, `+1 (800) 555-0142`, the
  stat figures, the three testimonials and the three portfolio titles.
- `index.html` carries the JSON-LD `ProfessionalService` block — update the rating and
  price range to match reality before it goes live.
