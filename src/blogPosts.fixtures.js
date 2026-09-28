/**
 * Unpublished preview used to check the v2 article template.
 * Wired only while `import.meta.env.DEV` is true — not seeded, not listed,
 * and not included in the production sitemap.
 */
export const fixturePosts = [
  {
    slug: 'fixture-v2-lean-article',
    title: 'Sample: A Lean Guide Opens With the Answer',
    description:
      'Preview of the v2 article template. This fixture is not a published guide.',
    date: '2026-09-28',
    dateLabel: 'September 28, 2026',
    readTime: '4 min read',
    category: 'Guides',
    eyebrow: 'Template preview',
    keywords: ['v2 article template'],
    author: 'Maya Chen',
    format: 'v2',
    lead:
      'Hire developmental editing before copyediting when chapters might still move. The opening paragraph is the answer, so this guide does not repeat it in a box.',
    cta: 'This stock label must not render',
    image: '/assets/brand/page-hero-blog.png',
    imageAlt: 'Notebook on a desk — v2 template preview',
    takeaways: [],
    sections: [
      {
        heading: 'What you decide first',
        paragraphs: [
          'If the middle of the draft still sags, a copyedit only polishes sentences you may later cut. Start with structure, then line edit, then proof.',
        ],
      },
      {
        heading: 'When you want a quote',
        paragraphs: [
          'Tell us the length, the reader, and the deadline. [Request a quote](/contact) and we will reply with one fixed package for this book.',
        ],
      },
    ],
  },
];
