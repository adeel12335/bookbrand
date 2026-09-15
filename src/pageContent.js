import { plans, siteContact } from './data.js';

export const aboutPage = {
  eyebrow: 'The studio',
  title: 'A US ebook writing studio built for authors who want the book done.',
  lead:
    'ebookwriters.us is a Tennessee ghostwriting and publishing studio. We write, edit, design, and prepare books for Amazon KDP and IngramSpark — so you are not coordinating a dozen freelancers.',
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
  actions: [
    { label: 'Get a writing quote', href: '/contact' },
    { label: 'View packages', href: '/pricing', variant: 'gold' },
  ],
};

export const serviceHrefs = {
  writing: '/ebook-ghostwriting-services',
  editing: '/services',
  formatting: '/services',
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
          'Experts who need a book that carries their consulting brand. Founders who want a lead-generating guide. Memoirists who have the story but not the hours to draft 30,000 words. If you can talk the book but cannot sit down and write it, this is the service.',
        ],
      },
      {
        heading: 'How a ghostwriting project runs',
        paragraphs: [
          'We start with scope: length, audience, and the job the book must do. You get a fixed quote and a dated schedule. Then interviews, outline, sample chapter, full manuscript, edits, and files. A 15,000-word guide is typically about three weeks; a 50,000-word book around eight.',
          'If the sample chapter misses your voice, we rewrite it at no cost before the rest of the manuscript is written.',
        ],
      },
    ],
    links: [
      { label: 'Hire an ebook writer', href: '/hire-ebook-writer' },
      { label: 'Amazon KDP writing & publishing', href: '/amazon-kdp-ebook-writing' },
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
        heading: 'Freelance marketplace vs a studio',
        paragraphs: [
          'Hiring one freelancer for chapters, another for edits, and a third for a cover is how manuscripts stall. A studio quote includes the path to retailer-ready files. If you only need writing, say so — we will not pad the scope.',
          'Read our comparison of ghostwriting versus hiring a freelancer if you are weighing a low hourly bid against a fixed package.',
        ],
      },
      {
        heading: 'How to brief us',
        paragraphs: [
          'The useful brief is short: who the book is for, what it should do for you (authority, leads, a story told properly), target length, and when you need files. Send that on the contact page. You hear back within one working day with a clear yes, no, or clarifying question.',
        ],
      },
    ],
    links: [
      { label: 'Ebook ghostwriting services', href: '/ebook-ghostwriting-services' },
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
    actions: [
      { label: 'Plan KDP publishing', href: '/contact' },
      { label: 'See packages with KDP setup', href: '/pricing', variant: 'gold' },
    ],
    sections: [
      {
        heading: 'Writing made for the Kindle store',
        paragraphs: [
          'A KDP ebook still has to be a good book. We outline and write to the promise on the cover and the category you will compete in — not a generic manuscript you later try to “optimize.”',
          'Professional and Premium packages include KDP publishing setup. Elite adds IngramSpark and broader distribution files when you want paperback and hardcover beyond Amazon.',
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
        heading: 'Writing only, or writing plus publish',
        paragraphs: [
          'If you already have a draft, say so on the contact form — editing, cover, and KDP files may be the right scope. If you need the book written first, start with ghostwriting and keep publishing in the same package so nothing is re-traded later.',
        ],
      },
    ],
    links: [
      { label: 'Ebook ghostwriting', href: '/ebook-ghostwriting-services' },
      { label: 'Hire an ebook writer', href: '/hire-ebook-writer' },
      { label: 'How long writing and publishing take', href: '/blog/how-long-does-it-take-to-write-and-publish-a-book' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
};

export const privacyPage = {
  eyebrow: 'Legal',
  title: 'Privacy policy',
  updated: 'September 15, 2026',
  lead: `This policy describes how ${siteContact.email} and the ebookwriters.us website handle information. It is written for a marketing site and quote form — not as a substitute for a signed project agreement.`,
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
  links: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Hire an ebook writer', href: '/hire-ebook-writer' },
    { label: 'Contact', href: '/contact' },
  ],
};
