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
}

interface Props {
  bookings: Booking[];
  rooms: Room[];
}

function addDays(date: Date, n: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function isoDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export default function BookingCalendar({ bookings, rooms }: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Array.from({ length: 60 }, (_, i) => addDays(today, i));

  // Build a lookup: roomId → Set of booked date strings
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

  const months: { label: string; days: Date[] }[] = [];
  let lastMonth = -1;
  days.forEach(d => {
    if (d.getMonth() !== lastMonth) {
      months.push({ label: d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }), days: [] });
      lastMonth = d.getMonth();
    }
    months[months.length - 1].days.push(d);
  });

  const cellW = 28;
  const rowH = 38;

  return (
    <div style={{ overflowX: 'auto', paddingBottom: '8px' }}>
      {/* Month headers */}
      <div style={{ display: 'flex', marginLeft: '160px', marginBottom: '4px' }}>
        {months.map((m, mi) => (
          <div key={mi} style={{
            width: m.days.length * cellW,
            fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase',
            color: '#BA6A42', fontWeight: 600, paddingLeft: '4px',
            borderLeft: '2px solid #E5E2DA', flexShrink: 0,
          }}>
            {m.label}
          </div>
        ))}
      </div>

      {/* Day numbers */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
        <div style={{ width: '160px', flexShrink: 0 }} />
        {days.map((d, i) => {
          const isToday = isoDate(d) === isoDate(today);
          return (
            <div key={i} style={{
              width: cellW, flexShrink: 0, textAlign: 'center',
              fontSize: '10px', color: isToday ? '#BA6A42' : '#9a9a90',
              fontWeight: isToday ? 700 : 400,
            }}>
              {d.getDate()}
            </div>
          );
        })}
      </div>

      {/* Room rows */}
      {rooms.map(room => (
        <div key={room.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
          <div style={{
            width: '160px', flexShrink: 0, fontSize: '12px', color: '#1B2420',
            fontWeight: 500, paddingRight: '12px', whiteSpace: 'nowrap',
            overflow: 'hidden', textOverflow: 'ellipsis',
          }}>
            {room.name}
          </div>
          <div style={{ display: 'flex' }}>
            {days.map((d, i) => {
              const ds = isoDate(d);
              const booked = bookedDays[room.id]?.has(ds);
              const bk = bookingByRoomDay[`${room.id}::${ds}`];
              const isToday = ds === isoDate(today);
              const isPending = bk?.status === 'pending';

              return (
                <div
                  key={i}
                  title={booked ? `#${bk?.id.slice(0, 6).toUpperCase()} (${bk?.status})` : 'Available'}
                  style={{
                    width: cellW - 2, height: rowH, flexShrink: 0, marginRight: '2px',
                    background: booked
                      ? isPending ? '#E5D5C5' : '#BA6A42'
                      : isToday ? '#F0EDE7' : '#F9F8F4',
                    border: isToday && !booked ? '1px solid #BA6A42' : '1px solid transparent',
                    borderRadius: '2px',
                    cursor: booked ? 'pointer' : 'default',
                  }}
                />
              );
            })}
          </div>
        </div>
      ))}

      {/* Legend */}
      <div style={{ display: 'flex', gap: '20px', marginTop: '12px', marginLeft: '160px', fontSize: '11px', color: '#6B7470' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '14px', height: '14px', background: '#BA6A42', borderRadius: '2px' }} />
          Confirmed
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '14px', height: '14px', background: '#E5D5C5', borderRadius: '2px' }} />
          Pending
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '14px', height: '14px', background: '#F9F8F4', border: '1px solid #E5E2DA', borderRadius: '2px' }} />
          Available
        </div>
      </div>
    </div>
  );
}
