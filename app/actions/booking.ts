"use server";

import { createClient } from "../../lib/supabase/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover", 
});

export async function startBookingCheckout(formData: {
  roomId: string;
  roomName: string;
  pricePerNight: number; // This is the CONVERTED amount (e.g. SAR 400)
  currency: string;      // The currency code (e.g. 'sar')
  checkIn: string;
  checkOut: string;
  nights: number;
}) {
  const supabase = await createClient();

  let { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    const { data: authData, error: authError } = await supabase.auth.signInAnonymously();
    if (authError) throw new Error("Could not create guest session.");
    user = authData.user;
  }

  const totalPrice = formData.pricePerNight * formData.nights;

  const { data: availableRooms, error: checkError } = await supabase
    .rpc('available_rooms', { req_check_in: formData.checkIn, req_check_out: formData.checkOut });

  if (checkError) throw new Error("Error checking room availability.");
  
  const isAvailable = availableRooms.some((r: any) => r.id === formData.roomId);
  if (!isAvailable) throw new Error("Sorry, these dates were just booked by someone else.");

  const { data: booking, error: insertError } = await supabase
    .from('bookings')
    .insert({
      room_id: formData.roomId,
      user_id: user?.id,
      check_in: formData.checkIn,
      check_out: formData.checkOut,
      total_price: totalPrice,
      status: 'pending'
    }).select().single();

  if (insertError || !booking) throw new Error("Could not reserve room.");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items:[
      {
        price_data: {
          currency: formData.currency.toLowerCase(), // DYNAMIC CURRENCY
          product_data: {
            name: formData.roomName,
            description: `${formData.nights} Nights (${formData.checkIn} to ${formData.checkOut})`,
          },
          unit_amount: Math.round(formData.pricePerNight * 100), // Pass the converted amount!
        },
        quantity: formData.nights,
      },
    ],
    mode: 'payment',
    success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/cancel?booking_id=${booking.id}`,
    metadata: { booking_id: booking.id }
  });

  await supabase.from('bookings').update({ stripe_session_id: session.id }).eq('id', booking.id);
  return { url: session.url };
}