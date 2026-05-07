'use client';

interface Booking {
  id: string;
  room_id: string;
  check_in: string;
  check_out: string;
  status: string;
}

interface Room {
  id: string;
  name: string;
  room_number: string | null;
}

interface Props {
  bookings: Booking[];
  rooms: Room[];
  days?: number;
}

function addDays(date: Date, n: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export default function BookingCalendar({ bookings, rooms, days: numDays = 7 }: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Array.from({ length: numDays }, (_, i) => addDays(today, i));

  const bookedDays: Record<string, Set<string>> = {};
  const bookingByRoomDay: Record<string, Booking> = {};

  rooms.forEach(r => { bookedDays[r.id] = new Set(); });

  bookings
    .filter(b => b.status === 'confirmed' || b.status === 'pending')
    .forEach(b => {
      let cur = new Date(b.check_in);
      cur.setHours(0, 0, 0, 0);
      const end = new Date(b.check_out);
      end.setHours(0, 0, 0, 0);
      while (cur < end) {
        const ds = isoDate(cur);
        bookedDays[b.room_id]?.add(ds);
        bookingByRoomDay[`${b.room_id}::${ds}`] = b;
        cur = addDays(cur, 1);
      }
    });

  const cellW = 44;
  const rowH = 36;

  return (
    <div style={{ paddingBottom: '8px' }}>
      {/* Day headers */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
        <div style={{ width: '90px', flexShrink: 0 }} />
        {days.map((d, i) => {
          const isToday = isoDate(d) === isoDate(today);
          const dayName = d.toLocaleDateString('en-GB', { weekday: 'short' });
          const dayNum  = d.getDate();
          const monthLbl = d.toLocaleDateString('en-GB', { month: 'short' });
          return (
            <div key={i} style={{
              width: cellW, flexShrink: 0, textAlign: 'center',
              paddingBottom: '4px',
              borderBottom: isToday ? '2px solid #BA6A42' : '2px solid transparent',
            }}>
              <div style={{ fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: isToday ? '#BA6A42' : '#9a9a90', fontWeight: 600 }}>
                {dayName}
              </div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: isToday ? '#BA6A42' : '#1B2420', lineHeight: 1.2 }}>
                {dayNum}
              </div>
              <div style={{ fontSize: '9px', color: '#9a9a90' }}>{monthLbl}</div>
            </div>
          );
        })}
      </div>

      {/* Room rows */}
      {rooms.map(room => {
        const label = room.room_number ? `#${room.room_number}` : room.id.split('-').map(w => w[0].toUpperCase()).join('');
        return (
          <div key={room.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
            <div style={{
              width: '90px', flexShrink: 0, fontSize: '13px', color: '#1B2420',
              fontWeight: 700, paddingRight: '10px', whiteSpace: 'nowrap',
            }}>
              {label}
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              {days.map((d, i) => {
                const ds = isoDate(d);
                const booked = bookedDays[room.id]?.has(ds);
                const bk = bookingByRoomDay[`${room.id}::${ds}`];
                const isToday = ds === isoDate(today);
                const isPending = bk?.status === 'pending';

                return (
                  <div
                    key={i}
                    title={booked ? `#${bk?.id.slice(0, 6).toUpperCase()} · ${bk?.status}` : 'Available'}
                    style={{
                      width: cellW, height: rowH, flexShrink: 0,
                      background: booked
                        ? isPending ? '#E5D5C5' : '#BA6A42'
                        : isToday ? '#F0EDE7' : '#F9F8F4',
                      border: isToday && !booked ? '1px solid #BA6A42' : '1px solid #E5E2DA',
                      borderRadius: '4px',
                      cursor: booked ? 'pointer' : 'default',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    {booked && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="white" opacity="0.7">
                        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Legend */}
      <div style={{ display: 'flex', gap: '20px', marginTop: '14px', marginLeft: '90px', fontSize: '11px', color: '#6B7470' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '14px', height: '14px', background: '#BA6A42', borderRadius: '3px' }} />
          Confirmed
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '14px', height: '14px', background: '#E5D5C5', borderRadius: '3px' }} />
          Pending
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '14px', height: '14px', background: '#F9F8F4', border: '1px solid #E5E2DA', borderRadius: '3px' }} />
          Available
        </div>
      </div>
    </div>
  );
}
