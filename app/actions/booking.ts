"use server";

import { createClient } from "../../lib/supabase/server";
import Stripe from "stripe";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-02-25.clover", 
});

const RATES: Record<string, number> = {
  GBP: 1,
  USD: 1.27,
  EUR: 1.17,
  SAR: 5,
};

const rateLimitMap = new Map<string, { count: number, lastReset: number }>();
const RATE_LIMIT_MAX = 5; 
const RATE_LIMIT_WINDOW = 60000;

// FIXED: The definition here now perfectly matches what the frontend is sending
export async function startBookingCheckout(formData: {
  roomId: string;
  currency: string;
  checkIn: string;
  checkOut: string;
  nights: number;
}) {
  
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for") || "unknown_ip";
  const now = Date.now();
  
  const userLimit = rateLimitMap.get(ip);
  if (userLimit && now - userLimit.lastReset < RATE_LIMIT_WINDOW) {
    if (userLimit.count >= RATE_LIMIT_MAX) {
      throw new Error("Too many booking attempts. Please wait a minute and try again.");
    }
    userLimit.count++;
  } else {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
  }

  if (!formData.roomId || !formData.checkIn || !formData.checkOut || !formData.currency) {
    throw new Error("Missing required booking details.");
  }
  if (typeof formData.nights !== 'number' || formData.nights <= 0 || formData.nights > 60) {
    throw new Error("Invalid booking duration.");
  }

  const supabase = await createClient();

  const { data: realRoom, error: roomError } = await supabase
    .from('rooms')
    .select('*')
    .eq('id', formData.roomId)
    .single();

  if (roomError || !realRoom) throw new Error("Room not found or no longer available.");

  const activeRate = RATES[formData.currency.toUpperCase()] || 1;
  const securePricePerNight = Math.round(realRoom.price_per_night * activeRate);
  const secureTotalPrice = securePricePerNight * formData.nights;

  let { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    const { data: authData, error: authError } = await supabase.auth.signInAnonymously();
    if (authError) throw new Error("Could not create guest session.");
    user = authData.user;
  }

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
      total_price: secureTotalPrice,
      status: 'pending'
    }).select().single();

  if (insertError || !booking) throw new Error("Could not reserve room.");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://mystayinmadinah.com';
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    billing_address_collection: 'required',
    phone_number_collection: { enabled: true },
    line_items:[
      {
        price_data: {
          currency: formData.currency.toLowerCase(),
          product_data: {
            name: realRoom.name, 
            description: `${formData.nights} Nights (${formData.checkIn} to ${formData.checkOut})`,
          },
          unit_amount: securePricePerNight * 100, 
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