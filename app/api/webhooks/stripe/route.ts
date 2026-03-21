// app/api/webhooks/stripe/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// 1. Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover', // <-- UPDATED THIS LINE
});

// ... the rest of your code stays exactly the same

// 2. Initialize Supabase Admin 
// We use the SERVICE_ROLE_KEY here to securely bypass RLS and force the update
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature') as string;

  let event: Stripe.Event;

  try {
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    if (secret) {
        event = stripe.webhooks.constructEvent(body, signature, secret);
    } else {
        // Fallback just in case the secret is missing during local testing
        event = JSON.parse(body);
    }
  } catch (error: any) {
    console.error('Webhook verification failed:', error.message);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  // EVENT 1: PAYMENT SUCCESSFUL!
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const bookingId = session.metadata?.booking_id; // We attached this when they clicked 'Book Now'

    if (bookingId) {
      console.log(`✅ Payment successful! Confirming booking: ${bookingId}`);
      
      const { error } = await supabaseAdmin
        .from('bookings')
        .update({ 
          status: 'confirmed',
          stripe_payment_intent: session.payment_intent as string 
        })
        .eq('id', bookingId);
        
      if (error) console.error("Database update error:", error);
    }
  }

  // EVENT 2: CHECKOUT ABANDONED / EXPIRED
  if (event.type === 'checkout.session.expired') {
    const session = event.data.object as Stripe.Checkout.Session;
    const bookingId = session.metadata?.booking_id;

    if (bookingId) {
      console.log(`❌ Session expired. Cancelling booking hold: ${bookingId}`);
      
      await supabaseAdmin
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId);
    }
  }

  return new NextResponse('Webhook processed successfully', { status: 200 });
}