import { comparisons, faqs, plans, siteContact } from './data.js';

export const aboutPage = {
  eyebrow: 'The studio',
  title: 'A US ebook writing studio built for authors who want the',
  titleEm: 'book done.',
  lead:
    'ebookwriters.us is an Iowa ghostwriting and publishing studio. We write, edit, design, and prepare books for Amazon KDP and IngramSpark — so you are not coordinating a dozen freelancers.',
  heroImage: '/assets/brand/page-hero-studio.png',
  heroImageAlt: 'Writing desk with manuscript pages and publishing tools',
  actions: [
    { label: 'Request a quote', href: '/contact' },
    { label: 'See packages', href: '/pricing', variant: 'gold' },
  ],
  manifesto:
    'One studio. One schedule. Your name on the cover — and nowhere is ours unless you ask.',
  pillars: [
    {
      label: 'Ownership',
      copy: '100% rights and royalties stay with you. NDA before the first interview.',
    },
    {
      label: 'Fixed fee',
      copy: 'Packages quoted up front. Scope changes appear in writing before we write past them.',
    },
    {
      label: 'Matched writers',
      copy: 'Finance, health, law, memoir, and related nonfiction. After NDA you meet the assigned writer by name — we do not publish a public roster.',
    },
  ],
  principles: [
    {
      index: '01',
      heading: 'Who we are',
      paragraphs: [
        'We help experts, entrepreneurs, and first-time authors turn a clear idea into a manuscript they are proud to put their name on. The work happens under one roof: ghostwriting, editing, cover design, formatting, and retailer setup.',
        `Based in ${siteContact.address}. Reach us at ${siteContact.email} or ${siteContact.phone}. Authors across the US — and remotely worldwide.`,
      ],
    },
    {
      index: '02',
      heading: 'How we work',
      paragraphs: [
        'Every project starts with a short discovery call and an NDA. We match you with a writer experienced in your category, introduce that writer by name, agree a chapter outline, and write against a dated schedule. You review as chapters land — typically a few hours of your time in total.',
        'You keep 100% of the rights and royalties. Your name goes on the cover. We do not publish a public writer roster because most titles are confidential ghostwriting.',
      ],
    },
    {
      index: '03',
      heading: 'What we will not do',
      paragraphs: [
        'We will not guess at a niche we cannot staff. If we do not have a specialist for your subject, we will say so rather than assign a generalist.',
        'We also will not bury fees. If the scope changes, you see the change before we write past it.',
      ],
    },
  ],
  stages: [
    { n: '01', title: 'Discovery + NDA', copy: 'Goals, audience, length, and a clear yes or no on fit.' },
    { n: '02', title: 'Outline + sample', copy: 'Chapter map and a sample chapter included in the package. If the voice misses, we rewrite that sample at no extra cost before the rest is written.' },
    { n: '03', title: 'Draft + revise', copy: 'Dated schedule, chapter reviews, and fixed revision rounds.' },
    { n: '04', title: 'Design + files', copy: 'Cover, formatting, and retailer-ready files for the package you chose.' },
  ],
  portrait: {
    image: '/assets/brand/publishing-craft-v2.webp',
    alt: 'Manuscript and craft tools on the studio production desk',
    caption: 'Production desk — outline to retailer-ready files under one roof.',
  },
  links: [
    { label: 'Ebook ghostwriting', href: '/ebook-ghostwriting-services' },
    { label: 'Hire an ebook writer', href: '/hire-ebook-writer' },
    { label: 'Amazon KDP publishing', href: '/amazon-kdp-ebook-writing' },
    { label: 'Writing packages', href: '/pricing' },
  ],
  closeTitle: 'Ready to talk through your book?',
  closeLead: 'A 30-minute discovery call, an NDA, and a fixed quote. No hourly billing.',
};

export const pricingPage = {
  eyebrow: 'Investment',
  title: 'Ebook writing packages — $699 to $3,999.',
  lead:
    'Ghostwriting packages with editing, cover design, and retailer-ready files included. No surprise invoices. Choose a plan, then request a quote with that package selected.',
  heroImage: '/assets/brand/page-hero-brief.png',
  heroImageAlt: 'Publishing roadmap desk with journal and stage books',
  actions: [
    { label: 'Talk to a specialist', href: '/contact' },
    { label: 'What a package includes', href: '/blog/what-is-included-in-a-professional-ebook-writing-package', variant: 'gold' },
  ],
  note:
    'Every quote is fixed for the length and scope we agree. Rush timelines and specialist research can change the fee — you will see that before work starts.',
  closing:
    'Not sure which length you need? Tell us the job the book has to do — lead magnet, flagship business title, memoir — and we will recommend a package.',
  plansHeading: "What's included in each package",
  why: {
    heading: 'Why our pricing works',
    lead:
      'We operate as a focused writing studio, not a traditional publishing house. Packages are built around agreed word counts, interview load, revision rounds, and a named deliverable list — so the fee can stay fixed without hiding hours on a later invoice.',
    paragraphs: [
      'You are not buying “unlimited writing.” You are buying a scoped manuscript path: outline, sample chapter, drafted chapters on a dated schedule, the editorial passes listed for that package, and the files that package includes.',
      'That is how a 15,000-word guide and a 50,000-word authority book can both be quoted up front. Length, research depth, and production support change the band — not an open hourly tab.',
    ],
    includedTitle: 'Included in the package you choose',
    included: [
      'Ghostwriting to the agreed word count',
      'The editorial passes listed for that plan',
      'Cover design at the level listed for that plan',
      'Retailer-ready files named in the plan (EPUB/PDF, and print where listed)',
      'KDP or IngramSpark setup where the plan includes it',
      'NDA and rights-transfer paperwork — you own the book',
    ],
    excludedTitle: 'Not included unless we agree in writing',
    excluded: [
      'Extensive academic or original empirical research beyond the brief',
      'Unlimited interviews or a second full rewrite of the approved outline',
      'Complex custom illustration, photography, or infographic programs',
      'Bulk print runs, warehousing, or paid advertising spend',
      'Rush delivery shorter than the plan timeline',
      'A public writer roster or putting the studio name on your cover',
    ],
  },
};

export const servicesPage = {
  eyebrow: 'Our services',
  title: 'Ebook writing, editing, design, and publishing — in one studio.',
  lead:
    'Hire ebook writers and ghostwriters without stitching together a cover designer, formatter, and KDP specialist later. Start with a lander below, or request a quote and we will map the work.',
  heroImage: '/assets/brand/page-hero-covers.png',
  heroImageAlt: 'Open manuscript and craft tools on a publishing production desk',
  actions: [
    { label: 'Get a writing quote', href: '/contact' },
    { label: 'View pricing', href: '/pricing', variant: 'gold' },
  ],
  pricingNote: 'Packages start at $699.',
  pricingCta: 'View pricing',
  pricingHref: '/pricing',
  briefing: {
    heading: 'What this page is for',
    lead:
      'Use /services to pick a starting URL. Full package features live on /pricing. General rights, timeline, and revision questions live on /faq. This index does not repeat those lists.',
    paragraphs: [
      'Authors land here when they know they need help and do not yet know whether the next click is ghostwriting, editing, cover design, or Amazon KDP setup. The six cards below are the studio menu. The dedicated pages are the deep briefs. Pricing is a separate commercial page so Google is not asked to rank the same four packages on three URLs.',
      'If you already know the manuscript length and want a number, skip this page and open pricing. If you have a draft, start with editing. If you need the book written, start with ghostwriting or hire an ebook writer. If Amazon is the destination, start with KDP ebook writing so files and listing sit in one scope.',
    ],
  },
  chooser: {
    heading: 'How to choose a starting page',
    lead:
      'Each service URL has a different job. Use this page to pick a path — not to re-read the same packages.',
    items: [
      {
        title: 'You need the manuscript written',
        copy: 'Start with ebook ghostwriting services if you want outline-to-manuscript in your voice, or hire an ebook writer if you are ready to brief a specialist on a fixed fee.',
      },
      {
        title: 'You already have a draft',
        copy: 'Start with ebook editing services. If the draft still needs large new chapters, we will say so and point you to ghostwriting instead of selling a polish that cannot fix a missing book.',
      },
      {
        title: 'You are publishing on Amazon',
        copy: 'Amazon KDP ebook writing covers manuscript work plus formatting, categories, keywords, and listing setup. You keep the KDP account and the royalties.',
      },
      {
        title: 'You need the cover to work at thumbnail size',
        copy: 'Ebook cover design is the visual brief — genre, typography, ebook front, and print wrap when scoped. Pair it with KDP setup when you want files and listing handled together.',
      },
    ],
  },
};

export const serviceHrefs = {
  writing: '/ebook-ghostwriting-services',
  editing: '/ebook-editing-services',
  formatting: '/ebook-cover-design',
  publishing: '/amazon-kdp-ebook-writing',
  ghostwriting: '/services',
  branding: '/services',
};

export const landers = {
  ghostwriting: {
    path: '/ebook-ghostwriting-services',
    eyebrow: 'Ghostwriting',
    title: 'Ebook ghostwriting services in your voice.',
    lead:
      'A professional ghostwriter researches, outlines, and writes the manuscript. You stay the author. NDA before you share anything, full rights transfer before writing begins, and your name on the cover.',
    quickAnswer:
      'Ebook ghostwriting means a specialist researches, outlines, and writes the manuscript in your voice while you remain the author of record. At ebookwriters.us that path includes an NDA, a rights-transfer agreement before writing begins, revision rounds in the package, and files that match the plan you approve.',
    heroImage: '/assets/brand/page-hero-studio.png',
    heroImageAlt: 'Author workspace for professional ebook ghostwriting',
    actions: [
      { label: 'Request a ghostwriting quote', href: '/contact' },
      { label: 'See ghostwriting packages', href: '/pricing', variant: 'gold' },
    ],
    sections: [
      {
        heading: 'What ebook ghostwriting includes',
        paragraphs: [
          'Ghostwriting here is not a first-draft dump. The writer assigned to you builds a chapter outline you approve, writes in a voice matched to interviews and samples, and revises against the rounds in your package.',
          'Editing, a cover, and retailer-ready files are part of the same studio path — so the person writing the book is not disconnected from the people who design and publish it.',
        ],
        bullets: [
          'Discovery call and NDA',
          'Chapter-by-chapter outline',
          'Original research in your niche',
          'Manuscript in your voice',
          'Revision rounds included in the package',
          'Rights-transfer agreement — you own the book',
        ],
      },
      {
        heading: 'Who this is for',
        paragraphs: [
          'Authors with a clear idea and no time to draft. Experts who can talk the book but are not writers. Founders who need a lead-generating guide. Memoirists who want confidentiality and a finished manuscript under their name.',
          'If you want the byline and the rights — and a studio that can carry the book through edits and files — this is the service.',
        ],
      },
      {
        heading: 'How a ghostwriting project runs',
        paragraphs: [
          'We start with scope: length, audience, and the job the book must do. You get a fixed quote and a dated schedule. Then interviews, outline, sample chapter, full manuscript, edits, and files.',
          'If the sample chapter misses your voice, we rewrite it at no cost before the rest of the manuscript is written.',
        ],
      },
      {
        heading: 'Research, interviews, and voice matching',
        paragraphs: [
          'Voice is not a style filter applied at the end. We match it from recorded interviews, any writing samples you already have, and the reader you named in the brief. Most authors spend two to four hours in total across discovery, interviews, and chapter reviews.',
          'Research stays inside the agreed brief: your frameworks, your stories, and publicly checkable facts in your niche. We will not invent lived detail you did not provide, and we will flag claims that need your sign-off before they go in the manuscript.',
        ],
        bullets: [
          'Discovery call and chemistry check',
          'One or two voice-matching interviews',
          'Chapter outline you approve before drafting',
          'Sample chapter — rewritten at no cost if the voice misses',
          'Chapter batches on a dated schedule',
        ],
      },
      {
        heading: 'Word counts and timelines we quote against',
        paragraphs: [
          'These are the length bands on the pricing page. Open that page for the full feature list — this page is the ghostwriting process, not a second rate card.',
        ],
        table: {
          caption: 'Ghostwriting length bands',
          columns: ['Package', 'Starting from', 'Typical length', 'Typical timeline'],
          rows: plans.map(plan => [plan.name, `$${plan.price}`, plan.words, plan.timeline]),
        },
      },
      {
        heading: 'Ownership, NDA, and royalties',
        paragraphs: [
          'You keep copyright, royalties, and your retailer accounts. An NDA is signed before you share source material. A rights-transfer agreement is signed before writing begins. Your name goes on the cover; ours appears nowhere unless you ask.',
        ],
      },
      {
        heading: 'Genres we write',
        paragraphs: [
          'We staff writers for the categories we can do well. Portfolio work spans self-development, personal growth, memoir, business and finance, health and wellness, parenting, and related nonfiction. Fiction projects are considered when we have the right specialist.',
          'If we cannot staff your niche honestly, we will say so rather than assign a generalist.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Who owns the finished ebook?',
        a: 'You do — completely. Rights transfer before writing begins. You keep royalties and retailer accounts.',
      },
      {
        q: 'How many revision rounds are included?',
        a: 'Every package includes revision rounds (Starter starts at two). Premium lists unlimited revisions within the agreed scope. The sample chapter is rewritten at no cost if the voice is wrong.',
      },
      {
        q: 'How long does ghostwriting take?',
        a: 'About three weeks for a 15,000-word guide, five for ~30,000 words, eight for ~50,000, and up to twelve for a full-length Elite manuscript — dated before we start.',
      },
      {
        q: 'Do you use AI to write the manuscript?',
        a: 'No — we do not deliver an unedited AI-generated book as ghostwriting. Your manuscript is written and revised by the assigned human writer, under studio editorial review. Ordinary tools may support research, outlining, or production admin; the published prose is authored for your voice. If you need stricter language in the agreement, say so on the discovery call.',
      },
      {
        q: 'What do I need to provide?',
        a: 'A short brief (audience, goal, target length, deadline), time for a discovery call and one or two voice interviews, and feedback as chapters land. Roughly two to four hours of your time in total.',
      },
      {
        q: 'Is the work confidential?',
        a: 'Yes. NDA before source material. We do not put the studio name on your cover unless you request it.',
      },
    ],
    links: [
      { label: 'Hire an ebook writer', href: '/hire-ebook-writer' },
      { label: 'Amazon KDP writing & publishing', href: '/amazon-kdp-ebook-writing' },
      { label: 'How much does an ebook ghostwriter cost?', href: '/blog/how-much-does-an-ebook-ghostwriter-cost' },
      { label: 'How to hire an ebook writer (checklist)', href: '/blog/how-to-hire-an-ebook-writer' },
      { label: 'Ghostwriting vs a freelancer', href: '/blog/ghostwriting-vs-hiring-a-freelancer' },
      { label: 'All services', href: '/services' },
    ],
  },
  hire: {
    path: '/hire-ebook-writer',
    eyebrow: 'Hire a writer',
    title: 'Hire an ebook writer on a fixed fee — not an open tab.',
    lead:
      'Tell us the idea, the length, and the deadline. We match you with a writer in that category and quote a package. Writing, edits, and files are in the number you approve — not billed by the hour.',
    quickAnswer:
      'Hiring an ebook writer here means a fixed quote, a genre-matched specialist introduced after NDA, and a dated chapter schedule. Compare the finished deliverable — manuscript, edits, files, and rights — not the lowest hourly draft rate.',
    heroImage: '/assets/brand/page-hero-studio.png',
    heroImageAlt: 'Desk setup for hiring a professional ebook writer',
    actions: [
      { label: 'Hire an ebook writer', href: '/contact' },
      { label: 'Compare packages', href: '/pricing', variant: 'gold' },
    ],
    sections: [
      {
        heading: 'What you get when you hire us',
        paragraphs: [
          'A genre-matched writer introduced by name after NDA — not a rotating bid board. An NDA and a rights-transfer agreement so the finished ebook is yours. A schedule with chapter delivery dates, not a vague “we will see.”',
          `Packages start at $${plans[0].price} for a focused 15,000-word guide and go to $${plans[plans.length - 1].price} for a full-length authority book with launch support.`,
        ],
        bullets: [
          'Fixed quote before writing begins',
          'Writer matched to your niche',
          'Two to four hours of your time, total',
          'Revision rounds in every package',
          '100% author ownership and royalties',
        ],
      },
      {
        heading: 'Matched by genre — not by lowest bid',
        paragraphs: [
          'We staff writers for categories we know: business and finance, health and wellness, memoir, self-help, and related nonfiction. The match happens before you pay for a full manuscript — so the person writing has already done work in that lane.',
        ],
      },
      {
        heading: 'Freelance marketplace vs a studio',
        paragraphs: [
          'Hiring one freelancer for chapters, another for edits, and a third for a cover is how manuscripts stall. A studio quote includes the path to retailer-ready files. If you only need writing, say so — we will not pad the scope.',
          'Read our comparison of ghostwriting versus hiring a freelancer if you are weighing a low hourly bid against a fixed package.',
        ],
        table: comparisons.studioVsFreelancer,
      },
      {
        heading: 'Questions to ask before you hire anyone',
        paragraphs: [
          'Use the same four questions on every quote, including ours. Vague answers are the signal — not a slightly higher package price.',
        ],
        bullets: [
          'Who owns the copyright, and when does it transfer?',
          'What files do I receive, and who holds the KDP login?',
          'How many revision rounds are named in writing?',
          'Can I see the assigned writer by name after NDA, and a sample chapter before the full draft?',
        ],
      },
      {
        heading: 'Red flags',
        paragraphs: [
          'A bid that never mentions NDA or assignment is not a bargain. Neither is a vendor who insists on publishing from their retailer account “for convenience,” or a promise of a full-length book with no outline, no sample, and no dated schedule.',
        ],
      },
      {
        heading: 'How to hire us',
        paragraphs: [
          'Send the audience, the job the book has to do, target length, and deadline on the contact page. You hear back within one working day with a clear yes, no, or clarifying question — then a fixed quote, not an hourly estimate.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is hiring you cheaper than a marketplace freelancer?',
        a: 'Hourly bids can look lower until you add edits, a cover, formatting, and project management. Our packages are fixed for an agreed scope — compare the finished deliverable, not the first draft rate.',
      },
      {
        q: 'Can I hire you for writing only?',
        a: 'Yes. Say so on the contact form. We will quote writing without padding publishing work you do not need.',
      },
      {
        q: 'When do I pay?',
        a: 'After you approve a written scope and quote. We do not start manuscript work on an open hourly tab.',
      },
    ],
    links: [
      { label: 'Ebook ghostwriting services', href: '/ebook-ghostwriting-services' },
      { label: 'How to hire an ebook writer (checklist)', href: '/blog/how-to-hire-an-ebook-writer' },
      { label: 'How much does an ebook ghostwriter cost?', href: '/blog/how-much-does-an-ebook-ghostwriter-cost' },
      { label: 'Amazon KDP publishing', href: '/amazon-kdp-ebook-writing' },
      { label: 'Contact the studio', href: '/contact' },
    ],
  },
  kdp: {
    path: '/amazon-kdp-ebook-writing',
    eyebrow: 'Amazon KDP',
    title: 'Amazon KDP ebook writing and publishing, handled as one project.',
    lead:
      'We write the manuscript, format EPUB and print files, research categories and keywords, and walk you through KDP setup. You keep the Amazon account and 100% of the royalties.',
    quickAnswer:
      'Amazon KDP ebook writing here means the manuscript, retailer-ready files, category and keyword research, and guided listing setup on an account you own. You remain the publisher of record and keep 100% of the royalties.',
    heroImage: '/assets/brand/page-hero-brief.png',
    heroImageAlt: 'Publishing desk for Amazon KDP ebook setup',
    actions: [
      { label: 'Plan KDP publishing', href: '/contact' },
      { label: 'See packages with KDP setup', href: '/pricing', variant: 'gold' },
    ],
    sections: [
      {
        heading: 'Writing made for the Kindle store',
        paragraphs: [
          'A KDP ebook still has to be a good book. We outline and write to the promise on the cover and the category you will compete in — not a generic manuscript you later try to “optimize.”',
        ],
      },
      {
        heading: 'What KDP publishing support covers',
        paragraphs: [
          'Formatting for Kindle and print, metadata, category and keyword research, and a guided setup so the title, subtitle, description, and files match. We do not take over your KDP login as the account holder — you remain the publisher of record.',
        ],
        bullets: [
          'EPUB and print-ready PDF',
          'Cover files sized for Amazon and print',
          'Category and keyword research',
          'KDP listing setup support',
          'IngramSpark setup on higher packages',
          'You keep the accounts and royalties',
        ],
      },
      {
        heading: 'KDP vs waiting on a traditional deal',
        paragraphs: [
          'KDP is the right path when you want the book out on a dated schedule, you want to keep the account, and you are writing for readers you can already name. Traditional publishing is a different product: an acquisition, a shared royalty, and a calendar you do not control.',
        ],
        table: comparisons.kdpVsTraditional,
      },
      {
        heading: 'Which packages include KDP setup',
        paragraphs: [
          'Starter includes writing, an editorial pass, a standard cover, and EPUB/PDF files — without KDP listing setup in the package features. Professional adds KDP publishing setup. Premium adds KDP and IngramSpark. Elite includes broader global distribution and hardcover-ready files. Full feature lists live on the pricing page.',
        ],
      },
      {
        heading: 'What you still own',
        paragraphs: [
          'Your KDP (and IngramSpark) accounts stay in your name. You keep 100% of royalties. We guide setup and hand over retailer-ready files — we do not become the publisher of record.',
        ],
      },
      {
        heading: 'Writing only, or writing plus publish',
        paragraphs: [
          'If you already have a draft, say so on the contact form — editing, cover, and KDP files may be the right scope. If you need the book written first, start with ghostwriting and keep publishing in the same package so nothing is re-traded later.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Will you log into my KDP account as the owner?',
        a: 'You remain the account holder and publisher of record. We support setup with the files and listing details; we do not take over ownership of the account.',
      },
      {
        q: 'Do all packages include KDP setup?',
        a: 'No. Professional and above include KDP setup in the listed features. Starter delivers retailer-ready files without the KDP setup line item.',
      },
      {
        q: 'Can you help if I already have a manuscript?',
        a: 'Yes — editing, cover design, formatting, and KDP support can be scoped without full ghostwriting. Tell us what you already have on the contact form.',
      },
    ],
    links: [
      { label: 'Ebook ghostwriting', href: '/ebook-ghostwriting-services' },
      { label: 'Hire an ebook writer', href: '/hire-ebook-writer' },
      { label: 'Ebook editing services', href: '/ebook-editing-services' },
      { label: 'KDP publishing checklist', href: '/blog/kdp-publishing-checklist-for-first-time-authors' },
      { label: 'How long writing and publishing take', href: '/blog/how-long-does-it-take-to-write-and-publish-a-book' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
};

export const editingPage = {
  path: '/ebook-editing-services',
  eyebrow: 'Editing',
  title: 'Ebook editing services for drafts that need a professional pass.',
  lead:
    'Already have a manuscript? Developmental, line and copy editing, and a final proofread — so the book is clear before cover and KDP files.',
  quickAnswer:
    'Ebook editing is a professional pass on a manuscript you already have. Developmental work fixes structure; line and copy editing fix readability and consistency; proofreading catches last errors before files go to design. If large chapters are still missing, start with ghostwriting instead.',
  heroImage: '/assets/brand/page-hero-covers.png',
  heroImageAlt: 'Manuscript pages and editing tools on a publishing desk',
  actions: [
    { label: 'Request an editing quote', href: '/contact' },
    { label: 'Need the book written first?', href: '/ebook-ghostwriting-services', variant: 'gold' },
  ],
  sections: [
    {
      heading: 'Which type of editing do you need?',
      paragraphs: [
        'Name the problem in the manuscript first. The pass follows from that — not from a generic “editing” line item.',
      ],
      table: comparisons.editingNeed,
    },
    {
      heading: 'What editing covers',
      paragraphs: [
        'We match the edit to the draft you have — not a one-size pass labeled “editing.”',
      ],
      table: comparisons.editingTypes,
    },
    {
      heading: 'What you receive',
      paragraphs: [
        'You receive an edited manuscript and clear notes on what changed. Revision rounds are quoted per manuscript length and edit depth — we confirm rounds in writing before work starts rather than inventing a blanket “unlimited” promise on this page.',
      ],
      bullets: [
        'Edited manuscript file',
        'Editorial notes on structure or line issues, matching the pass you bought',
        'A short summary of remaining risks (facts, repetition, chapters that still need author input)',
        'Optional follow-on: cover, formatting, and KDP files if you ask for them in the quote',
      ],
    },
    {
      heading: 'Editing workflow and turnaround',
      paragraphs: [
        'We start with a sample pages review so the quote matches the draft, not a guess. Then the agreed pass, your questions, and a revision round named in the quote.',
        'Typical turnaround tracks length and depth: a copyedit on a short guide can land in about a week; a developmental pass on a full-length manuscript needs a dated schedule, not a same-week promise.',
      ],
      bullets: [
        'Sample pages and a written scope',
        'The editorial pass you bought',
        'Author questions on flagged sections',
        'Named revision round',
      ],
    },
    {
      heading: 'Illustrative line edit',
      paragraphs: [
        'This is a teaching sample — not a client manuscript. It shows the difference between a first-draft sentence and a line-edited one.',
      ],
      sample: {
        before: 'The thing is that there are a lot of leaders who don’t really know how to talk to their teams and this causes many problems in the company over time.',
        after: 'Many first-time managers inherit a team they have never briefed clearly. The cost shows up later: missed handoffs, quiet resentment, and meetings that decide nothing.',
        note: 'Cut the throat-clearing (“the thing is that there are a lot of”). Named the actual job (briefing a team), then showed cost in concrete scenes instead of “many problems.”',
      },
    },
    {
      heading: 'What drives an editing quote',
      paragraphs: [
        'Length, how finished the draft is, and which pass you need. A developmental edit on an uneven 50,000-word memoir is a different product from a proofread on a stable 12,000-word guide.',
      ],
      bullets: [
        'Word count and genre',
        'Developmental vs line vs copy vs proof',
        'How much of the argument still moves around',
        'Whether cover and KDP files are in the same quote',
      ],
    },
    {
      heading: 'When editing is not enough',
      paragraphs: [
        'If whole chapters are missing, the voice is not there yet, or the author still needs interviews captured, a polish cannot manufacture the book. We will say so and point you to ghostwriting rather than selling an edit that leaves you with the same gap.',
      ],
    },
    {
      heading: 'Who this is for',
      paragraphs: [
        'Authors who drafted the book themselves and want a studio edit before publishing. Ghostwriting clients who want an extra editorial layer beyond the rounds in a writing package. Anyone who knows the manuscript is “almost there” but not retailer-ready.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Do I need editing or ghostwriting?',
      a: 'If the manuscript exists and mainly needs structure and polish, start with editing. If large sections are still unwritten or the voice is not there yet, start with ghostwriting.',
    },
    {
      q: 'Can editing include a cover and KDP files?',
      a: 'Yes — say what you need on the contact form. Cover design and KDP setup can be scoped with editing or as a follow-on.',
    },
  ],
  links: [
    { label: 'Ebook ghostwriting', href: '/ebook-ghostwriting-services' },
    { label: 'Ebook cover design', href: '/ebook-cover-design' },
    { label: 'Amazon KDP publishing', href: '/amazon-kdp-ebook-writing' },
    { label: 'Developmental editing vs copyediting', href: '/blog/developmental-editing-vs-copyediting' },
    { label: 'Pricing', href: '/pricing' },
  ],
};

export const coverPage = {
  path: '/ebook-cover-design',
  eyebrow: 'Cover design',
  title: 'Ebook cover design built to read at thumbnail size.',
  lead:
    'Custom covers matched to your genre — front, spine, and back for print when you need them — so the title holds up on Amazon and bookstore shelves.',
  quickAnswer:
    'Ebook cover design here is thumbnail-first: genre cues, title readability at Amazon size, then a full ebook front and a print wrap when paperback is in scope. Writing packages include cover work at the level listed for that plan; standalone covers are quoted separately.',
  heroImage: '/assets/brand/page-hero-covers.png',
  heroImageAlt: 'Book covers and design materials on a sunlit writing desk',
  actions: [
    { label: 'Request a cover quote', href: '/contact' },
    { label: 'See portfolio covers', href: '/portfolio', variant: 'gold' },
  ],
  covers: [
    {
      title: 'Higher Ground',
      genre: 'Self-Development',
      image: '/assets/brand/portfolio-shelf-book-1.webp',
      brief: 'Mountain, forest, and still water as a progress metaphor — reflective self-development, not a business skyline.',
      type: 'Cream serif title with a small gold peak mark so the name still holds when the landscape compresses.',
      thumbnail: 'Pale type + mountain silhouette are the two cues that survive Amazon size.',
    },
    {
      title: 'The Kindness Effect',
      genre: 'Personal Growth',
      image: '/assets/brand/portfolio-shelf-book-2.webp',
      brief: 'Cream field and a botanical branch — gift-book personal growth rather than hard self-help.',
      type: 'Centered forest-green serif, tracked so three short words stay even in a small tile.',
      thumbnail: 'Cream-on-green contrast; the blossom spray still signals “soft growth” when type is tiny.',
    },
    {
      title: 'Beyond the Stars',
      genre: 'Parenting',
      image: '/assets/brand/portfolio-shelf-book-3.webp',
      brief: 'Night sky over water — wonder and scale for a parenting title, not a children’s cartoon.',
      type: 'Wide-spaced white serif across the dark band so two lines stay readable on navy.',
      thumbnail: 'Milky Way stripe plus white title; the landscape drops first, the type stays.',
    },
    {
      title: 'The Second Chapter',
      genre: 'Memoir',
      image: '/assets/brand/portfolio-shelf-book-4.webp',
      brief: 'Coastal terrace, cypress, olive pot — a life-in-place memoir cue, not a city skyline.',
      type: 'Gold serif sitting on the light sky, above the view, so the three-word title is the first read.',
      thumbnail: 'Warm stone + gold type; the sea is atmosphere, the title is the signal.',
    },
    {
      title: 'Wealth with Purpose',
      genre: 'Business & Finance',
      image: '/assets/brand/portfolio-shelf-book-5.webp',
      brief: 'Black cloth and a gold tree with roots — wealth as something grown, not a stock-chart cliché.',
      type: 'Stacked gold serif in three lines with room so PURPOSE does not crash into the mark.',
      thumbnail: 'Gold tree + gold type on black: contrast is the whole thumbnail strategy.',
    },
    {
      title: 'A Healthier You',
      genre: 'Health & Wellness',
      image: '/assets/brand/portfolio-shelf-book-6.webp',
      brief: 'Cream ground and layered leaves — wellness without medical stock photography.',
      type: 'Centered deep-green serif; YOU is the word you catch first at stamp size.',
      thumbnail: 'Leaf mass + dark type; no photo faces competing in the tile.',
    },
  ],
  sections: [
    {
      heading: 'What you get',
      paragraphs: [
        'A custom cover directed for your category — not a generic template with your title dropped in.',
      ],
      bullets: [
        'Custom cover design',
        'Front, spine, and back for print when scoped',
        'Genre-matched art direction',
        'Ebook front: JPEG or PNG sized for Amazon/KDP',
        'Print wrap: PDF (front, spine, back) when paperback is in scope',
      ],
    },
    {
      heading: 'Thumbnail-first on Amazon',
      paragraphs: [
        'Most readers meet your book as a small image. We design for title readability and genre cues at that size, then refine for full-size ebook and print wraps.',
        'Typography has to work at roughly the size of a postage stamp: short title hierarchy, contrast against the art, and a genre signal you can name in one glance (business, memoir, wellness, parenting).',
      ],
    },
    {
      heading: 'File delivery',
      paragraphs: [
        'Standard delivery is a KDP-ready ebook front (JPEG or PNG) and, when print is included, a print-wrap PDF. Working or layered source files are included only when your quote says so.',
        'Pair cover work with formatting and KDP setup when you want listing and files handled together.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Is cover design included in writing packages?',
      a: 'Yes — every writing package on /pricing includes cover design at the level listed for that plan. Standalone cover projects are quoted separately.',
    },
    {
      q: 'Can you design for print and ebook?',
      a: 'Yes. Ebook fronts and print wraps (front, spine, back) are available when your scope includes print.',
    },
    {
      q: 'What file types do I receive?',
      a: 'Ebook: JPEG or PNG front cover for KDP. Print: PDF wrap when paperback is scoped. Any extra source files are listed in your quote.',
    },
  ],
  links: [
    { label: 'Amazon KDP publishing', href: '/amazon-kdp-ebook-writing' },
    { label: 'Ebook editing', href: '/ebook-editing-services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Contact', href: '/contact' },
  ],
};

export const faqPage = {
  path: '/faq',
  eyebrow: 'FAQ',
  title: 'Ebook writing and publishing FAQ.',
  lead:
    'Ownership, pricing ranges, timelines, revisions, publishing support, and niches — the same straight answers authors ask before they hire us.',
  heroImage: '/assets/brand/page-hero-blog.png',
  heroImageAlt: 'Editorial desk with manuscript notes — ebook writing FAQ',
  actions: [
    { label: 'Talk to a specialist', href: '/contact' },
    { label: 'See packages', href: '/pricing', variant: 'gold' },
  ],
  sections: [
    {
      heading: 'Still deciding?',
      paragraphs: [
        'If your question is about a specific manuscript, length, or deadline, the contact form is faster than guessing from a general answer. You hear back within one working day.',
      ],
    },
  ],
  faqs,
  links: [
    { label: 'Ebook ghostwriting', href: '/ebook-ghostwriting-services' },
    { label: 'Hire an ebook writer', href: '/hire-ebook-writer' },
    { label: 'Amazon KDP publishing', href: '/amazon-kdp-ebook-writing' },
    { label: 'Pricing', href: '/pricing' },
  ],
};

export const editorialPolicyPage = {
  path: '/editorial-policy',
  eyebrow: 'Editorial policy',
  title: 'How ebookwriters.us researches, reviews, and updates publishing guides.',
  lead:
    'Our blog is written for authors making a hiring or publishing decision. This page explains how those articles are produced, how AI may be used in production, and how we correct them.',
  updated: 'September 21, 2026',
  heroImage: '/assets/brand/faq-editorial-v2.webp',
  heroImageAlt: 'Editorial desk with manuscript notes — ebookwriters.us editorial policy',
  actions: [
    { label: 'Read the blog', href: '/blog' },
    { label: 'About the studio', href: '/about', variant: 'gold' },
  ],
  sections: [
    {
      heading: 'Who this policy covers',
      paragraphs: [
        'It covers public articles on /blog and related explainers on service pages. Client manuscripts, quotes, and contracts follow the project agreement and NDA — not this page.',
        'Articles currently publish under the studio editorial desk. Named author and reviewer bylines will appear here when those people are listed on the site. We do not invent public writer profiles.',
      ],
    },
    {
      heading: 'How articles are researched',
      paragraphs: [
        'Guides start from a real author question (cost, rights, hiring, KDP, editing). We write from studio process and, where a legal or platform rule matters, we point to primary sources such as the U.S. Copyright Office or Amazon KDP Help — not to a recycled blog claiming the same advice.',
        'We do not publish invented enquiry statistics or fabricated case studies. If a number is a package price or a typical timeline from our plans, we say so. If a number is industry-range context, we label it as a planning benchmark, not a promise.',
      ],
    },
    {
      heading: 'How AI is used',
      paragraphs: [
        'Ordinary tools may support outlining, production admin, or a first pass on internal notes. Public articles are reviewed by the editorial desk before they go live.',
        'We do not deliver an unedited AI-generated book as ghostwriting. Client prose is written and revised by the assigned human writer under studio editorial review. The same standard applies to advice we publish: the live article has to be something we will stand behind on a discovery call.',
      ],
    },
    {
      heading: 'Review, updates, and corrections',
      paragraphs: [
        'Each article shows a visible byline: written by the ebookwriters.us Editorial Desk, plus a published date in the HTML (not only in schema). When we materially change advice (pricing bands, KDP steps, rights language), we update the article and the date.',
        'If you spot an error, email the studio. Factual corrections are made on the page. We do not silently swap a headline to chase a new keyword variation.',
      ],
    },
    {
      heading: 'Commercial pages vs guides',
      paragraphs: [
        'Service and pricing pages describe what we sell. Blog guides are for decisions before you hire — including checklists that apply to other writers, not only to us. Where a guide and a quote page could overlap, the guide says so (for example, the hiring checklist is not a second price list).',
      ],
    },
  ],
  links: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ],
};

export const privacyPage = {
  eyebrow: 'Legal',
  title: 'Privacy policy',
  updated: 'September 15, 2026',
  lead: `This policy describes how ${siteContact.email} and the ebookwriters.us website handle information. It is written for a marketing site and quote form — not as a substitute for a signed project agreement.`,
  heroImage: '/assets/brand/page-hero-studio.png',
  heroImageAlt: 'Quiet writing desk — privacy and studio policies',
  sections: [
    {
      heading: 'Who is responsible',
      paragraphs: [
        `ebookwriters.us is operated from ${siteContact.address}. Questions about privacy: ${siteContact.email} or ${siteContact.phone}.`,
      ],
    },
    {
      heading: 'Information we collect',
      paragraphs: [
        'If you use the contact form, you choose to type a name, email address, package interest, timeline, and a description of your book idea. That text is used to prepare a project brief you can copy. The public website does not require an account.',
        'Like most sites, our host and any analytics or security tools we enable may log technical data such as IP address, browser type, referring URL, and pages requested. We do not sell that data.',
      ],
    },
    {
      heading: 'How we use information',
      paragraphs: [
        'Form details are used to respond to your inquiry, prepare a quote, and — if we work together — to staff and deliver the writing project under a separate agreement and NDA.',
        'We do not sell your manuscript idea or contact details to list brokers. We may use anonymized, aggregated site traffic to improve pages.',
      ],
    },
    {
      heading: 'Cookies and similar tech',
      paragraphs: [
        'The site may use cookies or local storage that are strictly necessary for the page to function. If we add optional analytics cookies, we will update this page.',
      ],
    },
    {
      heading: 'How long we keep it',
      paragraphs: [
        'Inquiry emails and briefs are kept long enough to answer you and, if you become a client, as long as the project and ordinary accounting require. You can ask us to delete inquiry records that are not needed for an active contract or legal obligation.',
      ],
    },
    {
      heading: 'Your choices',
      paragraphs: [
        `Email ${siteContact.email} to access, correct, or delete personal information we hold about an inquiry, subject to what we must keep for law or an active agreement. Do not send sensitive health, financial, or children’s data through the public form.`,
      ],
    },
    {
      heading: 'Children',
      paragraphs: [
        'This site is directed at adults hiring writing services. We do not knowingly collect personal information from children under 13.',
      ],
    },
    {
      heading: 'Changes',
      paragraphs: [
        'We may update this policy. The date at the top of the page is the latest revision. Material changes will be reflected here before they apply to new inquiries.',
      ],
    },
  ],
};

export const termsPage = {
  eyebrow: 'Legal',
  title: 'Terms of service',
  updated: 'September 15, 2026',
  lead:
    'These terms cover use of the ebookwriters.us website and quote requests. A paid writing project is governed by the statement of work and rights agreement you sign — those documents control if they conflict with this page.',
  heroImage: '/assets/brand/page-hero-studio.png',
  heroImageAlt: 'Studio desk — terms of service for ebookwriters.us',
  sections: [
    {
      heading: 'The site',
      paragraphs: [
        'Pages describe ebook writing, ghostwriting, editing, design, and publishing services. Examples, timelines, and package prices are informational. A quote we send you is the offer; your signed agreement is the contract.',
      ],
    },
    {
      heading: 'No professional advice',
      paragraphs: [
        'Blog articles and service pages are general information. They are not legal, tax, medical, or investment advice. You are responsible for how you use your finished book.',
      ],
    },
    {
      heading: 'Quotes and packages',
      paragraphs: [
        'Package prices shown (from $699 to $3,999) are starting points for typical lengths. Scope, specialist research, and rush delivery can change the fee. We confirm the total in writing before paid work starts.',
        'Submitting the contact form is a request for information, not a booking. We may decline projects we cannot staff well.',
      ],
    },
    {
      heading: 'Intellectual property on the site',
      paragraphs: [
        'The ebookwriters.us name, site design, and our copy belong to the studio. Do not copy service pages or brand assets for another writing business. Book covers shown as portfolio examples remain the authors’ works; they are displayed with permission as samples of production quality.',
      ],
    },
    {
      heading: 'Your content in an inquiry',
      paragraphs: [
        'You confirm you have the right to share the idea you describe. We treat inquiries as confidential and use an NDA before you send source material for a paid project. Do not paste highly sensitive personal data into the public form.',
      ],
    },
    {
      heading: 'Acceptable use',
      paragraphs: [
        'Do not misuse the site: no scraping that degrades service, no malware, no attempts to break into accounts or forms, and no using our pages to sell counterfeit or infringing books.',
      ],
    },
    {
      heading: 'Limitation of liability',
      paragraphs: [
        'The website is provided as-is. To the extent allowed by applicable US law, ebookwriters.us is not liable for indirect or consequential damages arising from use of the public site or reliance on unpublished quotes. Paid project liability is defined in the signed agreement.',
      ],
    },
    {
      heading: 'Governing law',
      paragraphs: [
        `These website terms are governed by the laws of the State of Iowa, USA, without regard to conflict-of-law rules. Venue for disputes about the website is in Iowa courts unless a signed project agreement says otherwise.`,
      ],
    },
    {
      heading: 'Contact',
      paragraphs: [
        `Questions: ${siteContact.email}, ${siteContact.phone}, ${siteContact.address}.`,
      ],
    },
  ],
};

export const notFoundPage = {
  eyebrow: '404',
  title: 'This page is not on ebookwriters.us.',
  lead: 'The address you opened is not a published route. These pages are a better next step:',
  heroImage: '/assets/brand/page-hero-studio.png',
  heroImageAlt: 'Publishing studio desk — page not found',
  links: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Hire an ebook writer', href: '/hire-ebook-writer' },
    { label: 'Contact', href: '/contact' },
  ],
};
