export const navigation = [
  { label: 'Why Us', href: '#why' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export const services = [
  {
    n: '01', key: 'writing', title: 'Book Writing',
    copy: 'Work with professional ghostwriters who bring your ideas to life in your voice.',
    points: ['Chapter-by-chapter outline', 'Original research', 'Two revision rounds'],
  },
  {
    n: '02', key: 'editing', title: 'Editing & Proofreading',
    copy: 'Refine your manuscript with expert editors for clarity, flow, and impact.',
    points: ['Developmental edit', 'Line & copy edit', 'Final proofread'],
  },
  {
    n: '03', key: 'formatting', title: 'Cover Design',
    copy: 'Stunning, market-ready covers that capture your story and attract readers.',
    points: ['Custom cover design', 'Front, spine & back', 'Genre-matched art direction'],
  },
  {
    n: '04', key: 'publishing', title: 'Publishing & Formatting',
    copy: 'Professional print, ebook, and audiobook formatting with platform-ready files.',
    points: ['EPUB & print PDF', 'KDP & IngramSpark setup', 'Retailer-ready files'],
  },
  {
    n: '05', key: 'ghostwriting', title: 'ISBN & Copyright Support',
    copy: 'Secure your rights, set up publishing essentials, and protect your work properly.',
    points: ['ISBN guidance', 'Copyright setup', 'Rights documentation'],
  },
  {
    n: '06', key: 'branding', title: 'Book Marketing',
    copy: 'Launch strategy, author platform support, and audience-building promotion plans.',
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
  title: 'Publishing your book shouldn\'t feel',
  titleEm: 'confusing.',
  lead:
    'From the first outline to retailer-ready files, we map every step so you always know what comes next — and who is doing the work.',
  cta: 'Talk to a Publishing Specialist',
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
  title: 'Books we’ve helped bring to life.',
  meta: '850+ books delivered across 20+ genres.',
  linkLabel: 'View the portfolio',
  linkHref: '#contact',
  image: '/assets/brand/portfolio-shelf-v2.png',
  imageAlt: 'Six professionally designed books displayed on a warm stone shelf',
};

export const servicesIntro = {
  eyebrow: 'Our services',
  title: 'Everything your book needs,',
  titleEm: 'under one roof.',
  lead: 'Writing, editing, design, and launch support — coordinated by one studio so nothing falls between freelancers.',
};

export const dualOffer = {
  intro: {
    eyebrow: 'What we do',
    title: 'Two disciplines,',
    titleEm: 'one published book.',
    lead:
      'Every title we take on moves through both halves of the studio — a production desk that makes the book, and a launch desk that makes sure readers find it.',
    note: 'Both desks are included in every full-service plan.',
  },
  stage: {
    image: '/assets/brand/publishing-craft-v2.png',
    imageAlt: '',
  },
  publish: {
    index: '01',
    tag: 'Production desk',
    title: 'Publish with confidence.',
    lead:
      'From final manuscript to global distribution, we handle the details so you can focus on what you do best — your writing.',
    checklist: [
      'Print, ebook & hardcover',
      'Metadata & platform setup',
      'Global distribution support',
    ],
    cta: 'Plan your publication',
    href: '#contact',
    caption: 'Fig. 01 — A higher standard for bolder stories',
  },
  market: {
    index: '02',
    tag: 'Launch desk',
    title: 'Reach readers who need your story.',
    lead:
      'Strategic marketing to help your book stand out, build your audience, and create lasting impact beyond launch day.',
    checklist: [
      'Launch positioning',
      'Author platform strategy',
      'Visibility-focused campaigns',
    ],
    cta: 'Build your launch plan',
    href: '#contact',
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
  eyebrow: 'Authors',
  title: 'What authors say.',
};

export const testimonials = [
  {
    name: 'Sarah L.',
    role: 'Memoir Author',
    initials: 'SL',
    avatar: '/assets/brand/testimonial-melissa.png',
    quote:
      'Professional, supportive, and truly invested in my success. They made publishing feel effortless.',
  },
  {
    name: 'Michael R.',
    role: 'Business Author',
    initials: 'MR',
    avatar: '/assets/brand/testimonial-daniel.png',
    quote:
      'An exceptional team from start to finish. My book looks beautiful — and it’s reaching readers worldwide.',
  },
  {
    name: 'Talia M.',
    role: 'Health & Wellness Author',
    initials: 'TM',
    avatar: '/assets/brand/testimonial-james.png',
    quote:
      'They brought my vision to life with care. I always felt heard, and the results exceeded expectations.',
  },
];

export const plans = [
  {
    name: 'Starter', price: '699', words: 'Up to 15,000 words', timeline: '3 weeks',
    copy: 'A focused lead magnet or short guide.',
    features: ['Professional writing', 'One editorial pass', 'Standard cover design', 'EPUB and PDF files', '2 revision rounds'],
  },
  {
    name: 'Professional', price: '1,499', words: 'Up to 30,000 words', timeline: '5 weeks', featured: true,
    copy: 'The full book most authors come to us for.',
    features: ['In-depth research and outline', 'Two editorial passes', 'Custom cover design', 'All retailer formats', 'KDP publishing setup', '3 revision rounds'],
  },
  {
    name: 'Premium', price: '2,499', words: 'Up to 50,000 words', timeline: '8 weeks',
    copy: 'A full-length book with a launch behind it.',
    features: ['Senior genre writer', 'Three editorial passes', 'Cover, spine and back design', 'Print-ready interior', 'KDP and IngramSpark setup', 'Launch messaging kit', 'Unlimited revisions'],
  },
  {
    name: 'Elite', price: '3,999', words: 'Up to 100,000 words', timeline: '12 weeks',
    copy: 'Authority publishing, handled end to end.',
    features: ['Dedicated editorial team', 'Full developmental edit', 'Premium cover and interior', 'Hardcover-ready files', 'Global distribution setup', 'Author brand and website copy', 'Priority scheduling'],
  },
];

export const faqs = [
  {
    q: 'Who owns the rights to the finished book?',
    a: 'You do, completely and permanently. Every project is covered by an NDA and a full rights-transfer agreement signed before writing begins. Your name goes on the cover; ours appears nowhere unless you want it to.',
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
    a: 'Yes. We match every project to a writer who has already published in that area: finance, health, law, SaaS, memoir and around thirty other categories. If we do not have the right specialist, we will say so rather than guess.',
  },
];

export const footerLinks = [
  {
    title: 'Services',
    links: [
      { label: 'eBook Writing', href: '#services' },
      { label: 'Ghostwriting', href: '#services' },
      { label: 'Editing & Proofreading', href: '#services' },
      { label: 'Formatting & Design', href: '#services' },
      { label: 'Publishing Support', href: '#services' },
      { label: 'Author Branding', href: '#services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Why Us', href: '#why' },
      { label: 'Selected Work', href: '#portfolio' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact', href: '#contact' },
    ],
  },
];

/* --------------------------------------------------------------- hero copy */

export const hero = {
  lines: ['Turn Your Ideas', 'Into a Published', 'Book.'],
  /* Mobile reference: two-line headline, gold on the full second line */
  linesMobile: ['Turn Your Ideas Into a', 'Published Book.'],
  lead: 'End-to-end publishing support that turns your manuscript into a polished, publication-ready book — writing, editing, cover design, formatting, publishing, and book marketing.',
  leadMobile:
    'We help experts, entrepreneurs and aspiring authors bring their ideas to life through professional ebook writing, ghostwriting, editing, formatting and publishing support.',
  kicker: 'Book publishing studio',
  cta: 'Start Your Project',
  link: { label: 'Explore our services', href: '#services' },
  trust: ['1,000+ authors', '4.9/5 satisfaction', '100% ownership'],
};

export const siteContact = {
  email: 'marketing@ebookwriterusa.com',
  phone: '+1 307-219-9122',
  phoneHref: 'tel:+13072199122',
  address: '545 Brandon Road, Conroe, TX 77302 USA',
};
