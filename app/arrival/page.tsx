'use client';

import { useState } from 'react';

type State = 'idle' | 'loading' | 'success' | 'error';

export default function ArrivalPage() {
  const [state, setState] = useState<State>('idle');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [checkinTime, setCheckinTime] = useState('');
  const [notes, setNotes] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('loading');

    try {
      const res = await fetch('https://api.mystayinmadinah.com/arrival', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          checkin_time: checkinTime || null,
          notes: notes || null,
          source: 'website',
        }),
      });

      if (!res.ok) throw new Error('Failed');
      setState('success');
    } catch {
      setState('error');
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid #D5D0C8',
    padding: '10px 0',
    fontSize: '16px',
    color: '#1B2420',
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    WebkitAppearance: 'none',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#9a9a90',
    marginBottom: '8px',
  };

  return (
    <div style={{ minHeight: '100dvh', background: '#F9F8F4', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <div style={{ background: '#1B2420', padding: '28px 24px 32px' }}>
        <div style={{ maxWidth: '480px', margin: '0 auto' }}>
          <p style={{
            margin: '0 0 10px',
            fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase',
            color: '#BA6A42', fontWeight: 700,
          }}>
            My Stay in Madinah
          </p>
          <h1 style={{
            margin: '0 0 12px',
            fontSize: '28px', fontWeight: 700,
            color: '#F9F8F4', fontFamily: '"Playfair Display", Georgia, serif',
            lineHeight: 1.2,
          }}>
            Guest Check-in
          </h1>
          <p style={{
            margin: 0,
            fontSize: '14px', color: 'rgba(249,248,244,0.6)',
            fontWeight: 300, lineHeight: 1.6,
          }}>
            Please provide the following essential information before your scheduled arrival to ensure a smooth check-in process.
          </p>
        </div>
      </div>

      {/* Gold accent line */}
      <div style={{ height: '3px', background: '#BA6A42' }} />

      {/* Form */}
      <div style={{ flex: 1, padding: '36px 24px 48px', maxWidth: '480px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>

        {state === 'success' ? (
          <div style={{
            padding: '32px 24px',
            background: '#fff',
            border: '1px solid #E5E2DA',
            textAlign: 'center',
          }}>
            <div style={{
              width: '56px', height: '56px',
              background: 'rgba(186,106,66,0.1)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
              fontSize: '24px',
            }}>
              ✅
            </div>
            <h2 style={{
              margin: '0 0 10px',
              fontSize: '20px', fontWeight: 700,
              color: '#1B2420', fontFamily: '"Playfair Display", Georgia, serif',
            }}>
              We're expecting you
            </h2>
            <p style={{ margin: 0, fontSize: '15px', color: '#6B7470', lineHeight: 1.6 }}>
              Your check-in details will be sent to your WhatsApp shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

            {/* Booking reference / name */}
            <div>
              <label style={labelStyle}>Booking Reference or Guest Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Omar Abdullah or #A1B2C3"
                style={inputStyle}
                autoComplete="name"
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label style={labelStyle}>Your WhatsApp Number (with country code) *</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+966501234567"
                style={{ ...inputStyle, letterSpacing: '0.03em' }}
                dir="ltr"
                autoComplete="tel"
                inputMode="tel"
              />
              <p style={{ margin: '8px 0 0', fontSize: '11px', color: '#9a9a90' }}>
                We'll use this to send your room access details.
              </p>
            </div>

            {/* Expected check-in time */}
            <div>
              <label style={labelStyle}>Expected Check-in Time <span style={{ color: '#C0BAB0', fontWeight: 400, letterSpacing: '0.1em' }}>(optional)</span></label>
              <input
                type="time"
                value={checkinTime}
                onChange={e => setCheckinTime(e.target.value)}
                style={{ ...inputStyle, colorScheme: 'light' }}
                dir="ltr"
              />
              <p style={{ margin: '8px 0 0', fontSize: '11px', color: '#9a9a90' }}>
                Standard check-in is from 3:00 PM. Let us know if you plan to arrive earlier or later.
              </p>
            </div>

            {/* Notes */}
            <div>
              <label style={labelStyle}>Any special requests or notes? <span style={{ color: '#C0BAB0', fontWeight: 400, letterSpacing: '0.1em' }}>(optional)</span></label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="e.g. arriving with young children, dietary needs, extra towels..."
                rows={3}
                style={{
                  ...inputStyle,
                  resize: 'none',
                  display: 'block',
                  lineHeight: 1.6,
                  paddingTop: '10px',
                }}
              />
            </div>

            {/* Error */}
            {state === 'error' && (
              <p style={{
                margin: 0, padding: '14px 16px',
                background: '#fef2f2', border: '1px solid #fecaca',
                color: '#991b1b', fontSize: '13px', lineHeight: 1.5,
              }}>
                ❌ Something went wrong. Please try again or contact us on WhatsApp at +966 50 815 1408.
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={state === 'loading'}
              style={{
                width: '100%',
                background: state === 'loading' ? '#6B7470' : '#1B2420',
                color: '#F9F8F4',
                border: 'none',
                padding: '17px 24px',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                cursor: state === 'loading' ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s',
                fontFamily: 'inherit',
              }}
            >
              {state === 'loading' ? 'Sending…' : 'Submit Check-in Details'}
            </button>

            <p style={{ margin: '-16px 0 0', fontSize: '11px', color: '#9a9a90', textAlign: 'center', lineHeight: 1.6 }}>
              Need help? WhatsApp us at{' '}
              <a href="https://wa.me/966508151408" style={{ color: '#BA6A42', textDecoration: 'none' }}>
                +966 50 815 1408
              </a>
            </p>

          </form>
        )}

      </div>

      {/* Footer */}
      <div style={{ padding: '20px 24px', borderTop: '1px solid #E5E2DA', textAlign: 'center' }}>
        <p style={{ margin: 0, fontSize: '11px', color: '#C0BAB0' }}>
          © 2026 My Stay in Madinah · mystayinmadinah.com
        </p>
      </div>

    </div>
  );
}
