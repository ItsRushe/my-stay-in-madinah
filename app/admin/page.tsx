import { createClient } from '../../lib/supabase/server';
import { adminLogout } from './actions';
import BookingCalendar from './BookingCalendar';

function statusBadge(status: string) {
  const styles: Record<string, { bg: string; color: string; label: string }> = {
    confirmed: { bg: '#d4edda', color: '#155724', label: 'Confirmed' },
    pending:   { bg: '#fff3cd', color: '#856404', label: 'Pending' },
    cancelled: { bg: '#f8d7da', color: '#721c24', label: 'Cancelled' },
  };
  const s = styles[status] || { bg: '#e9ecef', color: '#495057', label: status };
  return (
    <span style={{
      background: s.bg, color: s.color,
      padding: '3px 10px', fontSize: '11px', fontWeight: 600,
      letterSpacing: '0.08em', textTransform: 'uppercase', borderRadius: '2px',
    }}>
      {s.label}
    </span>
  );
}

function nights(checkIn: string, checkOut: string) {
  const a = new Date(checkIn), b = new Date(checkOut);
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [{ data: bookings }, { data: rooms }] = await Promise.all([
    supabase
      .from('bookings')
      .select('id, room_id, check_in, check_out, status, guest_name, guest_email, amount_paid, stripe_payment_intent, rooms(name)')
      .order('check_in', { ascending: true }),
    supabase.from('rooms').select('id, name').order('name'),
  ]);

  const allBookings = bookings || [];
  const allRooms = rooms || [];

  const confirmed = allBookings.filter(b => b.status === 'confirmed');
  const totalRevenue = confirmed.reduce((sum, b) => sum + (b.amount_paid || 0), 0);

  const today = new Date(); today.setHours(0, 0, 0, 0);
  const in30 = new Date(today); in30.setDate(today.getDate() + 30);
  const upcoming = confirmed.filter(b => new Date(b.check_in) >= today && new Date(b.check_in) <= in30);

  return (
    <div style={{ minHeight: '100vh', background: '#F9F8F4' }}>

      {/* Header */}
      <div style={{ background: '#1B2420', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '56px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img src="/icon-logo.png" alt="" style={{ width: '28px', opacity: 0.9 }} />
          <span style={{ color: '#F9F8F4', fontSize: '13px', fontWeight: 500, letterSpacing: '0.05em' }}>
            My Stay in Madinah
          </span>
          <span style={{ color: '#BA6A42', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            · Admin
          </span>
        </div>
        <form action={adminLogout}>
          <button type="submit" style={{
            background: 'transparent', border: '1px solid rgba(255,255,255,0.2)',
            color: 'rgba(255,255,255,0.6)', padding: '6px 16px', fontSize: '11px',
            letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer',
          }}>
            Sign out
          </button>
        </form>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 32px' }}>

        {/* Page title */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ margin: '0 0 4px', fontSize: '26px', fontWeight: 600, color: '#1B2420' }}>Dashboard</h1>
          <p style={{ margin: 0, fontSize: '13px', color: '#6B7470' }}>
            {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '40px' }}>
          {[
            { label: 'Total Bookings', value: allBookings.length.toString() },
            { label: 'Confirmed Stays', value: confirmed.length.toString() },
            { label: 'Total Revenue', value: `SAR ${totalRevenue.toLocaleString('en', { minimumFractionDigits: 2 })}` },
          ].map(stat => (
            <div key={stat.label} style={{ background: '#fff', border: '1px solid #E5E2DA', padding: '24px 28px' }}>
              <p style={{ margin: '0 0 8px', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9a9a90' }}>{stat.label}</p>
              <p style={{ margin: 0, fontSize: '28px', fontWeight: 600, color: '#1B2420' }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Room Availability Calendar */}
        <div style={{ background: '#fff', border: '1px solid #E5E2DA', padding: '28px 32px', marginBottom: '32px' }}>
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 600, color: '#1B2420' }}>Room Availability</h2>
            <p style={{ margin: 0, fontSize: '12px', color: '#9a9a90' }}>Next 60 days — scroll right to see more</p>
          </div>
          <BookingCalendar bookings={allBookings} rooms={allRooms} />
        </div>

        {/* Bookings Table */}
        <div style={{ background: '#fff', border: '1px solid #E5E2DA' }}>
          <div style={{ padding: '24px 28px', borderBottom: '1px solid #E5E2DA', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 600, color: '#1B2420' }}>All Bookings</h2>
              <p style={{ margin: 0, fontSize: '12px', color: '#9a9a90' }}>{allBookings.length} total record{allBookings.length !== 1 ? 's' : ''}</p>
            </div>
            {upcoming.length > 0 && (
              <span style={{ background: '#BA6A42', color: '#fff', padding: '4px 12px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {upcoming.length} upcoming in 30 days
              </span>
            )}
          </div>

          {allBookings.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center', color: '#9a9a90', fontSize: '14px' }}>
              No bookings yet. They will appear here once a guest completes checkout.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: '#F9F8F4' }}>
                    {['Order', 'Room', 'Guest', 'Email', 'Check-in', 'Check-out', 'Nights', 'Amount', 'Status'].map(h => (
                      <th key={h} style={{
                        padding: '12px 20px', textAlign: 'left', fontSize: '10px',
                        letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9a9a90',
                        fontWeight: 600, borderBottom: '1px solid #E5E2DA', whiteSpace: 'nowrap',
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allBookings.map((booking, i) => {
                    // @ts-ignore
                    const roomName = booking.rooms?.name || booking.room_id;
                    const n = nights(booking.check_in, booking.check_out);
                    return (
                      <tr key={booking.id} style={{ borderBottom: '1px solid #F0EDE6', background: i % 2 === 0 ? '#fff' : '#FDFCFA' }}>
                        <td style={{ padding: '14px 20px', color: '#BA6A42', fontWeight: 600, fontFamily: 'monospace', fontSize: '12px', whiteSpace: 'nowrap' }}>
                          #{booking.id.slice(0, 8).toUpperCase()}
                        </td>
                        <td style={{ padding: '14px 20px', color: '#1B2420', fontWeight: 500, whiteSpace: 'nowrap' }}>{roomName}</td>
                        <td style={{ padding: '14px 20px', color: '#1B2420', whiteSpace: 'nowrap' }}>{booking.guest_name || '—'}</td>
                        <td style={{ padding: '14px 20px', color: '#6B7470', whiteSpace: 'nowrap' }}>{booking.guest_email || '—'}</td>
                        <td style={{ padding: '14px 20px', color: '#1B2420', whiteSpace: 'nowrap' }}>{booking.check_in}</td>
                        <td style={{ padding: '14px 20px', color: '#1B2420', whiteSpace: 'nowrap' }}>{booking.check_out}</td>
                        <td style={{ padding: '14px 20px', color: '#6B7470', textAlign: 'center' }}>{n}</td>
                        <td style={{ padding: '14px 20px', color: '#1B2420', fontWeight: 500, whiteSpace: 'nowrap' }}>
                          {booking.amount_paid ? `SAR ${Number(booking.amount_paid).toFixed(2)}` : '—'}
                        </td>
                        <td style={{ padding: '14px 20px' }}>{statusBadge(booking.status)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
