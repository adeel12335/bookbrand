export const navigation = [
  { label: 'Why Us', href: '#why' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Blog', href: '/blog' },
];

export const services = [
  {
    n: '01', key: 'writing', title: 'Ebook & Book Ghostwriting',
    copy: 'Work with professional ghostwriters who bring your ideas to life in your voice — research, outline, and full manuscript.',
    points: ['Chapter-by-chapter outline', 'Original research', 'Two revision rounds'],
  },
  {
    n: '02', key: 'editing', title: 'Editing & Proofreading',
    copy: 'Refine your manuscript with expert editors for clarity, flow, and impact before it goes to press.',
    points: ['Developmental edit', 'Line & copy edit', 'Final proofread'],
  },
  {
    n: '03', key: 'formatting', title: 'Cover Design',
    copy: 'Market-ready covers that capture your story, fit your genre, and stand out on Amazon and bookstore shelves.',
    points: ['Custom cover design', 'Front, spine & back', 'Genre-matched art direction'],
  },
  {
    n: '04', key: 'publishing', title: 'Publishing & Formatting',
    copy: 'Print, ebook, and audiobook formatting with KDP and IngramSpark setup and retailer-ready files.',
    points: ['EPUB & print PDF', 'KDP & IngramSpark setup', 'Retailer-ready files'],
  },
  {
    n: '05', key: 'ghostwriting', title: 'ISBN & Copyright Support',
    copy: 'Secure your rights, set up publishing essentials, and protect your work properly from day one.',
    points: ['ISBN guidance', 'Copyright setup', 'Rights documentation'],
  },
  {
    n: '06', key: 'branding', title: 'Book Marketing',
    copy: 'Launch strategy, Amazon optimization, and author-platform support so the right readers find your book.',
    points: ['Launch messaging', 'Amazon optimization', 'Author brand visibility'],
  },
];

export const benefits = [
  {
    key: 'ownership',
    title: '100% Author Ownership',
    copy: 'You keep all rights to your work.',
  },
  {
    key: 'fees',
    title: 'No Hidden Fees',
    copy: 'Transparent pricing, always.',
  },
  {
    key: 'specialists',
    title: 'Named Genre Specialists',
    copy: 'Work with experts in your category.',
  },
  {
    key: 'time',
    title: 'Milestone Delivery',
    copy: 'Clear timelines and regular updates.',
  },
];

export const pathBand = {
  eyebrow: 'A clearer path to publishing',
  title: 'From outline to published book —',
  titleEm: 'a clear ghostwriting path.',
  lead:
    'From the first outline to retailer-ready files, our ebook writing studio maps every step so you always know what comes next — and who is doing the work.',
  cta: 'Talk to an Ebook Writing Specialist',
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
  linkLabel: 'Start your book project',
  linkHref: '/contact',
  image: '/assets/brand/portfolio-shelf-v2.png',
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
    image: '/assets/brand/publishing-craft-v2.png',
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
  { title: 'Higher Ground', author: 'Daniel Brooks', genre: 'Self-Development', image: '/assets/brand/portfolio-1.png' },
  { title: 'The Kindness Effect', author: 'Elena Martin', genre: 'Personal Growth', image: '/assets/brand/portfolio-2.png' },
  { title: 'Beyond the Stars', author: 'Marcus Hill', genre: 'Parenting', image: '/assets/brand/portfolio-3.png' },
  { title: 'The Second Chapter', author: 'Olivia Reese', genre: 'Memoir', image: '/assets/brand/portfolio-4.png' },
  { title: 'Wealth with Purpose', author: 'Jonathan Blake', genre: 'Business & Finance', image: '/assets/brand/portfolio-5.png' },
  { title: 'A Healthier You', author: 'Dr. Amanda Lewis', genre: 'Health & Wellness', image: '/assets/brand/portfolio-6.png' },
];

export const testimonialsIntro = {
  eyebrow: 'Author reviews',
  title: 'What authors say about our book writing service.',
};

export const testimonials = [
  {
    name: 'Sarah L.',
    role: 'Memoir Author',
    initials: 'SL',
    avatar: '/assets/brand/testimonial-melissa.png',
    quote:
      'Professional, supportive, and truly invested. Their ghostwriters matched my voice, and publishing finally felt clear instead of overwhelming.',
  },
  {
    name: 'Michael R.',
    role: 'Business Author',
    initials: 'MR',
    avatar: '/assets/brand/testimonial-daniel.png',
    quote:
      'An exceptional team from outline to KDP setup. My business book looks polished — and it is reaching readers worldwide.',
  },
  {
    name: 'Talia M.',
    role: 'Health & Wellness Author',
    initials: 'TM',
    avatar: '/assets/brand/testimonial-james.png',
    quote:
      'They brought my vision to life with care. Editing, cover design, and formatting exceeded what I expected from a book writing service.',
  },
];

export const pricingIntro = {
  eyebrow: 'Investment',
  title: 'Transparent book writing packages —',
  titleEm: '$699 to $3,999.',
  lead:
    'Ghostwriting packages with editing, cover design, and retailer-ready files included. No surprise invoices — choose the plan that matches your manuscript.',
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
    features: ['Senior genre writer', 'Three editorial passes', 'Cover, spine and back design', 'Print-ready interior', 'KDP and IngramSpark setup', 'Launch messaging kit', 'Unlimited revisions'],
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
    a: 'Roughly two to four hours in total. That is a discovery call, one or two voice-matching interviews, and reviewing each chapter as it lands. Everything else is on us.',
  },
  {
    q: 'How long does a book actually take?',
    a: 'A 15,000-word guide takes about three weeks, a 30,000-word book around five, and a full-length 50,000-word manuscript around eight. You get a dated schedule before we start and weekly drafts against it.',
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
];

export const contactIntro = {
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
  photoAlt: 'Author consultation — notebook and publishing notes on a warm desk',
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
      { label: 'Ebook & Book Ghostwriting', href: '#services' },
      { label: 'Editing & Proofreading', href: '#services' },
      { label: 'Cover Design', href: '#services' },
      { label: 'Publishing & Formatting', href: '#services' },
      { label: 'ISBN & Copyright Support', href: '#services' },
      { label: 'Book Marketing', href: '#services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Why Us', href: '#why' },
      { label: 'Selected Work', href: '#portfolio' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

/* --------------------------------------------------------------- hero copy */

export const hero = {
  lines: ['Turn Your Ideas', 'Into a Published', 'Book.'],
  linesMobile: ['Turn Your Ideas Into a', 'Published Book.'],
  /* SEO H1 — visible headline stays image-baked; this is crawlable */
  h1: 'Professional Ebook Writers & Ghostwriters — Publish Your Book with Confidence',
  lead: 'End-to-end ebook writing and publishing support — ghostwriting, editing, cover design, formatting, KDP publishing, and book marketing.',
  leadMobile:
    'We help experts, entrepreneurs, and aspiring authors publish through professional ebook writing, ghostwriting, editing, formatting, and KDP support.',
  kicker: 'Book writing & publishing studio',
  cta: 'Start Your Project',
  link: { label: 'Explore our services', href: '#services' },
  trust: ['100% author ownership', 'Fixed packages from $699', 'KDP & IngramSpark ready'],
  imageAlt: 'ebookwriters.us — professional ebook writers helping authors publish their books',
};

export const siteContact = {
  email: 'info@ebookwriterusa.com',
  phone: '+1 712-414-0542',
  phoneHref: 'tel:+17124140542',
  address: 'Tennessee, USA',
};
