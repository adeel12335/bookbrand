/**
 * Seed articles and the blog's fixed UI strings.
 *
 * The live article list comes from Neon via scripts/fetch-posts.mjs; this file
 * is the fallback the build uses when the database is unreachable, and the
 * source `npm run db:seed` loads into a fresh database.
 */

export const blogIndex = {
  title: 'Ebook writing & publishing',
  titleEm: 'guides.',
  lead:
    'Practical guides on ebook writing, ghostwriting costs, timelines, and KDP publishing — written for authors who want clear answers before they hire a writer.',
  metaTitle: 'Ebook Writing & Ghostwriting Blog | ebookwriters.us',
  metaDescription:
    'Guides on hiring ebook writers, ghostwriting vs freelancers, package pricing, and how long it takes to write and publish a book.',
};

export const blogArticle = {
  tocLabel: 'In this guide',
  takeawaysLabel: 'Key takeaways',
  authorRole: 'Studio editorial',
  relatedEyebrow: 'Keep reading',
  relatedTitle: 'Related',
  relatedTitleEm: 'guides.',
  relatedLead:
    'More on hiring writers, costs, timelines, and what belongs in a complete ebook writing package.',
  allArticles: 'All articles',
  prevLabel: 'Previous article',
  nextLabel: 'Next article',
  ctaEyebrow: 'Next step',
  ctaTitle: 'Ready for a clear',
  ctaTitleEm: 'quote?',
  ctaLead:
    'Tell us your idea, target length, and timeline. We will come back with a fixed ebook writing package — no hourly surprises.',
};

export const staticBlogPosts = [
  {
    slug: 'what-is-included-in-a-professional-ebook-writing-package',
    title: 'What Is Included in a Professional Ebook Writing Package?',
    description:
      'A clear checklist of what serious ebook writing and ghostwriting packages should include — writing, editing, design, files, rights, and publishing support.',
    date: '2026-09-15',
    dateLabel: 'September 15, 2026',
    readTime: '6 min read',
    category: 'Packages',
    eyebrow: 'Package guide',
    keywords: ['ebook writing package', 'ghostwriting deliverables', 'KDP publishing package', 'book cover and formatting'],
    lead:
      '“Writing included” is not enough. Before you hire ebook writers or a ghostwriting studio, use this checklist to see what a complete package should cover — and what usually gets left out of cheap quotes.',
    cta: 'Choose a writing package',
    image: '/assets/brand/faq-editorial-v2.png',
    imageAlt: 'Stack of clothbound books and a fountain pen on a marble desk',
    takeaways: [
      'A complete package covers writing, editing, cover, retailer files, and rights — not only a first draft.',
      'Named revision rounds and a rights-transfer agreement belong in writing, before work starts.',
      'EPUB and print-ready files are publishing deliverables; a Word document is not.',
      'You should keep the retailer accounts and 100% of royalties.',
    ],
    sections: [
      {
        heading: 'The core: manuscript production',
        paragraphs: [
          'A professional package starts with discovery, an outline, and a full manuscript written in your voice. You should see a sample chapter early, then chapter drafts on a dated schedule — not a silent black box for eight weeks.',
          'Revision rounds must be named in writing. Two or three editorial passes is common; “unlimited revisions” should still sit inside a clear approval process so the project does not drift forever.',
        ],
        bullets: [
          'Discovery call and project brief',
          'Chapter-by-chapter outline',
          'Ghostwritten manuscript in your voice',
          'Named revision rounds',
          'NDA and rights-transfer agreement',
        ],
      },
      {
        heading: 'Editing and quality control',
        paragraphs: [
          'Writing and editing are different skills. Strong packages include developmental or line editing plus a final proofread so the book reads clean on Kindle and in print.',
          'If a quote only says “writing,” ask who edits the draft and how many passes are included. Skipping this stage is how rushed books lose reviews.',
        ],
      },
      {
        heading: 'Cover, formatting, and retailer files',
        paragraphs: [
          'Readers judge a book in a second. A market-ready cover (front, spine, and back when print is included) belongs in a serious package, along with EPUB and print-ready PDF files.',
          'Ask what formats you receive and whether they are built for KDP, IngramSpark, or both. “A Word doc” is not a publishing deliverable.',
        ],
      },
      {
        heading: 'Publishing and launch support',
        paragraphs: [
          'Full-service ebook writing packages often include KDP setup, category and keyword research, and basic launch messaging. Higher tiers may add IngramSpark, hardcover files, or author-brand copy.',
          'You should keep the retailer accounts and 100% of royalties. The studio helps you publish — it should not quietly own your book.',
        ],
      },
      {
        heading: 'How our packages map to this checklist',
        paragraphs: [
          'Starter focuses on a short guide with writing, an edit pass, a standard cover, and EPUB/PDF. Professional adds deeper research, a custom cover, retailer formats, and KDP setup. Premium and Elite expand length, editorial depth, distribution, and launch support.',
          'Compare any outside quote against the same checklist. If three of these pillars are missing, the price is not actually lower — the work has simply been deferred to you.',
        ],
      },
    ],
  },
  {
    slug: 'how-long-does-it-take-to-write-and-publish-a-book',
    title: 'How Long Does It Take to Write and Publish a Book?',
    description:
      'Realistic timelines for ghostwriting and ebook publishing — from a 15,000-word guide to a full-length manuscript — plus what speeds a project up or slows it down.',
    date: '2026-09-15',
    dateLabel: 'September 15, 2026',
    readTime: '6 min read',
    category: 'Process',
    eyebrow: 'Timeline guide',
    keywords: ['how long to write a book', 'ghostwriting timeline', 'ebook publishing schedule', 'book writing process'],
    lead:
      'Authors often ask how long ghostwriting takes before they hire an ebook writing studio. The honest answer depends on length, research, feedback speed, and whether publishing setup is included. Here are practical ranges you can plan around.',
    cta: 'Get a dated project schedule',
    image: '/assets/brand/path-roadmap-desk.png',
    imageAlt: 'Writing desk with a notebook, pen, and books labelled write, edit, publish, market, and grow',
    takeaways: [
      'A 15,000-word guide is roughly three weeks; a 50,000-word book is about eight.',
      'Outlining, a sample chapter, and weekly drafts keep the calendar honest.',
      'Slow feedback and mid-draft audience changes stretch delivery more than writing speed does.',
      'Ask for outline, sample, and final-files dates in writing before you hire.',
    ],
    sections: [
      {
        heading: 'Typical timelines by manuscript length',
        paragraphs: [
          'For a focused professional process with outlines, drafts, and revisions, these ranges are realistic for nonfiction ebook writing:',
        ],
        bullets: [
          'About 15,000 words: roughly 3 weeks',
          'About 30,000 words: roughly 5 weeks',
          'About 50,000 words: roughly 8 weeks',
          'Up to 100,000 words: roughly 12 weeks',
        ],
      },
      {
        heading: 'What is happening during that time',
        paragraphs: [
          'Week one is usually discovery, voice matching, and outlining. Drafting follows in chapters so you can course-correct early. Editing, cover design, and formatting often overlap the later writing weeks instead of starting only after “the book is done.”',
          'Publishing setup — KDP metadata, categories, and file upload — typically adds a few days once files are approved, not another full month, unless distribution or hardcover extras are in scope.',
        ],
      },
      {
        heading: 'What speeds a book up',
        paragraphs: [
          'Clear positioning (“who it is for” and “what it should achieve”), fast chapter approvals, and existing notes or interviews all compress the calendar. Authors who block two to four hours total across the project rarely become the bottleneck.',
        ],
      },
      {
        heading: 'What slows a book down',
        paragraphs: [
          'Changing the audience mid-draft, holding chapters for weeks, or adding major new sections after the outline is locked will extend delivery. Rush fees exist for a reason: quality ghostwriting still needs research, voice matching, and editing — not just more late nights.',
          'Be wary of anyone promising a polished 50,000-word book in a few days. That timeline usually skips the stages readers notice.',
        ],
      },
      {
        heading: 'How to get a date you can trust',
        paragraphs: [
          'Ask for a written schedule before work starts: outline date, sample chapter date, weekly draft cadence, and final-files date. A studio that can publish that calendar is more reliable than one that only says “as soon as possible.”',
        ],
      },
    ],
  },
  {
    slug: 'ghostwriting-vs-hiring-a-freelancer',
    title: 'Ghostwriting vs Hiring a Freelancer: Which Is Right for Your Book?',
    description:
      'Compare a professional ghostwriting studio with a solo freelancer — cost, process, rights, editing, and publishing support — so you can hire with clear eyes.',
    date: '2026-09-15',
    dateLabel: 'September 15, 2026',
    readTime: '8 min read',
    category: 'Ghostwriting',
    eyebrow: 'Hiring guide',
    keywords: ['ghostwriting vs freelancer', 'hire a ghostwriter', 'ebook writers', 'book writing service'],
    lead:
      'Both paths can produce a manuscript. They are not the same product. If you are choosing between a ghostwriting studio and a solo freelancer, compare process, accountability, and what you receive after the draft — not only the headline price.',
    cta: 'Talk to a ghostwriting specialist',
    image: '/assets/brand/hero-concept-photo.png',
    imageAlt: 'Clothbound hardcover standing on a writer’s desk beside manuscript pages and a fountain pen',
    takeaways: [
      'A studio coordinates writing, editing, design, and often publishing under one agreement.',
      'A freelancer fits when you already have an editor, designer, and publishing plan.',
      'Compare rights paperwork, revision rules, and files — not only the headline fee.',
      'A sample chapter, rights language, and a dated schedule protect you more than a portfolio screenshot.',
    ],
    sections: [
      {
        heading: 'What a ghostwriting studio is built to do',
        paragraphs: [
          'A studio coordinates writing, editing, design, and often publishing support under one agreement. You get a project manager (or clear point of contact), a dated schedule, revision rules, and paperwork that transfers rights to you.',
          'That structure costs more than a single freelancer’s first draft — and it exists so your book does not stall when one person gets busy, stuck, or disappears.',
        ],
      },
      {
        heading: 'What a freelancer is best for',
        paragraphs: [
          'A strong specialist freelancer can be a fit when you already have an editor, designer, and publishing plan, and you only need draft pages. You must be ready to manage scope, deadlines, and quality checks yourself.',
          'Freelance marketplaces make it easy to find writers and just as easy to find mismatched voice, missed deadlines, or debates about who owns the text.',
        ],
      },
      {
        heading: 'Side-by-side: the differences that matter',
        paragraphs: [
          'Use this comparison when you evaluate ebook writers and ghostwriting quotes:',
        ],
        bullets: [
          'Accountability: studio schedule vs. one person’s availability',
          'Editing: included passes vs. often billed separately',
          'Design & files: cover + EPUB/print vs. manuscript-only',
          'Rights: written transfer + NDA vs. vague message threads',
          'Publishing: KDP help vs. “here is a Google Doc”',
          'Price: higher fixed package vs. lower hourly that can climb',
        ],
      },
      {
        heading: 'Which should you choose?',
        paragraphs: [
          'Choose a studio if this is your first book, you want one team accountable for the finish line, or you need editing, cover design, and KDP setup included. Choose a freelancer if you are experienced, already have a production bench, and can manage the project week by week.',
          'Either way, do not skip the sample chapter, the rights language, or a clear revision policy. Those three protect you more than any portfolio screenshot.',
        ],
      },
      {
        heading: 'A simple hiring test',
        paragraphs: [
          'Ask every candidate to explain your audience in one paragraph, show a similar finished book, state a fixed fee and delivery date, and confirm you own the work. Vague answers are the red flag — not a slightly higher package price.',
        ],
      },
    ],
  },
  {
    slug: 'how-much-does-it-cost-to-hire-an-ebook-writer',
    title: 'How Much Does It Cost to Hire an Ebook Writer?',
    description:
      'Real ebook writing and ghostwriting package ranges — from short guides to full-length books — plus what is included and how to budget with confidence.',
    date: '2026-09-15',
    dateLabel: 'September 15, 2026',
    readTime: '7 min read',
    category: 'Pricing',
    eyebrow: 'Cost guide',
    keywords: ['ebook writer cost', 'hire ebook writer', 'ghostwriting price', 'book writing packages'],
    lead:
      'If you are searching for professional ebook writers or a ghostwriter, price is usually the first question. Here is a clear breakdown of what ebook writing costs in 2026, what you should expect in a package, and how to choose the right budget for your manuscript.',
    cta: 'Get a fixed writing quote',
    image: '/assets/brand/portfolio-hero-bg.png',
    imageAlt: 'Sunlit desk with a notebook, mug, and books labelled ideas, manuscripts, publish, and grow',
    takeaways: [
      'Professional nonfiction packages typically run from $699 to $3,999 depending on length and extras.',
      'Word count, research depth, edits, cover, and KDP setup drive the price more than an hourly rate.',
      'A cheap draft without editing, files, or rights is not a cheaper book — it is unfinished work.',
      'Budget to the job the book must do, then insist on a fixed total and written ownership.',
    ],
    sections: [
      {
        heading: 'Quick answer: typical ebook writing costs',
        paragraphs: [
          'Most professional ebook writing and ghostwriting packages for nonfiction fall between $699 and $3,999, depending on length, research depth, editing rounds, cover design, and whether publishing setup (KDP / IngramSpark) is included.',
          'Hourly freelancers can look cheaper on paper, but unfinished manuscripts, missing edits, and weak covers often push the real cost higher. A fixed package with a dated schedule is usually safer for first-time authors.',
        ],
      },
      {
        heading: 'What drives the price of an ebook writer?',
        paragraphs: [
          'Word count is the biggest lever. A 15,000-word lead magnet takes less research and fewer editorial passes than a 50,000-word authority book. Genre matters too — technical finance or health manuscripts need specialist writers, which raises the fee.',
          'Also check what is bundled. Writing alone is only one stage. Editing, proofreading, cover design, EPUB/print files, and retailer setup can double the bill if you buy them separately later.',
        ],
        bullets: [
          'Length and research depth',
          'Number of revision rounds',
          'Whether cover design and formatting are included',
          'KDP / IngramSpark publishing support',
          'Timeline — rush delivery costs more',
        ],
      },
      {
        heading: 'Sample package ranges (what good studios quote)',
        paragraphs: [
          'At ebookwriters.us, packages are fixed up front so you are not billed by the hour. Use these ranges as a planning guide when you compare quotes from ebook writers or ghostwriting studios.',
        ],
        bullets: [
          'Starter (~15,000 words): from $699 — short guide or lead magnet, writing, one edit pass, standard cover, EPUB/PDF',
          'Professional (~30,000 words): from $1,499 — outline, two edit passes, custom cover, retailer formats, KDP setup',
          'Premium (~50,000 words): from $2,499 — senior writer, deeper edits, print-ready interior, KDP + IngramSpark, launch messaging',
          'Elite (~100,000 words): from $3,999 — dedicated team, premium design, global distribution setup, author brand copy',
        ],
      },
      {
        heading: 'Ghostwriting vs hiring a cheap freelancer',
        paragraphs: [
          'The lowest bid is rarely the lowest cost. A $200 chapter from an unverified freelancer can stall for weeks, miss your voice, or arrive without rights paperwork. Professional ghostwriting includes voice matching, an NDA, revision rounds, and a rights-transfer agreement so you own the finished book.',
          'If a quote is far below market and vague about edits, covers, or ownership, treat that as a risk signal — not a bargain.',
        ],
      },
      {
        heading: 'How to budget without overpaying',
        paragraphs: [
          'Start with the job the book must do. A short guide that grows your email list does not need an Elite package. A flagship business book that carries your consulting brand usually does need stronger editing, design, and launch support.',
          'Ask every ebook writing service for: a fixed total, a dated schedule, what files you receive, how many revisions are included, and written confirmation that you keep 100% of the rights and royalties.',
        ],
      },
      {
        heading: 'Next step',
        paragraphs: [
          'If you want a fixed quote for your idea, length, and timeline, tell us what you are writing and who it is for. You will get a clear scope and price — not an open-ended hourly estimate.',
        ],
      },
    ],
  },
];
