export const navigation = [
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    match: [
      '/services',
      '/ebook-ghostwriting-services',
      '/hire-ebook-writer',
      '/amazon-kdp-ebook-writing',
      '/ebook-editing-services',
      '/ebook-cover-design',
    ],
  },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
];

export const services = [
  {
    n: '01', key: 'writing', title: 'Ebook & Book Ghostwriting',
    copy: 'Work with professional ghostwriters who bring your ideas to life in your voice — research, outline, and full manuscript.',
    points: ['Chapter-by-chapter outline', 'Original research', 'Two revision rounds'],
    href: '/ebook-ghostwriting-services',
  },
  {
    n: '02', key: 'editing', title: 'Editing & Proofreading',
    copy: 'Refine your manuscript with expert editors for clarity, flow, and impact before it goes to press.',
    points: ['Developmental edit', 'Line & copy edit', 'Final proofread'],
    href: '/ebook-editing-services',
  },
  {
    n: '03', key: 'formatting', title: 'Cover Design',
    copy: 'Market-ready covers that capture your story, fit your genre, and stand out on Amazon and bookstore shelves.',
    points: ['Custom cover design', 'Front, spine & back', 'Genre-matched art direction'],
    href: '/ebook-cover-design',
  },
  {
    n: '04', key: 'publishing', title: 'Publishing & Formatting',
    copy: 'Print, ebook, and audiobook formatting with KDP and IngramSpark setup and retailer-ready files.',
    points: ['EPUB & print PDF', 'KDP & IngramSpark setup', 'Retailer-ready files'],
    href: '/amazon-kdp-ebook-writing',
  },
  {
    n: '05', key: 'ghostwriting', title: 'ISBN & Copyright Support',
    copy: 'Secure your rights, set up publishing essentials, and protect your work properly from day one.',
    points: ['ISBN guidance', 'Copyright setup', 'Rights documentation'],
    href: '/services',
  },
  {
    n: '06', key: 'branding', title: 'Book Marketing',
    copy: 'Launch strategy, Amazon optimization, and author-platform support so the right readers find your book.',
    points: ['Launch messaging', 'Amazon optimization', 'Author brand visibility'],
    href: '/services',
  },
];

export const benefits = [
  {
    key: 'writers',
    title: 'Human writers',
    copy: 'A named specialist writes the manuscript. We do not deliver unedited AI books as ghostwriting.',
  },
  {
    key: 'nda',
    title: 'NDA protected',
    copy: 'An NDA is signed before you share source material.',
  },
  {
    key: 'ownership',
    title: '100% author ownership',
    copy: 'Copyright, royalties, and retailer accounts stay in your name.',
  },
  {
    key: 'included',
    title: 'Editing & publishing support',
    copy: 'Editorial passes, cover work, and retailer files scale with the package.',
  },
];

export const comparisons = {
  studioVsFreelancer: {
    caption: 'Freelancer vs a writing studio',
    columns: ['Feature', 'Freelancer', 'ebookwriters.us studio'],
    rows: [
      ['Writing', 'Yes — one person', 'Genre-matched writer'],
      ['Editing', 'Often extra', 'Included by package'],
      ['Cover design', 'Usually separate', 'Available in package'],
      ['KDP / files', 'Usually separate', 'Available in package'],
      ['Project management', 'You manage it', 'Studio-managed schedule'],
      ['Rights and NDA', 'Varies', 'NDA + rights transfer before writing'],
    ],
  },
  editingTypes: {
    caption: 'Which edit you actually need',
    columns: ['Editing type', 'Focus', 'When to use it'],
    rows: [
      ['Developmental', 'Structure, argument, pacing, chapter order', 'The book is not working as a whole yet'],
      ['Line editing', 'Voice, clarity, and readability', 'The structure holds; sentences do not'],
      ['Copyediting', 'Grammar, consistency, and usage', 'The draft is stable and needs a clean pass'],
      ['Proofreading', 'Final typos and layout slips', 'After design, before you upload files'],
    ],
  },
  editingNeed: {
    caption: 'Match the problem to the pass',
    columns: ['Your manuscript problem', 'Editing needed'],
    rows: [
      ['Chapters do not flow, or the argument jumps', 'Developmental editing'],
      ['The writing feels awkward or unlike your voice', 'Line editing'],
      ['Grammar, names, and facts are inconsistent', 'Copyediting'],
      ['The draft is stable and you need a last typo check', 'Proofreading'],
    ],
  },
  kdpVsTraditional: {
    caption: 'Amazon KDP vs traditional publishing',
    columns: ['', 'Amazon KDP', 'Traditional publishing'],
    rows: [
      ['Who publishes', 'You, on your KDP account', 'A publisher that acquires the book'],
      ['Speed to market', 'When files are ready', 'Often 12–24 months after a deal'],
      ['Royalties', 'You keep 100% of KDP royalties we set up', 'Shared with the publisher'],
      ['Control', 'Title, price, files, and updates stay yours', 'Contract terms control cover and timing'],
      ['Fit', 'Experts, founders, and first-time ebook authors', 'When an agent and house are the goal'],
    ],
  },
};

export const pathBand = {
  eyebrow: 'A clearer path to publishing',
  title: 'From outline to published book —',
  titleEm: 'a clear ghostwriting path.',
  lead:
    'From the first outline to retailer-ready files, our ebook writing studio maps every step so you always know what comes next — and who is doing the work.',
  cta: 'Talk to a Specialist',
  journey: ['Write', 'Edit', 'Design', 'Publish', 'Market', 'Grow'],
  roadmap: {
    title: 'Your publishing roadmap',
    steps: [
      'Plan your project',
      'Work with our team',
      'See your book in the world',
    ],
  },
  image: '/assets/brand/path-roadmap-desk.png',
  imageAlt: 'Writing desk with journal, fountain pen, and publishing stage books',
};

export const portfolioIntro = {
  eyebrow: 'Recently Published',
  title: 'Published books from our ghostwriting studio.',
  meta: 'Selected titles across business, memoir, health, and more.',
  linkLabel: 'View full portfolio',
  linkHref: '/portfolio',
  image: '/assets/brand/portfolio-shelf-v2.webp',
  imageAlt: 'Six professionally designed books displayed on a warm stone shelf',
};

export const servicesIntro = {
  eyebrow: 'Our services',
  title: 'Ebook writing, editing, design',
  titleEm: '& publishing services.',
  lead: 'Ghostwriting, editing, cover design, formatting, and launch support — coordinated by one studio so nothing falls between freelancers.',
};

export const dualOffer = {
  intro: {
    eyebrow: 'What we do',
    title: 'Book production and book marketing',
    titleEm: 'in one studio.',
    lead:
      'Every title we take on moves through both halves of the studio — a production desk that makes the book, and a launch desk that makes sure readers find it.',
    note: 'Both desks are included in every full-service plan.',
  },
  stage: {
    image: '/assets/brand/publishing-craft-v2.webp',
    imageAlt: 'Open manuscript and craft tools on a publishing production desk',
  },
  publish: {
    index: '01',
    tag: 'Production desk',
    title: 'Publish with confidence.',
    lead:
      'From final manuscript to KDP and IngramSpark distribution, we handle the details so you can focus on your writing.',
    checklist: [
      'Print, ebook & hardcover',
      'Metadata & platform setup',
      'Global distribution support',
    ],
    cta: 'Plan KDP & IngramSpark publishing',
    href: '/contact',
    caption: 'Fig. 01 — A higher standard for bolder stories',
  },
  market: {
    index: '02',
    tag: 'Launch desk',
    title: 'Reach readers who need your story.',
    lead:
      'Strategic book marketing to help your title stand out, build your audience, and create lasting impact beyond launch day.',
    checklist: [
      'Launch positioning',
      'Author platform strategy',
      'Visibility-focused campaigns',
    ],
    cta: 'Build your launch plan',
    href: '/contact',
    caption: 'Fig. 02 — Ideas meet the readers who matter',
  },
};

export const books = [
  {
    slug: 'under-the-dragons-wings',
    title: "Under The Dragon's Wings",
    subtitle: 'The Profit-Driven Trap That Chains Black Boys',
    author: 'William Capers',
    genre: 'Nonfiction',
    format: 'Paperback',
    role: 'Cover design',
    image: '/assets/brand/covers/dragons-wings.jpg',
    amazonUrl: 'https://www.amazon.com/dp/B0FTLSMFFR/',
    summary: 'A nonfiction cover for a direct argument about profit, systems, and Black boys. The jacket has to carry a long title without softening the claim.',
    detail: 'The title does two jobs at once: a metaphor up front, and a plain-language thesis underneath. The cover keeps that order so a shopper can read the subject in one glance, then the author name as the authority line. It is built for a paperback listing, where the thumbnail is small and the subtitle still has to stay legible.',
  },
  {
    slug: 'the-porch',
    title: 'The Porch',
    subtitle: 'Memory, Mission, and the Blueprint for Black Sovereignty',
    author: 'William Capers',
    genre: 'Nonfiction',
    format: 'Paperback',
    role: 'Cover design',
    image: '/assets/brand/covers/the-porch.jpg',
    amazonUrl: 'https://www.amazon.com/dp/B0G6W2W1YR/',
    summary: 'A cover for a book about memory, mission, and a practical blueprint. The short title is the hook; the subtitle does the explaining.',
    detail: '“The Porch” is short enough to dominate a thumbnail. The subtitle is the part that tells a serious reader what kind of book this is, so the type hierarchy puts the title first and the blueprint language second. The author line stays quiet so the idea, not a logo, leads the listing.',
  },
  {
    slug: 'the-bond-they-fear',
    title: 'The Bond They Fear',
    subtitle: 'Why Empowered Bonds Between Black Men and Black Males Undermine Systemic Control',
    author: 'William Capers',
    genre: 'Nonfiction',
    format: 'Paperback',
    role: 'Cover design',
    image: '/assets/brand/covers/the-bond-they-fear.jpg',
    amazonUrl: 'https://www.amazon.com/dp/B0FWBRDQXQ/',
    summary: 'A long, specific subtitle on a confrontational title. The cover has to stay readable when Amazon crops it to a narrow column.',
    detail: 'This jacket is a type problem more than an illustration problem. The main title is the line people remember. The subtitle is a full argument, so it is set to wrap cleanly under the title instead of competing with it. Paperback proportion keeps the author name anchored at the bottom, where retailer grids expect it.',
  },
  {
    slug: 'not-fine',
    title: 'Not Fine',
    author: 'Evelyn Truex',
    genre: 'Memoir',
    format: 'Kindle',
    role: 'Cover design',
    image: '/assets/brand/covers/not-fine.jpg',
    amazonUrl: 'https://www.amazon.com/dp/B0FSN4CPHL/',
    summary: 'A stark Kindle cover: black field, a crossed-out “not,” and a single white ribbon. The whole idea is readable at postage-stamp size.',
    detail: 'The title is the design. “NOT” is struck through in a thin magenta bar so the words “FINE” still read first, and the contradiction lands a second later. A white awareness ribbon sits alone under the type, with the author name in small caps at the foot. Nothing else is on the jacket, which is what makes the thumbnail hold together on a phone.',
  },
  {
    slug: 'mollo-tutto',
    title: 'Mollo Tutto! E Vado a Vivere in Rifugio',
    subtitle: 'Trasforma la tua vita. Il mio viaggio sulle Alpi.',
    author: 'Luca Daisei Hiroki',
    genre: 'Memoir',
    format: 'Paperback',
    role: 'Cover design',
    image: '/assets/brand/covers/mollo-tutto.jpg',
    amazonUrl: 'https://www.amazon.com/dp/B0D9BS9NCX/',
    summary: 'An Italian memoir cover about leaving ordinary life for a refuge in the Alps. The title is a decision, so the jacket treats it like one.',
    detail: 'The book is a first-person journey, not a travel guide. The cover leads with the outburst of the title — quitting, then going to live in a mountain refuge — and lets the Alpine subtitle explain the setting. It is designed for an Italian paperback listing, where the title has to survive both the grid thumbnail and the full product page.',
  },
  {
    slug: 'zen-per-principianti',
    title: 'Zen per Principianti',
    subtitle: 'A practical anti-stress guide for beginners.',
    author: 'Luca Daisei Hiroki',
    genre: 'Self-help',
    format: 'Paperback',
    role: 'Cover design',
    image: '/assets/brand/covers/zen-per-principianti.jpg',
    amazonUrl: 'https://www.amazon.com/dp/B0CXPM4XP2/',
    summary: 'A beginner Zen manual. The cover has to look calm and still tell a hurried reader that this is a step-by-step book, not a dense philosophy text.',
    detail: 'The Italian title is the category signal: Zen, for beginners. The subtitle promises a practical anti-stress path, so the jacket keeps the title large and the “start here” language secondary. Paperback format, aimed at readers who will judge the book from the Amazon thumbnail before they read a word of the description.',
  },
  {
    slug: 'il-cane-zen',
    title: 'Il Cane Zen',
    subtitle: 'A guide to happiness for dogs and the people who live with them.',
    author: 'Luca Daisei Hiroki',
    genre: 'Lifestyle',
    format: 'Paperback',
    role: 'Cover design',
    image: '/assets/brand/covers/il-cane-zen.jpg',
    amazonUrl: 'https://www.amazon.com/dp/B0CVF5SQFF/',
    summary: 'A pet book that borrows Zen language. The cover has to welcome dog owners without looking like a training textbook.',
    detail: 'The subject is the relationship, not a breed guide. The title “Il Cane Zen” is short and ownable; the subtitle explains harmony, Japanese symbols, and daily life with a dog. The jacket is built so the title still reads when the cover is reduced to the size of a search result.',
  },
  {
    slug: 'diario-zen',
    title: 'Diario Zen',
    subtitle: 'Twelve months of awareness, in three minutes a day.',
    author: 'Luca Daisei Hiroki',
    genre: 'Journal',
    format: 'Kindle',
    role: 'Cover design',
    image: '/assets/brand/covers/diario-zen.jpg',
    amazonUrl: 'https://www.amazon.com/dp/B0CRL9H1ZF/',
    summary: 'A daily journal cover. Readers need to see that this is a twelve-month practice, not a one-sitting essay.',
    detail: 'The promise is small and specific: three minutes a day, for a year. The cover puts “Diario Zen” first so the format is obvious, then uses the subtitle for the time span. Kindle listings crop tightly, so the title, the daily promise, and the author name are the only elements asked to survive that crop.',
  },
  {
    slug: 'il-gatto-zen',
    title: 'Il Gatto Zen',
    subtitle: 'Relax, quiet the mind, and live with a cat’s philosophy.',
    author: 'Luca Daisei Hiroki',
    genre: 'Lifestyle',
    format: 'Kindle',
    role: 'Cover design',
    image: '/assets/brand/covers/il-gatto-zen.jpg',
    amazonUrl: 'https://www.amazon.com/dp/B0CTJBC6ZT/',
    summary: 'A companion to the dog book, with its own subject: slowing down through the idea of a Zen cat.',
    detail: 'The series needs each cover to be recognizable and still distinct. “Il Gatto Zen” mirrors the dog title so returning readers know the shelf, while the illustration and subtitle belong to cats, meditation, and short Zen stories. The Kindle cover is composed for a tall thumbnail, with the title doing the selling.',
  },
  {
    slug: 'modern-samurai',
    title: 'Modern Samurai',
    subtitle: 'Discipline, concentration, and a calmer kind of strength.',
    author: 'Luca Daisei Hiroki',
    genre: 'Self-help',
    format: 'Kindle',
    role: 'Cover design',
    image: '/assets/brand/covers/modern-samurai.jpg',
    amazonUrl: 'https://www.amazon.com/dp/B0CYZXYP6N/',
    summary: 'A self-help cover built around one figure: a samurai in watercolor armor, with the title in orange under the art.',
    detail: 'The illustration carries the genre before the words do. A bearded samurai with a topknot and sword sits on an off-white field, surrounded by loose splashes of teal, orange, and pink. “MODERN SAMURAI” is set large in orange beneath the figure, with the Italian subtitle in small type and the author name at the top. The contrast is what keeps the title readable in a Kindle grid.',
  },
];

export function getBookBySlug(slug) {
  return books.find(book => book.slug === slug) || null;
}

export const portfolioPage = {
  metaTitle: 'Book Writing Portfolio — Published Covers | ebookwriters.us',
  metaDescription:
    'Browse books our ghostwriting studio has helped authors publish — memoir, business, self-help, and more. Writing, editing, design, and KDP support.',
  heroImage: '/assets/brand/page-hero-covers.png',
  heroImageAlt: 'Studio desk with laptop showing book covers and hardcover samples',
  eyebrow: 'Our portfolio',
  title: 'Books we’ve helped authors',
  titleEm: 'bring to life.',
  lead:
    'Every book has a story behind it. This portfolio highlights covers and projects we have helped shape for authors across genres — from memoir and business to self-help, wellness, and personal development.',
  cta: 'Start your book journey',
  trustNote: 'Trusted by authors who want professional guidance, creative support, and reader-ready results.',
  pillars: [
    {
      title: '100% Author Ownership',
      copy: 'Your book remains yours. We respect your ideas, your voice, and your intellectual property.',
    },
    {
      title: 'Complete Publishing Support',
      copy: 'From writing and editing to cover design, formatting, publishing, and marketing — key steps in one studio.',
    },
    {
      title: 'Professional Quality',
      copy: 'High standards for polished books that feel organized, market-ready, and clear to readers.',
    },
    {
      title: 'On-Time Delivery',
      copy: 'Clear timelines and milestone updates so every project moves forward with confidence.',
    },
  ],
  work: {
    eyebrow: 'Our work',
    title: 'A glimpse of our',
    titleEm: 'recent projects.',
    lead:
      'Published covers, shown as they ship. Open a title for the brief, the format, and the Amazon listing.',
    genres: ['Nonfiction', 'Memoir', 'Self-help', 'Lifestyle', 'Journal'],
  },
  offer: {
    eyebrow: 'What we offer',
    title: 'Services that bring',
    titleEm: 'every book together.',
    lead: 'From the first word to the final launch, we handle each step with care, clarity, and experience.',
  },
  process: {
    eyebrow: 'Our process',
    title: 'Simple process.',
    titleEm: 'Professional results.',
    lead: 'A clear path that keeps your publishing journey organized and stress-free.',
    steps: [
      {
        n: '01',
        title: 'Consultation',
        copy: 'We learn about your book idea, goals, genre, audience, current stage, and requirements.',
      },
      {
        n: '02',
        title: 'Planning',
        copy: 'We create a customized plan for writing, editing, design, publishing, or marketing.',
      },
      {
        n: '03',
        title: 'Creation',
        copy: 'Our team works on writing, editing, design, and formatting with attention to quality and detail.',
      },
      {
        n: '04',
        title: 'Publishing',
        copy: 'We prepare retailer-ready files and help you set up KDP, IngramSpark, and launch essentials.',
      },
    ],
  },
  voices: {
    eyebrow: 'Testimonials',
    title: 'What authors say about',
    titleEm: 'working with us.',
    lead: 'Strategy, craftsmanship, and clear communication — so authors publish books that look professional and support long-term goals.',
  },
  closing: {
    title: 'Ready to see your book',
    titleEm: 'in our portfolio?',
    lead: 'Tell us what you want to write. We will help you create, publish, and share a book that makes a lasting impact.',
    cta: 'Get a free publishing consultation',
  },
};
export const testimonialsIntro = {
  eyebrow: 'Author reviews',
  title: 'What authors say about our book writing service.',
};

/** Only publish quotes from real, permissioned clients. Empty until then. */
export const testimonials = [];

export const pricingIntro = {
  eyebrow: 'Investment',
  title: 'Transparent book writing packages —',
  titleEm: '$699 to $3,999.',
  lead:
    'Ghostwriting packages with editing, cover design, and retailer-ready files included. No surprise invoices — choose the plan that matches your manuscript.',
  previewTitle: 'Starting prices by length',
  previewLead:
    'Fixed starting prices by manuscript length. Detailed inclusions, revision rounds, and what is not included live on the pricing page.',
  previewCta: 'Compare packages',
};

export const plans = [
  {
    name: 'Starter', price: '699', words: 'Up to 15,000 words', timeline: '3 weeks',
    copy: 'A focused lead magnet or short guide from our ebook writers.',
    features: ['Professional writing', 'One editorial pass', 'Standard cover design', 'EPUB and PDF files', '2 revision rounds'],
  },
  {
    name: 'Professional', price: '1,499', words: 'Up to 30,000 words', timeline: '5 weeks', featured: true,
    copy: 'The full ghostwriting package most authors come to us for.',
    features: ['In-depth research and outline', 'Two editorial passes', 'Custom cover design', 'All retailer formats', 'KDP publishing setup', '3 revision rounds'],
  },
  {
    name: 'Premium', price: '2,499', words: 'Up to 50,000 words', timeline: '8 weeks',
    copy: 'A full-length book with launch support behind it.',
    features: ['Senior genre writer', 'Three editorial passes', 'Cover, spine and back design', 'Print-ready interior', 'KDP and IngramSpark setup', 'Launch messaging kit', 'Unlimited revisions within agreed scope'],
  },
  {
    name: 'Elite', price: '3,999', words: 'Up to 100,000 words', timeline: '12 weeks',
    copy: 'Authority publishing, handled end to end by our studio.',
    features: ['Dedicated editorial team', 'Full developmental edit', 'Premium cover and interior', 'Hardcover-ready files', 'Global distribution setup', 'Author brand and website copy', 'Priority scheduling'],
  },
];

export const faqIntro = {
  eyebrow: 'Frequently asked questions',
  title: 'Ebook writing & publishing',
  titleEm: 'FAQ.',
  lead:
    'Straight answers on rights, cost, timelines, and KDP publishing — the questions authors ask before they hire a ghostwriter.',
  cta: 'Still unsure? Ask a writing specialist',
  allLabel: 'Read the full FAQ',
  allHref: '/faq',
};

export const faqs = [
  {
    q: 'Who owns the rights to the finished book?',
    a: 'You do, completely and permanently. Every project is covered by an NDA and a full rights-transfer agreement signed before writing begins. Your name goes on the cover; ours appears nowhere unless you want it to.',
  },
  {
    q: 'How much does it cost to hire an ebook writer?',
    a: 'Packages start at $699 for a focused 15,000-word guide and go up to $3,999 for a full-length authority book with launch support. Every quote is fixed up front — writing, editing, cover, and retailer-ready files are included in the package you choose.',
  },
  {
    q: 'How involved do I need to be?',
    a: 'Short and standard nonfiction projects often need only a few hours of author interviews and review — typically a discovery call, one or two voice-matching interviews, and chapter feedback. Memoirs and interview-intensive books can require substantially more involvement. We confirm that on the quote before work starts.',
  },
  {
    q: 'How long does a book actually take?',
    a: 'Standard package timelines apply to projects with a defined brief and typical interview load: about three weeks for a 15,000-word guide, five for ~30,000 words, and eight for ~50,000. Interview-heavy memoirs, technical books, or extensive original research may need a custom timeline — a full life-story memoir is often a much longer collaboration than a lead-magnet ebook. Elite’s 12-week band is a scoped ~100,000-word production path, not a 9–18 month memoir unless we quote that separately.',
  },
  {
    q: 'What happens if I do not like the draft?',
    a: 'You see a chapter outline and a sample chapter before the full manuscript is written, precisely so this does not happen. Every package includes revision rounds, and if the sample chapter misses your voice we rewrite it at no cost.',
  },
  {
    q: 'Do you help with publishing, or only the writing?',
    a: 'Both. We set up KDP and IngramSpark, research categories and keywords, prepare metadata and hand over every retailer-ready file. You keep the accounts and 100% of the royalties.',
  },
  {
    q: 'Can you write in a specific niche or technical field?',
    a: 'Yes. We match every project to a writer experienced in that area — finance, health, law, SaaS, memoir, and related nonfiction. If we do not have the right specialist, we will say so rather than guess.',
  },
  {
    q: 'Do you use AI to write the manuscript?',
    a: 'No — we do not deliver an unedited AI-generated book as ghostwriting. Your manuscript is written and revised by the assigned human writer, under studio editorial review. Ordinary tools may support research, outlining, or production admin; the published prose is authored for your voice.',
  },
  {
    q: 'Who writes my book — can I see the team?',
    a: 'After the NDA we introduce the assigned writer by name. We do not list a public roster because most titles are confidential ghostwriting. If we cannot staff your category, we say so rather than assign a generalist.',
  },
];

export const contactIntro = {
  pageTitle: 'Request a fixed writing quote.',
  eyebrow: 'Let’s bring your story to life',
  title: 'Talk to a book writing',
  titleEm: 'specialist.',
  lead:
    'Tell us what you want to write and who it is for. You will hear back within one working day with a clear answer on scope, price, and timing.',
  points: [
    'Free 30-minute discovery call',
    'NDA before you share anything',
    'Fixed quote, no hourly billing',
  ],
  pricingNote: 'Projects start from $699.',
  pricingCta: 'View complete pricing',
  pricingHref: '/pricing',
  photo: '/assets/brand/page-hero-contact.png',
  photoAlt: 'Emerald writing desk with sealed correspondence — book writing consultation',
  page: {
    howTitle: 'What to include in your note',
    howLead:
      'A useful brief is short. You do not need a finished outline — you need enough for us to say yes, no, or ask one clarifying question.',
    how: [
      'Who the book is for, and the job it has to do (authority, leads, a story told properly)',
      'Approximate length, or “not sure — recommend a package”',
      'Whether you need writing only, or writing plus editing, cover, and KDP setup',
      'A hard deadline if you have one, and what source material you already have',
    ],
    nextTitle: 'What happens after you send this',
    nextLead:
      'This page is for a quote, not a contract. We read the brief, check whether we can staff the category honestly, and reply with a fixed range or a clear no.',
    next: [
      'You hear back within one working day in most cases — typically 1–2 business days at the latest.',
      'If we are a fit, we book a 30-minute discovery call and send an NDA before you share source files.',
      'Rights transfer is written before manuscript work begins. You keep the retailer accounts and 100% of royalties.',
      'We will not guess at a niche we cannot staff. If we do not have the right specialist, we say so.',
    ],
    extra: [
      'Do not paste confidential manuscripts, client data, or unpublished research into the form. Save that for after the NDA.',
      'If you already know the package (Starter through Elite), mention it. If you do not, tell us the outcome you need and we will map length and timeline.',
    ],
  },
};

export const footerBrand = {
  blurb:
    'ebookwriters.us is a US book writing and ghostwriting studio helping authors write, edit, design, and publish books they are proud of.',
  ctaTitle: 'Start something',
  ctaCopy: 'Your first chapter is one conversation away.',
  ctaLabel: 'Start Your Project',
};

export const footerLinks = [
  {
    title: 'Services',
    links: [
      { label: 'Ebook Ghostwriting', href: '/ebook-ghostwriting-services' },
      { label: 'Hire an Ebook Writer', href: '/hire-ebook-writer' },
      { label: 'Amazon KDP Publishing', href: '/amazon-kdp-ebook-writing' },
      { label: 'Ebook Editing', href: '/ebook-editing-services' },
      { label: 'Ebook Cover Design', href: '/ebook-cover-design' },
      { label: 'All Services', href: '/services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Portfolio', href: '/portfolio' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Editorial policy', href: '/editorial-policy' },
      { label: 'Editorial desk', href: '/authors/editorial-desk' },
    ],
  },
];

/* --------------------------------------------------------------- hero copy */

export const hero = {
  /* Visible hero copy, set live over the text-free plates
     (hero-desk-plate.jpg / hero-mob-plate.jpg). The last line is the gold accent. */
  lines: ['Turn Your Ideas', 'Into a Published', 'Book.'],
  linesMobile: ['Turn Your Ideas', 'Into a', 'Published Book.'],
  leadVisible:
    'We help experts, entrepreneurs and aspiring authors bring their ideas to life through professional ebook writing, ghostwriting, editing, formatting and publishing support.',
  strip: ['Human writers', 'NDA protected', 'You keep the rights.'],
  /* SEO H1 — the visible headline above is aria-hidden; this is what is read and crawled */
  h1: 'Professional Ebook Writers & Ghostwriters — Publish Your Book with Confidence',
  lead: 'End-to-end ebook writing and publishing support — ghostwriting, editing, cover design, formatting, KDP publishing, and book marketing.',
  leadMobile:
    'We help experts, entrepreneurs, and aspiring authors publish through professional ebook writing, ghostwriting, editing, formatting, and KDP support.',
  kicker: 'Book writing & publishing studio',
  cta: 'Start Your Project',
  link: { label: 'Explore our services', href: '/services' },
  trust: ['Writer matched by subject', 'Fixed packages from $699', 'KDP & IngramSpark ready'],
  imageAlt: 'ebookwriters.us — professional ebook writers helping authors publish their books',
};

export const siteContact = {
  email: 'info@ebookwriters.us',
  phone: '+1 712-414-0542',
  phoneHref: 'tel:+17124140542',
  address: 'Iowa, USA',
};
