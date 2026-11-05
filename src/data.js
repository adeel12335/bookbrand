export const navigation = [
  {
    label: 'About',
    href: '/about',
    match: ['/about', '/team'],
    children: [
      { label: 'About us', href: '/about' },
      { label: 'Our team', href: '/team' },
    ],
  },
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
    copy: 'A writer is matched to what you want to write, interviews you, and then writes the entire manuscript in your voice. You approve the outline and a sample chapter first.',
    points: ['Chapter-by-chapter outline', 'Sample chapter before the full draft', 'Revision rounds in every package'],
    href: '/ebook-ghostwriting-services',
  },
  {
    n: '02', key: 'editing', title: 'Editing & Proofreading',
    copy: 'Developmental, line, and copy editing, along with a final proofread. We read some sample pages before we quote, so your quote matches your draft.',
    points: ['Developmental edit', 'Line & copy edit', 'Final proofread'],
    href: '/ebook-editing-services',
  },
  {
    n: '03', key: 'formatting', title: 'Cover Design',
    copy: 'A cover designed for your genre, one that still reads clearly as a small Amazon thumbnail. Print packages include the spine and back cover.',
    points: ['Custom cover design', 'Front, spine & back', 'Genre-matched art direction'],
    href: '/ebook-cover-design',
  },
  {
    n: '04', key: 'publishing', title: 'Publishing & Formatting',
    copy: 'EPUB and PDF in all packages, print-ready page layouts from Premium up, and Amazon KDP and IngramSpark setup on your own accounts.',
    points: ['EPUB & print PDF', 'KDP & IngramSpark setup', 'Retailer-ready files'],
    href: '/amazon-kdp-ebook-writing',
  },
  {
    n: '05', key: 'ghostwriting', title: 'ISBN & Copyright Support',
    copy: 'While we prepare your files, we guide you through ISBNs and U.S. copyright registration. The copyright stays in your name, and so does the ISBN.',
    points: ['ISBN guidance', 'Copyright registration guidance', 'Rights stay in your name'],
    href: '/services',
  },
  {
    n: '06', key: 'branding', title: 'Book Marketing',
    copy: 'A launch messaging kit is included in the Premium package, and Elite adds author brand and website copy. Ask us about marketing help with other packages.',
    points: ['Launch messaging kit', 'KDP categories and keywords', 'Author brand and website copy'],
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
      ['Writing', 'Yes, one person', 'Genre-matched writer'],
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
      ['Speed to market', 'When files are ready', 'Often 12-24 months after a deal'],
      ['Royalties', 'You keep 100% of KDP royalties we set up', 'Shared with the publisher'],
      ['Control', 'Title, price, files, and updates stay yours', 'Contract terms control cover and timing'],
      ['Fit', 'Experts, founders, and first-time ebook authors', 'When an agent and house are the goal'],
    ],
  },
};

export const portfolioIntro = {
  eyebrow: 'Recent covers',
  title: 'Book covers from our studio.',
  meta: "Memoir, nonfiction, fiction, self-help, and children's titles, each linked to its Amazon listing.",
  linkLabel: 'View full portfolio',
  linkHref: '/portfolio',
  image: '/assets/brand/portfolio-shelf-v2.webp',
  imageAlt: 'Six professionally designed books displayed on a warm stone shelf',
};

export const howItWorks = {
  eyebrow: 'How it works',
  title: 'How an ebook ghostwriting project runs',
  lead: 'Five steps and one fixed quote. A 15,000-word guide takes about three weeks, and a 50,000-word book about eight.',
  cta: 'Get a fixed quote',
  steps: [
    {
      title: 'Discovery call and NDA',
      copy: 'Provide the idea, the reader, and the deadline. An NDA is signed before you share any material, and a fixed quote is sent along with a dated schedule.',
    },
    {
      title: 'Interviews and outline',
      copy: 'One or two recorded interviews on a typical nonfiction book. You confirm a chapter-by-chapter outline before any writing begins.',
    },
    {
      title: 'Sample chapter',
      copy: 'Your writer writes one chapter in your voice. If it is off the mark, we rewrite it free of charge before the rest of the book is written.',
    },
    {
      title: 'Draft and revisions',
      copy: 'Chapters arrive according to the schedule. You review them as they come in, with the revision rounds in your package.',
    },
    {
      title: 'Editing, cover, and files',
      copy: 'Editorial passes, a cover, and EPUB and PDF files. Amazon KDP setup on your own account is available with the Professional and higher packages.',
    },
  ],
};

export const audiences = {
  eyebrow: 'Who we write for',
  title: 'Ebook ghostwriting for experts, coaches, and businesses',
  items: [
    {
      title: 'Coaches and consultants',
      copy: 'Turn your method into a lead magnet, a course companion, or an authority book.',
      href: '/ebook-ghostwriter-for-coaches',
      linkLabel: 'Ebooks for coaches',
    },
    {
      title: 'Small businesses',
      copy: 'A short guide that earns email sign-ups and starts sales conversations.',
      href: '/lead-magnet-ebook-writing',
      linkLabel: 'Lead magnet ebooks',
    },
    {
      title: 'Experts and founders',
      copy: 'A nonfiction book in your field, written by someone who has covered it before.',
      href: '/hire-ebook-writer',
      linkLabel: 'Hire an ebook writer',
    },
    {
      title: 'Memoir',
      copy: 'Your life story, written from recorded interviews and kept under NDA.',
      href: '/ebook-ghostwriting-services',
      linkLabel: 'Ebook ghostwriting',
    },
  ],
};

export const homeFaqs = {
  eyebrow: 'Questions',
  title: 'Ebook ghostwriting questions',
  lead: 'Straight answers on price, timing, ownership, AI, and Amazon KDP.',
  more: 'Still have a question? Email us and you will hear back within one working day.',
  items: [
    {
      q: 'What is the price of an ebook ghost writer?',
      a: 'Our fixed packages run from $699 for up to 15,000 words to $3,999 for up to 100,000 words. All packages come with editing, a cover, and EPUB and PDF files.',
    },
    {
      q: 'How long does it take to ghost write an ebook?',
      a: 'Three weeks for a 15,000-word guide, five weeks for a 30,000-word guide, eight weeks for a 50,000-word book, and up to twelve weeks for a 100,000-word book, once the brief is agreed.',
    },
    {
      q: "Who is the ebook's owner?",
      a: 'You are. The rights transfer to you before writing begins, your name is on the cover, and you keep 100% of the royalties and your retailer accounts.',
    },
    {
      q: 'Is the book written with the help of AI?',
      a: 'No. A human writer writes your manuscript and a human editor reviews it. Regular tools might be useful for research or admin, but not for the prose you publish.',
    },
    {
      q: 'Can you publish my ebook on Amazon KDP?',
      a: 'Yes. Amazon KDP setup is included in the Professional and higher packages. The book is on your own account, and Amazon pays the royalties to you.',
    },
  ],
};

export const servicesIntro = {
  eyebrow: 'Our services',
  title: 'Ebook writing, editing, design',
  titleEm: '& publishing services.',
  lead: 'Writing, editing, cover, and publishing files are quoted together, so you are not managing four freelancers.',
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
    seoTitle: 'Under the Dragon\'s Wings: Nonfiction Book Cover',
    seoDescription: 'Nonfiction book cover design for Under the Dragon\'s Wings by William Capers, an education exposé on special education and Black boys, built for Amazon.',
    coverAlt: 'Under the Dragon\'s Wings by William Capers, nonfiction book cover with a school building and a boy with his head on a desk',
    published: 'September 25, 2025',
    pages: '312 pages',
    publisher: 'Independently published',
    category: 'Education, Parent Participation',
    sections: [
      {
        heading: 'About the book',
        paragraphs: [
          'Under the Dragon\'s Wings: The Profit-Driven Trap That Chains Black Boys is an education exposé by William Capers, M.Ed. in Special Education. It argues that special education labels, zero-tolerance discipline, and over-diagnosis work together as an industry that profits from Black boys, and it closes with a blueprint for parents and educators.',
          'The paperback runs 312 pages and was published in September 2025. On Amazon it is shelved under Education & Teaching and Parent Participation.',
        ],
      },
      {
        heading: 'A nonfiction book cover that states the argument',
        paragraphs: [
          'The title is a metaphor, so the subtitle has to land the argument in plain words. The cover sets "Under the Dragon\'s Wings" in large orange and white capitals, then "The Profit-Driven Trap That Chains Black Boys" directly beneath it, so a shopper reads the claim in one glance.',
          'The image does the rest: a large school building and a boy with his head down on a desk. The author line carries his credential, M.Ed. Special Education, because authority matters on a book that challenges a system.',
        ],
      },
      {
        heading: 'Part of a three-book series look',
        paragraphs: [
          'This is one of three William Capers titles in our portfolio, alongside [The Porch](/portfolio/the-porch) and [The Bond They Fear](/portfolio/the-bond-they-fear). All three share condensed capitals, a red, orange, and white palette, and the same author block, so readers can tell they belong together on an Amazon author page.',
          'Planning a series of your own? Our [ebook cover design](/ebook-cover-design) service builds a cover system you can reuse for every title.',
        ],
      },
    ],
    faqs: [
      {
        q: 'What is Under the Dragon\'s Wings about?',
        a: 'It is an exposé by educator William Capers on how special education labels, zero-tolerance policies, and over-diagnosis are used against Black boys in schools, with a blueprint for change.',
      },
      {
        q: 'How do you design a cover for a nonfiction exposé?',
        a: 'Lead with the claim. A clear subtitle that states the argument, a direct image of the subject, and the author credential do more for a serious nonfiction book than abstract art.',
      },
      {
        q: 'Who designed the Under the Dragon\'s Wings cover?',
        a: 'The cover was designed by the ebookwriters.us studio for author William Capers. It is part of our published cover portfolio.',
      },
    ],
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
    detail: '"The Porch" is short enough to dominate a thumbnail. The subtitle is the part that tells a serious reader what kind of book this is, so the type hierarchy puts the title first and the blueprint language second. The author line stays quiet so the idea, not a logo, leads the listing.',
    seoTitle: 'The Porch: Nonfiction Book Cover Design',
    seoDescription: 'Nonfiction book cover design for The Porch by William Capers, a blueprint for community and Black sovereignty, with a warm porch scene built for Amazon.',
    coverAlt: 'The Porch by William Capers, nonfiction book cover with a warmly lit porch and rocking chairs',
    published: 'December 13, 2025',
    pages: '348 pages',
    publisher: 'Independently published',
    category: 'Education, Parent Participation',
    sections: [
      {
        heading: 'About the book',
        paragraphs: [
          'The Porch: Memory, Mission, and the Blueprint for Black Sovereignty is a practical nonfiction book by William Capers. It treats the front porch as a model for community life and lays out playbooks: porch hours, story circles, homework clinics, apprenticeships, and neighborhood health nights.',
          'The paperback runs 348 pages and was published in December 2025, the third of his titles in our portfolio.',
        ],
      },
      {
        heading: 'A warm image for a practical book',
        paragraphs: [
          'The book is about memory turned into action, so the cover uses a warm, lit porch with empty rocking chairs instead of a protest image. It invites the reader in.',
          '"The Porch" is short, so it is set very large in red with "The" above it, and the subtitle sits in white capitals underneath. The top line, "Author of The Bond They Fear," tells returning readers this comes from the same author.',
        ],
      },
      {
        heading: 'Series design across three covers',
        paragraphs: [
          'The Porch shares its type, palette, and author block with [Under the Dragon\'s Wings](/portfolio/under-the-dragons-wings) and [The Bond They Fear](/portfolio/the-bond-they-fear). A consistent series look helps every new title borrow attention from the last one.',
          'Our [ebook cover design](/ebook-cover-design) service can set up the same kind of system for an author with more than one book.',
        ],
      },
    ],
    faqs: [
      {
        q: 'What is The Porch about?',
        a: 'It is William Capers\' blueprint for rebuilding community, using the porch as a model, with practical programs for families, young people, and elders.',
      },
      {
        q: 'Why put "Author of" on a book cover?',
        a: 'It links a new title to a book readers may already know. For an author with a series, it is one of the simplest ways to carry readers from one book to the next.',
      },
      {
        q: 'Who designed The Porch cover?',
        a: 'The cover was designed by the ebookwriters.us studio for author William Capers. It is part of our published cover portfolio.',
      },
    ],
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
    seoTitle: 'The Bond They Fear: Nonfiction Book Cover Design',
    seoDescription: 'Nonfiction book cover design for The Bond They Fear by William Capers, a book on mentorship between Black men and boys, with a long subtitle that stays readable.',
    coverAlt: 'The Bond They Fear by William Capers, nonfiction book cover with two silhouetted figures in a bright doorway',
    published: 'October 14, 2025',
    pages: '199 pages',
    publisher: 'Independently published',
    category: 'Education, Parent Participation',
    sections: [
      {
        heading: 'About the book',
        paragraphs: [
          'The Bond They Fear: Why Empowered Bonds Between Black Men and Black Males Undermine Systemic Control is by William Capers, M.Ed., a school security officer and special education advocate. Drawing on more than a decade in school hallways, it examines how mentorship between Black men and boys is treated with suspicion inside schools.',
          'The paperback runs 199 pages and was published in October 2025.',
        ],
      },
      {
        heading: 'Two figures in a doorway',
        paragraphs: [
          'The book is about one relationship, so the cover shows exactly that: two figures side by side, silhouetted against a bright doorway in a cracked wall. It reads at thumbnail size because there is only one idea in the frame.',
          'The title splits across two lines in white and red capitals. The long subtitle wraps under it in a smaller size, so it never competes with the title on an Amazon search page.',
        ],
      },
      {
        heading: 'Designing for a long subtitle',
        paragraphs: [
          'Long nonfiction subtitles help search and set expectations, but they can crowd a small cover. The answer is hierarchy: a short, large title, then the subtitle set narrow and tight, then the author line at the foot.',
          'See the rest of the series: [Under the Dragon\'s Wings](/portfolio/under-the-dragons-wings) and [The Porch](/portfolio/the-porch).',
        ],
      },
    ],
    faqs: [
      {
        q: 'What is The Bond They Fear about?',
        a: 'It looks at why mentoring relationships between Black men and Black boys are viewed with suspicion in schools, and what that costs young people.',
      },
      {
        q: 'How do you fit a long subtitle on a book cover?',
        a: 'Keep the main title short and large, set the subtitle smaller and narrower beneath it, and keep the image simple so nothing fights the text at thumbnail size.',
      },
      {
        q: 'Who designed The Bond They Fear cover?',
        a: 'The cover was designed by the ebookwriters.us studio for author William Capers. It is part of our published cover portfolio.',
      },
    ],
  },
  {
    slug: 'not-fine',
    title: 'Not Fine',
    author: 'Evelyn Truex',
    genre: 'Fiction',
    format: 'Kindle',
    role: 'Cover design',
    image: '/assets/brand/covers/not-fine.jpg',
    amazonUrl: 'https://www.amazon.com/dp/B0FSN4CPHL/',
    summary: 'A stark Kindle cover for a literary novel about a doctor, a patient, and lung cancer: black field, a crossed-out "not," and a single white ribbon.',
    detail: 'The title is the design. "NOT" is struck through in a thin magenta bar so the words "FINE" still read first, and the contradiction lands a second later. A white awareness ribbon sits alone under the type, with the author name in small caps at the foot. Nothing else is on the jacket, which is what makes the thumbnail hold together on a phone.',
    seoTitle: 'Not Fine: Literary Fiction Book Cover Design',
    seoDescription: 'Minimalist literary fiction book cover for Not Fine by Evelyn Truex, a novel about a doctor, a farmer with lung cancer, and grief. Designed to read on Kindle.',
    coverAlt: 'Not Fine by Evelyn Truex, minimalist black book cover with the word not crossed out and a white ribbon',
    published: 'December 17, 2025',
    pages: '335 pages',
    category: 'Literary Fiction, Women\'s Fiction',
    sections: [
      {
        heading: 'About the book',
        paragraphs: [
          'Not Fine is a novel by Evelyn Truex. Dr. Charlie Hope Moore fights a health insurance company to get lung cancer care for Frank, a farmer in Oklahoma, while her own life is upended. The story deals with gaslighting, grief, and imposter syndrome.',
          'The Kindle edition runs 335 pages and was published in December 2025. On Amazon it is listed under Literary Fiction and Contemporary Women\'s Fiction.',
        ],
      },
      {
        heading: 'A minimalist cover for literary fiction',
        paragraphs: [
          'The title is the design. "NOT" is struck through with a thin magenta bar, so "FINE" reads first and the contradiction lands a second later. That is the whole novel in two words: people saying they are fine when they are not.',
          'A single white ribbon, the awareness ribbon for lung cancer, sits alone under the type, with the author name in small caps at the foot. Nothing else is on the cover.',
        ],
      },
      {
        heading: 'Why minimal works on Kindle',
        paragraphs: [
          'Literary fiction competes on mood, not plot summary. A black field and two words stand out in a grid of busy covers, and they still read clearly on a phone at the size of a stamp.',
          'Our [ebook cover design](/ebook-cover-design) service tests every concept at thumbnail size before it goes further.',
        ],
      },
    ],
    faqs: [
      {
        q: 'What is Not Fine by Evelyn Truex about?',
        a: 'It follows Dr. Charlie Hope Moore as she fights an insurer to treat a farmer with lung cancer while her own life falls apart, dealing with gaslighting, grief, and imposter syndrome.',
      },
      {
        q: 'What does the white ribbon on the cover mean?',
        a: 'A white ribbon is used for lung cancer awareness. On this cover it points to the patient\'s illness at the center of the story without showing anything medical.',
      },
      {
        q: 'Who designed the Not Fine cover?',
        a: 'The cover was designed by the ebookwriters.us studio for author Evelyn Truex. It is part of our published cover portfolio.',
      },
    ],
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
    detail: 'The book is a first-person journey, not a travel guide. The cover leads with the outburst of the title, quitting, then going to live in a mountain refuge, and lets the Alpine subtitle explain the setting. It is designed for an Italian paperback listing, where the title has to survive both the grid thumbnail and the full product page.',
    seoTitle: 'Mollo Tutto: Illustrated Memoir Book Cover',
    seoDescription: 'Illustrated memoir book cover for Mollo Tutto! E Vado a Vivere in Rifugio by Luca Daisei Hiroki, an Italian story of leaving the city for an Alpine refuge.',
    coverAlt: 'Mollo Tutto! E Vado a Vivere in Rifugio by Luca Daisei Hiroki, illustrated cover with a couple in front of a mountain cabin',
    published: 'July 12, 2024',
    pages: '112 pages',
    publisher: 'Independently published',
    category: 'Essays & Memoir, Italian edition',
    sections: [
      {
        heading: 'About the book',
        paragraphs: [
          'Mollo Tutto! E Vado a Vivere in Rifugio (roughly, "I\'m quitting everything to live in a mountain refuge") is a first-person memoir by Luca Daisei Hiroki about leaving city life for an Alpine refuge: chopping wood, cooking over fire, and learning to live simply.',
          'The Italian paperback runs 112 pages and was published in July 2024.',
        ],
      },
      {
        heading: 'An illustrated memoir cover',
        paragraphs: [
          'The title is a decision, said out loud, so it runs across the top in large red capitals. Below it, a bright illustration shows a couple in front of a stone cabin with mountains and a wood pile, which tells the reader the setting before they read the subtitle.',
          'The subtitle, "Trasforma la tua vita," sits in small red type on white at the foot. The white space keeps the cover light, which fits a hopeful story rather than a survival guide.',
        ],
      },
      {
        heading: 'Designing for Italian readers on Amazon',
        paragraphs: [
          'Long Italian titles are common on Amazon.it. The cover keeps the full title readable by stacking it over three lines and leaving the illustration uncluttered.',
          'This is one of six covers we designed for Luca Daisei Hiroki, alongside [Zen per Principianti](/portfolio/zen-per-principianti) and [Modern Samurai](/portfolio/modern-samurai).',
        ],
      },
    ],
    faqs: [
      {
        q: 'What is Mollo Tutto about?',
        a: 'It is Luca Daisei Hiroki\'s true story of leaving the city to live in an Alpine refuge, and what he learned about change, simplicity, and nature.',
      },
      {
        q: 'Do you design covers for books in Italian?',
        a: 'Yes. Six of the covers in our portfolio are Italian titles. We work from the text you provide and check every line of type with you before files are final.',
      },
      {
        q: 'Who designed the Mollo Tutto cover?',
        a: 'The cover was designed by the ebookwriters.us studio for author Luca Daisei Hiroki. It is part of our published cover portfolio.',
      },
    ],
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
    detail: 'The Italian title is the category signal: Zen, for beginners. The subtitle promises a practical anti-stress path, so the jacket keeps the title large and the "start here" language secondary. Paperback format, aimed at readers who will judge the book from the Amazon thumbnail before they read a word of the description.',
    seoTitle: 'Zen per Principianti: Self-Help Book Cover',
    seoDescription: 'Illustrated self-help book cover for Zen per Principianti by Luca Daisei Hiroki, an Italian step-by-step guide to Zen and stress relief for beginners.',
    coverAlt: 'Zen per Principianti by Luca Daisei Hiroki, illustrated cover with a meditating woman in a colorful kimono',
    published: 'March 10, 2024',
    pages: '136 pages',
    publisher: 'Independently published',
    category: 'Self-help, Italian edition',
    sections: [
      {
        heading: 'About the book',
        paragraphs: [
          'Zen per Principianti is a practical guide to Zen for beginners by Luca Daisei Hiroki, written in Italian. It teaches basic techniques step by step, uses breathing to reduce stress, and shows how to bring mindfulness into daily life.',
          'The paperback runs 136 pages and was published in March 2024.',
        ],
      },
      {
        heading: 'A calm cover for a practical guide',
        paragraphs: [
          'The title is the category signal, so "ZEN" is set huge in magenta, with "per principianti" beneath it. A reader knows in a second that this is a beginner\'s book.',
          'The illustration is a woman meditating in a watercolor kimono under a conical hat, on soft pastel washes. It looks calm without looking like a dense philosophy text.',
        ],
      },
      {
        heading: 'The start of a series system',
        paragraphs: [
          'This cover set the pattern for the series: a pastel illustrated character in a conical hat, centered, with bold sans-serif type above. [Il Cane Zen](/portfolio/il-cane-zen) and [Il Gatto Zen](/portfolio/il-gatto-zen) reuse it with a dog and a cat.',
          'A series system like this is part of our [ebook cover design](/ebook-cover-design) service.',
        ],
      },
    ],
    faqs: [
      {
        q: 'What is Zen per Principianti about?',
        a: 'It is a beginner\'s guide to Zen in Italian, with step-by-step techniques, breathing exercises for stress, and ways to bring mindfulness into everyday life.',
      },
      {
        q: 'How do you make a self-help cover look calm but practical?',
        a: 'Use a soft palette and a single calm figure, then make the title large and plain so the reader still sees a practical, beginner-friendly book.',
      },
      {
        q: 'Who designed the Zen per Principianti cover?',
        a: 'The cover was designed by the ebookwriters.us studio for author Luca Daisei Hiroki. It is part of our published cover portfolio.',
      },
    ],
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
    detail: 'The subject is the relationship, not a breed guide. The title "Il Cane Zen" is short and ownable; the subtitle explains harmony, Japanese symbols, and daily life with a dog. The jacket is built so the title still reads when the cover is reduced to the size of a search result.',
    seoTitle: 'Il Cane Zen: Pet Book Cover Design',
    seoDescription: 'Illustrated pet book cover for Il Cane Zen by Luca Daisei Hiroki, an Italian guide to living in harmony with your dog through Zen ideas and meditation.',
    coverAlt: 'Il Cane Zen by Luca Daisei Hiroki, illustrated cover with a smiling dog meditating in a conical hat',
    published: 'February 9, 2024',
    pages: '166 pages',
    publisher: 'Independently published',
    category: 'Pets & Animal Care, Italian edition',
    sections: [
      {
        heading: 'About the book',
        paragraphs: [
          'Il Cane Zen is an Italian guide by Luca Daisei Hiroki to living in harmony with your dog. It brings Zen ideas into dog care: reading body language, gentle training, meditating with your dog, and keeping a calm home.',
          'The paperback runs 166 pages and was published in February 2024.',
        ],
      },
      {
        heading: 'A friendly pet book cover',
        paragraphs: [
          'The cover had to welcome dog owners without looking like a training manual. A smiling dog sits in meditation, paws together, wearing a conical hat, against a teal and pink sky.',
          '"IL CANE ZEN" is set in large white capitals across the top, so the title still reads when the cover shrinks to the size of a search result.',
        ],
      },
      {
        heading: 'One series, two animals',
        paragraphs: [
          'Il Cane Zen mirrors [Il Gatto Zen](/portfolio/il-gatto-zen): same pose, same hat, same type, a different animal and palette. Readers who bought one can spot the other immediately.',
          'The pattern started with [Zen per Principianti](/portfolio/zen-per-principianti).',
        ],
      },
    ],
    faqs: [
      {
        q: 'What is Il Cane Zen about?',
        a: 'It is an Italian guide to a calmer life with your dog, combining Zen ideas with communication, gentle training, and meditation you can do together.',
      },
      {
        q: 'How do you design covers for a book series?',
        a: 'Fix a few elements, such as the character pose, the type, and the layout, and change one thing per title, such as the animal or the color. Readers learn the series at a glance.',
      },
      {
        q: 'Who designed the Il Cane Zen cover?',
        a: 'The cover was designed by the ebookwriters.us studio for author Luca Daisei Hiroki. It is part of our published cover portfolio.',
      },
    ],
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
    detail: 'The promise is small and specific: three minutes a day, for a year. The cover puts "Diario Zen" first so the format is obvious, then uses the subtitle for the time span. Kindle listings crop tightly, so the title, the daily promise, and the author name are the only elements asked to survive that crop.',
    seoTitle: 'Diario Zen: Journal Cover Design',
    seoDescription: 'Journal cover design for Diario Zen by Luca Daisei Hiroki, a 12-month Italian Zen journal for mindfulness and calm in three minutes a day, built for Kindle.',
    coverAlt: 'Diario Zen by Luca Daisei Hiroki, journal cover with a red sun, a blossoming tree, and layered blue mountains',
    published: 'January 4, 2024',
    pages: '218 pages',
    category: 'Religion, Italian Kindle',
    sections: [
      {
        heading: 'About the book',
        paragraphs: [
          'Diario Zen is a 12-month guided journal by Luca Daisei Hiroki, written in Italian. Each month works on a different part of life with short Zen practices, quotes from Zen masters, and space for the reader\'s own notes, in about three minutes a day.',
          'The Kindle edition runs 218 pages and was published in January 2024.',
        ],
      },
      {
        heading: 'A journal cover that says "daily practice"',
        paragraphs: [
          'A journal has to look like something you return to, not read once. The cover uses a cream background, a red sun with the Japanese character for Zen, a single blossoming tree, and layered blue mountains, like the first page of a notebook.',
          '"DIARIO ZEN" is set in deep navy capitals at the top, with the promise underneath: twelve months, three minutes a day. The format is clear before the reader opens the listing.',
        ],
      },
      {
        heading: 'Different from the illustrated series',
        paragraphs: [
          'Unlike the character covers in the series, Diario Zen uses a quieter landscape, because it is a tool for the reader rather than a story or a guide.',
          'See the other covers for this author: [Il Gatto Zen](/portfolio/il-gatto-zen), [Modern Samurai](/portfolio/modern-samurai).',
        ],
      },
    ],
    faqs: [
      {
        q: 'What is Diario Zen?',
        a: 'It is an Italian guided journal with a year of short daily Zen practices, each month focused on a different part of life, meant to take about three minutes a day.',
      },
      {
        q: 'How should a journal cover differ from a book cover?',
        a: 'It should feel calm and reusable, show the format and time commitment clearly, and avoid looking like a one-time read.',
      },
      {
        q: 'Who designed the Diario Zen cover?',
        a: 'The cover was designed by the ebookwriters.us studio for author Luca Daisei Hiroki. It is part of our published cover portfolio.',
      },
    ],
  },
  {
    slug: 'il-gatto-zen',
    title: 'Il Gatto Zen',
    subtitle: "Relax, quiet the mind, and live with a cat's philosophy.",
    author: 'Luca Daisei Hiroki',
    genre: 'Lifestyle',
    format: 'Kindle',
    role: 'Cover design',
    image: '/assets/brand/covers/il-gatto-zen.jpg',
    amazonUrl: 'https://www.amazon.com/dp/B0CTJBC6ZT/',
    summary: 'A companion to the dog book, with its own subject: slowing down through the idea of a Zen cat.',
    detail: 'The series needs each cover to be recognizable and still distinct. "Il Gatto Zen" mirrors the dog title so returning readers know the shelf, while the illustration and subtitle belong to cats, meditation, and short Zen stories. The Kindle cover is composed for a tall thumbnail, with the title doing the selling.',
    seoTitle: 'Il Gatto Zen: Illustrated Book Cover',
    seoDescription: 'Illustrated book cover for Il Gatto Zen by Luca Daisei Hiroki, an Italian guide to slowing down and mindfulness through the calm of cats, built for Kindle.',
    coverAlt: 'Il Gatto Zen by Luca Daisei Hiroki, illustrated cover with a smiling cat meditating in a conical hat',
    published: 'January 29, 2024',
    pages: '108 pages',
    category: 'Personal Development, Italian Kindle',
    sections: [
      {
        heading: 'About the book',
        paragraphs: [
          'Il Gatto Zen is an Italian book by Luca Daisei Hiroki about slowing down and living in the present, using the calm of cats as the model. It mixes mindfulness practice, Japanese symbolism, meditations, and short Zen stories.',
          'The Kindle edition runs 108 pages and was published in January 2024.',
        ],
      },
      {
        heading: 'A cat cover in the same series',
        paragraphs: [
          'A smiling white cat meditates in a conical hat and a pink robe, against a rising sun and soft clouds. The pose and hat match [Il Cane Zen](/portfolio/il-cane-zen), so readers recognize the series.',
          '"IL GATTO ZEN" is set large in white at the top, with the subtitle in small type underneath, composed for a tall Kindle thumbnail.',
        ],
      },
      {
        heading: 'Why series covers sell the next book',
        paragraphs: [
          'On Amazon, "customers also bought" places series titles side by side. When the covers clearly match, a reader who liked one book is more likely to pick up the next.',
          'Our [ebook cover design](/ebook-cover-design) service plans series covers from the first title.',
        ],
      },
    ],
    faqs: [
      {
        q: 'What is Il Gatto Zen about?',
        a: 'It is an Italian guide to mindfulness and calm that uses the way cats live in the present as a model, with meditations and short Zen stories.',
      },
      {
        q: 'Why do series covers look alike?',
        a: 'Matching covers help readers recognize a series in search results and recommendations, so one book leads to the next.',
      },
      {
        q: 'Who designed the Il Gatto Zen cover?',
        a: 'The cover was designed by the ebookwriters.us studio for author Luca Daisei Hiroki. It is part of our published cover portfolio.',
      },
    ],
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
    detail: 'The illustration carries the genre before the words do. A bearded samurai with a topknot and sword sits on an off-white field, surrounded by loose splashes of teal, orange, and pink. "MODERN SAMURAI" is set large in orange beneath the figure, with the Italian subtitle in small type and the author name at the top. The contrast is what keeps the title readable in a Kindle grid.',
    seoTitle: 'Modern Samurai: Watercolor Book Cover Design',
    seoDescription: 'Watercolor book cover for Modern Samurai by Luca Daisei Hiroki, an Italian self-help manual on discipline and focus inspired by the samurai, built for Kindle.',
    coverAlt: 'Modern Samurai by Luca Daisei Hiroki, watercolor cover with a samurai holding a sword and splashes of teal, orange, and pink',
    published: 'March 24, 2024',
    pages: '116 pages',
    category: 'Self-help, Italian Kindle',
    sections: [
      {
        heading: 'About the book',
        paragraphs: [
          'Modern Samurai is an Italian self-help manual by Luca Daisei Hiroki on discipline, focus, and stress, built on samurai history, Bushido values, and meditation for self-control.',
          'The Kindle edition runs 116 pages and was published in March 2024.',
        ],
      },
      {
        heading: 'A watercolor figure on a white field',
        paragraphs: [
          'A bearded samurai with a topknot and a raised sword stands on an off-white field, surrounded by loose splashes of teal, orange, and pink. The illustration tells readers the theme before they read a word.',
          '"MODERN SAMURAI" is set large in orange beneath the figure, with the author name at the top and the Italian subtitle in small type at the foot.',
        ],
      },
      {
        heading: 'Strength without aggression',
        paragraphs: [
          'The book is about calm strength, so the cover avoids dark, violent imagery. The bright watercolor keeps it in self-help rather than action or history.',
          'More covers for this author: [Zen per Principianti](/portfolio/zen-per-principianti), [Diario Zen](/portfolio/diario-zen).',
        ],
      },
    ],
    faqs: [
      {
        q: 'What is Modern Samurai about?',
        a: 'It is an Italian self-help manual that uses samurai history and Bushido values to build discipline, focus, and calm under stress.',
      },
      {
        q: 'How do you keep a samurai cover from looking like an action book?',
        a: 'Use a light background, soft watercolor color, and a still pose. Those signal self-help and reflection rather than combat.',
      },
      {
        q: 'Who designed the Modern Samurai cover?',
        a: 'The cover was designed by the ebookwriters.us studio for author Luca Daisei Hiroki. It is part of our published cover portfolio.',
      },
    ],
  },
  {
    slug: 'resilient-faith',
    title: 'Resilient Faith',
    subtitle: 'Standing Firm in a Fallen World',
    author: 'Brian Fenn',
    genre: 'Nonfiction',
    format: 'Kindle',
    role: 'Cover design',
    image: '/assets/brand/covers/resilient-faith.jpg',
    amazonUrl: 'https://www.amazon.com/dp/B0GM4TG1QV/',
    summary: 'A Christian nonfiction book cover for Brian Fenn, an Army veteran and former SWAT officer. The cover has to read as conviction, not comfort.',
    detail: 'The jacket is split in three: a red field with the faint lines of a cross and crosshair, a torn white band carrying the title, and a black base for the author name. "RESILIENT FAITH" is set in tall condensed capitals so it holds at thumbnail size, with the subtitle in small red letterspaced type underneath. The torn edges do the storytelling, a world under strain, and a message that stands in the middle of it.',
    seoTitle: 'Resilient Faith: Christian Book Cover Design',
    seoDescription: 'Christian book cover design for Resilient Faith by Brian Fenn: a bold red, white, and black Kindle cover built to read clearly at Amazon thumbnail size.',
    coverAlt: 'Resilient Faith: Standing Firm in a Fallen World by Brian Fenn: Christian nonfiction book cover in red, white, and black',
    published: 'February 4, 2026',
    pages: '148 pages',
    publisher: 'WestBow Press',
    category: 'Christian Living, Spiritual Growth',
    sections: [
      {
        heading: 'About the book',
        paragraphs: [
          'Resilient Faith: Standing Firm in a Fallen World is a Christian living book by Brian Fenn: an Army infantry veteran, former SWAT sniper, human trafficking investigator, and ministry leader. It draws on Scripture, history, science, and personal experience to help believers stand firm through artificial intelligence, pandemics, spiritual deception, and a hostile culture.',
          'The Kindle edition runs 148 pages and was published by WestBow Press in February 2026. On Amazon it is shelved under Christian Living and Spiritual Growth.',
        ],
      },
      {
        heading: 'Christian book cover design with a clear message',
        paragraphs: [
          'The jacket is split in three: a red field with the faint lines of a cross and crosshair, a torn white band carrying the title, and a black base for the author name. The torn edges do the storytelling, a world under strain, and a message that stands in the middle of it.',
          'Many Christian nonfiction covers lean on sunrise photography and soft light. This one does the opposite. The book is a call to stand firm, so the cover uses hard contrast and a heavy condensed title instead of stock imagery, and lets one quiet symbol carry the faith.',
        ],
      },
      {
        heading: 'Designed for Amazon Kindle and KDP',
        paragraphs: [
          'Most readers first meet a Kindle cover at the size of a postage stamp in search results. Three flat color blocks and a two-word title in tall capitals keep Resilient Faith recognizable at that size: on a phone, in a crowded category grid, and in grayscale on a Kindle device.',
          'Preparing your own Christian or faith-based book? Our [ebook cover design](/ebook-cover-design) service starts from the same thumbnail-first test, and our [Amazon KDP publishing](/amazon-kdp-ebook-writing) team prepares the files and the listing.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Who designed the Resilient Faith book cover?',
        a: 'The Resilient Faith cover was designed by the ebookwriters.us studio for author Brian Fenn. It is part of our published cover portfolio.',
      },
      {
        q: 'What makes a good Christian book cover?',
        a: 'A good Christian book cover tells readers the tone of the message at a glance. Clear title type, a limited palette, and one strong symbol work better at Amazon thumbnail size than busy photography. Resilient Faith uses red, white, and black blocks and a subtle cross to signal a firm, urgent message.',
      },
      {
        q: 'Where can I buy Resilient Faith?',
        a: 'Resilient Faith: Standing Firm in a Fallen World by Brian Fenn is available as a Kindle ebook on Amazon. It was published by WestBow Press on February 4, 2026, and runs 148 pages.',
      },
    ],
  },
  {
    slug: 'born-in-kansas-made-in-africa',
    title: 'Born in Kansas but Made in Africa',
    subtitle: "An American Man's Recollections of 50 Years in Africa",
    author: 'Mark G. Wentling',
    genre: 'Memoir',
    format: 'Kindle',
    role: 'Cover design',
    image: '/assets/brand/covers/born-in-kansas-made-in-africa.jpg',
    amazonUrl: 'https://www.amazon.com/dp/B0FH3BKWKD/',
    summary: 'A travel memoir book cover for fifty years of service across Africa, from a Peace Corps volunteer who grew up on a Kansas farm. The map is the cover.',
    detail: 'The book has one chapter per country, so the whole continent is the image: an old-map Africa in greens, golds, and reds on parchment. The two-part title sits above it in heavy green capitals: Kansas first, Africa second, the way the life ran. The subtitle and author name sit at the foot in gold and green, keeping the map clear in the middle of the frame.',
    seoTitle: 'Born in Kansas but Made in Africa: Memoir Book Cover',
    seoDescription: 'Memoir book cover design for Born in Kansas but Made in Africa by Mark G. Wentling, a vintage Africa map cover for a 50-year travel memoir on Kindle.',
    coverAlt: 'Born in Kansas but Made in Africa by Mark G. Wentling, travel memoir book cover with a vintage map of Africa',
    published: 'July 7, 2025',
    pages: '463 pages',
    category: 'Travel memoir, Adventurer & Explorer Biographies',
    sections: [
      {
        heading: 'About the book',
        paragraphs: [
          'Born in Kansas but Made in Africa is a travel memoir by Mark G. Wentling. At 21 he left Wichita for the Peace Corps, and that first posting became five decades of development work and diplomacy across the African continent. The book gives one chapter to each country, from Togo and Gabon to Somalia, Angola, and the Democratic Republic of the Congo.',
          'The Kindle edition runs 463 pages and was published in July 2025. On Amazon it ranks in Central Africa Travel and Adventurer & Explorer Biographies.',
        ],
      },
      {
        heading: 'A memoir book cover built around a map',
        paragraphs: [
          'Because the book moves country by country, the whole continent is the image: an old-map Africa in greens, golds, and reds on parchment. The two-part title sits above it in heavy green capitals: Kansas first, Africa second, the way the life ran.',
          'A travel memoir cover has to promise a place before it promises a person. The map does that instantly, and the earthy palette keeps it warm and personal rather than academic.',
        ],
      },
      {
        heading: 'A long memoir title that still works on Kindle',
        paragraphs: [
          'Long memoir titles are common, and they are hard to fit on a small cover. Here the title is split across two lines of heavy outlined capitals so each word stays legible on the Amazon search page. The subtitle and author name move to the foot, where they read on the product page without crowding the thumbnail.',
          'Writing your own memoir? See how our [memoir and ebook ghostwriting](/ebook-ghostwriting-services) works, or start with a [custom ebook cover](/ebook-cover-design).',
        ],
      },
    ],
    faqs: [
      {
        q: 'What is Born in Kansas but Made in Africa about?',
        a: "It is Mark G. Wentling's memoir of 50 years of work and travel in Africa, from Peace Corps service to development and diplomatic posts, with one chapter for each country he lived in or visited.",
      },
      {
        q: 'Why use a map on a memoir book cover?',
        a: 'For a travel memoir, the place is the hook. A map tells readers the setting before they read a word, and it stays recognizable at thumbnail size. It also suits a book organized country by country.',
      },
      {
        q: 'Who designed the Born in Kansas but Made in Africa cover?',
        a: 'The cover was designed by the ebookwriters.us studio for author Mark G. Wentling. It is part of our published cover portfolio.',
      },
    ],
  },
  {
    slug: 'paranormal-connection',
    title: 'Paranormal Connection',
    subtitle: 'Nursing in the Realm of the Unseen',
    author: 'Elaine Vizard & Mary Vizard Robinet',
    genre: 'Memoir',
    format: 'Kindle',
    role: 'Cover design',
    image: '/assets/brand/covers/paranormal-connection.jpg',
    amazonUrl: 'https://www.amazon.com/dp/B0FJ6K7HQP/',
    summary: 'An illustrated nursing memoir cover for a mother-and-daughter book about the unexplained moments at the bedside. Both authors are in the frame.',
    detail: 'The authors are the story, so the painting shows two nurses in blue scrubs, hand in hand, in a dim hospital room with a faint figure behind them. The distressed white title runs across the top, with a teal tagline bar ("We know who you are.") to set the tone. The cool, misty palette says paranormal without turning the book into horror, and both names sit together at the foot.',
    seoTitle: 'Paranormal Connection: Nursing Memoir Book Cover',
    seoDescription: 'Nursing memoir book cover design for Paranormal Connection by Elaine Vizard and Mary Vizard Robinet, an illustrated, atmospheric Kindle cover.',
    coverAlt: 'Paranormal Connection by Elaine Vizard and Mary Vizard Robinet, nursing memoir book cover showing two nurses in a dim hospital room',
    published: 'July 18, 2025',
    pages: '125 pages',
    category: 'Nursing, Memoir',
    sections: [
      {
        heading: 'About the book',
        paragraphs: [
          'Paranormal Connection: Nursing in the Realm of the Unseen is a memoir by mother and daughter nurses Elaine Vizard and Mary Vizard Robinet. It collects first-hand accounts from decades of patient care (last breaths, late-night whispers, unexplained shadows) alongside the faith that carried them through.',
          'The Kindle edition runs 125 pages and was published in July 2025. On Amazon it is listed under Nursing, with rankings in Mental Health Nursing and Nursing Issues, Trends & Roles.',
        ],
      },
      {
        heading: 'An illustrated nursing memoir cover',
        paragraphs: [
          'The authors are the story, so the painting shows two nurses in blue scrubs, hand in hand, in a dim hospital room with a faint figure behind them. The distressed white title runs across the top, with a teal tagline bar ("We know who you are.") to set the tone.',
          'Both names share one line at the foot, and both women stand side by side in the art, so neither reads as the secondary author on a co-written book.',
        ],
      },
      {
        heading: 'A paranormal memoir cover without the horror',
        paragraphs: [
          'Paranormal covers often borrow horror conventions: blood-red type, skulls, harsh contrast. That would have sold the wrong book. This is a gentle, spiritual memoir by working nurses, so the cover keeps a cool blue-green palette, soft light, and real-looking people, and lets the faint figure in the background carry the unexplained.',
          'Publishing a co-authored memoir? Our [ebook cover design](/ebook-cover-design) service gives every author equal weight on the cover, and our [editing team](/ebook-editing-services) can shape two voices into one book.',
        ],
      },
    ],
    faqs: [
      {
        q: 'What is Paranormal Connection about?',
        a: 'It is a memoir by two nurses, a mother and daughter, about the unexplained experiences they met at the bedside: encounters with the unseen, the realities of death and dying, and the faith that held them steady.',
      },
      {
        q: 'How do you design a cover for a co-authored memoir?',
        a: 'Give both authors equal weight. On Paranormal Connection the two nurses appear side by side in the illustration and both names share one line at the foot, so neither reads as the secondary author.',
      },
      {
        q: 'Who designed the Paranormal Connection cover?',
        a: 'The cover was designed by the ebookwriters.us studio for authors Elaine Vizard and Mary Vizard Robinet. It is part of our published cover portfolio.',
      },
    ],
  },
  {
    slug: 'whispering-woods',
    title: 'Whispering Woods',
    subtitle: 'Tales of Courage and Connection',
    author: 'Kerry Anderson',
    genre: "Children's",
    format: 'Kindle',
    role: 'Cover design',
    image: '/assets/brand/covers/whispering-woods.jpg',
    amazonUrl: 'https://www.amazon.com/dp/B0FRSG9HK7/',
    summary: "A children's book cover for short stories that help kids name their feelings: a child in silhouette against a wall of puzzle pieces.",
    detail: "The book is about emotions fitting together, so the background is a puzzle in warm reds, oranges, and blues, with a small boy in silhouette looking up at it. The title is set in playful hand-drawn lettering in yellow and red at the top, the author line in the same style at the foot. It reads as a children's book at a glance, while the quiet figure in the middle signals the gentler subject inside.",
    seoTitle: "Whispering Woods: Children's Book Cover Design",
    seoDescription: "Children's book cover design for Whispering Woods by Kerry Anderson, a colorful puzzle-piece Kindle cover for stories about feelings and courage.",
    coverAlt: "Whispering Woods: Tales of Courage and Connection by Kerry Anderson, children's book cover with a boy silhouetted against colorful puzzle pieces",
    published: 'September 19, 2025',
    pages: '76 pages',
    category: "Children's, Inspirational & Personal Growth",
    sections: [
      {
        heading: 'About the book',
        paragraphs: [
          "Whispering Woods: Tales of Courage and Connection is a children's book by Kerry Anderson. Its short stories follow Abbigail the gentle deer, Benny Bear, Charlie the cheetah, and their friends as they learn about fear, sadness, bravery, and kindness. Small activities (drawing emotions, planting seeds, acting out feelings) help children name what they feel.",
          "The Kindle edition runs 76 pages and was published in September 2025. On Amazon it is listed under Children's Inspirational & Personal Growth.",
        ],
      },
      {
        heading: "A children's book cover with one big idea",
        paragraphs: [
          'The book is about emotions fitting together, so the background is a puzzle in warm reds, oranges, and blues, with a small boy in silhouette looking up at it. The title is set in playful hand-drawn lettering in yellow and red, and the author line repeats the same style at the foot.',
          "It reads as a children's book at a glance, while the quiet figure in the middle signals the gentler subject inside: feelings, not a straight adventure story.",
        ],
      },
      {
        heading: 'Designed for parents browsing on Amazon',
        paragraphs: [
          "Parents usually choose the book, and they scan quickly. Strong color, one clear focal figure, and a title that looks fun to read do the work in a few seconds. The palette holds at thumbnail size, which matters on the Kindle store, where many children's ebooks are first seen in a search grid.",
          "Publishing a children's book? Our [ebook cover design](/ebook-cover-design) and [Amazon KDP publishing](/amazon-kdp-ebook-writing) services cover the artwork, the files, and the listing.",
        ],
      },
    ],
    faqs: [
      {
        q: 'What is Whispering Woods about?',
        a: 'Whispering Woods is a collection of short animal stories that help children understand emotions like fear, sadness, and courage, with simple activities that turn each lesson into something to do.',
      },
      {
        q: "What makes a good children's book cover?",
        a: "Warm, strong color, one clear focal character, and a title that looks fun to read. It also has to work at thumbnail size, because many parents first see a children's ebook cover in an Amazon search grid.",
      },
      {
        q: 'Who designed the Whispering Woods cover?',
        a: 'The cover was designed by the ebookwriters.us studio for author Kerry Anderson. It is part of our published cover portfolio.',
      },
    ],
  },
];

export function getBookBySlug(slug) {
  return books.find(book => book.slug === slug) || null;
}

export const portfolioPage = {
  metaTitle: 'Book Writing Portfolio: Published Covers | ebookwriters.us',
  metaDescription:
    'Browse books our ghostwriting studio has helped authors publish: memoir, business, self-help, and more. Writing, editing, design, and KDP support.',
  heroImage: '/assets/brand/page-hero-covers.png',
  heroImageAlt: 'Studio desk with laptop showing book covers and hardcover samples',
  eyebrow: 'Our portfolio',
  title: "Books we've helped authors",
  titleEm: 'bring to life.',
  lead:
    "Every book has a story behind it. This portfolio shows covers we have designed for authors across genres: memoir, education nonfiction, literary fiction, self-help, and children's books, in English and Italian.",
  cta: 'Start your book journey',
  trustNote: 'Trusted by authors who want professional guidance, creative support, and reader-ready results.',
  pillars: [
    {
      title: '100% Author Ownership',
      copy: 'Your book remains yours. We respect your ideas, your voice, and your intellectual property.',
    },
    {
      title: 'Complete Publishing Support',
      copy: 'From writing and editing to cover design, formatting, publishing, and marketing, key steps in one studio.',
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
    genres: ['Nonfiction', 'Memoir', 'Fiction', 'Self-help', 'Lifestyle', 'Journal', "Children's"],
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
    lead: 'Strategy, craftsmanship, and clear communication, so authors publish books that look professional and support long-term goals.',
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
  title: 'Transparent book writing packages:',
  titleEm: '$699 to $3,999.',
  lead:
    'Ghostwriting packages with editing, cover design, and retailer-ready files included. No surprise invoices, choose the plan that matches your manuscript.',
  previewTitle: 'Fixed ebook writing packages,',
  previewTitleEm: 'priced by length.',
  previewLead:
    'Every package includes writing, editing, a cover, and EPUB and PDF files. Full inclusions, revision rounds, and what is not included are on the pricing page.',
  previewCta: 'Compare packages',
  previewNote: 'No inflated "was" prices, coupon codes, or countdown timers.',
  previewTrust: ['Fixed fee, no hourly billing', 'NDA before you share', '100% of the rights stay yours'],
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
    'Straight answers on rights, cost, timelines, and KDP publishing, the questions authors ask before they hire a ghostwriter.',
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
    a: 'Packages start at $699 for a focused 15,000-word guide and go up to $3,999 for a full-length authority book with launch support. Every quote is fixed up front: writing, editing, cover, and retailer-ready files are included in the package you choose.',
  },
  {
    q: 'How involved do I need to be?',
    a: 'Short and standard nonfiction projects often need only a few hours of author interviews and review, typically a discovery call, one or two voice-matching interviews, and chapter feedback. Memoirs and interview-intensive books can require substantially more involvement. We confirm that on the quote before work starts.',
  },
  {
    q: 'How long does a book actually take?',
    a: "Standard package timelines apply to projects with a defined brief and typical interview load: about three weeks for a 15,000-word guide, five for ~30,000 words, and eight for ~50,000. Interview-heavy memoirs, technical books, or extensive original research may need a custom timeline, a full life-story memoir is often a much longer collaboration than a lead-magnet ebook. Elite's 12-week band is a scoped ~100,000-word production path, not a 9-18 month memoir unless we quote that separately.",
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
    a: 'Yes. We match every project to a writer experienced in that area: finance, health, law, SaaS, memoir, and related nonfiction. If we do not have the right specialist, we will say so rather than guess.',
  },
  {
    q: 'Do you use AI to write the manuscript?',
    a: 'No, we do not deliver an unedited AI-generated book as ghostwriting. Your manuscript is written and revised by the assigned human writer, under studio editorial review. Ordinary tools may support research, outlining, or production admin; the published prose is authored for your voice.',
  },
  {
    q: 'Who writes my book? Can I see the team?',
    a: 'After the NDA we introduce the assigned writer by name. We do not list a public roster because most titles are confidential ghostwriting. If we cannot staff your category, we say so rather than assign a generalist.',
  },
];

export const contactIntro = {
  pageTitle: 'Request a fixed writing quote.',
  eyebrow: 'Get a quote',
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
  photoAlt: 'Emerald writing desk with sealed correspondence, book writing consultation',
  page: {
    howTitle: 'What to include in your note',
    howLead:
      'A useful brief is short. You do not need a finished outline. You need enough for us to say yes, no, or ask one clarifying question.',
    how: [
      'Who the book is for, and the job it has to do (authority, leads, a story told properly)',
      'Approximate length, or "not sure: recommend a package"',
      'Whether you need writing only, or writing plus editing, cover, and KDP setup',
      'A hard deadline if you have one, and what source material you already have',
    ],
    nextTitle: 'What happens after you send this',
    nextLead:
      'This page is for a quote, not a contract. We read the brief, check whether we can staff the category honestly, and reply with a fixed range or a clear no.',
    next: [
      'You hear back within one working day in most cases, typically 1-2 business days at the latest.',
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
    'ebookwriters.us is an Iowa ebook writing and ghostwriting studio. Fixed packages from $699, an NDA before you share material, and 100% of the rights stay with you.',
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
      { label: 'Lead Magnet Ebooks', href: '/lead-magnet-ebook-writing' },
      { label: 'Ebooks for Coaches', href: '/ebook-ghostwriter-for-coaches' },
      { label: 'All Services', href: '/services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Our team', href: '/team' },
      { label: 'Portfolio', href: '/portfolio' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Editorial policy', href: '/editorial-policy' },
      { label: 'AI policy', href: '/ai-policy' },
      { label: 'How to choose a ghostwriter', href: '/how-to-choose-a-ghostwriter' },
      { label: 'Editorial desk', href: '/authors/editorial-desk' },
    ],
  },
];

/* --------------------------------------------------------------- hero copy */

export const hero = {
  /* Visible hero copy, set live over the text-free plates
     (hero-desk-plate.jpg / hero-mob-plate.jpg). The last line is the gold accent. */
  lines: ['Ebook Writing & Ghostwriting Services.', 'Fixed Fee from $699.'],
  linesMobile: ['Ebook Writing & Ghostwriting Services.', 'Fixed Fee from $699.'],
  leadVisible:
    'A human ghostwriter interviews you and writes your ebook in your voice. Editing, cover design, and Amazon KDP files are part of the price, and you keep 100% of the rights.',
  strip: ['Human writers', 'NDA protected', 'You keep the rights.'],
  /* The crawler HTML (scripts/crawl-html.mjs) uses h1 and lead; keep them equal to the visible hero. */
  h1: 'Ebook Writing & Ghostwriting Services. Fixed Fee from $699.',
  lead: 'A human ghostwriter interviews you and writes your ebook in your voice. Editing, cover design, and Amazon KDP files are part of the price, and you keep 100% of the rights.',
  leadMobile:
    'A human ghostwriter interviews you and writes your ebook in your voice. Editing, cover, and Amazon KDP files included, and you keep 100% of the rights.',
  kicker: 'Book writing & publishing studio',
  cta: 'Get a fixed quote',
  link: { label: 'See packages', href: '/pricing' },
  trust: ['Writer matched by subject', 'Fixed packages from $699', 'KDP & IngramSpark ready'],
  imageAlt: 'ebookwriters.us, professional ebook writers helping authors publish their books',
};

export const siteContact = {
  email: 'info@ebookwriters.us',
  phone: '+1 712-414-0542',
  phoneHref: 'tel:+17124140542',
  address: 'Iowa, USA',
};
