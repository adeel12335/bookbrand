import React, { useEffect, useRef, useState } from 'react';
import { IconCheck, IconMail, IconMapPin, IconPhone } from './icons.jsx';
import { contactIntro, siteContact } from './data.js';

export const reduceMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Scroll-reveal wrapper. Adds .is-in once the element enters the viewport. */
export function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (reduceMotion()) {
      node.classList.add('is-in');
      return undefined;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('is-in');
        io.disconnect();
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    io.observe(node);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${className}`.trim()} style={{ '--reveal-delay': `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

export function Eyebrow({ children, tone }) {
  return (
    <p className={`br-eyebrow${tone ? ` br-eyebrow-${tone}` : ''}`}>
      <span>{children}</span>
      <i aria-hidden="true" />
    </p>
  );
}

/**
 * reCAPTCHA v3 — invisible, scored. The script is only pulled in on pages that
 * actually carry the form, so Google is not loaded across the whole site. With
 * no site key configured the hook returns an empty token and the server skips
 * verification, so the form still works before the keys are in place.
 */
export function useRecaptcha() {
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';

  useEffect(() => {
    if (!siteKey || document.querySelector('script[data-recaptcha]')) return undefined;
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
    script.async = true;
    script.defer = true;
    script.setAttribute('data-recaptcha', '1');
    document.head.appendChild(script);
    return undefined;
  }, [siteKey]);

  return async function getToken(action) {
    if (!siteKey || !window.grecaptcha) return '';
    try {
      await new Promise(resolve => window.grecaptcha.ready(resolve));
      return await window.grecaptcha.execute(siteKey, { action });
    } catch {
      // A blocked or failed challenge must not stop the submit; the server
      // decides what to do with a missing token.
      return '';
    }
  };
}

export function Contact({ asPage = false }) {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [fieldErrors, setFieldErrors] = useState({});
  const [failure, setFailure] = useState('');
  const resultRef = useRef(null);
  const formRef = useRef(null);
  const getRecaptchaToken = useRecaptcha();
  const TitleTag = 'h2';

  useEffect(() => { if (status === 'sent') resultRef.current?.focus(); }, [status]);

  // Send the caret to whatever the server rejected, rather than leaving the
  // visitor to hunt for the red text.
  useEffect(() => {
    const first = Object.keys(fieldErrors)[0];
    if (first) formRef.current?.elements[first]?.focus();
  }, [fieldErrors]);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus('sending');
    setFieldErrors({});
    setFailure('');

    try {
      const recaptchaToken = await getRecaptchaToken('contact');
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
          timeline: data.get('timeline'),
          hp_trap: data.get('hp_trap'),
          recaptchaToken,
          sourcePath: `${window.location.pathname}${window.location.search}`,
        }),
      });
      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        setFieldErrors(payload.errors || {});
        setFailure(payload.error || 'Something went wrong on our side.');
        setStatus('error');
        return;
      }

      form.reset();
      setStatus('sent');
    } catch {
      setFailure('We could not reach the server.');
      setStatus('error');
    }
  }

  return (
    <section className={`br_contact${asPage ? ' br_contact--page' : ''}`} id="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="row align-items-center">
          <Reveal className="col-md-6">
            <div className="br_contact_info">
              <Eyebrow>{contactIntro.eyebrow}</Eyebrow>
              <TitleTag id="contact-title">
                {contactIntro.title} <span>{contactIntro.titleEm}</span>
              </TitleTag>
              <p>{contactIntro.lead}</p>
              <ul className="br_contact_points">
                {contactIntro.points.map(point => (
                  <li key={point}><IconCheck aria-hidden="true" />{point}</li>
                ))}
              </ul>
              <div className="br_contact_direct">
                <a href={`mailto:${siteContact.email}`}><IconMail aria-hidden="true" /> {siteContact.email}</a>
                <a href={siteContact.phoneHref}><IconPhone aria-hidden="true" /> {siteContact.phone}</a>
                <span><IconMapPin aria-hidden="true" /> {siteContact.address}</span>
              </div>
            </div>
          </Reveal>

          <Reveal className="col-md-6" delay={120}>
            <div className="br_contact_card">
              {status === 'sent' ? (
                <div className="br_contact_sent" ref={resultRef} tabIndex={-1}>
                  <h3>Thank you — your enquiry is with us</h3>
                  <p>
                    We have your project details and typically reply within 1–2 business days.
                    If it is urgent, email <a href={`mailto:${siteContact.email}`}>{siteContact.email}</a> directly.
                  </p>
                  <button type="button" className="btn-outline" onClick={() => setStatus('idle')}>
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form className="br_contact_form" ref={formRef} onSubmit={handleSubmit}>
                  <h3>Start your project</h3>
                  <label className="br_field">
                    <span>Your name</span>
                    <input
                      name="name"
                      autoComplete="name"
                      required
                      maxLength={120}
                      placeholder="Alex Morgan"
                      aria-invalid={fieldErrors.name ? 'true' : undefined}
                      aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                    />
                    {fieldErrors.name
                      ? <em className="br_field_error" id="name-error">{fieldErrors.name}</em>
                      : null}
                  </label>
                  <label className="br_field">
                    <span>Your email</span>
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={254}
                      placeholder="you@email.com"
                      aria-invalid={fieldErrors.email ? 'true' : undefined}
                      aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                    />
                    {fieldErrors.email
                      ? <em className="br_field_error" id="email-error">{fieldErrors.email}</em>
                      : null}
                  </label>
                  <input type="hidden" name="timeline" value="Within 3 months" />
                  <div className="br_contact_trap" aria-hidden="true">
                    <label>
                      Leave blank
                      <input
                        name="hp_trap"
                        tabIndex={-1}
                        autoComplete="off"
                        data-lpignore="true"
                        data-1p-ignore="true"
                        data-form-type="other"
                      />
                    </label>
                  </div>
                  <label className="br_field">
                    <span>Tell us about your book or project</span>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      maxLength={4000}
                      placeholder="The idea, who it is for, and what you want it to do for you."
                      aria-invalid={fieldErrors.message ? 'true' : undefined}
                      aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                      onInput={e => e.target.setCustomValidity('')}
                    />
                    {fieldErrors.message
                      ? <em className="br_field_error" id="message-error">{fieldErrors.message}</em>
                      : null}
                  </label>
                  <button type="submit" className="btn br_contact_submit" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending…' : 'Send enquiry'}
                  </button>
                  <p className="br_contact_note" role="status">
                    {status === 'error'
                      ? `${failure} Please try again, or email ${siteContact.email}.`
                      : 'We typically respond within 1–2 business days.'}
                  </p>
                  {import.meta.env.VITE_RECAPTCHA_SITE_KEY ? (
                    <p className="br_contact_note">
                      Protected by reCAPTCHA — the Google{' '}
                      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                      {' '}and{' '}
                      <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a>
                      {' '}apply.
                    </p>
                  ) : null}
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
