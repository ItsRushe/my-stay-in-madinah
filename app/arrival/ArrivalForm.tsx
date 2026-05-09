'use client';

import { useState, useEffect } from 'react';

type State = 'idle' | 'loading' | 'success' | 'error';

export default function ArrivalForm() {
  const [state, setState] = useState<State>('idle');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [checkinTime, setCheckinTime] = useState('');
  const [notes, setNotes] = useState('');
  const [bookingId, setBookingId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const b = params.get('b');
    if (b) setBookingId(b);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('loading');

    const payload: Record<string, string> = {
      name,
      phone,
      source: 'website',
    };
    if (checkinTime) payload.checkin_time = checkinTime;
    if (notes) payload.notes = notes;
    if (bookingId) payload.booking_id = bookingId;

    try {
      const res = await fetch('https://api.mystayinmadinah.com/arrival', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setState('success');
    } catch {
      setState('error');
    }
  }

  if (state === 'success') {
    return (
      <div className="bg-white border border-gray-100 shadow-sm p-12 md:p-16 text-center">
        <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h2 className="font-playfair text-3xl font-medium text-ink mb-3">We're expecting you</h2>
        <p className="text-ink/60 font-light leading-relaxed max-w-sm mx-auto">
          Your check-in details have been received. We'll be in touch on WhatsApp shortly with your room access information.
        </p>
        <div className="mt-10 pt-8 border-t border-gray-100">
          <p className="text-xs text-ink/30 uppercase tracking-widest font-medium">Need immediate help?</p>
          <a
            href="https://wa.me/966508151408"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-gold hover:text-ink transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.031 0C5.385 0 .003 5.385.003 12.031c0 2.126.556 4.198 1.613 6.02L.03 24l6.105-1.602a11.968 11.968 0 0 0 5.896 1.542h.005c6.643 0 12.025-5.384 12.025-12.028C24.055 5.385 18.675 0 12.031 0zm-.005 21.954a9.982 9.982 0 0 1-5.09-1.39l-.365-.217-3.784.992.998-3.69-.237-.377a9.96 9.96 0 0 1-1.523-5.27C1.995 6.486 6.483 2 12.031 2c5.545 0 10.033 4.488 10.033 10.003 0 5.513-4.488 10-10.038 10h-.001zm5.505-7.519c-.302-.151-1.787-.882-2.064-.983-.277-.101-.48-.151-.681.151-.202.302-.78 1.034-.956 1.235-.177.202-.353.227-.655.076-1.574-.789-2.73-1.66-3.784-3.32-.177-.278.177-.278.756-1.41.076-.151.038-.278-.038-.428-.076-.151-.681-1.636-.932-2.24-.246-.59-.496-.51-.681-.52-.177-.01-.378-.01-.58-.01-.202 0-.529.076-.806.378-.277.302-1.058 1.034-1.058 2.518 0 1.484 1.084 2.92 1.235 3.12.151.202 2.116 3.224 5.127 4.524 1.965.848 2.704.899 3.484.75.78-.151 2.368-.968 2.704-1.902.336-.934.336-1.737.236-1.903-.101-.166-.378-.267-.68-.418z"/>
            </svg>
            +966 50 815 1408
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold hidden md:block" />
      <div className="bg-white border border-gray-100 shadow-[0_8px_60px_rgba(27,36,32,0.10)] p-8 md:p-12 md:ml-6">

        <div className="mb-10">
          <h2 className="font-playfair text-3xl font-medium text-ink mb-2">Your Arrival Details</h2>
          <p className="text-ink/50 font-light text-sm leading-relaxed">
            All fields marked * are required. This takes less than a minute.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-9">

          <div>
            <label className="block text-xs font-medium tracking-widest uppercase text-ink/50 mb-3">
              Guest Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Omar Abdullah"
              autoComplete="name"
              className="w-full border-b border-gray-200 bg-transparent pb-3 focus:outline-none focus:border-ink transition-colors font-light placeholder-gray-300 text-ink text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium tracking-widest uppercase text-ink/50 mb-3">
              WhatsApp Number (with country code) *
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="+447123456789"
              autoComplete="tel"
              inputMode="tel"
              dir="ltr"
              className="w-full border-b border-gray-200 bg-transparent pb-3 focus:outline-none focus:border-ink transition-colors font-light placeholder-gray-300 text-ink text-sm tracking-wide"
            />
            <p className="mt-2 text-xs text-ink/35 font-light">We'll send your room access details to this number.</p>
          </div>

          <div>
            <label className="block text-xs font-medium tracking-widest uppercase text-ink/50 mb-3">
              Expected Check-in Time{' '}
              <span className="text-ink/25 normal-case tracking-normal font-light">(optional)</span>
            </label>
            <input
              type="time"
              value={checkinTime}
              onChange={e => setCheckinTime(e.target.value)}
              dir="ltr"
              className="w-full border-b border-gray-200 bg-transparent pb-3 focus:outline-none focus:border-ink transition-colors font-light text-ink/60 text-sm"
              style={{ colorScheme: 'light' }}
            />
            <p className="mt-2 text-xs text-ink/35 font-light">Standard check-in from 3:00 PM. Let us know if you plan to arrive earlier or later.</p>
          </div>

          <div>
            <label className="block text-xs font-medium tracking-widest uppercase text-ink/50 mb-3">
              Special Requests or Notes{' '}
              <span className="text-ink/25 normal-case tracking-normal font-light">(optional)</span>
            </label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="e.g. travelling with young children, need extra towels, dietary requirements…"
              rows={3}
              className="w-full border-b border-gray-200 bg-transparent pb-3 focus:outline-none focus:border-ink transition-colors font-light placeholder-gray-300 text-ink text-sm resize-none"
            />
          </div>

          {state === 'error' && (
            <div className="bg-red-50 border border-red-200 p-4 text-sm text-red-700 font-light leading-relaxed">
              Something went wrong. Please try again, or reach us on WhatsApp at{' '}
              <a href="https://wa.me/966508151408" className="font-medium underline">+966 50 815 1408</a>.
            </div>
          )}

          <button
            type="submit"
            disabled={state === 'loading'}
            className="w-full bg-ink text-ivory py-4 text-sm font-medium tracking-widest uppercase hover:bg-gold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {state === 'loading' ? 'Sending…' : 'Submit Check-in Details'}
          </button>

        </form>
      </div>
    </div>
  );
}
