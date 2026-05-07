'use client';

import { useState, useTransition } from 'react';
import { updateRoomStatus, updateRoomRate } from '../../actions';

interface Props {
  roomId: string;
  initialActive: boolean;
  initialRate: number;
}

export default function RoomControls({ roomId, initialActive, initialRate }: Props) {
  const [active, setActive] = useState(initialActive);
  const [rate, setRate] = useState(initialRate);
  const [editingRate, setEditingRate] = useState(false);
  const [rateInput, setRateInput] = useState(String(initialRate));
  const [, startTransition] = useTransition();

  function toggleActive() {
    const next = !active;
    setActive(next);
    startTransition(() => updateRoomStatus(roomId, next));
  }

  function saveRate() {
    const val = parseFloat(rateInput);
    if (!isNaN(val) && val >= 0) {
      setRate(val);
      startTransition(async () => { await updateRoomRate(roomId, val); });
    }
    setEditingRate(false);
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>

      {/* Active toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          onClick={toggleActive}
          title={active ? 'Click to disable' : 'Click to enable'}
          style={{
            position: 'relative', width: '44px', height: '24px',
            background: active ? '#BA6A42' : '#D5D0C8',
            borderRadius: '12px', border: 'none', cursor: 'pointer',
            transition: 'background 0.2s', flexShrink: 0,
          }}
        >
          <span style={{
            position: 'absolute', top: '3px',
            left: active ? '22px' : '3px',
            width: '18px', height: '18px',
            background: '#fff', borderRadius: '50%',
            transition: 'left 0.2s', display: 'block',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          }} />
        </button>
        <span style={{
          fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: active ? '#BA6A42' : '#c0706a',
        }}>
          {active ? 'Active' : 'Coming Soon'}
        </span>
      </div>

      {/* Rate editor */}
      {editingRate ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', color: '#9a9a90' }}>SAR</span>
          <input
            autoFocus
            type="number"
            value={rateInput}
            onChange={e => setRateInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') saveRate(); if (e.key === 'Escape') setEditingRate(false); }}
            style={{
              width: '90px', border: 'none', borderBottom: '2px solid #BA6A42',
              background: 'transparent', fontSize: '22px', fontWeight: 700,
              color: '#BA6A42', outline: 'none',
            }}
          />
          <span style={{ fontSize: '13px', color: '#9a9a90' }}>/night</span>
          <button onClick={saveRate} style={{
            background: '#BA6A42', border: 'none', color: '#fff',
            padding: '4px 14px', fontSize: '12px', fontWeight: 600,
            cursor: 'pointer', borderRadius: '2px',
          }}>Save</button>
          <button onClick={() => setEditingRate(false)} style={{
            background: 'none', border: 'none', color: '#9a9a90',
            fontSize: '12px', cursor: 'pointer',
          }}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => { setRateInput(String(rate)); setEditingRate(true); }} style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          display: 'flex', alignItems: 'center', gap: '7px',
        }}>
          <span style={{ fontSize: '24px', fontWeight: 700, color: '#BA6A42' }}>
            SAR {rate} / night
          </span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#BA6A42" strokeWidth="2" strokeLinecap="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
      )}

    </div>
  );
}
