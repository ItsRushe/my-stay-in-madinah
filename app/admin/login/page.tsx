'use client';

import { useActionState } from 'react';
import { adminLogin } from '../actions';

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(
    async (_: any, formData: FormData) => adminLogin(formData),
    null
  );

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#F9F8F4', padding: '24px',
    }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>

        {/* Logo area */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <img src="/icon-logo.png" alt="My Stay in Madinah" style={{ width: '64px', marginBottom: '16px' }} />
          <p style={{ margin: 0, fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#BA6A42', fontWeight: 600 }}>
            My Stay in Madinah
          </p>
          <p style={{ margin: '8px 0 0', fontSize: '13px', color: '#6B7470' }}>Admin Dashboard</p>
        </div>

        {/* Card */}
        <div style={{ background: '#fff', border: '1px solid #E5E2DA', padding: '40px 36px' }}>
          <h1 style={{ margin: '0 0 28px', fontSize: '20px', fontWeight: 600, color: '#1B2420' }}>Sign in</h1>

          <form action={action}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6B7470', marginBottom: '8px' }}>
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                autoFocus
                style={{
                  width: '100%', boxSizing: 'border-box', border: '1px solid #E5E2DA',
                  padding: '12px 14px', fontSize: '15px', color: '#1B2420',
                  background: '#F9F8F4', outline: 'none', borderRadius: 0,
                }}
              />
            </div>

            {state?.error && (
              <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#c0392b' }}>{state.error}</p>
            )}

            <button
              type="submit"
              disabled={pending}
              style={{
                width: '100%', background: pending ? '#A05835' : '#BA6A42', color: '#fff',
                border: 'none', padding: '14px', fontSize: '12px', letterSpacing: '0.18em',
                textTransform: 'uppercase', fontWeight: 600, cursor: pending ? 'not-allowed' : 'pointer',
                borderRadius: 0,
              }}
            >
              {pending ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '12px', color: '#9a9a90' }}>
          Set <code>ADMIN_PASSWORD</code> in your environment secrets to choose your password.
        </p>
      </div>
    </div>
  );
}
