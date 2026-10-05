# Team portraits — generation brief

The About page team grid (`/about#team`) reads `aboutPage.team.members` in
`src/pageContent.js`. Each member has `image: null` until a portrait exists; the
card shows a gold monogram on emerald until then.

## Output spec (all nine must match)

- 4:5 portrait, export **960 x 1200**, then save as `.webp` (quality ~82, aim < 90 KB)
- Save to `public/assets/brand/team/<file>` and set `image: '/assets/brand/team/<file>'`
- Head and shoulders, eyes on the upper third, face centred — the card crops from the top
- Same lighting, background, lens and grade on every image, or the grid looks like stock

## Shared style prompt

> Professional editorial headshot of [APPEARANCE], [WARDROBE], head and shoulders,
> looking at the camera with a calm, confident expression. Soft window light from the
> left, gentle fill, natural skin texture, no retouched plastic look. Plain backdrop in
> deep emerald green (#0F3D32) with a soft gradient, slight warm gold rim light.
> 85mm lens, f/2.8, shallow depth of field. Muted, warm editorial colour grade.
> Vertical 4:5 crop. No text, no logo, no props, no jewellery that catches light.

Wardrobe suggestion: dark neutrals (charcoal, navy, black, cream) — no bright colours,
no patterns, so nine portraits sit together.

## Per person

Fill in `[APPEARANCE]` for each before generating.

| File | Name | Role | Wardrobe |
| --- | --- | --- | --- |
| `reesha-jeff.webp` | Reesha Jeff | Chief Executive Officer | tailored dark blazer, most formal of the set |
| `sophia-parker.webp` | Sophia Parker | Editorial Director | dark blazer over a light top |
| `mia-anderson.webp` | Mia Anderson | Senior Publishing Consultant | smart knit or blazer |
| `rachel-morgan.webp` | Rachel Morgan | Project Manager | crisp shirt or blouse |
| `hannah-collins.webp` | Hannah Collins | Managing Editor | knit sweater, cream or charcoal |
| `jessica-marlowe.webp` | Jessica Marlowe | Author Success Manager | soft blazer |
| `vanessa-callahan.webp` | Vanessa Callahan | Creative Director | black, slightly more design-led |
| `allison-mercer.webp` | Allison Mercer | Publishing Operations Manager | shirt or blouse |
| `cole.webp` | Cole | Client Partnerships Lead | dark blazer, open collar |
