import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
});

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    if (secret) {
        event = stripe.webhooks.constructEvent(body, signature, secret);
    } else {
        event = JSON.parse(body);
    }
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const bookingId = session.metadata?.booking_id; 

    if (bookingId) {
      // 1. Confirm in Database (guest_name / guest_email require those columns — add via Supabase SQL editor if missing)
      await supabaseAdmin
        .from('bookings')
        .update({ 
          status: 'confirmed',
          stripe_payment_intent: session.payment_intent as string,
          guest_name: session.customer_details?.name || null,
          guest_email: session.customer_details?.email || null,
          amount_paid: session.amount_total ? session.amount_total / 100 : null,
        })
        .eq('id', bookingId);

      // 2. Fetch the room name for the email
      const { data: bookingData } = await supabaseAdmin
        .from('bookings')
        .select('room_id, check_in, check_out, rooms(name)')
        .eq('id', bookingId)
        .single();

      const guestEmail = session.customer_details?.email;
      const guestName = session.customer_details?.name || "Valued Guest";
      // @ts-ignore
      const roomName = bookingData?.rooms?.name || "Premium Room";
      const checkIn = bookingData?.check_in || "";
      const checkOut = bookingData?.check_out || "";
      const roomId = bookingData?.room_id || "";
      const orderNumber = bookingId.split('-')[0].toUpperCase();
      const domain = process.env.NEXT_PUBLIC_BASE_URL || "https://mystayinmadinah.com";

      const checkinGuideUrl = roomId === 'executive-king' ? `${domain}/checkin/room-3?session_id=${session.id}` : null;

      // 3. SEND THE LUXURY CONFIRMATION EMAIL
      if (guestEmail) {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
          to: guestEmail,
          subject: `Booking Confirmed — ${roomName} | My Stay in Madinah`,
          html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Booking Confirmed</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600&display=swap');
  </style>
</head>
<body style="margin:0;padding:0;background-color:#EFEFEA;font-family:Georgia,'Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#EFEFEA;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="background-color:#1B2420;text-align:center;padding:36px 40px 28px;">
              <img src="${domain}/icon-logo.png" alt="My Stay in Madinah" width="48" style="display:block;margin:0 auto 16px;" />
              <p style="margin:0;font-family:'Jost',Arial,sans-serif;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#BA6A42;font-weight:500;">My Stay in Madinah</p>
            </td>
          </tr>

          <!-- GOLD DIVIDER -->
          <tr>
            <td style="background-color:#BA6A42;height:3px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- CONFIRMATION BADGE -->
          <tr>
            <td style="background-color:#F9F8F4;text-align:center;padding:40px 40px 32px;">
              <table cellpadding="0" cellspacing="0" style="display:inline-table;border:1px solid #e0ddd6;padding:10px 28px;margin-bottom:24px;">
                <tr>
                  <td style="font-family:Georgia,serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#BA6A42;">Reservation Confirmed</td>
                </tr>
              </table>
              <h1 style="margin:0 0 12px;font-family:Georgia,'Times New Roman',serif;font-size:30px;font-weight:normal;color:#1B2420;line-height:1.25;">Your room is reserved.</h1>
              <p style="margin:0;font-family:Arial,sans-serif;font-size:15px;color:#5a5a52;font-weight:300;line-height:1.6;">
                Dear ${guestName}, your booking at <strong style="color:#1B2420;font-weight:600;">${roomName}</strong> has been confirmed and your payment processed successfully.
              </p>
            </td>
          </tr>

          <!-- BOOKING DETAILS CARD -->
          <tr>
            <td style="background-color:#F9F8F4;padding:0 40px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e0ddd6;background-color:#ffffff;">
                <!-- Card Header -->
                <tr>
                  <td colspan="2" style="padding:18px 24px;border-bottom:1px solid #e0ddd6;">
                    <p style="margin:0;font-family:Arial,sans-serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;color:#BA6A42;">Booking Details</p>
                  </td>
                </tr>
                <!-- Order Number -->
                <tr>
                  <td style="padding:16px 24px 8px;font-family:Arial,sans-serif;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:#9a9a90;">Order Number</td>
                  <td style="padding:16px 24px 8px;font-family:Georgia,serif;font-size:15px;color:#1B2420;text-align:right;">#${orderNumber}</td>
                </tr>
                <!-- Divider -->
                <tr><td colspan="2" style="padding:0 24px;"><div style="border-top:1px solid #f0ede6;"></div></td></tr>
                <!-- Room -->
                <tr>
                  <td style="padding:14px 24px 8px;font-family:Arial,sans-serif;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:#9a9a90;">Room</td>
                  <td style="padding:14px 24px 8px;font-family:Georgia,serif;font-size:15px;color:#1B2420;text-align:right;">${roomName}</td>
                </tr>
                <!-- Divider -->
                <tr><td colspan="2" style="padding:0 24px;"><div style="border-top:1px solid #f0ede6;"></div></td></tr>
                <!-- Check-in -->
                <tr>
                  <td style="padding:14px 24px 8px;font-family:Arial,sans-serif;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:#9a9a90;">Check-in</td>
                  <td style="padding:14px 24px 8px;font-family:Georgia,serif;font-size:15px;color:#1B2420;text-align:right;">${checkIn} &nbsp;&middot;&nbsp; 3:00 PM</td>
                </tr>
                <!-- Divider -->
                <tr><td colspan="2" style="padding:0 24px;"><div style="border-top:1px solid #f0ede6;"></div></td></tr>
                <!-- Check-out -->
                <tr>
                  <td style="padding:14px 24px 24px;font-family:Arial,sans-serif;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:#9a9a90;">Check-out</td>
                  <td style="padding:14px 24px 24px;font-family:Georgia,serif;font-size:15px;color:#1B2420;text-align:right;">${checkOut} &nbsp;&middot;&nbsp; 11:00 AM</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- GUESTBOOK CTA -->
          <tr>
            <td style="background-color:#F9F8F4;padding:0 40px 48px;text-align:center;">
              <p style="margin:0 0 24px;font-family:Arial,sans-serif;font-size:14px;color:#5a5a52;font-weight:300;line-height:1.7;">
                We have prepared your <strong style="color:#1B2420;">Digital Guestbook</strong> with everything you need for arrival — property address, house rules, Wi-Fi details, and your dedicated concierge contact.${checkinGuideUrl ? ` Your <strong style="color:#1B2420;">Check-In Guide</strong> walks you through arrival step by step.` : ''}
              </p>
              <table cellpadding="0" cellspacing="0" align="center" style="margin:0 auto;">
                <tr>
                  <td style="padding:0 6px;">
                    <a href="${domain}/guestbook?session_id=${session.id}"
                      style="display:inline-block;background-color:#1B2420;color:#ffffff;padding:16px 32px;text-decoration:none;font-family:Arial,sans-serif;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;font-weight:600;">
                      View Your Guestbook
                    </a>
                  </td>
                  ${checkinGuideUrl ? `<td style="padding:0 6px;">
                    <a href="${checkinGuideUrl}"
                      style="display:inline-block;background-color:#BA6A42;color:#ffffff;padding:16px 32px;text-decoration:none;font-family:Arial,sans-serif;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;font-weight:600;">
                      Check-In Guide
                    </a>
                  </td>` : ''}
                </tr>
              </table>
            </td>
          </tr>

          <!-- GOLD DIVIDER -->
          <tr>
            <td style="background-color:#BA6A42;height:1px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color:#1B2420;padding:28px 40px;text-align:center;">
              <p style="margin:0 0 8px;font-family:'Jost',Arial,sans-serif;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#BA6A42;font-weight:500;">My Stay in Madinah</p>
              <p style="margin:0;font-family:'Jost',Arial,sans-serif;font-size:12px;color:#ffffff;opacity:0.45;font-weight:300;">
                Questions? Message us on WhatsApp and we will assist you.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
          `
        });
      }

      // 4. SEND HOST NOTIFICATION EMAIL
      const amountPaid = session.amount_total ? `SAR ${(session.amount_total / 100).toFixed(2)}` : 'N/A';
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
        to: 'info@mystayinmadinah.com',
        subject: `New Booking — ${roomName} (${checkIn} → ${checkOut})`,
        html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background-color:#EFEFEA;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#EFEFEA;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="background-color:#1B2420;text-align:center;padding:28px 32px;">
              <p style="margin:0;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#BA6A42;font-weight:600;">NEW BOOKING RECEIVED</p>
            </td>
          </tr>
          <tr><td style="background-color:#BA6A42;height:3px;font-size:0;line-height:0;">&nbsp;</td></tr>

          <!-- BODY -->
          <tr>
            <td style="background-color:#F9F8F4;padding:32px 32px 8px;">
              <h1 style="margin:0 0 6px;font-size:22px;font-weight:600;color:#1B2420;">${roomName}</h1>
              <p style="margin:0;font-size:13px;color:#BA6A42;letter-spacing:0.1em;text-transform:uppercase;">Order #${orderNumber}</p>
            </td>
          </tr>

          <!-- DETAILS TABLE -->
          <tr>
            <td style="background-color:#F9F8F4;padding:24px 32px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e0ddd6;background:#fff;border-radius:2px;">
                ${[
                  ['Guest', guestName],
                  ['Email', guestEmail || '—'],
                  ['Check-in', checkIn],
                  ['Check-out', checkOut],
                  ['Amount Paid', amountPaid],
                ].map(([label, value], i, arr) => `
                <tr>
                  <td style="padding:13px 20px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#9a9a90;border-bottom:${i < arr.length - 1 ? '1px solid #f0ede6' : 'none'};width:40%;">${label}</td>
                  <td style="padding:13px 20px;font-size:14px;color:#1B2420;font-weight:500;border-bottom:${i < arr.length - 1 ? '1px solid #f0ede6' : 'none'};text-align:right;">${value}</td>
                </tr>`).join('')}
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color:#1B2420;padding:20px 32px;text-align:center;">
              <p style="margin:0;font-size:11px;color:#ffffff;opacity:0.5;">My Stay in Madinah · Host Notification</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `
      });
    }
  }

  // EVENT: CHECKOUT EXPIRED
  if (event.type === 'checkout.session.expired') {
    const session = event.data.object as Stripe.Checkout.Session;
    const bookingId = session.metadata?.booking_id;
    if (bookingId) {
      await supabaseAdmin.from('bookings').update({ status: 'cancelled' }).eq('id', bookingId);
    }
  }

  return new NextResponse('Webhook processed successfully', { status: 200 });
}