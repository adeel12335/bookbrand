/**
 * /admin — studio dashboard: overview, articles, enquiries.
 * Auth: Neon admin_users + signed HttpOnly cookie (api/admin/session.js).
 */
import React, { useCallback, useEffect, useState } from 'react';

const EMPTY_SECTION = { heading: '', paragraphs: [''], bullets: [] };

const EMPTY_POST = {
  slug: '',
  title: '',
  description: '',
  date: new Date().toISOString().slice(0, 10),
  readTime: '6 min read',
  category: 'Guides',
  eyebrow: '',
  lead: '',
  cta: 'Talk to the studio',
  image: '/assets/brand/page-hero-blog.png',
  imageAlt: '',
  keywords: [],
  takeaways: [],
  sections: [{ ...EMPTY_SECTION }],
  published: false,
};

const lines = value => (Array.isArray(value) ? value.join('\n') : '');
const toLines = value => value.split('\n').map(s => s.trim()).filter(Boolean);

async function api(path, options = {}) {
  const response = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.error || `Request failed (${response.status})`);
    error.fields = payload.errors || {};
    error.status = response.status;
    throw error;
  }
  return payload;
}

function formatWhen(value) {
  if (!value) return '—';
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
}

/* ------------------------------------------------------------------- login */

function SignIn({ onDone, missing }) {
  const [email, setEmail] = useState('admin@ebookwriters.us');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      await api('/api/admin/session', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      setPassword('');
      onDone();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="adm-login-wrap">
      <form className="adm-login" onSubmit={submit}>
        <p className="adm-login-kicker">ebookwriters.us</p>
        <h1>Studio dashboard</h1>
        <p>Sign in with your operator account to manage articles and enquiries.</p>
        {missing?.length ? (
          <p className="adm-error" role="alert">
            Missing {missing.join(' and ')}. Add {missing.length > 1 ? 'them' : 'it'} to
            environment variables and redeploy.
          </p>
        ) : null}
        <p className="adm-error" role="alert" hidden={!error}>{error}</p>
        <label className="adm-field">
          <span>Email</span>
          <input
            type="email"
            value={email}
            autoComplete="username"
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="adm-field">
          <span>Password</span>
          <input
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        <button className="adm-btn" type="submit" disabled={busy}>
          {busy ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}

/* ------------------------------------------------------------------ editor */

function PostEditor({ initial, onCancel, onSaved }) {
  const [post, setPost] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [fields, setFields] = useState({});
  const isNew = !initial.slug;

  const set = (key, value) => setPost(prev => ({ ...prev, [key]: value }));
  const setSection = (index, key, value) => setPost(prev => ({
    ...prev,
    sections: prev.sections.map((s, i) => (i === index ? { ...s, [key]: value } : s)),
  }));

  async function save(publish) {
    setBusy(true);
    setError('');
    setFields({});
    const body = JSON.stringify({ ...post, published: publish });
    try {
      const result = isNew
        ? await api('/api/posts', { method: 'POST', body })
        : await api(`/api/posts/${encodeURIComponent(initial.slug)}`, { method: 'PUT', body });
      onSaved(result);
    } catch (err) {
      setError(err.message);
      setFields(err.fields || {});
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="adm-panel">
      <div className="adm-bar">
        <div>
          <p className="adm-eyebrow">{isNew ? 'New article' : 'Edit article'}</p>
          <h1>{isNew ? 'Write an article' : initial.title}</h1>
        </div>
        <span className="adm-bar-spacer" />
        <button className="adm-btn adm-btn--ghost" type="button" onClick={onCancel}>Back</button>
        <button className="adm-btn adm-btn--ghost" type="button" disabled={busy} onClick={() => save(false)}>
          Save draft
        </button>
        <button className="adm-btn" type="button" disabled={busy} onClick={() => save(true)}>
          {busy ? 'Saving…' : 'Publish'}
        </button>
      </div>

      <div aria-live="polite">
        {error ? <p className="adm-error">{error}</p> : null}
      </div>

      <div className="adm-row">
        <label className="adm-field">
          <span>Title</span>
          <input
            value={post.title}
            autoComplete="off"
            aria-invalid={fields.title ? 'true' : undefined}
            onChange={e => set('title', e.target.value)}
          />
          {fields.title ? <em className="field-error">{fields.title}</em> : null}
        </label>
        <label className="adm-field">
          <span>Slug</span>
          <input
            value={post.slug}
            placeholder="generated-from-the-title…"
            autoComplete="off"
            spellCheck={false}
            aria-invalid={fields.slug ? 'true' : undefined}
            onChange={e => set('slug', e.target.value)}
          />
          {fields.slug ? <em className="field-error">{fields.slug}</em> : null}
        </label>
      </div>

      <label className="adm-field">
        <span>Meta description</span>
        <textarea rows={2} value={post.description} onChange={e => set('description', e.target.value)} />
        {fields.description ? <em className="field-error">{fields.description}</em> : null}
      </label>
      <p className="adm-hint">Google snippet — about 150–160 characters.</p>

      <div className="adm-row">
        <label className="adm-field">
          <span>Date</span>
          <input type="date" value={post.date} onChange={e => set('date', e.target.value)} />
        </label>
        <label className="adm-field">
          <span>Category</span>
          <input value={post.category} autoComplete="off" onChange={e => set('category', e.target.value)} />
        </label>
        <label className="adm-field">
          <span>Read time</span>
          <input value={post.readTime} autoComplete="off" onChange={e => set('readTime', e.target.value)} />
        </label>
        <label className="adm-field">
          <span>Eyebrow</span>
          <input value={post.eyebrow} onChange={e => set('eyebrow', e.target.value)} />
        </label>
      </div>

      <label className="adm-field">
        <span>Lead paragraph</span>
        <textarea rows={3} value={post.lead} onChange={e => set('lead', e.target.value)} />
      </label>

      <div className="adm-row">
        <label className="adm-field">
          <span>OG image path</span>
          <input value={post.image} autoComplete="off" spellCheck={false} onChange={e => set('image', e.target.value)} />
        </label>
        <label className="adm-field">
          <span>Image alt text</span>
          <input value={post.imageAlt} onChange={e => set('imageAlt', e.target.value)} />
        </label>
        <label className="adm-field">
          <span>CTA label</span>
          <input value={post.cta} onChange={e => set('cta', e.target.value)} />
        </label>
      </div>

      <div className="adm-row">
        <label className="adm-field">
          <span>Keywords — one per line</span>
          <textarea rows={4} value={lines(post.keywords)} onChange={e => set('keywords', toLines(e.target.value))} />
        </label>
        <label className="adm-field">
          <span>Key takeaways — one per line</span>
          <textarea rows={4} value={lines(post.takeaways)} onChange={e => set('takeaways', toLines(e.target.value))} />
        </label>
      </div>

      {fields.sections ? <p className="adm-error">{fields.sections}</p> : null}

      {post.sections.map((section, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className="adm-section" key={index}>
          <div className="adm-section-head">
            <h3>Section {index + 1}</h3>
            <button
              className="adm-btn adm-btn--danger"
              type="button"
              onClick={() => set('sections', post.sections.filter((_, i) => i !== index))}
            >
              Remove
            </button>
          </div>
          <label className="adm-field">
            <span>Heading</span>
            <input value={section.heading} onChange={e => setSection(index, 'heading', e.target.value)} />
          </label>
          <label className="adm-field">
            <span>Paragraphs — blank line between each</span>
            <textarea
              rows={6}
              value={(section.paragraphs || []).join('\n\n')}
              onChange={e => setSection(index, 'paragraphs', e.target.value.split(/\n\s*\n/).map(s => s.trim()).filter(Boolean))}
            />
          </label>
          <label className="adm-field">
            <span>Bullets — one per line (optional)</span>
            <textarea
              rows={3}
              value={lines(section.bullets)}
              onChange={e => setSection(index, 'bullets', toLines(e.target.value))}
            />
          </label>
        </div>
      ))}

      <button
        className="adm-btn adm-btn--ghost"
        type="button"
        onClick={() => set('sections', [...post.sections, { ...EMPTY_SECTION }])}
      >
        Add section
      </button>
    </div>
  );
}

/* ---------------------------------------------------------------- overview */

function Overview({ stats, onOpenPosts, onOpenLeads, onNewPost }) {
  if (!stats) return <p className="adm-empty">Loading overview…</p>;
  const cards = [
    { label: 'Published articles', value: stats.posts?.published ?? 0, hint: `${stats.posts?.drafts ?? 0} drafts` },
    { label: 'Total articles', value: stats.posts?.total ?? 0, hint: 'In Neon' },
    { label: 'Enquiries (7 days)', value: stats.leads?.week ?? 0, hint: `${stats.leads?.month ?? 0} this month` },
    { label: 'All enquiries', value: stats.leads?.total ?? 0, hint: 'Contact form' },
  ];

  return (
    <div className="adm-panel">
      <div className="adm-bar">
        <div>
          <p className="adm-eyebrow">Overview</p>
          <h1>Studio dashboard</h1>
        </div>
        <span className="adm-bar-spacer" />
        <button className="adm-btn adm-btn--ghost" type="button" onClick={onOpenLeads}>View enquiries</button>
        <button className="adm-btn" type="button" onClick={onNewPost}>New article</button>
      </div>

      <div className="adm-stat-grid">
        {cards.map(card => (
          <article className="adm-stat" key={card.label}>
            <p>{card.label}</p>
            <strong>{card.value}</strong>
            <span>{card.hint}</span>
          </article>
        ))}
      </div>

      <div className="adm-split">
        <section>
          <div className="adm-section-head">
            <h2>Recent articles</h2>
            <button className="adm-btn adm-btn--ghost" type="button" onClick={onOpenPosts}>All</button>
          </div>
          <ul className="adm-list">
            {(stats.recentPosts || []).map(post => (
              <li key={post.slug}>
                <span className="adm-title">{post.title}</span>
                <span className={`adm-flag adm-flag--${post.published ? 'live' : 'draft'}`}>
                  {post.published ? 'Live' : 'Draft'}
                </span>
                <span className="adm-meta">{formatWhen(post.updated_at)}</span>
              </li>
            ))}
            {!stats.recentPosts?.length ? <li className="adm-empty">No articles yet.</li> : null}
          </ul>
        </section>
        <section>
          <div className="adm-section-head">
            <h2>Latest enquiries</h2>
            <button className="adm-btn adm-btn--ghost" type="button" onClick={onOpenLeads}>All</button>
          </div>
          <ul className="adm-list">
            {(stats.recentLeads || []).map(lead => (
              <li key={lead.id}>
                <span className="adm-title">{lead.name}</span>
                <span className="adm-meta">{lead.email}</span>
                <span className="adm-meta">{formatWhen(lead.created_at)}</span>
              </li>
            ))}
            {!stats.recentLeads?.length ? <li className="adm-empty">No enquiries yet.</li> : null}
          </ul>
        </section>
      </div>
    </div>
  );
}

function PostList({ posts, onNew, onEdit, onDelete }) {
  return (
    <div className="adm-panel">
      <div className="adm-bar">
        <div>
          <p className="adm-eyebrow">Content</p>
          <h1>Articles</h1>
        </div>
        <span className="adm-bar-spacer" />
        <button className="adm-btn" type="button" onClick={onNew}>New article</button>
      </div>
      {posts.length ? (
        <ul className="adm-list adm-list--table">
          {posts.map(post => (
            <li key={post.slug}>
              <div className="adm-list-main">
                <span className="adm-title">{post.title}</span>
                <span className="adm-meta">/{post.slug}</span>
              </div>
              <span className={`adm-flag adm-flag--${post.published ? 'live' : 'draft'}`}>
                {post.published ? 'Live' : 'Draft'}
              </span>
              <span className="adm-meta">{post.dateLabel}</span>
              <div className="adm-list-actions">
                <button className="adm-btn adm-btn--ghost" type="button" onClick={() => onEdit(post)}>Edit</button>
                <button className="adm-btn adm-btn--danger" type="button" onClick={() => onDelete(post)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="adm-empty">No articles in the database yet. Write the first one.</p>
      )}
    </div>
  );
}

function LeadList({ leads }) {
  return (
    <div className="adm-panel">
      <div className="adm-bar">
        <div>
          <p className="adm-eyebrow">Inbox</p>
          <h1>Enquiries</h1>
        </div>
        <span className="adm-bar-spacer" />
        <span className="adm-meta">{leads.length} loaded</span>
      </div>
      {leads.length ? (
        <ul className="adm-list adm-list--leads">
          {leads.map(lead => (
            <li key={lead.id}>
              <div className="adm-list-main">
                <span className="adm-title">
                  {lead.name} — <a href={`mailto:${lead.email}`}>{lead.email}</a>
                </span>
                <span className="adm-meta">{formatWhen(lead.created_at)}</span>
                {lead.source_path ? <span className="adm-meta">{lead.source_path}</span> : null}
                {lead.timeline ? <span className="adm-meta">Timeline: {lead.timeline}</span> : null}
              </div>
              <p className="adm-lead-body">{lead.message}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="adm-empty">No enquiries yet. They appear here when the contact form saves to Neon.</p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------- shell */

export default function AdminPage() {
  const [state, setState] = useState('checking');
  const [missingConfig, setMissingConfig] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [tab, setTab] = useState('overview');
  const [posts, setPosts] = useState([]);
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState(null);
  const [editing, setEditing] = useState(null);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = 'Studio admin — ebookwriters.us';
    const meta = document.querySelector('meta[name="robots"]');
    if (meta) meta.setAttribute('content', 'noindex, nofollow');
  }, []);

  const refresh = useCallback(async () => {
    setError('');
    try {
      const [postData, leadData, overview] = await Promise.all([
        api('/api/posts?all=1'),
        api('/api/leads').catch(() => ({ leads: [] })),
        api('/api/admin/overview').catch(() => null),
      ]);
      setPosts(postData.posts || []);
      setLeads(leadData.leads || []);
      setStats(overview);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    api('/api/admin/session')
      .then(({ signedIn, missing, admin: sessionAdmin }) => {
        setMissingConfig(missing || null);
        setAdmin(sessionAdmin || null);
        setState(signedIn ? 'in' : 'out');
        if (signedIn) refresh();
      })
      .catch(() => setState('out'));
  }, [refresh]);

  async function signOut() {
    await api('/api/admin/session', { method: 'DELETE' }).catch(() => {});
    setState('out');
    setAdmin(null);
    setPosts([]);
    setLeads([]);
    setStats(null);
    setEditing(null);
  }

  async function remove(post) {
    // eslint-disable-next-line no-alert
    if (!window.confirm(`Delete “${post.title}”? This cannot be undone.`)) return;
    try {
      await api(`/api/posts/${encodeURIComponent(post.slug)}`, { method: 'DELETE' });
      setNotice(`Deleted “${post.title}”.`);
      refresh();
    } catch (err) {
      setError(err.message);
    }
  }

  function afterSave(result) {
    setEditing(null);
    setTab('posts');
    setNotice(
      result.rebuild?.triggered
        ? 'Saved. A rebuild was triggered — the article will be live shortly.'
        : `Saved. ${result.rebuild?.reason === 'draft'
          ? 'Kept as a draft.'
          : 'Set DEPLOY_HOOK_URL to rebuild automatically, or redeploy to publish it.'}`,
    );
    refresh();
  }

  if (state === 'checking') {
    return <div className="adm"><div className="adm-shell"><p className="adm-empty">Loading…</p></div></div>;
  }

  if (state === 'out') {
    return (
      <div className="adm">
        <SignIn
          missing={missingConfig}
          onDone={() => {
            setState('in');
            api('/api/admin/session').then(data => setAdmin(data.admin || null));
            refresh();
          }}
        />
      </div>
    );
  }

  return (
    <div className="adm">
      <aside className="adm-nav" aria-label="Admin navigation">
        <div className="adm-brand">
          <strong>ebookwriters.us</strong>
          <span>Studio admin</span>
        </div>
        <nav className="adm-nav-links">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'posts', label: 'Articles' },
            { id: 'leads', label: 'Enquiries' },
          ].map(item => (
            <button
              key={item.id}
              type="button"
              className={`adm-nav-link${tab === item.id && !editing ? ' is-on' : ''}`}
              onClick={() => { setEditing(null); setTab(item.id); setNotice(''); }}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="adm-nav-foot">
          <p>{admin?.name || 'Operator'}</p>
          <span>{admin?.email || 'Signed in'}</span>
          <button className="adm-btn adm-btn--ghost" type="button" onClick={signOut}>Sign out</button>
        </div>
      </aside>

      <div className="adm-shell">
        <div aria-live="polite">
          {error ? <p className="adm-error">{error}</p> : null}
          {notice ? <p className="adm-ok">{notice}</p> : null}
        </div>

        {editing ? (
          <PostEditor
            initial={editing}
            onCancel={() => setEditing(null)}
            onSaved={afterSave}
          />
        ) : null}

        {!editing && tab === 'overview' ? (
          <Overview
            stats={stats}
            onOpenPosts={() => setTab('posts')}
            onOpenLeads={() => setTab('leads')}
            onNewPost={() => { setNotice(''); setEditing({ ...EMPTY_POST }); }}
          />
        ) : null}

        {!editing && tab === 'posts' ? (
          <PostList
            posts={posts}
            onNew={() => { setNotice(''); setEditing({ ...EMPTY_POST }); }}
            onEdit={post => { setNotice(''); setEditing(post); }}
            onDelete={remove}
          />
        ) : null}

        {!editing && tab === 'leads' ? <LeadList leads={leads} /> : null}
      </div>
    </div>
  );
}
