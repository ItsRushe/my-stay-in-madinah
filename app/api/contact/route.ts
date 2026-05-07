import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

const rateLimitMap = new Map<string, number>();

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  const last = rateLimitMap.get(ip) || 0;
  if (now - last < 60_000) {
    return NextResponse.json({ error: 'Please wait before sending another message.' }, { status: 429 });
  }
  rateLimitMap.set(ip, now);

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });

  const { name, email, check_in, check_out, message, botcheck } = body;

  if (botcheck) return NextResponse.json({ ok: true }); // silent honeypot
  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 });
  }

  const domain = process.env.NEXT_PUBLIC_BASE_URL || 'https://mystayinmadinah.com';

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
    to: 'info@mystayinmadinah.com',
    replyTo: email,
    subject: `New Enquiry — ${name}`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#EFEFEA;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#EFEFEA;padding:40px 16px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <tr>
          <td style="background:#1B2420;text-align:center;padding:28px 32px;">
            <img src="${domain}/icon-logo.png" alt="My Stay in Madinah" width="40" style="display:block;margin:0 auto 12px;"/>
            <p style="margin:0;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#BA6A42;font-weight:600;">NEW WEBSITE ENQUIRY</p>
          </td>
        </tr>
        <tr><td style="background:#BA6A42;height:3px;font-size:0;line-height:0;">&nbsp;</td></tr>

        <tr>
          <td style="background:#F9F8F4;padding:32px 32px 8px;">
            <h1 style="margin:0 0 4px;font-size:22px;font-weight:600;color:#1B2420;">${name}</h1>
            <p style="margin:0;font-size:13px;color:#BA6A42;letter-spacing:0.1em;text-transform:uppercase;">Direct enquiry via website</p>
          </td>
        </tr>

        <tr>
          <td style="background:#F9F8F4;padding:24px 32px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e0ddd6;background:#fff;">
              <tr>
                <td style="padding:13px 20px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#9a9a90;border-bottom:1px solid #f0ede6;width:35%;">Email</td>
                <td style="padding:13px 20px;font-size:14px;color:#1B2420;font-weight:500;border-bottom:1px solid #f0ede6;text-align:right;">${email}</td>
              </tr>
              ${check_in ? `<tr>
                <td style="padding:13px 20px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#9a9a90;border-bottom:1px solid #f0ede6;width:35%;">Check-in</td>
                <td style="padding:13px 20px;font-size:14px;color:#1B2420;font-weight:500;border-bottom:1px solid #f0ede6;text-align:right;">${check_in}</td>
              </tr>` : ''}
              ${check_out ? `<tr>
                <td style="padding:13px 20px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#9a9a90;border-bottom:1px solid #f0ede6;width:35%;">Check-out</td>
                <td style="padding:13px 20px;font-size:14px;color:#1B2420;font-weight:500;border-bottom:1px solid #f0ede6;text-align:right;">${check_out}</td>
              </tr>` : ''}
              <tr>
                <td colspan="2" style="padding:16px 20px;font-size:14px;color:#1B2420;line-height:1.7;white-space:pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</td>
              </tr>
            </table>

            <p style="margin:24px 0 0;font-size:12px;color:#9a9a90;">Reply directly to this email to respond to ${name}.</p>
          </td>
        </tr>

        <tr>
          <td style="background:#1B2420;padding:20px 32px;text-align:center;">
            <p style="margin:0;font-size:11px;color:#fff;opacity:0.4;">My Stay in Madinah · Website Enquiry</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
  });

  if (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Failed to send message. Please try WhatsApp instead.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
