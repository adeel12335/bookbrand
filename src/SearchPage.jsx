import { useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { blogPosts } from './blogPosts.js';
import { faqs, services } from './data.js';
import { getPrerenderPages } from './seo.js';

const SITE_SUFFIX = /\s*[|—]\s*ebookwriters\.us$/;

function buildIndex() {
  const pages = getPrerenderPages()
    .filter(page => page.sitemap && !page.path.startsWith('/blog/'))
    .map(page => ({
      type: 'Page',
      title: page.title.replace(SITE_SUFFIX, ''),
      text: page.description,
      href: page.path,
    }));

  const posts = blogPosts.map(post => ({
    type: 'Article',
    title: post.title,
    text: [
      post.description,
      post.lead,
      ...(post.keywords || []),
      ...(post.takeaways || []),
      ...(post.sections || []).flatMap(section => [
        section.heading,
        ...(section.paragraphs || []),
        ...(section.bullets || []),
      ]),
    ].filter(Boolean).join(' '),
    href: `/blog/${post.slug}`,
  }));

  const serviceItems = services.map(service => ({
    type: 'Service',
    title: service.title,
    text: [service.copy, ...(service.points || [])].join(' '),
    href: service.href || '/services',
  }));

  const faqItems = faqs.map(item => ({
    type: 'FAQ',
    title: item.q,
    text: item.a,
    href: '/faq',
  }));

  return [...pages, ...serviceItems, ...posts, ...faqItems];
}

function snippet(text, terms) {
  const lower = text.toLowerCase();
  const hit = terms.map(term => lower.indexOf(term)).filter(i => i >= 0).sort((a, b) => a - b)[0];
  if (hit === undefined) return text.length > 180 ? `${text.slice(0, 180).trim()}…` : text;
  const start = Math.max(0, hit - 70);
  const end = Math.min(text.length, hit + 130);
  return `${start > 0 ? '…' : ''}${text.slice(start, end).trim()}${end < text.length ? '…' : ''}`;
}

function search(index, query) {
  const terms = query.toLowerCase().split(/\s+/).filter(term => term.length > 1);
  if (!terms.length) return [];
  return index
    .map(item => {
      const title = item.title.toLowerCase();
      const text = item.text.toLowerCase();
      let score = 0;
      for (const term of terms) {
        if (title.includes(term)) score += 3;
        if (text.includes(term)) score += 1;
      }
      return { ...item, score, excerpt: snippet(item.text, terms) };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score);
}

export default function SearchPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const query = (params.get('q') || '').trim();
  const [draft, setDraft] = useState(query);
  const index = useMemo(buildIndex, []);
  const results = useMemo(() => search(index, query), [index, query]);

  function handleSubmit(event) {
    event.preventDefault();
    const next = draft.trim();
    navigate(next ? `/search?q=${encodeURIComponent(next)}` : '/search');
  }

  return (
    <section className="br_search" aria-labelledby="search-title">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="br_search_head">
              <p className="br-eyebrow">Search</p>
              <h1 id="search-title">
                {query ? <>Results for <span>“{query}”</span></> : 'Search the site'}
              </h1>
              <form className="br_search_form" role="search" onSubmit={handleSubmit}>
                <input
                  type="search"
                  name="q"
                  value={draft}
                  onChange={event => setDraft(event.target.value)}
                  placeholder="Search services, pricing, articles…"
                  aria-label="Search the site"
                  autoComplete="off"
                />
                <button type="submit" className="btn">Search</button>
              </form>
            </div>

            {query ? (
              <p className="br_search_count" role="status">
                {results.length
                  ? `${results.length} result${results.length === 1 ? '' : 's'} found`
                  : 'No results found. Try a different word, or browse our services.'}
              </p>
            ) : null}

            {results.length ? (
              <ul className="br_search_results">
                {results.map(item => (
                  <li key={`${item.type}-${item.href}-${item.title}`}>
                    <Link to={item.href} className="br_search_result">
                      <span className="br_search_type">{item.type}</span>
                      <h2>{item.title}</h2>
                      <p>{item.excerpt}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}

            {query && !results.length ? (
              <div className="br_wrapper_buttons">
                <Link className="btn" to="/services">Browse services</Link>
                <Link className="btn-outline" to="/contact">Ask us directly</Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
