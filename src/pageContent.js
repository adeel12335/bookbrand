import { faqs, plans, siteContact } from './data.js';

const packageSnapshotBullets = plans.map(
  plan => `${plan.name} — $${plan.price} — ${plan.words} — ${plan.timeline}`,
);

export const aboutPage = {
  eyebrow: 'The studio',
  title: 'A US ebook writing studio built for authors who want the book done.',
  lead:
    'ebookwriters.us is a Tennessee ghostwriting and publishing studio. We write, edit, design, and prepare books for Amazon KDP and IngramSpark — so you are not coordinating a dozen freelancers.',
  heroImage: '/assets/brand/hero-desk.jpg',
  heroImageAlt: 'Writing desk with manuscript pages and publishing tools',
  actions: [
    { label: 'Request a quote', href: '/contact' },
    { label: 'See packages', href: '/pricing', variant: 'gold' },
  ],
  sections: [
    {
      heading: 'Who we are',
      paragraphs: [
        'We help experts, entrepreneurs, and first-time authors turn a clear idea into a manuscript they are proud to put their name on. The work happens under one roof: ghostwriting, editing, cover design, formatting, and retailer setup.',
        `The studio is based in ${siteContact.address}. You can reach us at ${siteContact.email} or ${siteContact.phone}. We work with authors across the United States and remotely worldwide.`,
      ],
    },
    {
      heading: 'How we work',
      paragraphs: [
        'Every project starts with a short discovery call and an NDA. We match you with a writer experienced in your category, agree a chapter outline, and write against a dated schedule. You review as chapters land — typically a few hours of your time in total.',
        'You keep 100% of the rights and royalties. Your name goes on the cover. Ours appears nowhere unless you ask.',
      ],
    },
    {
      heading: 'What we will not do',
      paragraphs: [
        'We will not guess at a niche we cannot staff. If we do not have a specialist for your subject — finance, health, law, memoir, and related nonfiction are our core — we will say so rather than assign a generalist.',
        'We also will not bury fees. Packages are quoted fixed up front. If the scope changes, you see the change before we write past it.',
      ],
    },
  ],
  links: [
    { label: 'Ebook ghostwriting', href: '/ebook-ghostwriting-services' },
    { label: 'Hire an ebook writer', href: '/hire-ebook-writer' },
    { label: 'Amazon KDP publishing', href: '/amazon-kdp-ebook-writing' },
    { label: 'Writing packages', href: '/pricing' },
  ],
};

export const pricingPage = {
  eyebrow: 'Investment',
  title: 'Ebook writing packages — $699 to $3,999.',
  lead:
    'Ghostwriting packages with editing, cover design, and retailer-ready files included. No surprise invoices. Choose a plan, then request a quote with that package selected.',
  heroImage: '/assets/brand/path-roadmap-desk.png',
  heroImageAlt: 'Publishing roadmap desk with journal and stage books',
  actions: [
    { label: 'Talk to a specialist', href: '/contact' },
    { label: 'What a package includes', href: '/blog/what-is-included-in-a-professional-ebook-writing-package', variant: 'gold' },
  ],
  note:
    'Every quote is fixed for the length and scope we agree. Rush timelines and specialist research can change the fee — you will see that before work starts.',
  closing:
    'Not sure which length you need? Tell us the job the book has to do — lead magnet, flagship business title, memoir — and we will recommend a package.',
};

export const servicesPage = {
  eyebrow: 'Our services',
  title: 'Ebook writing, editing, design, and publishing — in one studio.',
  lead:
    'Hire ebook writers and ghostwriters without stitching together a cover designer, formatter, and KDP specialist later. Start with a lander below, or request a quote and we will map the work.',
  heroImage: '/assets/brand/publishing-craft-v2.png',
  heroImageAlt: 'Open manuscript and craft tools on a publishing production desk',
  actions: [
    { label: 'Get a writing quote', href: '/contact' },
    { label: 'View packages', href: '/pricing', variant: 'gold' },
  ],
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
    heroImage: '/assets/brand/hero-concept-photo.png',
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
        heading: 'Packages for ghostwriting',
        paragraphs: [
          'Fixed packages cover writing through retailer-ready files. See full feature lists on the pricing page — these are the length and timeline bands we quote against.',
        ],
        bullets: packageSnapshotBullets,
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
      { label: 'How much it costs to hire a writer', href: '/blog/how-much-does-it-cost-to-hire-an-ebook-writer' },
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
    heroImage: '/assets/brand/hero-desk.jpg',
    heroImageAlt: 'Desk setup for hiring a professional ebook writer',
    actions: [
      { label: 'Hire an ebook writer', href: '/contact' },
      { label: 'Compare packages', href: '/pricing', variant: 'gold' },
    ],
    sections: [
      {
        heading: 'What you get when you hire us',
        paragraphs: [
          'A named genre specialist — not a rotating bid board. An NDA and a rights-transfer agreement so the finished ebook is yours. A schedule with chapter delivery dates, not a vague “we will see.”',
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
      },
      {
        heading: 'Package snapshot',
        paragraphs: [
          'These are the fixed bands on /pricing. Writing, editorial passes, cover work, and files scale with the package — open pricing for the full feature list.',
        ],
        bullets: packageSnapshotBullets,
      },
      {
        heading: 'Timeline expectations',
        paragraphs: [
          'Starter guides are typically about three weeks. Professional manuscripts around five. Premium around eight. Elite up to twelve. You get a dated schedule with chapter delivery points before writing starts.',
        ],
      },
      {
        heading: 'How to brief us',
        paragraphs: [
          'The useful brief is short: who the book is for, what it should do for you (authority, leads, a story told properly), target length, and when you need files. Send that on the contact page. You hear back within one working day with a clear yes, no, or clarifying question.',
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
      { label: 'How much it costs to hire an ebook writer', href: '/blog/how-much-does-it-cost-to-hire-an-ebook-writer' },
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
    heroImage: '/assets/brand/path-roadmap-desk.png',
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
        heading: 'Which packages include KDP setup',
        paragraphs: [
          'Starter includes writing, an editorial pass, a standard cover, and EPUB/PDF files — without KDP listing setup in the package features. Professional adds KDP publishing setup. Premium adds KDP and IngramSpark. Elite includes broader global distribution and hardcover-ready files.',
        ],
        bullets: packageSnapshotBullets,
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
  heroImage: '/assets/brand/publishing-craft-v2.png',
  heroImageAlt: 'Manuscript pages and editing tools on a publishing desk',
  actions: [
    { label: 'Request an editing quote', href: '/contact' },
    { label: 'Need the book written first?', href: '/ebook-ghostwriting-services', variant: 'gold' },
  ],
  sections: [
    {
      heading: 'What editing covers',
      paragraphs: [
        'We match the edit to the draft you have — not a one-size pass labeled “editing.”',
      ],
      bullets: [
        'Developmental edit — structure, argument, pacing, and chapter order',
        'Line and copy edit — clarity, voice consistency, grammar, and flow',
        'Final proofread — last pass before files go to design and retailers',
      ],
    },
    {
      heading: 'Who this is for',
      paragraphs: [
        'Authors who drafted the book themselves and want a studio edit before publishing. Ghostwriting clients who want an extra editorial layer beyond the rounds in a writing package. Anyone who knows the manuscript is “almost there” but not retailer-ready.',
      ],
    },
    {
      heading: 'Deliverables and scope',
      paragraphs: [
        'You receive an edited manuscript and clear notes on what changed. Revision rounds are quoted per manuscript length and edit depth — we confirm rounds in writing before work starts rather than inventing a blanket “unlimited” promise on this page.',
        'If the draft still needs substantial new chapters written, we will say so and point you to ghostwriting instead of selling a polish that cannot fix a missing book.',
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
    { label: 'Pricing', href: '/pricing' },
  ],
};

export const coverPage = {
  path: '/ebook-cover-design',
  eyebrow: 'Cover design',
  title: 'Ebook cover design built to read at thumbnail size.',
  lead:
    'Custom covers matched to your genre — front, spine, and back for print when you need them — so the title holds up on Amazon and bookstore shelves.',
  heroImage: '/assets/brand/portfolio-hero-bg.png',
  heroImageAlt: 'Book covers and design materials on a sunlit writing desk',
  actions: [
    { label: 'Request a cover quote', href: '/contact' },
    { label: 'See portfolio covers', href: '/portfolio', variant: 'gold' },
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
  heroImage: '/assets/brand/faq-editorial-v2.png',
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

export const privacyPage = {
  eyebrow: 'Legal',
  title: 'Privacy policy',
  updated: 'September 15, 2026',
  lead: `This policy describes how ${siteContact.email} and the ebookwriters.us website handle information. It is written for a marketing site and quote form — not as a substitute for a signed project agreement.`,
  heroImage: '/assets/brand/hero-desk.jpg',
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
  heroImage: '/assets/brand/hero-desk.jpg',
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
        `These website terms are governed by the laws of the State of Tennessee, USA, without regard to conflict-of-law rules. Venue for disputes about the website is in Tennessee courts unless a signed project agreement says otherwise.`,
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
  heroImage: '/assets/brand/hero-concept-photo.png',
  heroImageAlt: 'Publishing studio desk — page not found',
  links: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Hire an ebook writer', href: '/hire-ebook-writer' },
    { label: 'Contact', href: '/contact' },
  ],
};
