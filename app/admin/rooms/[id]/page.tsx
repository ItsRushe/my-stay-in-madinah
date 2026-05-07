import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '../../../../lib/supabase/server';

const ADMIN_COOKIE = 'msm_admin_session';

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
      letterSpacing: '0.08em', textTransform: 'uppercase' as const, borderRadius: '2px',
    }}>
      {s.label}
    </span>
  );
}

function nights(checkIn: string, checkOut: string) {
  const a = new Date(checkIn), b = new Date(checkOut);
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

export default async function RoomDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const cookieStore = await cookies();
  if (cookieStore.get(ADMIN_COOKIE)?.value !== 'authenticated') {
    redirect('/admin/login');
  }

  const { id } = await params;
  const supabase = await createClient();

  const [{ data: room }, { data: bookings }] = await Promise.all([
    supabase
      .from('rooms')
      .select('id, name, room_number, price_per_night, is_available')
      .eq('id', id)
      .single(),
    supabase
      .from('bookings')
      .select('id, room_id, check_in, check_out, status, guest_name, guest_email, amount_paid, stripe_payment_intent')
      .eq('room_id', id)
      .order('check_in', { ascending: false }),
  ]);

  if (!room) redirect('/admin');

  const allBookings = bookings || [];
  const confirmed = allBookings.filter(b => b.status === 'confirmed');
  const totalRevenue = confirmed.reduce((sum, b) => sum + (b.amount_paid || 0), 0);
  const active = room.is_available ?? true;

  const today = new Date(); today.setHours(0, 0, 0, 0);
  const activeBookings = allBookings.filter(b =>
    b.status === 'confirmed' && new Date(b.check_out) >= today
  );

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
        <Link href="/admin" style={{
          background: 'transparent', border: '1px solid rgba(255,255,255,0.2)',
          color: 'rgba(255,255,255,0.6)', padding: '6px 16px', fontSize: '11px',
          letterSpacing: '0.12em', textTransform: 'uppercase', textDecoration: 'none',
        }}>
          ← Dashboard
        </Link>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 32px' }}>

        {/* Room header */}
        <div style={{ background: '#fff', border: '1px solid #E5E2DA', padding: '28px 32px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                <span style={{ fontSize: '32px', fontWeight: 700, color: '#1B2420' }}>
                  {room.room_number ? `Room #${room.room_number}` : room.name}
                </span>
                <span style={{
                  background: active ? '#d4edda' : '#f8d7da',
                  color: active ? '#155724' : '#721c24',
                  padding: '3px 10px', fontSize: '11px', fontWeight: 600,
                  letterSpacing: '0.08em', textTransform: 'uppercase', borderRadius: '2px',
                }}>
                  {active ? 'Active' : 'Coming Soon'}
                </span>
              </div>
              {room.room_number && (
                <p style={{ margin: 0, fontSize: '14px', color: '#6B7470' }}>{room.name}</p>
              )}
            </div>
            <div style={{ fontSize: '24px', fontWeight: 600, color: '#BA6A42' }}>
              SAR {room.price_per_night} / night
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
          {[
            { label: 'Total Bookings', value: allBookings.length.toString() },
            { label: 'Active / Upcoming', value: activeBookings.length.toString() },
            { label: 'Total Revenue', value: `SAR ${totalRevenue.toLocaleString('en', { minimumFractionDigits: 2 })}` },
          ].map(stat => (
            <div key={stat.label} style={{ background: '#fff', border: '1px solid #E5E2DA', padding: '20px 24px' }}>
              <p style={{ margin: '0 0 6px', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9a9a90' }}>{stat.label}</p>
              <p style={{ margin: 0, fontSize: '24px', fontWeight: 600, color: '#1B2420' }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Bookings table */}
        <div style={{ background: '#fff', border: '1px solid #E5E2DA' }}>
          <div style={{ padding: '20px 28px', borderBottom: '1px solid #E5E2DA' }}>
            <h2 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: 600, color: '#1B2420' }}>Bookings for this Room</h2>
            <p style={{ margin: 0, fontSize: '12px', color: '#9a9a90' }}>{allBookings.length} total · most recent first</p>
          </div>

          {allBookings.length === 0 ? (
            <div style={{ padding: '60px', textAlign: 'center', color: '#9a9a90', fontSize: '14px' }}>
              No bookings for this room yet.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: '#F9F8F4' }}>
                    {['Order', 'Guest', 'Email', 'Check-in', 'Check-out', 'Nights', 'Amount', 'Status'].map(h => (
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
                    const n = nights(booking.check_in, booking.check_out);
                    return (
                      <tr key={booking.id} style={{ borderBottom: '1px solid #F0EDE6', background: i % 2 === 0 ? '#fff' : '#FDFCFA' }}>
                        <td style={{ padding: '14px 20px', color: '#BA6A42', fontWeight: 600, fontFamily: 'monospace', fontSize: '12px', whiteSpace: 'nowrap' }}>
                          #{booking.id.slice(0, 8).toUpperCase()}
                        </td>
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
