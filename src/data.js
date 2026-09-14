export const navigation = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Why Us', href: '#why' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export const heroTrust = [
  { icon: 'book', title: 'Professional', sub: 'Writers' },
  { icon: 'writers', title: 'Publishing', sub: 'Expertise' },
  { icon: 'chart', title: 'Real Impact', sub: 'For Your Brand' },
];

export const platforms = [
  'Amazon KDP', 'Apple Books', 'Kobo Writing Life', 'Barnes & Noble Press',
  'Google Play Books', 'IngramSpark', 'Draft2Digital', 'Smashwords',
];

export const stats = [
  { value: 850, suffix: '+', label: 'Books delivered', note: 'Across 30+ genres' },
  { value: 98, suffix: '%', label: 'Client satisfaction', note: 'Based on 2024–25 reviews' },
  { value: 40, suffix: '+', label: 'Specialist writers', note: 'Vetted, in-house team' },
  { value: 12, suffix: ' yrs', label: 'In publishing', note: 'Since 2013' },
];

export const services = [
  {
    n: '01', key: 'writing', title: 'eBook Writing',
    copy: 'From a blank page to a finished manuscript. We shape your idea into a structured, readable book your audience will actually finish.',
    points: ['Chapter-by-chapter outline', 'Original research', 'Two revision rounds'],
  },
  {
    n: '02', key: 'ghostwriting', title: 'Ghostwriting',
    copy: 'Your vision, your voice, our words. You keep full authorship and every right — we simply do the writing.',
    points: ['Voice-matching interviews', '100% confidential', 'Full rights transfer'],
  },
  {
    n: '03', key: 'editing', title: 'Editing & Proofreading',
    copy: 'A careful second pair of eyes. Developmental, line and copy editing that sharpens clarity without flattening your voice.',
    points: ['Developmental edit', 'Line & copy edit', 'Final proofread'],
  },
  {
    n: '04', key: 'formatting', title: 'Formatting & Design',
    copy: 'Beautiful, reader-friendly interiors built to every retailer spec, plus a cover that earns the click.',
    points: ['EPUB, MOBI & print PDF', 'Custom cover design', 'Retailer-ready files'],
  },
  {
    n: '05', key: 'publishing', title: 'Publishing Support',
    copy: 'We handle the fiddly parts — metadata, categories, keywords, pricing — and get your book live on the right shelves.',
    points: ['KDP & IngramSpark setup', 'Category & keyword research', 'ISBN guidance'],
  },
  {
    n: '06', key: 'branding', title: 'Author Branding',
    copy: 'A book is a beginning. We help you build the author platform that turns readers into clients and clients into advocates.',
    points: ['Author bio & website copy', 'Launch messaging', 'Lead-magnet strategy'],
  },
];

export const steps = [
  { n: '01', title: 'Share Your Idea', copy: 'A free discovery call. We listen to your idea, your audience and what you want the book to do for you.' },
  { n: '02', title: 'Plan & Outline', copy: 'You receive a full chapter outline and a sample chapter before a single word of the manuscript is written.' },
  { n: '03', title: 'Write & Refine', copy: 'Your dedicated writer drafts chapter by chapter. You review as we go, so nothing is a surprise at the end.' },
  { n: '04', title: 'Design & Publish', copy: 'Editing, cover, formatting and retailer setup. We hand you a finished book and every file that goes with it.' },
];

export const values = [
  { key: 'writers', title: 'Experienced Writers', copy: 'Every project is matched to a writer who has already published in your genre. Never a generalist, never an algorithm.' },
  { key: 'quality', title: 'Publishing Quality', copy: 'Three editorial passes, a professional cover and retailer-spec files as standard. The book reads like a book, not a document.' },
  { key: 'confidential', title: 'Confidential Process', copy: 'NDA-backed from the first call. Your name stays on the cover and your idea never leaves the team.' },
  { key: 'fast', title: 'Fast Turnaround', copy: 'A 20,000-word eBook in about four weeks, with weekly drafts so you always know exactly where the project stands.' },
];

export const books = [
  { title: 'The Leadership Code', genre: 'Business & Leadership', image: '/assets/brand/cover-leadership.jpg', note: 'No.1 New Release in Business Mentoring' },
  { title: 'The Wealth Blueprint', genre: 'Personal Finance', image: '/assets/brand/cover-wealth.jpg', note: '40,000 copies in the first year' },
  { title: 'A Brighter Story', genre: 'Memoir & Non-fiction', image: '/assets/brand/cover-brighter.jpg', note: 'Translated into four languages' },
];

export const testimonials = [
  {
    name: 'Daniel Whitmore', role: 'Founder, Northgate Advisory', initials: 'DW',
    avatar: '/assets/brand/testimonial-daniel.png',
    quote: 'I had eleven years of material and no idea how to shape it. They built the outline in a week and the finished book reads exactly the way I talk. It has become the best lead source in the business.',
  },
  {
    name: 'Melissa Reyes', role: 'Executive Coach and Speaker', initials: 'MR',
    avatar: '/assets/brand/testimonial-melissa.png',
    quote: 'What impressed me was the discipline. A draft chapter every Friday, honest feedback when an idea was not working, and a cover that finally looked like the brand I had built. No chasing, no surprises.',
  },
  {
    name: 'James Okonkwo', role: 'Author, The Quiet Advantage', initials: 'JO',
    avatar: '/assets/brand/testimonial-james.png',
    quote: 'They took a messy eighty-page document and turned it into something I am genuinely proud to hand a client. The publishing side alone saved me weeks of guessing at retailer settings.',
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
      { label: 'Our Process', href: '#process' },
      { label: 'Why Choose Us', href: '#why' },
      { label: 'Portfolio', href: '#portfolio' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact', href: '#contact' },
    ],
  },
];
