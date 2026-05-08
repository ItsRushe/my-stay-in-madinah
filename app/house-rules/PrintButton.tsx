'use client';

export default function PrintButton() {
  return (
    <div className="no-print" style={{ position: 'fixed', top: '20px', right: '24px', zIndex: 100 }}>
      <button
        onClick={() => window.print()}
        style={{
          background: '#1B2420', color: '#F9F8F4',
          border: 'none', padding: '10px 22px',
          fontSize: '12px', fontWeight: 600, letterSpacing: '0.12em',
          textTransform: 'uppercase', cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        }}
      >
        Save as PDF ↓
      </button>
    </div>
  );
}
