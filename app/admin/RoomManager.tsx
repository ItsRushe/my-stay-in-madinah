'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { updateRoomStatus, updateRoomRate, updateRoomNumber } from './actions';

interface Room {
  id: string;
  name: string;
  room_number: string | null;
  price_per_night: number;
  is_available: boolean | null;
}

interface Props {
  rooms: Room[];
}

export default function RoomManager({ rooms: initial }: Props) {
  const [rooms, setRooms] = useState<Room[]>(initial);
  const [editingRate, setEditingRate] = useState<string | null>(null);
  const [editingNumber, setEditingNumber] = useState<string | null>(null);
  const [rateValues, setRateValues] = useState<Record<string, string>>({});
  const [numberValues, setNumberValues] = useState<Record<string, string>>({});
  const [, startTransition] = useTransition();

  function toggleActive(room: Room) {
    const next = !(room.is_available ?? true);
    setRooms(prev => prev.map(r => r.id === room.id ? { ...r, is_available: next } : r));
    startTransition(() => updateRoomStatus(room.id, next));
  }

  function startEditRate(room: Room) {
    setEditingRate(room.id);
    setRateValues(prev => ({ ...prev, [room.id]: String(room.price_per_night) }));
  }

  function saveRate(room: Room) {
    const val = parseFloat(rateValues[room.id] ?? '');
    if (!isNaN(val) && val >= 0) {
      setRooms(prev => prev.map(r => r.id === room.id ? { ...r, price_per_night: val } : r));
      startTransition(async () => { await updateRoomRate(room.id, val); });
    }
    setEditingRate(null);
  }

  function startEditNumber(room: Room) {
    setEditingNumber(room.id);
    setNumberValues(prev => ({ ...prev, [room.id]: room.room_number ?? '' }));
  }

  function saveNumber(room: Room) {
    const val = numberValues[room.id] ?? '';
    setRooms(prev => prev.map(r => r.id === room.id ? { ...r, room_number: val || null } : r));
    startTransition(() => updateRoomNumber(room.id, val));
    setEditingNumber(null);
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
      {rooms.map(room => {
        const active = room.is_available ?? true;
        const isEditingR = editingRate === room.id;
        const isEditingN = editingNumber === room.id;

        return (
          <div key={room.id} style={{
            background: '#fff', border: `1px solid ${active ? '#E5E2DA' : '#f0c0c0'}`,
            borderRadius: '4px', overflow: 'hidden',
          }}>
            {/* Status bar */}
            <div style={{
              height: '4px',
              background: active ? '#BA6A42' : '#e0c0c0',
            }} />

            <div style={{ padding: '16px' }}>
              {/* Room number */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                {isEditingN ? (
                  <div style={{ display: 'flex', gap: '6px', flex: 1 }}>
                    <input
                      autoFocus
                      value={numberValues[room.id] ?? ''}
                      onChange={e => setNumberValues(prev => ({ ...prev, [room.id]: e.target.value }))}
                      onKeyDown={e => { if (e.key === 'Enter') saveNumber(room); if (e.key === 'Escape') setEditingNumber(null); }}
                      placeholder="e.g. 101"
                      style={{
                        flex: 1, border: 'none', borderBottom: '1px solid #BA6A42',
                        background: 'transparent', fontSize: '20px', fontWeight: 700,
                        color: '#1B2420', outline: 'none', width: '80px',
                      }}
                    />
                    <button onClick={() => saveNumber(room)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#BA6A42', fontSize: '12px', fontWeight: 600 }}>Save</button>
                    <button onClick={() => setEditingNumber(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9a9a90', fontSize: '12px' }}>✕</button>
                  </div>
                ) : (
                  <button onClick={() => startEditNumber(room)} style={{
                    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                    textAlign: 'left', display: 'flex', alignItems: 'center', gap: '6px',
                  }}>
                    <span style={{ fontSize: '20px', fontWeight: 700, color: '#1B2420' }}>
                      {room.room_number ? `#${room.room_number}` : <span style={{ color: '#ccc', fontSize: '14px' }}>Set room #</span>}
                    </span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#BA6A42" strokeWidth="2" strokeLinecap="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                )}

                {/* Active toggle */}
                <button
                  onClick={() => toggleActive(room)}
                  title={active ? 'Click to disable' : 'Click to enable'}
                  style={{
                    position: 'relative', width: '36px', height: '20px',
                    background: active ? '#BA6A42' : '#D5D0C8',
                    borderRadius: '10px', border: 'none', cursor: 'pointer',
                    transition: 'background 0.2s', flexShrink: 0,
                  }}
                >
                  <span style={{
                    position: 'absolute', top: '2px',
                    left: active ? '18px' : '2px',
                    width: '16px', height: '16px',
                    background: '#fff', borderRadius: '50%',
                    transition: 'left 0.2s', display: 'block',
                  }} />
                </button>
              </div>

              {/* Room name */}
              <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#6B7470', fontWeight: 500, lineHeight: 1.3 }}>
                {room.name}
              </p>

              {/* Status label */}
              <p style={{ margin: '0 0 12px', fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: active ? '#BA6A42' : '#c0706a', fontWeight: 600 }}>
                {active ? 'Active' : 'Coming Soon'}
              </p>

              {/* Rate */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid #F0EDE6' }}>
                {isEditingR ? (
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flex: 1 }}>
                    <span style={{ fontSize: '11px', color: '#9a9a90' }}>SAR</span>
                    <input
                      autoFocus
                      type="number"
                      value={rateValues[room.id] ?? ''}
                      onChange={e => setRateValues(prev => ({ ...prev, [room.id]: e.target.value }))}
                      onKeyDown={e => { if (e.key === 'Enter') saveRate(room); if (e.key === 'Escape') setEditingRate(null); }}
                      style={{
                        width: '70px', border: 'none', borderBottom: '1px solid #BA6A42',
                        background: 'transparent', fontSize: '14px', fontWeight: 600,
                        color: '#1B2420', outline: 'none',
                      }}
                    />
                    <button onClick={() => saveRate(room)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#BA6A42', fontSize: '11px', fontWeight: 600 }}>Save</button>
                    <button onClick={() => setEditingRate(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9a9a90', fontSize: '11px' }}>✕</button>
                  </div>
                ) : (
                  <button onClick={() => startEditRate(room)} style={{
                    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                    display: 'flex', alignItems: 'center', gap: '5px',
                  }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#1B2420' }}>SAR {room.price_per_night}/night</span>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#BA6A42" strokeWidth="2" strokeLinecap="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </button>
                )}

                <Link
                  href={`/admin/rooms/${room.id}`}
                  style={{
                    fontSize: '11px', color: '#BA6A42', fontWeight: 600,
                    textDecoration: 'none', letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  View →
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
