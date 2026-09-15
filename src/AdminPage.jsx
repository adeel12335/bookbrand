/**
 * /admin — writing desk for the blog and a read-only view of the enquiries.
 *
 * Auth is a single shared password checked by api/admin/session.js, which sets
 * an HttpOnly signed cookie. Nothing here holds the password after sign-in, and
 * the route is noindex so it never reaches search results.
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
  image: '/assets/brand/faq-editorial-v2.png',
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

/* ------------------------------------------------------------------- login */

function SignIn({ onDone }) {
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      await api('/api/admin/session', { method: 'POST', body: JSON.stringify({ password }) });
      setPassword('');
      onDone();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="adm-login" onSubmit={submit}>
      <h1>Studio admin</h1>
      <p>Sign in to write articles and read enquiries.</p>
      <p className="adm-error" role="alert" hidden={!error}>{error}</p>
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
        {busy ? 'Checking…' : 'Sign in'}
      </button>
    </form>
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
    <div>
      <div className="adm-bar">
        <h1>{isNew ? 'New article' : `Editing — ${initial.title}`}</h1>
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
            aria-describedby={fields.title ? 'post-title-error' : undefined}
            onChange={e => set('title', e.target.value)}
          />
          {fields.title ? <em className="field-error" id="post-title-error">{fields.title}</em> : null}
        </label>
        <label className="adm-field">
          <span>Slug</span>
          <input
            value={post.slug}
            placeholder="generated-from-the-title…"
            autoComplete="off"
            spellCheck={false}
            aria-invalid={fields.slug ? 'true' : undefined}
            aria-describedby={fields.slug ? 'post-slug-error' : undefined}
            onChange={e => set('slug', e.target.value)}
          />
          {fields.slug ? <em className="field-error" id="post-slug-error">{fields.slug}</em> : null}
        </label>
      </div>

      <label className="adm-field">
        <span>Meta description</span>
        <textarea
          rows={2}
          value={post.description}
          aria-invalid={fields.description ? 'true' : undefined}
          aria-describedby={fields.description ? 'post-description-error' : undefined}
          onChange={e => set('description', e.target.value)}
        />
        {fields.description ? <em className="field-error" id="post-description-error">{fields.description}</em> : null}
      </label>
      <p className="adm-hint">This is the sentence Google shows under the title. Around 150–160 characters.</p>

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
          <span>Hero image path</span>
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
        // Sections have no stable id of their own; position is the identity here.
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

/* ------------------------------------------------------------------- lists */

function PostList({ posts, onNew, onEdit, onDelete }) {
  return (
    <div>
      <div className="adm-bar">
        <h1>Articles</h1>
        <span className="adm-bar-spacer" />
        <button className="adm-btn" type="button" onClick={onNew}>New article</button>
      </div>
      {posts.length ? (
        <ul className="adm-list">
          {posts.map(post => (
            <li key={post.slug}>
              <span className="adm-title">{post.title}</span>
              <span className={`adm-flag adm-flag--${post.published ? 'live' : 'draft'}`}>
                {post.published ? 'Live' : 'Draft'}
              </span>
              <span className="adm-meta">{post.dateLabel}</span>
              <button className="adm-btn adm-btn--ghost" type="button" onClick={() => onEdit(post)}>Edit</button>
              <button className="adm-btn adm-btn--danger" type="button" onClick={() => onDelete(post)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="adm-empty">No articles yet. Write the first one.</p>
      )}
    </div>
  );
}

function LeadList({ leads }) {
  return (
    <div>
      <div className="adm-bar">
        <h1>Enquiries</h1>
        <span className="adm-bar-spacer" />
        <span className="adm-meta">{leads.length} most recent</span>
      </div>
      {leads.length ? (
        <ul className="adm-list">
          {leads.map(lead => (
            <li key={lead.id}>
              <span className="adm-title">
                {lead.name} — <a href={`mailto:${lead.email}`}>{lead.email}</a>
              </span>
              <span className="adm-meta">{new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(lead.created_at))}</span>
              {lead.source_path ? <span className="adm-meta">{lead.source_path}</span> : null}
              <p className="adm-lead-body">{lead.message}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="adm-empty">No enquiries yet.</p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------- shell */

export default function AdminPage() {
  const [state, setState] = useState('checking'); // checking | out | in
  const [tab, setTab] = useState('posts');
  const [posts, setPosts] = useState([]);
  const [leads, setLeads] = useState([]);
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
      const [postData, leadData] = await Promise.all([
        api('/api/posts?all=1'),
        api('/api/leads').catch(() => ({ leads: [] })),
      ]);
      setPosts(postData.posts || []);
      setLeads(leadData.leads || []);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  useEffect(() => {
    api('/api/admin/session')
      .then(({ signedIn }) => {
        setState(signedIn ? 'in' : 'out');
        if (signedIn) refresh();
      })
      .catch(() => setState('out'));
  }, [refresh]);

  async function signOut() {
    await api('/api/admin/session', { method: 'DELETE' }).catch(() => {});
    setState('out');
    setPosts([]);
    setLeads([]);
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
    setNotice(
      result.rebuild?.triggered
        ? 'Saved. A rebuild was triggered — the article will be live in a minute or two.'
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
        <div className="adm-shell">
          <SignIn onDone={() => { setState('in'); refresh(); }} />
        </div>
      </div>
    );
  }

  return (
    <div className="adm">
      <div className="adm-shell">
        {editing ? (
          <PostEditor
            initial={editing}
            onCancel={() => setEditing(null)}
            onSaved={afterSave}
          />
        ) : (
          <div>
            <div className="adm-bar">
              <h1>Studio admin</h1>
              <span className="adm-bar-spacer" />
              <div className="adm-tabs">
                <button
                  className={`adm-tab${tab === 'posts' ? ' is-on' : ''}`}
                  type="button"
                  onClick={() => setTab('posts')}
                >
                  Articles
                </button>
                <button
                  className={`adm-tab${tab === 'leads' ? ' is-on' : ''}`}
                  type="button"
                  onClick={() => setTab('leads')}
                >
                  Enquiries
                </button>
              </div>
              <button className="adm-btn adm-btn--ghost" type="button" onClick={signOut}>Sign out</button>
            </div>

            <div aria-live="polite">
              {error ? <p className="adm-error">{error}</p> : null}
              {notice ? <p className="adm-ok">{notice}</p> : null}
            </div>

            {tab === 'posts' ? (
              <PostList
                posts={posts}
                onNew={() => { setNotice(''); setEditing({ ...EMPTY_POST }); }}
                onEdit={post => { setNotice(''); setEditing(post); }}
                onDelete={remove}
              />
            ) : (
              <LeadList leads={leads} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
