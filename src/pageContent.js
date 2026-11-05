import { books, comparisons, faqs, plans, siteContact } from './data.js';

export const aboutPage = {
  eyebrow: 'The studio',
  title: 'A US ebook writing studio built for authors who want the',
  titleEm: 'book done.',
  lead:
    'ebookwriters.us is an Iowa ghostwriting and publishing studio. We write, edit, design, and prepare books for Amazon KDP and IngramSpark, so you are not coordinating a dozen freelancers.',
  heroImage: '/assets/brand/page-hero-studio.png',
  heroImageAlt: 'Writing desk with manuscript pages and publishing tools',
  actions: [
    { label: 'Request a quote', href: '/contact' },
    { label: 'See packages', href: '/pricing', variant: 'gold' },
  ],
  manifesto:
    'One studio. One schedule. Your name on the cover, and nowhere is ours unless you ask.',
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
      copy: 'Finance, health, law, memoir, and related nonfiction. After NDA you meet the assigned writer by name. We do not publish a public roster.',
    },
  ],
  principles: [
    {
      index: '01',
      heading: 'Who we are',
      paragraphs: [
        'We help experts, entrepreneurs, and first-time authors turn a clear idea into a manuscript they are proud to put their name on. The work happens under one roof: ghostwriting, editing, cover design, formatting, and retailer setup.',
        `Based in ${siteContact.address}. Reach us at ${siteContact.email} or ${siteContact.phone}. Authors across the US, and remotely worldwide.`,
        'ebookwriters.us is an independent studio. We are not affiliated with similarly named companies such as Ebook Writers USA.',
      ],
    },
    {
      index: '02',
      heading: 'How we work',
      paragraphs: [
        'Every project starts with a short discovery call and an NDA. We match you with a writer experienced in your category, introduce that writer by name, agree a chapter outline, and write against a dated schedule. You review as chapters land, typically a few hours of your time in total.',
        'You keep 100% of the rights and royalties. Your name goes on the cover. The studio team is listed on the team page; the ghostwriters assigned to confidential titles are not, and you meet yours by name after the NDA.',
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
    caption: 'Production desk, outline to retailer-ready files under one roof.',
  },
  links: [
    { label: 'Ebook ghostwriting', href: '/ebook-ghostwriting-services' },
    { label: 'Meet the team', href: '/team' },
    { label: 'Amazon KDP publishing', href: '/amazon-kdp-ebook-writing' },
    { label: 'Writing packages', href: '/pricing' },
  ],
  closeTitle: 'Ready to talk through your book?',
  closeLead: 'A 30-minute discovery call, an NDA, and a fixed quote. No hourly billing.',
};

export const teamPage = {
  path: '/team',
  eyebrow: 'Our team',
  title: 'The ebook writing and publishing team behind',
  titleEm: 'every book.',
  lead:
    'A small US studio team runs every ebook ghostwriting project: from the discovery call and fixed quote to editing, cover design, and Amazon KDP publishing. Write to any of us directly.',
  heroImage: '/assets/brand/page-hero-studio.png',
  heroImageAlt: 'Writing desk with manuscript pages and publishing tools, the ebookwriters.us team',
  gridHeading: 'Editorial, production, and author support',
  note:
    'Ghostwriters on confidential titles are not listed here. You meet yours by name after the NDA.',
  closeTitle: 'Talk to the team about your book.',
  closeLead: 'A 30-minute discovery call, an NDA, and a fixed quote. No hourly billing.',
  // `image` stays null until the portrait is in public/assets/brand/team/;
  // the card shows a monogram until then.
  members: [
    {
      name: 'Reesha Jeff',
      role: 'Chief Executive Officer',
      email: 'reesha@authors.ebookwriters.us',
      image: null,
      bio: 'Reesha leads ebookwriters.us and signs off every ghostwriting scope, fixed quote, and author agreement. Reesha also sets the standards every book is held to: an NDA before you share material, 100% author ownership and royalties, and a dated schedule for every manuscript.',
    },
    {
      name: 'Sophia Parker',
      role: 'Editorial Director',
      email: 'sophia@authors.ebookwriters.us',
      image: null,
      bio: 'Oversees editorial quality on every ebook ghostwriting project. Sophia matches each author with a writer for their category and reviews every outline and sample chapter before drafting begins.',
    },
    {
      name: 'Mia Anderson',
      role: 'Senior Publishing Consultant',
      email: 'mia@authors.ebookwriters.us',
      image: null,
      bio: 'Runs discovery calls with new authors and turns each brief into a fixed-fee ebook writing quote: length, audience, package, and timeline in writing.',
    },
    {
      name: 'Rachel Morgan',
      role: 'Project Manager',
      email: 'rachel@authors.ebookwriters.us',
      image: null,
      bio: 'Keeps every manuscript on its dated schedule, coordinating chapter reviews, revision rounds, and handoffs between ghostwriting, editing, and cover design.',
    },
    {
      name: 'Hannah Collins',
      role: 'Managing Editor',
      email: 'hannah@writers.ebookwriters.us',
      image: null,
      bio: 'Leads developmental editing, line editing, and copyediting. Hannah checks structure, argument, and voice chapter by chapter, then runs the final proofread.',
    },
    {
      name: 'Vanessa Callahan',
      role: 'Writer and Publisher',
      email: 'vanessa@writers.ebookwriters.us',
      image: null,
      bio: 'Writes and publishes nonfiction ebooks with the studio, taking manuscripts from first draft through final edits, layout, and release on Amazon KDP and IngramSpark.',
    },
    {
      name: 'Brooke',
      role: 'Creative Director',
      email: 'brooke@writers.ebookwriters.us',
      image: null,
      bio: 'Directs ebook cover design and interior layout. Brooke briefs designers on genre and audience and approves every cover so the title still reads at Amazon thumbnail size.',
    },
    {
      name: 'Allison Mercer',
      role: 'Publishing Operations Manager',
      email: 'allison@writers.ebookwriters.us',
      image: null,
      bio: 'Prepares retailer-ready EPUB, PDF, and print files and handles Amazon KDP and IngramSpark setup: formatting checks, metadata, categories, and launch-day upload.',
    },
    {
      name: 'Jessica Marlowe',
      role: 'Author Success Manager',
      email: 'jessica@writers.ebookwriters.us',
      image: null,
      bio: 'The day-to-day contact for authors mid-project. Jessica answers questions on process, rights, and royalties, and collects chapter feedback so nothing waits on a reply.',
    },
    {
      name: 'Cole',
      role: 'Client Partnerships Lead',
      email: 'cole@authors.ebookwriters.us',
      image: null,
      bio: 'Works with coaches, consultants, and small businesses commissioning lead magnet ebooks and authority books, from first enquiry to signed scope.',
    },
  ],
};

export const pricingPage = {
  eyebrow: 'Investment',
  title: 'Ebook writing packages: $699 to $3,999.',
  lead:
    'Ghostwriting packages with editing, cover design, and retailer-ready files included. No surprise invoices. Choose a plan, then request a quote with that package selected.',
  heroImage: '/assets/brand/page-hero-brief.png',
  heroImageAlt: 'Publishing roadmap desk with journal and stage books',
  actions: [
    { label: 'Talk to a specialist', href: '/contact' },
    { label: 'What a package includes', href: '/blog/what-is-included-in-a-professional-ebook-writing-package', variant: 'gold' },
  ],
  note:
    'Every quote is fixed for the length and scope we agree. Rush timelines and specialist research can change the fee. You will see that before work starts.',
  closing:
    'Not sure which length you need? Tell us the job the book has to do, lead magnet, flagship business title, memoir, and we will recommend a package.',
  plansHeading: "What's included in each package",
  why: {
    heading: 'Why our pricing works',
    lead:
      'We operate as a focused writing studio, not a traditional publishing house. Packages are built around agreed word counts, interview load, revision rounds, and a named deliverable list, so the fee can stay fixed without hiding hours on a later invoice.',
    paragraphs: [
      'You are not buying "unlimited writing." You are buying a scoped manuscript path: outline, sample chapter, drafted chapters on a dated schedule, the editorial passes listed for that package, and the files that package includes.',
      'That is how a 15,000-word guide and a 50,000-word authority book can both be quoted up front. Length, research depth, and production support change the band, not an open hourly tab.',
      'At full length, Starter works out to under five cents a word ($699 for 15,000 words) and Elite to about four ($3,999 for 100,000 words): with editing, a cover, and files included. That is below what many independent senior ghostwriters charge per word, because the scope is fixed and the studio handles editing, design, and files as one project.',
      'The price on the page is the price. No inflated "was" prices, no coupon codes, and no countdown timers.',
      "Standard package timelines apply to projects with a defined brief and typical interview or research load. Interview-heavy memoirs, technical books, extensive original research, or complex source material may need a custom timeline and quote, including Elite's word-count band, which is not a 9-18 month life-story memoir unless we say so in writing.",
    ],
    includedTitle: 'Included in the package you choose',
    included: [
      'Ghostwriting to the agreed word count',
      'The editorial passes listed for that plan',
      'Cover design at the level listed for that plan',
      'Retailer-ready files named in the plan (EPUB/PDF, and print where listed)',
      'KDP or IngramSpark setup where the plan includes it',
      'NDA and rights-transfer paperwork. You own the book',
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
  title: 'Ebook writing, editing, design, and publishing, in one studio.',
  lead:
    'Hire ebook writers and ghostwriters without stitching together a cover designer, formatter, and KDP specialist later. Start with a service below, or request a quote and we will map the work.',
  heroImage: '/assets/brand/page-hero-covers.png',
  heroImageAlt: 'Open manuscript and craft tools on a publishing production desk',
  actions: [
    { label: 'Get a writing quote', href: '/contact' },
    { label: 'View pricing', href: '/pricing', variant: 'gold' },
  ],
  pricingNote: 'Packages start at $699.',
  pricingCta: 'View pricing',
  pricingHref: '/pricing',
  chooser: {
    heading: 'How to choose a starting page',
    lead:
      'Each service URL has a different job. Use this page to pick a path, not to re-read the same packages.',
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
        copy: 'Ebook cover design is the visual brief: genre, typography, ebook front, and print wrap when scoped. Pair it with KDP setup when you want files and listing handled together.',
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
          'Editing, a cover, and retailer-ready files are part of the same studio path, so the person writing the book is not disconnected from the people who design and publish it.',
        ],
        bullets: [
          'Discovery call and NDA',
          'Chapter-by-chapter outline',
          'Original research in your niche',
          'Manuscript in your voice',
          'Revision rounds included in the package',
          'Rights-transfer agreement. You own the book',
        ],
      },
      {
        heading: 'Who this is for',
        paragraphs: [
          'Authors with a clear idea and no time to draft. Experts who can talk the book but are not writers. Founders who need a lead-generating guide. Memoirists who want confidentiality and a finished manuscript under their name.',
          'If you want the byline and the rights, and a studio that can carry the book through edits and files, this is the service.',
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
          'Voice is not a style filter applied at the end. We match it from recorded interviews, any writing samples you already have, and the reader you named in the brief. Short and standard nonfiction projects often take two to four hours of your time across discovery, interviews, and chapter reviews. Memoirs and interview-intensive books can require substantially more. We name that load in the quote.',
          'Research stays inside the agreed brief: your frameworks, your stories, and publicly checkable facts in your niche. We will not invent lived detail you did not provide, and we will flag claims that need your sign-off before they go in the manuscript.',
        ],
        bullets: [
          'Discovery call and chemistry check',
          'One or two voice-matching interviews on a standard nonfiction brief',
          'Chapter outline you approve before drafting',
          'Sample chapter: rewritten at no cost if the voice misses',
          'Chapter batches on a dated schedule',
        ],
      },
      {
        heading: 'Word counts and timelines we quote against',
        paragraphs: [
          'These are the length bands on the pricing page. Open that page for the full feature list.',
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
        a: 'You do, completely. Rights transfer before writing begins. You keep royalties and retailer accounts.',
      },
      {
        q: 'How many revision rounds are included?',
        a: 'Every package includes revision rounds (Starter starts at two). Premium lists unlimited revisions within the agreed scope. The sample chapter is rewritten at no cost if the voice is wrong.',
      },
      {
        q: 'How long does ghostwriting take?',
        a: 'About three weeks for a 15,000-word guide, five for ~30,000 words, eight for ~50,000, and up to twelve for a scoped Elite manuscript. Those bands assume a defined brief and typical interview load. Interview-heavy memoirs and research-heavy books get a custom timeline, not the same calendar as a lead-magnet ebook.',
      },
      {
        q: 'Do you use AI to write the manuscript?',
        a: 'No, we do not deliver an unedited AI-generated book as ghostwriting. Your manuscript is written and revised by the assigned human writer, under studio editorial review. Ordinary tools may support research, outlining, or production admin; the published prose is authored for your voice. If you need stricter language in the agreement, say so on the discovery call.',
      },
      {
        q: 'What do I need to provide?',
        a: 'A short brief (audience, goal, target length, deadline), time for a discovery call and interviews, and feedback as chapters land. Short and standard nonfiction often takes a few hours in total. Memoirs and interview-intensive projects can take substantially more.',
      },
      {
        q: 'Is the work confidential?',
        a: 'Yes. NDA before source material. We do not put the studio name on your cover unless you request it.',
      },
      {
        q: 'How much does an ebook ghostwriter cost?',
        a: 'Our packages run from $699 for up to 15,000 words to $3,999 for up to 100,000 words, with editing, a cover, and files included. At full length that is roughly four to five cents a word. Independent senior ghostwriters often charge much more per word; very low prices for a full book are a warning sign.',
      },
      {
        q: 'Where can I hire an ebook ghostwriter?',
        a: 'Marketplaces such as Upwork, Fiverr, and Reedsy connect you with individual freelancers, priced per hour or per word, and you manage editing, design, and publishing yourself. A studio like ours quotes one fixed fee for the writer, editing, cover, and files. Compare the finished deliverable, not the first draft rate.',
      },
      {
        q: 'Can I see a sample before the whole book is written?',
        a: 'Yes. A sample chapter is part of every project, written after you approve the outline. If it misses your voice, we rewrite it at no cost before the rest of the manuscript is written.',
      },
      {
        q: 'Will you make my book a bestseller?',
        a: 'No one can honestly promise that. Bestseller lists depend on sales and choices nobody controls. We promise a well-written book on the agreed schedule, and we do not use bestseller claims to sell packages.',
      },
      {
        q: 'Is ghostwriting legal and ethical?',
        a: 'Yes. Ghostwriting is a long-standing, legal arrangement: you supply the ideas and stories, a professional writes, and a contract transfers the rights to you. Many business books and memoirs are written this way.',
      },
      {
        q: 'Do you write fiction?',
        a: 'Our writers focus on nonfiction: self-development, memoir, business and finance, health and wellness, and parenting. Fiction is considered when we have the right specialist, and we will say so if we do not.',
      },
      {
        q: 'Do you offer discounts or coupon codes?',
        a: 'No. Our packages are fixed fees for an agreed scope. We do not use inflated "was" prices, coupon codes, or countdown timers.',
      },
    ],
    links: [
      { label: 'Hire an ebook writer', href: '/hire-ebook-writer' },
      { label: 'Amazon KDP writing & publishing', href: '/amazon-kdp-ebook-writing' },
      { label: 'How much does an ebook ghostwriter cost?', href: '/blog/how-much-does-an-ebook-ghostwriter-cost' },
      { label: 'How to hire an ebook writer (checklist)', href: '/blog/how-to-hire-an-ebook-writer' },
      { label: 'Ghostwriting vs a freelancer', href: '/blog/ghostwriting-vs-hiring-a-freelancer' },
      { label: 'Lead magnet ebook writing', href: '/lead-magnet-ebook-writing' },
      { label: 'Ebook ghostwriter for coaches', href: '/ebook-ghostwriter-for-coaches' },
      { label: 'How to choose a ghostwriter', href: '/how-to-choose-a-ghostwriter' },
      { label: 'Our AI policy', href: '/ai-policy' },
      { label: 'All services', href: '/services' },
    ],
  },
  hire: {
    path: '/hire-ebook-writer',
    eyebrow: 'Hire a writer',
    title: 'Hire an ebook writer on a fixed fee, not an open tab.',
    lead:
      'Tell us the idea, the length, and the deadline. We match you with a writer in that category and quote a package. Writing, edits, and files are in the number you approve, not billed by the hour.',
    quickAnswer:
      'Hiring an ebook writer here means a fixed quote, a genre-matched specialist introduced after NDA, and a dated chapter schedule. Compare the finished deliverable, manuscript, edits, files, and rights, not the lowest hourly draft rate.',
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
          'A genre-matched writer introduced by name after NDA, not a rotating bid board. An NDA and a rights-transfer agreement so the finished ebook is yours. A schedule with chapter delivery dates, not a vague "we will see."',
          `Packages start at $${plans[0].price} for a focused 15,000-word guide and go to $${plans[plans.length - 1].price} for a full-length authority book with launch support.`,
        ],
        bullets: [
          'Fixed quote before writing begins',
          'Writer matched to your niche',
          'A few hours for standard nonfiction; memoirs need more',
          'Revision rounds in every package',
          '100% author ownership and royalties',
        ],
      },
      {
        heading: 'Matched by genre, not by lowest bid',
        paragraphs: [
          'We staff writers for categories we know: business and finance, health and wellness, memoir, self-help, and related nonfiction. The match happens before you pay for a full manuscript, so the person writing has already done work in that lane.',
        ],
      },
      {
        heading: 'Freelance marketplace vs a studio',
        paragraphs: [
          'Hiring one freelancer for chapters, another for edits, and a third for a cover is how manuscripts stall. A studio quote includes the path to retailer-ready files. If you only need writing, say so. We will not pad the scope.',
          'Read our comparison of ghostwriting versus hiring a freelancer if you are weighing a low hourly bid against a fixed package.',
        ],
        table: comparisons.studioVsFreelancer,
      },
      {
        heading: 'Questions to ask before you hire anyone',
        paragraphs: [
          'Use the same four questions on every quote, including ours. Vague answers are the signal, not a slightly higher package price.',
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
          'A bid that never mentions NDA or assignment is not a bargain. Neither is a vendor who insists on publishing from their retailer account "for convenience," or a promise of a full-length book with no outline, no sample, and no dated schedule.',
        ],
      },
      {
        heading: 'How to hire us',
        paragraphs: [
          'Send the audience, the job the book has to do, target length, and deadline on the contact page. You hear back within one working day with a clear yes, no, or clarifying question, then a fixed quote, not an hourly estimate.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is hiring you cheaper than a marketplace freelancer?',
        a: 'Hourly bids can look lower until you add edits, a cover, formatting, and project management. Our packages are fixed for an agreed scope, compare the finished deliverable, not the first draft rate.',
      },
      {
        q: 'Can I hire you for writing only?',
        a: 'Yes. Say so on the contact form. We will quote writing without padding publishing work you do not need.',
      },
      {
        q: 'When do I pay?',
        a: 'After you approve a written scope and quote. We do not start manuscript work on an open hourly tab.',
      },
      {
        q: 'How do I hire an ebook writer from ebookwriters.us?',
        a: 'Send the idea, target length, and deadline on the contact form. We reply within one working day, hold a discovery call, sign an NDA, and send a fixed quote and dated schedule. Writing starts after you approve the scope.',
      },
      {
        q: 'Do I get to know who is writing my book?',
        a: 'Yes. After the NDA, we introduce the writer matched to your category by name. We do not publish a public roster because most of our titles are confidential ghostwriting.',
      },
      {
        q: 'What if the writing does not sound like me?',
        a: 'The sample chapter is the checkpoint. If it misses your voice, we rewrite it at no cost before the rest of the manuscript is written, and every package includes revision rounds after that.',
      },
      {
        q: 'Can I hire a writer for a short lead magnet ebook?',
        a: 'Yes. The Starter package covers up to 15,000 words for $699, which suits most lead magnets and short guides.',
      },
      {
        q: 'Who owns the ebook when it is finished?',
        a: 'You do. Rights transfer to you before writing begins. You keep 100% of royalties and your retailer accounts, and your name goes on the cover.',
      },
    ],
    links: [
      { label: 'Ebook ghostwriting services', href: '/ebook-ghostwriting-services' },
      { label: 'How to hire an ebook writer (checklist)', href: '/blog/how-to-hire-an-ebook-writer' },
      { label: 'How much does an ebook ghostwriter cost?', href: '/blog/how-much-does-an-ebook-ghostwriter-cost' },
      { label: 'Amazon KDP publishing', href: '/amazon-kdp-ebook-writing' },
      { label: 'How to choose a ghostwriter', href: '/how-to-choose-a-ghostwriter' },
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
          'A KDP ebook still has to be a good book. We outline and write to the promise on the cover and the category you will compete in, not a generic manuscript you later try to "optimize."',
        ],
      },
      {
        heading: 'What KDP publishing support covers',
        paragraphs: [
          'Formatting for Kindle and print, metadata, category and keyword research, and a guided setup so the title, subtitle, description, and files match. We do not take over your KDP login as the account holder. You remain the publisher of record.',
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
          'Starter includes writing, an editorial pass, a standard cover, and EPUB/PDF files, without KDP listing setup in the package features. Professional adds KDP publishing setup. Premium adds KDP and IngramSpark. Elite includes broader global distribution and hardcover-ready files. Full feature lists live on the pricing page.',
        ],
      },
      {
        heading: 'What you still own',
        paragraphs: [
          'Your KDP (and IngramSpark) accounts stay in your name. You keep 100% of royalties. We guide setup and hand over retailer-ready files. We do not become the publisher of record.',
        ],
      },
      {
        heading: 'Writing only, or writing plus publish',
        paragraphs: [
          'If you already have a draft, say so on the contact form: editing, cover, and KDP files may be the right scope. If you need the book written first, start with ghostwriting and keep publishing in the same package so nothing is re-traded later.',
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
        a: 'Yes, editing, cover design, formatting, and KDP support can be scoped without full ghostwriting. Tell us what you already have on the contact form.',
      },
      {
        q: 'Which file formats do I get?',
        a: 'Every package includes EPUB and PDF. Professional adds files for all retailers, Premium adds a print-ready interior, and Elite adds hardcover-ready files.',
      },
      {
        q: 'Can you publish on IngramSpark as well as KDP?',
        a: 'Yes. The Premium package includes both KDP and IngramSpark setup, so your book can reach bookstores and libraries as well as Amazon.',
      },
      {
        q: 'Who keeps the royalties?',
        a: 'You do: 100%. The book is published on your own account, and Amazon pays royalties to you directly.',
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
  leadMagnet: {
    path: '/lead-magnet-ebook-writing',
    eyebrow: 'Lead magnet ebooks',
    title: 'Lead magnet ebook writing service: human-written, fixed fee from $699.',
    lead:
      'A short, useful ebook that earns an email address and a sales conversation. Written by a human writer in your voice, edited, designed, and delivered as EPUB and PDF, for one fixed fee.',
    quickAnswer:
      'A lead magnet ebook is a short guide (usually 5,000-15,000 words) that you give away in exchange for an email address. Our Starter package covers up to 15,000 words for $699 in about three weeks: outline, writing, one editorial pass, a standard cover, EPUB and PDF files, and two revision rounds. You own every word.',
    heroImage: '/assets/brand/page-hero-studio.png',
    heroImageAlt: 'Desk with a short business guide being drafted, lead magnet ebook writing',
    actions: [
      { label: 'Get a lead magnet quote', href: '/contact' },
      { label: 'See the Starter package', href: '/pricing', variant: 'gold' },
    ],
    sections: [
      {
        heading: 'What a lead magnet ebook has to do',
        paragraphs: [
          'A lead magnet is not a smaller version of your book. It has one job: solve one specific problem well enough that the reader trusts you with the next one. That is what turns a download into an opened email, and an opened email into a call.',
          'So the brief starts with the reader and the next step, not the page count. Who downloads it, what they are stuck on, what quick win they get in the first chapter, and which offer the last page points to.',
        ],
        bullets: [
          'One reader and one problem, named in the title',
          'A quick win in the first few pages',
          'Your method or framework, not generic advice',
          'A clear next step to your offer, call, or course',
        ],
      },
      {
        heading: 'Who this is for',
        paragraphs: [
          'Coaches and consultants who explain the same method on every call. Agencies and SaaS teams that need a guide worth trading an email for. Financial advisors, therapists, and other experts who want something more useful than a checklist. Small businesses building an email list from scratch.',
          'If you can talk through your expertise for an hour, we can turn it into a lead magnet that sounds like you.',
        ],
      },
      {
        heading: 'What you get',
        paragraphs: [
          'The Starter package is built for lead magnets and short guides. If your guide needs more depth, research, or KDP publishing setup, the Professional package covers up to 30,000 words.',
        ],
        bullets: [
          'Discovery call and NDA before you share material',
          'Chapter outline you approve before drafting',
          'Up to 15,000 words written in your voice',
          'One editorial pass',
          'Standard cover design',
          'EPUB and PDF files',
          'Two revision rounds',
          'Full rights: the ebook is yours to give away or sell',
        ],
      },
      {
        heading: 'Price, length, and timeline',
        paragraphs: [
          'Lead magnets fit the first two packages. Fees are fixed for the agreed length and scope, with no inflated "was" prices and no countdown timers.',
        ],
        table: {
          caption: 'Lead magnet ebook packages',
          columns: ['Package', 'Fixed fee', 'Length', 'Typical timeline'],
          rows: plans.slice(0, 2).map(plan => [plan.name, `$${plan.price}`, plan.words, plan.timeline]),
        },
      },
      {
        heading: 'How a lead magnet project runs',
        paragraphs: [
          'We agree the reader, the promise, and the next step on a discovery call, then send a fixed quote and a dated schedule. You approve a chapter outline, the writer drafts, and you review as chapters land.',
          'If the sample chapter misses your voice, we rewrite it at no cost before the rest is written. Most short projects take a few hours of your time in total.',
        ],
      },
      {
        heading: 'Freelancer, AI tool, or studio?',
        paragraphs: [
          'Each route can work. The difference is what you still have to do yourself after the draft arrives.',
        ],
        table: {
          caption: 'Ways to get a lead magnet ebook written',
          columns: ['', 'Marketplace freelancer', 'AI writing tool', 'ebookwriters.us'],
          rows: [
            ['Who writes it', 'One freelancer', 'Software; you edit', 'A human writer matched to your field'],
            ['Your voice', 'Depends on the writer', 'Generic unless you rewrite it', 'Matched from interviews and samples'],
            ['Editing and cover', 'Usually extra', 'Not included', 'Included in the package'],
            ['Price', 'Hourly or per word', 'Subscription', 'Fixed fee from $699'],
            ['Ownership', 'Check the contract', "Check the tool's terms", '100% yours, in writing'],
          ],
        },
      },
    ],
    faqs: [
      {
        q: 'How long should a lead magnet ebook be?',
        a: 'Most lead magnet ebooks run 5,000 to 15,000 words. Long enough to solve one problem properly, short enough to finish in one sitting. Our Starter package covers up to 15,000 words.',
      },
      {
        q: 'How much does a lead magnet ebook cost?',
        a: 'Our Starter package is $699 for up to 15,000 words, including writing, one editorial pass, a standard cover, EPUB and PDF files, and two revision rounds. Longer guides fit the Professional package at $1,499.',
      },
      {
        q: 'How long does it take?',
        a: 'About three weeks for a Starter guide of up to 15,000 words, once the brief is agreed. A Professional guide of up to 30,000 words takes about five weeks.',
      },
      {
        q: 'Who owns the lead magnet?',
        a: 'You do. Rights transfer to you before writing begins, so you can give the ebook away, sell it, or turn it into a course without asking us.',
      },
      {
        q: 'Do you use AI to write it?',
        a: 'No. Your lead magnet is written and revised by a human writer under studio editorial review. Ordinary tools may support research or admin, but the prose is written for your voice.',
      },
      {
        q: 'What do I need to provide?',
        a: 'A short brief: who the reader is, the problem the guide solves, and the offer it should lead to. Then one interview or a few recorded calls, plus feedback as chapters arrive.',
      },
      {
        q: 'Can you write a workbook or checklist instead?',
        a: 'Yes. Tell us the format on the contact form. We quote workbooks and guides the same way: by agreed length, revision rounds, and the files you need.',
      },
    ],
    links: [
      { label: 'Ebook ghostwriter for coaches', href: '/ebook-ghostwriter-for-coaches' },
      { label: 'Ebook ghostwriting services', href: '/ebook-ghostwriting-services' },
      { label: 'Writing packages and prices', href: '/pricing' },
      { label: 'How to write a lead magnet ebook that gets emails', href: '/blog/how-to-write-a-lead-magnet-ebook-that-gets-emails' },
      { label: 'Lead magnet ebook vs authority book', href: '/blog/lead-magnet-ebook-vs-authority-book' },
      { label: 'How to choose a ghostwriter', href: '/how-to-choose-a-ghostwriter' },
    ],
  },
  coaches: {
    path: '/ebook-ghostwriter-for-coaches',
    eyebrow: 'For coaches',
    title: 'Ebook ghostwriter for coaches: turn your method into a book clients read.',
    lead:
      'You already teach the material on every call. We interview you, capture your method in your voice, and deliver an ebook you can use as a lead magnet, a course companion, or an authority book.',
    quickAnswer:
      'An ebook ghostwriter for coaches turns your sessions, courses, and frameworks into a finished ebook under your name. At ebookwriters.us that starts at $699 for a lead magnet of up to 15,000 words and runs to full authority books, with an NDA, a fixed fee, and 100% ownership.',
    heroImage: '/assets/brand/page-hero-studio.png',
    heroImageAlt: "Coach's notebook and session notes being turned into an ebook",
    actions: [
      { label: 'Request a quote', href: '/contact' },
      { label: 'See packages', href: '/pricing', variant: 'gold' },
    ],
    sections: [
      {
        heading: 'Three books coaches need',
        paragraphs: [
          'Most coaching books fall into one of three jobs. Naming the job first decides the length, the package, and what the last chapter asks the reader to do.',
        ],
        table: {
          caption: 'Coaching books by job',
          columns: ['Book', 'What it does', 'Typical length', 'Package'],
          rows: [
            ['Lead magnet', 'Wins an email address and a discovery call', 'Up to 15,000 words', 'Starter: $699'],
            ['Signature-method ebook', 'Teaches your framework step by step; sells or supports a course', 'Up to 30,000 words', 'Professional: $1,499'],
            ['Authority book', 'Positions you for speaking, media, and higher-ticket clients', 'Up to 50,000 words', 'Premium: $2,499'],
          ],
        },
      },
      {
        heading: 'How we capture your voice',
        paragraphs: [
          'Coaches rarely need to write. You need to talk. We build the manuscript from voice-matching interviews, and from whatever you already have: course modules, webinar recordings, session notes you are allowed to share, emails, and posts.',
          'You approve a chapter outline before drafting, and the sample chapter is rewritten at no cost if it does not sound like you. Short and standard projects usually take a few hours of your time in total.',
        ],
        bullets: [
          'Discovery call and NDA',
          'Interviews on your method and your best client stories',
          'Outline you approve',
          'Sample chapter in your voice',
          'Chapters on a dated schedule',
        ],
      },
      {
        heading: 'Client stories, handled carefully',
        paragraphs: [
          "Coaching books work best with real examples, and real examples belong to your clients. We use composite or anonymized stories unless you have a client's permission, and we flag any detail that could identify someone before it reaches the manuscript.",
          'We will not invent results or testimonials. If a number goes in the book, it comes from you.',
        ],
      },
      {
        heading: 'Coaching niches we write for',
        paragraphs: [
          'Business and executive coaching, life and personal-growth coaching, health and wellness, career coaching, and parenting. These match the nonfiction categories our writers already cover. If we cannot staff your niche well, we will say so rather than assign a generalist.',
        ],
      },
      {
        heading: 'What it costs',
        paragraphs: [
          'Every package is a fixed fee for an agreed length, with editing, a cover, and files included. There are no "was" prices, coupons, or countdown timers on our pricing.',
        ],
        table: {
          caption: 'Packages for coaching books',
          columns: ['Package', 'Fixed fee', 'Length', 'Typical timeline'],
          rows: plans.map(plan => [plan.name, `$${plan.price}`, plan.words, plan.timeline]),
        },
      },
    ],
    faqs: [
      {
        q: 'Will the book sound like me?',
        a: 'That is the point of the interviews. We match your voice from recorded conversations and your existing material, and the sample chapter is rewritten at no cost if it misses.',
      },
      {
        q: 'Can you use my course or webinar content?',
        a: 'Yes. Course modules, webinar recordings, and notes are often the fastest route to a strong outline. Share them after the NDA is signed.',
      },
      {
        q: 'Who owns the book and the framework?',
        a: 'You do. Rights transfer to you before writing begins, and your name goes on the cover. Your framework stays yours.',
      },
      {
        q: 'How much time do I need to give?',
        a: 'Usually a few hours across the discovery call, interviews, and chapter reviews for short and standard books. Authority books with many interviews take more, and we name that in the quote.',
      },
      {
        q: 'Can the ebook be published on Amazon?',
        a: 'Yes. Professional and higher packages include KDP publishing setup. You stay the account holder and keep 100% of royalties.',
      },
      {
        q: 'Do you promise bestseller status?',
        a: 'No. Nobody can honestly guarantee a bestseller. We promise a well-written book delivered on the agreed schedule, and we tell you what a launch needs.',
      },
    ],
    links: [
      { label: 'Lead magnet ebook writing', href: '/lead-magnet-ebook-writing' },
      { label: 'Ebook ghostwriting services', href: '/ebook-ghostwriting-services' },
      { label: 'Amazon KDP publishing', href: '/amazon-kdp-ebook-writing' },
      { label: 'How to hire a business book ghostwriter', href: '/blog/how-to-hire-a-business-book-ghostwriter' },
      { label: 'Book coach vs ghostwriter', href: '/blog/book-coach-vs-ghostwriter' },
      { label: 'Writing packages', href: '/pricing' },
    ],
  },
  chooseGhostwriter: {
    path: '/how-to-choose-a-ghostwriter',
    eyebrow: 'Hiring guide',
    title: 'How to choose a ghostwriter and spot a ghostwriting scam.',
    lead:
      'Ghostwriting scams are common enough that author groups track them. Use this checklist on any company before you pay, including us. Every question below has our own answer next to it.',
    quickAnswer:
      'To choose a ghostwriter safely: get a written scope and fixed fee, an NDA and a rights-transfer agreement before writing starts, a sample in your voice, and proof the people are real. Walk away from permanent "50% off" prices, bestseller promises, unlinked publisher logos, and anyone who wants to own your KDP account.',
    heroImage: '/assets/brand/page-hero-brief.png',
    heroImageAlt: 'Checklist and contract on a desk: how to choose a ghostwriter',
    actions: [
      { label: 'Ask us these questions', href: '/contact' },
      { label: 'See our pricing', href: '/pricing', variant: 'gold' },
    ],
    sections: [
      {
        heading: 'Why vetting matters in ghostwriting',
        paragraphs: [
          'Writers\' watchdogs have documented ghostwriting and "publishing services" companies that take large payments and deliver little, use famous publishers\' names, or resell the same template to every client. [Writer Beware](https://writerbeware.blog/) and the [Authors Guild](https://authorsguild.org/) both publish scam warnings for authors.',
          'The good news: most scams fail a few simple checks. You can run them in an afternoon, before you send any money.',
        ],
      },
      {
        heading: 'Red flags to walk away from',
        paragraphs: [
          'One of these alone is a reason to ask hard questions. Two or more is a reason to leave.',
        ],
        bullets: [
          'Permanent "50% off" or "70% off" prices and countdown timers',
          'A promise of bestseller status, or a New York Times list placement',
          'Big-publisher or media logos with no link to a real article or deal',
          'A full book plus publishing and marketing for a few hundred dollars',
          'No written scope, NDA, or rights agreement before you share material',
          'Pressure to pay everything up front before the scope is agreed',
          'They want to publish under their own KDP account, or hold your royalties',
          'No way to check who runs the company or where it is based',
        ],
      },
      {
        heading: 'Questions to ask before you hire',
        paragraphs: [
          'Ask these on the first call and get the answers in writing. A good ghostwriter will not mind.',
        ],
        table: {
          caption: 'Ghostwriter vetting checklist',
          columns: ['Ask', 'A good answer', 'Our answer'],
          rows: [
            ['What exactly is the price, and what does it include?', 'A fixed fee tied to length, revisions, and deliverables', 'Fixed packages from $699 to $3,999, listed on /pricing'],
            ['Who owns the book and the royalties?', 'You do, in a signed rights-transfer agreement', 'You do: rights transfer before writing begins'],
            ['When is the NDA signed?', 'Before you share any material', 'Before you share source material'],
            ['Can I see writing in my voice before committing to the whole book?', 'A sample chapter, with a fix if it misses', 'Sample chapter rewritten at no cost if the voice misses'],
            ['Whose KDP account will the book be on?', 'Yours: you are the publisher', 'Yours; we support setup, you stay the account holder'],
            ['Do you use AI to write?', 'A clear policy, in writing', 'Human writers; see our AI policy'],
            ['Will you guarantee sales or bestseller status?', 'No', 'No, nobody honestly can'],
            ['Who are you and where are you based?', 'A real address, phone, and named people', 'Iowa, USA: info@ebookwriters.us, +1 712-414-0542'],
          ],
        },
      },
      {
        heading: 'What a fair ghostwriting contract includes',
        paragraphs: [
          'Read the contract before the first payment. It should name the word count, the number of revision rounds, the schedule, what happens if the voice is wrong, and who owns the manuscript, the cover, and the retailer accounts.',
          'Our [ghostwriter contract checklist](/blog/ghostwriter-contract-checklist-nda-and-rights) walks through each clause, and our list of [questions to ask a ghostwriter](/blog/what-questions-to-ask-a-ghostwriter-before-hiring) covers the first call.',
        ],
      },
      {
        heading: 'Fair prices look fair',
        paragraphs: [
          'Very low prices for a full book usually mean the writing is outsourced, generated, or never finished. Very high prices are normal for celebrity and traditional-publishing ghostwriters. In between, the question is whether the price is written down and tied to a scope.',
          'Our packages are fixed for an agreed length, with no inflated "was" prices or countdown timers. See [what an ebook ghostwriter costs](/blog/how-much-does-an-ebook-ghostwriter-cost) for the wider market.',
        ],
      },
    ],
    faqs: [
      {
        q: 'How do I know if a ghostwriting company is legitimate?',
        a: 'Check for a written scope and fixed price, an NDA and rights-transfer agreement before writing, a sample in your voice, a real address and phone number, and people you can verify. Search the company name with the word scam, and check author watchdogs such as Writer Beware.',
      },
      {
        q: 'Is it normal to pay a ghostwriter up front?',
        a: 'Paying after a written scope and quote is normal. Paying the full fee before any scope, outline, or contract exists is a warning sign.',
      },
      {
        q: 'Are 50% off ghostwriting deals real?',
        a: 'A permanent discount with a countdown timer is a sales tactic, not a sale. It is one of the most common signs of a low-quality or scam operation in this niche.',
      },
      {
        q: 'Should a ghostwriter publish my book on their account?',
        a: 'No. You should be the publisher of record on your own KDP account and receive royalties directly. A ghostwriter can help with setup without owning the account.',
      },
      {
        q: 'Can a ghostwriter guarantee a bestseller?',
        a: 'No. Bestseller lists depend on sales and editorial choices nobody controls. A promise of bestseller status is a red flag.',
      },
    ],
    links: [
      { label: 'Questions to ask a ghostwriter', href: '/blog/what-questions-to-ask-a-ghostwriter-before-hiring' },
      { label: 'Ghostwriter contract checklist', href: '/blog/ghostwriter-contract-checklist-nda-and-rights' },
      { label: 'Is ghostwriting illegal?', href: '/blog/is-ghostwriting-illegal' },
      { label: 'Our AI policy', href: '/ai-policy' },
      { label: 'Ebook ghostwriting services', href: '/ebook-ghostwriting-services' },
      { label: 'Writing packages', href: '/pricing' },
    ],
  },
  aiPolicy: {
    path: '/ai-policy',
    eyebrow: 'AI policy',
    title: 'Our AI policy: human writers, written down.',
    lead:
      'Client manuscripts at ebookwriters.us are written and revised by human writers. This page explains where ordinary software tools may help, what we never do, and how to get stricter terms in your agreement.',
    quickAnswer:
      'ebookwriters.us does not deliver AI-generated books as ghostwriting. Your manuscript is written and revised by the assigned human writer under studio editorial review. Ordinary tools may support research, outlining, or production admin. If you want no AI tools used on your project at all, we can write that into your agreement.',
    heroImage: '/assets/brand/faq-editorial-v2.webp',
    heroImageAlt: 'Editor reviewing manuscript pages by hand: ebookwriters.us AI policy',
    actions: [
      { label: 'Ask about your project', href: '/contact' },
      { label: 'Editorial policy', href: '/editorial-policy', variant: 'gold' },
    ],
    sections: [
      {
        heading: 'The short version',
        paragraphs: [
          'A human writer writes your book. A human editor reviews it. We do not hand you an unedited AI draft and call it ghostwriting, and we do not charge ghostwriting prices for generated text.',
        ],
      },
      {
        heading: 'Where tools may help',
        paragraphs: [
          'Like most studios, we use ordinary software. Some of it now includes AI features. These may support work around the manuscript, not the prose you publish.',
        ],
        bullets: [
          'Research support and fact-finding, checked against primary sources',
          'Outlining support and organizing interview notes',
          'Production admin: scheduling, file conversion, formatting checks',
          'Spelling and grammar checks during editing',
        ],
      },
      {
        heading: 'What we never do',
        paragraphs: [
          'We will not invent lived detail, client stories, results, or quotes you did not provide. We do not publish fabricated statistics or case studies on this site.',
        ],
        bullets: [
          'Deliver AI-generated prose as a ghostwritten manuscript',
          'Invent experiences, testimonials, or numbers for your book',
          "Present generated text as a writer's original work",
        ],
      },
      {
        heading: 'Why it matters for your book',
        paragraphs: [
          'Amazon KDP asks publishers to disclose AI-generated content when they publish, and the [U.S. Copyright Office](https://www.copyright.gov/ai/) has said that material generated by AI without human authorship is not protected by copyright. A human-written manuscript keeps both questions simple.',
          'It also keeps the book yours in a practical sense: your stories, your method, and your voice, written by someone who interviewed you.',
        ],
      },
      {
        heading: 'Stricter terms on request',
        paragraphs: [
          'If you need language that goes further, for example, no AI tools of any kind on your material, say so on the discovery call. We will write it into your agreement before you share anything.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Is my ebook written by AI?',
        a: 'No. Your manuscript is written and revised by the assigned human writer under studio editorial review.',
      },
      {
        q: 'Do you use any AI tools at all?',
        a: 'Ordinary software tools may support research, outlining, or production admin. They do not write the prose you publish.',
      },
      {
        q: 'Can I ban AI tools on my project?',
        a: 'Yes. Ask on the discovery call and we will put that restriction in your agreement before you share material.',
      },
      {
        q: 'Do I need to disclose AI use on Amazon KDP?',
        a: "KDP asks you to disclose AI-generated content when you publish. Because your manuscript is human-written, that disclosure is not about the writing we deliver. Check KDP's current content guidelines when you publish.",
      },
    ],
    links: [
      { label: 'Editorial policy', href: '/editorial-policy' },
      { label: 'How to choose a ghostwriter', href: '/how-to-choose-a-ghostwriter' },
      { label: 'AI ebook writer vs human ghostwriter', href: '/blog/ai-ebook-writer-vs-human-ghostwriter' },
      { label: 'Ebook ghostwriting services', href: '/ebook-ghostwriting-services' },
    ],
  },
};

export const editingPage = {
  path: '/ebook-editing-services',
  eyebrow: 'Editing',
  title: 'Ebook editing services for drafts that need a professional pass.',
  lead:
    'Already have a manuscript? Developmental, line and copy editing, and a final proofread, so the book is clear before cover and KDP files.',
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
        'Name the problem in the manuscript first. The pass follows from that, not from a generic "editing" line item.',
      ],
      table: comparisons.editingNeed,
    },
    {
      heading: 'What editing covers',
      paragraphs: [
        'We match the edit to the draft you have, not a one-size pass labeled "editing."',
      ],
      table: comparisons.editingTypes,
    },
    {
      heading: 'What you receive',
      paragraphs: [
        'You receive an edited manuscript and clear notes on what changed. Revision rounds are quoted per manuscript length and edit depth. We confirm rounds in writing before work starts rather than inventing a blanket "unlimited" promise on this page.',
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
        'This is a teaching sample, not a client manuscript. It shows the difference between a first-draft sentence and a line-edited one.',
      ],
      sample: {
        before: "The thing is that there are a lot of leaders who don't really know how to talk to their teams and this causes many problems in the company over time.",
        after: 'Many first-time managers inherit a team they have never briefed clearly. The cost shows up later: missed handoffs, quiet resentment, and meetings that decide nothing.',
        note: 'Cut the throat-clearing ("the thing is that there are a lot of"). Named the actual job (briefing a team), then showed cost in concrete scenes instead of "many problems."',
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
        'Authors who drafted the book themselves and want a studio edit before publishing. Ghostwriting clients who want an extra editorial layer beyond the rounds in a writing package. Anyone who knows the manuscript is "almost there" but not retailer-ready.',
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
      a: 'Yes, say what you need on the contact form. Cover design and KDP setup can be scoped with editing or as a follow-on.',
    },
    {
      q: 'Are your editors human?',
      a: 'Yes. Every pass is done by a human editor. Spelling and grammar software may help catch typos, but the structural, line, and copy decisions are made by a person.',
    },
    {
      q: 'How long does ebook editing take?',
      a: 'A copyedit on a short guide can land in about a week. A developmental edit on a full-length manuscript runs on a dated schedule we set in the quote, after reviewing sample pages.',
    },
    {
      q: 'How is an editing quote worked out?',
      a: 'From word count, genre, how finished the draft is, and which pass you need: developmental, line, copy, or proofreading. We review sample pages first so the quote matches your draft, not a guess.',
    },
    {
      q: 'What is the difference between copyediting and proofreading?',
      a: 'Copyediting fixes grammar, consistency, names, and facts across the manuscript. Proofreading is the last check for typos and formatting slips on a draft that is otherwise stable.',
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
    'Custom covers matched to your genre, front, spine, and back for print when you need them, so the title holds up on Amazon and bookstore shelves.',
  quickAnswer:
    'Ebook cover design here is thumbnail-first: genre cues, title readability at Amazon size, then a full ebook front and a print wrap when paperback is in scope. Writing packages include cover work at the level listed for that plan; standalone covers are quoted separately.',
  heroImage: '/assets/brand/page-hero-covers.png',
  heroImageAlt: 'Book covers and design materials on a sunlit writing desk',
  actions: [
    { label: 'Request a cover quote', href: '/contact' },
    { label: 'See portfolio covers', href: '/portfolio', variant: 'gold' },
  ],
  covers: books.map(book => ({
    title: book.title,
    genre: book.genre,
    image: book.image,
    href: `/portfolio/${book.slug}`,
    note: book.author,
  })),
  sections: [
    {
      heading: 'What you get',
      paragraphs: [
        'A custom cover directed for your category, not a generic template with your title dropped in.',
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
      a: 'Yes, every writing package on /pricing includes cover design at the level listed for that plan. Standalone cover projects are quoted separately.',
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
    'Ownership, pricing ranges, timelines, revisions, publishing support, and niches, the same straight answers authors ask before they hire us.',
  heroImage: '/assets/brand/page-hero-blog.png',
  heroImageAlt: 'Editorial desk with manuscript notes: ebook writing FAQ',
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
  heroImageAlt: 'Editorial desk with manuscript notes, ebookwriters.us editorial policy',
  actions: [
    { label: 'Read the blog', href: '/blog' },
    { label: 'About the studio', href: '/about', variant: 'gold' },
  ],
  sections: [
    {
      heading: 'Who this policy covers',
      paragraphs: [
        'It covers public articles on /blog and related explainers on service pages. Client manuscripts, quotes, and contracts follow the project agreement and NDA, not this page.',
        'Articles publish under the ebookwriters.us Editorial Desk and are reviewed before they go live by Sophia Parker (Editorial Director) or Hannah Collins (Managing Editor), depending on the topic. See the [editorial desk](/authors/editorial-desk) page for who reviews what.',
      ],
    },
    {
      heading: 'How articles are researched',
      paragraphs: [
        'Guides start from a real author question (cost, rights, hiring, KDP, editing). We write from studio process and, where a legal or platform rule matters, we point to primary sources such as the U.S. Copyright Office or Amazon KDP Help, not to a recycled blog claiming the same advice.',
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
        'Service and pricing pages describe what we sell. Blog guides are for decisions before you hire, including checklists that apply to other writers, not only to us. Where a guide and a quote page could overlap, the guide says so (for example, the hiring checklist is not a second price list).',
      ],
    },
  ],
  links: [
    { label: 'Editorial desk', href: '/authors/editorial-desk' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
  ],
};

export const editorialDeskPage = {
  path: '/authors/editorial-desk',
  eyebrow: 'Editorial desk',
  title: 'The editorial team behind our ebook writing and publishing guides',
  lead:
    'Every guide on ebookwriters.us is written by the studio and reviewed by a named editor before it goes live. Meet the two editors who review them, and browse every guide by topic.',
  updated: 'November 5, 2026',
  heroImage: '/assets/brand/faq-editorial-v2.webp',
  heroImageAlt: 'Editorial desk with manuscript notes where ebookwriters.us guides are reviewed',
  actions: [
    { label: 'Browse the guides', href: '/blog' },
    { label: 'Meet the full team', href: '/team', variant: 'gold' },
  ],
  toc: [
    { id: 'reviewers', label: 'Who reviews our guides' },
    { id: 'guides', label: 'Guides by topic' },
  ],
  reviewersHeading: 'Who reviews our guides',
  // Each blog category is reviewed by one editor (matched in EditorialDeskPage and the crawl HTML).
  reviewers: [
    {
      name: 'Sophia Parker',
      role: 'Editorial Director',
      email: 'sophia@authors.ebookwriters.us',
      categories: ['Ghostwriting', 'Pricing & Hiring'],
      bio: 'Sophia oversees editorial quality across the studio and reviews our guides on ghostwriting, hiring a writer, cost, and rights. Each one is checked against how our projects and packages actually work.',
    },
    {
      name: 'Hannah Collins',
      role: 'Managing Editor',
      email: 'hannah@writers.ebookwriters.us',
      categories: ['Publishing', 'Writing & Strategy'],
      bio: 'Hannah leads developmental editing, line editing, and copyediting at the studio, and reviews our guides on publishing, Amazon KDP, editing, and planning a book.',
    },
  ],
  guidesHeading: 'Guides by topic',
  sections: [
    {
      heading: 'How guides are reviewed',
      paragraphs: [
        'Each guide starts from a question authors ask us on discovery calls. The reviewing editor checks it against how our projects and packages actually work, and checks any legal or platform rule against a primary source such as the U.S. Copyright Office or Amazon KDP Help.',
        'When advice changes, such as KDP royalty rules or ISBN prices, we update the guide and its date. The full standard, including how software tools are used, is on our [editorial policy](/editorial-policy) page.',
      ],
    },
    {
      heading: 'Corrections and questions',
      paragraphs: [
        'Spotted something out of date? Email the reviewing editor directly, or write to info@ebookwriters.us. Factual corrections are made on the page, and the date is updated.',
      ],
    },
  ],
  links: [
    { label: 'Editorial policy', href: '/editorial-policy' },
    { label: 'Our team', href: '/team' },
    { label: 'All guides', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
};

export const privacyPage = {
  eyebrow: 'Legal',
  title: 'Privacy policy',
  updated: 'September 15, 2026',
  lead: `This policy describes how ${siteContact.email} and the ebookwriters.us website handle information. It is written for a marketing site and quote form, not as a substitute for a signed project agreement.`,
  heroImage: '/assets/brand/page-hero-studio.png',
  heroImageAlt: 'Quiet writing desk: privacy and studio policies',
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
        'Form details are used to respond to your inquiry, prepare a quote, and, if we work together, to staff and deliver the writing project under a separate agreement and NDA.',
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
        `Email ${siteContact.email} to access, correct, or delete personal information we hold about an inquiry, subject to what we must keep for law or an active agreement. Do not send sensitive health, financial, or children's data through the public form.`,
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
    'These terms cover use of the ebookwriters.us website and quote requests. A paid writing project is governed by the statement of work and rights agreement you sign, those documents control if they conflict with this page.',
  heroImage: '/assets/brand/page-hero-studio.png',
  heroImageAlt: 'Studio desk: terms of service for ebookwriters.us',
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
        "The ebookwriters.us name, site design, and our copy belong to the studio. Do not copy service pages or brand assets for another writing business. Book covers shown as portfolio examples remain the authors' works; they are displayed with permission as samples of production quality.",
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
  heroImageAlt: 'Publishing studio desk: page not found',
  links: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Hire an ebook writer', href: '/hire-ebook-writer' },
    { label: 'Contact', href: '/contact' },
  ],
};
