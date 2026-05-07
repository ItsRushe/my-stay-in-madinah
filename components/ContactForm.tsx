'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type State = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const t = useTranslations('Contact');
  const [state, setState] = useState<State>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('loading');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = {
      name:      (form.elements.namedItem('name')      as HTMLInputElement).value,
      email:     (form.elements.namedItem('email')     as HTMLInputElement).value,
      check_in:  (form.elements.namedItem('check_in')  as HTMLInputElement).value,
      check_out: (form.elements.namedItem('check_out') as HTMLInputElement).value,
      message:   (form.elements.namedItem('message')   as HTMLTextAreaElement).value,
      botcheck:  (form.elements.namedItem('botcheck')  as HTMLInputElement).value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrorMsg(json.error || 'Something went wrong.');
        setState('error');
      } else {
        setState('success');
        form.reset();
      }
    } catch {
      setErrorMsg('Network error. Please try again or contact us on WhatsApp.');
      setState('error');
    }
  }

  if (state === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="font-playfair text-2xl font-medium text-ink mb-2">{t('success_title')}</h3>
        <p className="text-ink/50 font-light text-sm max-w-xs leading-relaxed">{t('success_sub')}</p>
        <button
          onClick={() => setState('idle')}
          className="mt-8 text-xs uppercase tracking-widest font-medium text-gold hover:text-ink transition-colors border-b border-gold hover:border-ink pb-0.5"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Honeypot */}
      <input type="text" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <label className="block text-xs font-medium tracking-widest uppercase text-ink/50 mb-3">{t('form_name')}</label>
          <input
            type="text"
            name="name"
            required
            placeholder={t('form_name_placeholder')}
            className="w-full border-b border-gray-200 bg-transparent pb-3 focus:outline-none focus:border-ink transition-colors font-light placeholder-gray-300 text-ink text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-medium tracking-widest uppercase text-ink/50 mb-3">{t('form_email')}</label>
          <input
            type="email"
            name="email"
            required
            placeholder={t('form_email_placeholder')}
            className="w-full border-b border-gray-200 bg-transparent pb-3 focus:outline-none focus:border-ink transition-colors font-light placeholder-gray-300 text-ink text-sm"
            dir="ltr"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div>
          <label className="block text-xs font-medium tracking-widest uppercase text-ink/50 mb-3">{t('form_checkin')}</label>
          <input
            type="date"
            name="check_in"
            className="w-full border-b border-gray-200 bg-transparent pb-3 focus:outline-none focus:border-ink transition-colors font-light text-ink/60 text-sm"
            dir="ltr"
          />
        </div>
        <div>
          <label className="block text-xs font-medium tracking-widest uppercase text-ink/50 mb-3">{t('form_checkout')}</label>
          <input
            type="date"
            name="check_out"
            className="w-full border-b border-gray-200 bg-transparent pb-3 focus:outline-none focus:border-ink transition-colors font-light text-ink/60 text-sm"
            dir="ltr"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium tracking-widest uppercase text-ink/50 mb-3">{t('form_message')}</label>
        <textarea
          name="message"
          rows={4}
          required
          placeholder={t('form_message_placeholder')}
          className="w-full border-b border-gray-200 bg-transparent pb-3 focus:outline-none focus:border-ink transition-colors font-light placeholder-gray-300 text-ink text-sm resize-none"
        />
      </div>

      {state === 'error' && (
        <p className="text-red-500 text-sm font-light">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={state === 'loading'}
        className="w-full bg-ink text-ivory py-4 text-sm font-medium tracking-widest uppercase hover:bg-gold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {state === 'loading' ? 'Sending…' : t('form_submit')}
      </button>
    </form>
  );
}
