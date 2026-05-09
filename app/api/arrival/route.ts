import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createAdminClient } from '../../../lib/supabase/admin';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, checkin_time, notes } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { error: dbError } = await supabase
      .from('arrivals')
      .insert({
        guest_name: name,
        phone,
        checkin_time: checkin_time || null,
        notes: notes || null,
        submitted_at: new Date().toISOString(),
      });

    if (dbError) {
      console.error('Supabase insert error:', dbError);
    }

    await resend.emails.send({
      from: 'My Stay in Madinah <info@mystayinmadinah.com>',
      to: ['info@mystayinmadinah.com'],
      subject: `New Guest Check-in — ${name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #1B2420;">
          <div style="background: #1B2420; padding: 32px; text-align: center; margin-bottom: 0;">
            <p style="color: #BA6A42; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; margin: 0 0 8px; font-family: Arial, sans-serif;">My Stay in Madinah</p>
            <h1 style="color: #F9F8F4; font-size: 24px; margin: 0; font-weight: normal;">New Guest Check-in</h1>
          </div>
          <div style="background: #BA6A42; height: 3px;"></div>
          <div style="background: #ffffff; border: 1px solid #E5E2DA; border-top: none; padding: 32px;">
            <table style="width: 100%; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 14px;">
              <tr style="border-bottom: 1px solid #F0EDE6;">
                <td style="padding: 12px 0; color: #9a9a90; width: 40%; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">Guest Name</td>
                <td style="padding: 12px 0; color: #1B2420; font-weight: 600;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #F0EDE6;">
                <td style="padding: 12px 0; color: #9a9a90; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">WhatsApp</td>
                <td style="padding: 12px 0; color: #1B2420; font-weight: 600;">
                  <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="color: #BA6A42;">${phone}</a>
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #F0EDE6;">
                <td style="padding: 12px 0; color: #9a9a90; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;">Check-in Time</td>
                <td style="padding: 12px 0; color: #1B2420;">${checkin_time || '—'}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; color: #9a9a90; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; vertical-align: top;">Notes</td>
                <td style="padding: 12px 0; color: #1B2420; white-space: pre-wrap;">${notes || '—'}</td>
              </tr>
            </table>
            <div style="margin-top: 28px; padding-top: 24px; border-top: 1px solid #F0EDE6; text-align: center;">
              <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="background: #25D366; color: white; padding: 12px 28px; text-decoration: none; font-family: Arial, sans-serif; font-size: 13px; font-weight: bold; letter-spacing: 0.1em;">
                OPEN IN WHATSAPP
              </a>
            </div>
          </div>
          <p style="text-align: center; color: #C0BAB0; font-size: 11px; font-family: Arial, sans-serif; margin-top: 24px;">
            Submitted via mystayinmadinah.com/arrival
          </p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Arrival submission error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
