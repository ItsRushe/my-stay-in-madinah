// app/api/checkout/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your Secret Key from .env.local
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-02-24.acacia', // Latest Stripe API version
});

export async function POST(req: Request) {
  try {
    const { roomName, pricePerNight, nights, checkIn, checkOut } = await req.json();

    // Dynamically get the website URL (localhost or your live Vercel domain)
    const origin = req.headers.get('origin') || 'http://localhost:3000';

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items:[
        {
          price_data: {
            currency: 'gbp', // British Pounds
            product_data: {
              name: roomName,
              description: `${nights} Nights (${checkIn} to ${checkOut})`,
            },
            unit_amount: pricePerNight * 100, // Stripe calculates in pennies
          },
          quantity: nights,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/?success=true`,
      cancel_url: `${origin}/rooms`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}