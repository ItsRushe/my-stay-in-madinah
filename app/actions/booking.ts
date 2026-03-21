// app/actions/booking.ts
"use server";

import { createClient } from "../../lib/supabase/server";
import Stripe from "stripe";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover", // <-- UPDATED THIS LINE
});

// ... the rest of your code stays exactly the same
export async function startBookingCheckout(formData: {
  roomId: string;
  roomName: string;
  pricePerNight: number;
  checkIn: string;
  checkOut: string;
  nights: number;
}) {
  const supabase = await createClient();

  // 1. GUEST CHECKOUT (Anonymous Auth)
  // This creates a secure user ID in the background without forcing them to type a password
  let { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    const { data: authData, error: authError } = await supabase.auth.signInAnonymously();
    if (authError) throw new Error("Could not create guest session.");
    user = authData.user;
  }

  const totalPrice = formData.pricePerNight * formData.nights;

  // 2. CHECK OVERLAPPING CONFIRMED BOOKINGS
  // We call the custom SQL function we created in Phase 2
  const { data: availableRooms, error: checkError } = await supabase
    .rpc('available_rooms', {
      req_check_in: formData.checkIn,
      req_check_out: formData.checkOut
    });

  if (checkError) throw new Error("Error checking room availability.");
  
  // Verify if our specific room is in the list of available rooms
  const isAvailable = availableRooms.some((r: any) => r.id === formData.roomId);
  if (!isAvailable) {
    throw new Error("Sorry, these dates were just booked by someone else.");
  }

  // 3. INSERT "PENDING" BOOKING TO HOLD THE ROOM
  const { data: booking, error: insertError } = await supabase
    .from('bookings')
    .insert({
      room_id: formData.roomId,
      user_id: user?.id,
      check_in: formData.checkIn,
      check_out: formData.checkOut,
      total_price: totalPrice,
      status: 'pending'
    })
    .select()
    .single();

  if (insertError || !booking) {
    throw new Error("Could not reserve room. Please try again.");
  }

  // 4. CREATE STRIPE CHECKOUT SESSION
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items:[
      {
        price_data: {
          currency: 'gbp',
          product_data: {
            name: formData.roomName,
            description: `${formData.nights} Nights (${formData.checkIn} to ${formData.checkOut})`,
          },
          unit_amount: formData.pricePerNight * 100, // Stripe expects pennies
        },
        quantity: formData.nights,
      },
    ],
    mode: 'payment',
    success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/cancel?booking_id=${booking.id}`,
    metadata: {
      booking_id: booking.id // CRITICAL: This tells the webhook which booking to confirm!
    }
  });

  // 5. ATTACH STRIPE SESSION ID TO OUR DATABASE HOLD
  await supabase
    .from('bookings')
    .update({ stripe_session_id: session.id })
    .eq('id', booking.id);

  // Return the Stripe checkout URL to the frontend
  return { url: session.url };
}