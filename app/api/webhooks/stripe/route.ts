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

// Initialize Resend Email Client
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

  // EVENT: PAYMENT SUCCESSFUL
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const bookingId = session.metadata?.booking_id; 

    if (bookingId) {
      // 1. Confirm in Database
      await supabaseAdmin
        .from('bookings')
        .update({ 
          status: 'confirmed',
          stripe_payment_intent: session.payment_intent as string 
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
      const orderNumber = bookingId.split('-')[0].toUpperCase();
      const domain = process.env.NEXT_PUBLIC_BASE_URL || "https://mystayinmadinah.com";

      // 3. SEND THE LUXURY CONFIRMATION EMAIL
      if (guestEmail) {
        await resend.emails.send({
          from: 'concierge@resend.dev', // Note: Once you verify your domain in Resend, change this to reservations@mystayinmadinah.com
          to: guestEmail,
          subject: `Booking Confirmed: Your stay at ${roomName}`,
          html: `
            <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; color: #09101A; line-height: 1.6;">
              <div style="text-align: center; padding: 30px 0; background-color: #F9F8F4;">
                <h1 style="margin: 0; font-size: 24px; color: #C5A059;">MY STAY IN MADINAH</h1>
              </div>
              <div style="padding: 40px 30px; border: 1px solid #EAEAEA;">
                <h2 style="font-size: 22px; font-weight: 500; margin-bottom: 20px;">Booking Confirmed</h2>
                <p>Dear ${guestName},</p>
                <p>Alhamdulillah, your payment has been successfully processed and your reservation is confirmed.</p>
                
                <div style="background-color: #F9F8F4; padding: 20px; border-left: 4px solid #C5A059; margin: 30px 0;">
                  <p style="margin: 0 0 10px 0;"><strong>Order Number:</strong> #${orderNumber}</p>
                  <p style="margin: 0 0 10px 0;"><strong>Room:</strong> ${roomName}</p>
                  <p style="margin: 0 0 10px 0;"><strong>Check-in:</strong> ${checkIn} (3:00 PM)</p>
                  <p style="margin: 0;"><strong>Check-out:</strong> ${checkOut} (11:00 AM)</p>
                </div>

                <p>To ensure a seamless arrival, we have prepared a Digital Guestbook containing our property location, house rules, and direct concierge contact information.</p>
                
                <div style="text-align: center; margin: 40px 0;">
                  <a href="${domain}/guestbook" style="background-color: #09101A; color: #ffffff; padding: 16px 32px; text-decoration: none; font-weight: bold; display: inline-block;">
                    View Digital Guestbook
                  </a>
                </div>

                <p>If you have any special requests or require airport transfers, please reply directly to this email or contact us via WhatsApp.</p>
                <p>Warm regards,<br/><strong>The Concierge Team</strong></p>
              </div>
            </div>
          `
        });
      }
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