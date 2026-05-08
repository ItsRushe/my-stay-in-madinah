import type { Metadata } from 'next';
import PrintButton from './PrintButton';

export const metadata: Metadata = {
  title: 'House Rules — My Stay in Madinah',
  robots: { index: false },
};

export default function HouseRulesPage() {
  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: #fff !important; }
          @page { size: A4; margin: 18mm 16mm; }
        }
        body { margin: 0; padding: 0; background: #F9F8F4; }
      `}</style>

      <PrintButton />

      {/* Page */}
      <div style={{
        maxWidth: '680px', margin: '0 auto',
        padding: '48px 40px 60px',
        background: '#fff',
        minHeight: '100vh',
        fontFamily: 'Georgia, "Times New Roman", serif',
      }}>

        {/* Header */}
        <div style={{ borderBottom: '2px solid #1B2420', paddingBottom: '24px', marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ margin: '0 0 4px', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#BA6A42', fontFamily: 'Arial, sans-serif', fontWeight: 700 }}>
                My Stay in Madinah
              </p>
              <h1 style={{ margin: 0, fontSize: '26px', fontWeight: 700, color: '#1B2420', letterSpacing: '-0.01em' }}>
                House Rules & Guest Guide
              </h1>
            </div>
            <img src="/icon-logo.png" alt="" style={{ width: '44px', opacity: 0.85 }} />
          </div>
          <p style={{ margin: '10px 0 0', fontSize: '12px', color: '#6B7470', fontFamily: 'Arial, sans-serif' }}>
            Al-Aziziyyah District · Madinah, Saudi Arabia &nbsp;·&nbsp; info@mystayinmadinah.com
          </p>
        </div>

        {/* Welcome */}
        <p style={{ margin: '0 0 28px', fontSize: '14px', lineHeight: 1.7, color: '#4a4a45', fontStyle: 'italic' }}>
          We are honoured to host you in the Prophet's city. Please read the following guidelines to ensure
          a comfortable and respectful stay for all our guests. Our concierge team is always available
          to assist you.
        </p>

        {/* Two-column top section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>

          {/* Check-in / Check-out */}
          <div style={{ border: '1px solid #E5E2DA', padding: '18px 20px' }}>
            <p style={{ margin: '0 0 12px', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#BA6A42', fontFamily: 'Arial, sans-serif', fontWeight: 700 }}>
              Arrival & Departure
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
              <div>
                <p style={{ margin: '0 0 2px', fontSize: '10px', color: '#9a9a90', fontFamily: 'Arial, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Check-in</p>
                <p style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#1B2420' }}>3:00 PM</p>
              </div>
              <div style={{ width: '1px', background: '#E5E2DA' }} />
              <div>
                <p style={{ margin: '0 0 2px', fontSize: '10px', color: '#9a9a90', fontFamily: 'Arial, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Check-out</p>
                <p style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#1B2420' }}>11:00 AM</p>
              </div>
            </div>
          </div>

          {/* Concierge */}
          <div style={{ border: '1px solid #E5E2DA', padding: '18px 20px', background: '#1B2420' }}>
            <p style={{ margin: '0 0 6px', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#BA6A42', fontFamily: 'Arial, sans-serif', fontWeight: 700 }}>
              24/7 Concierge
            </p>
            <p style={{ margin: '0 0 4px', fontSize: '13px', color: '#F9F8F4', fontFamily: 'Arial, sans-serif', fontWeight: 600 }}>WhatsApp</p>
            <p style={{ margin: '0 0 8px', fontSize: '16px', color: '#F9F8F4', fontFamily: 'Arial, sans-serif', letterSpacing: '0.05em' }}>+966 50 815 1408</p>
            <p style={{ margin: 0, fontSize: '11px', color: 'rgba(249,248,244,0.5)', fontFamily: 'Arial, sans-serif' }}>For assistance, early check-in, late check-out, and any requests</p>
          </div>

        </div>

        {/* House Rules */}
        <div style={{ marginBottom: '28px' }}>
          <p style={{ margin: '0 0 14px', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#BA6A42', fontFamily: 'Arial, sans-serif', fontWeight: 700 }}>
            House Rules
          </p>

          {[
            { rule: 'Quiet Hours', detail: 'Please observe silence between 10:00 PM and 7:00 AM to respect all guests.' },
            { rule: 'No Smoking', detail: 'Smoking is strictly prohibited inside the rooms, corridors, and all building premises.' },
            { rule: 'No Parties or Events', detail: 'Gatherings, parties, and events are not permitted on the premises.' },
            { rule: 'Registered Guests Only', detail: 'Only registered guests may stay overnight. Please notify us in advance of any daytime visitors.' },
            { rule: 'Housekeeping', detail: 'Daily housekeeping is included. Please ensure your room is accessible each morning by 10:00 AM.' },
            { rule: 'Respectful Conduct', detail: 'We ask all guests to maintain respectful conduct in keeping with the sanctity of Madinah.' },
            { rule: 'Property & Amenities', detail: 'Please treat the property and its furnishings with care. Any damage will be charged accordingly.' },
            { rule: 'Key & Access Card', detail: 'Keep your room key safe. Lost keys must be reported immediately to the concierge.' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex', gap: '14px',
              padding: '11px 0',
              borderBottom: i < 7 ? '1px solid #F0EDE6' : 'none',
              alignItems: 'flex-start',
            }}>
              <span style={{ color: '#BA6A42', fontSize: '14px', lineHeight: '1', marginTop: '2px', flexShrink: 0 }}>—</span>
              <div>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#1B2420', display: 'block', marginBottom: '1px' }}>{item.rule}</span>
                <span style={{ fontSize: '12px', color: '#6B7470', lineHeight: 1.6, fontFamily: 'Arial, sans-serif' }}>{item.detail}</span>
              </div>
            </div>
          ))}
        </div>

        {/* WiFi + Emergency */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>

          <div style={{ border: '1px solid #E5E2DA', padding: '16px 20px' }}>
            <p style={{ margin: '0 0 8px', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#BA6A42', fontFamily: 'Arial, sans-serif', fontWeight: 700 }}>
              Wi-Fi Access
            </p>
            <p style={{ margin: '0 0 4px', fontSize: '12px', fontFamily: 'Arial, sans-serif', color: '#1B2420' }}>
              <strong>Network:</strong> provided on check-in card
            </p>
            <p style={{ margin: 0, fontSize: '12px', fontFamily: 'Arial, sans-serif', color: '#1B2420' }}>
              <strong>Password:</strong> provided on check-in card
            </p>
          </div>

          <div style={{ border: '1px solid #E5E2DA', padding: '16px 20px' }}>
            <p style={{ margin: '0 0 8px', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#BA6A42', fontFamily: 'Arial, sans-serif', fontWeight: 700 }}>
              Emergency Numbers
            </p>
            <p style={{ margin: '0 0 3px', fontSize: '12px', fontFamily: 'Arial, sans-serif', color: '#1B2420' }}>
              <strong>Police / Ambulance:</strong> 911
            </p>
            <p style={{ margin: '0 0 3px', fontSize: '12px', fontFamily: 'Arial, sans-serif', color: '#1B2420' }}>
              <strong>Civil Defence (Fire):</strong> 998
            </p>
            <p style={{ margin: 0, fontSize: '12px', fontFamily: 'Arial, sans-serif', color: '#1B2420' }}>
              <strong>Hospital:</strong> +966 14 845 5555
            </p>
          </div>

        </div>

        {/* Footer */}
        <div style={{ borderTop: '1px solid #E5E2DA', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ margin: 0, fontSize: '10px', color: '#9a9a90', fontFamily: 'Arial, sans-serif' }}>
            By staying with us you agree to these house rules.
          </p>
          <p style={{ margin: 0, fontSize: '10px', color: '#9a9a90', fontFamily: 'Arial, sans-serif' }}>
            mystayinmadinah.com
          </p>
        </div>

      </div>
    </>
  );
}
