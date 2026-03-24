// app/success/page.tsx
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Stripe from "stripe";
import { createClient } from "../../lib/supabase/server";

// Forces dynamic rendering so we can read the URL parameters
export const dynamic = 'force-dynamic';

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const resolvedParams = await searchParams;
  const sessionId = resolvedParams.session_id;

  let guestName = "Valued Guest";
  let roomName = "Premium Room";
  let orderNumber = "Pending";

  // If we have a Stripe session ID, fetch the Guest, Room, and Booking ID
  if (sessionId) {
    try {
      // 1. Get Guest Name from Stripe
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: "2026-02-25.clover",
      });
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.customer_details?.name) {
        guestName = session.customer_details.name;
      }

      // 2. Get Room Name and Booking ID from Supabase
      const supabase = await createClient();
      const { data: booking } = await supabase
        .from('bookings')
        .select('id, room_id, rooms(name)')
        .eq('stripe_session_id', sessionId)
        .single();

      if (booking) {
        // Take the first 8 characters of the database UUID for a clean Order Number
        orderNumber = booking.id.split('-')[0].toUpperCase();
        
        // @ts-ignore - Supabase join typing
        if (booking.rooms?.name) {
          // @ts-ignore
          roomName = booking.rooms.name;
        }
      }
    } catch (error) {
      console.error("Error fetching booking details for success page:", error);
    }
  }

  // Format the Custom WhatsApp Message with Line Breaks (\n)
  const phoneNumber = "201067040337";
  const whatsappMessage = `Hi, I have a special request for my booking.\n\nName: ${guestName}\nOrder: #${orderNumber}\nRoom: ${roomName}`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <main className="pt-20 bg-ivory min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-6 my-12">
        <div className="bg-white p-10 md:p-16 rounded-none shadow-2xl text-center max-w-3xl border border-gray-100">
          
          <div className="w-20 h-20 bg-green-50 flex items-center justify-center mx-auto mb-8 text-green-500 rounded-full">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          
          <h1 className="font-playfair text-4xl md:text-5xl text-ink font-medium mb-4 notranslate" translate="no">Booking Confirmed</h1>
          
          <p className="text-ink/70 font-light text-lg mb-10 leading-relaxed">
            Alhamdulillah, your payment was successful and your room is secured. We have sent a confirmation email with your booking details. We look forward to welcoming you to Madinah.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/" className="w-full sm:w-auto inline-block bg-ink text-white px-10 py-4 font-medium hover:bg-gold transition-colors duration-300 shadow-xl rounded-none">
              Return to Home
            </Link>
            
            {/* The Special Requests WhatsApp Button */}
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-10 py-4 font-medium hover:bg-[#1da851] transition-colors duration-300 shadow-xl rounded-none notranslate" translate="no">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 .003 5.385.003 12.031c0 2.126.556 4.198 1.613 6.02L.03 24l6.105-1.602a11.968 11.968 0 0 0 5.896 1.542h.005c6.643 0 12.025-5.384 12.025-12.028C24.055 5.385 18.675 0 12.031 0zm-.005 21.954a9.982 9.982 0 0 1-5.09-1.39l-.365-.217-3.784.992.998-3.69-.237-.377a9.96 9.96 0 0 1-1.523-5.27C1.995 6.486 6.483 2 12.031 2c5.545 0 10.033 4.488 10.033 10.003 0 5.513-4.488 10-10.038 10h-.001zm5.505-7.519c-.302-.151-1.787-.882-2.064-.983-.277-.101-.48-.151-.681.151-.202.302-.78 1.034-.956 1.235-.177.202-.353.227-.655.076-1.574-.789-2.73-1.66-3.784-3.32-.177-.278.177-.278.756-1.41.076-.151.038-.278-.038-.428-.076-.151-.681-1.636-.932-2.24-.246-.59-.496-.51-.681-.52-.177-.01-.378-.01-.58-.01-.202 0-.529.076-.806.378-.277.302-1.058 1.034-1.058 2.518 0 1.484 1.084 2.92 1.235 3.12.151.202 2.116 3.224 5.127 4.524 1.965.848 2.704.899 3.484.75.78-.151 2.368-.968 2.704-1.902.336-.934.336-1.737.236-1.903-.101-.166-.378-.267-.68-.418z"/></svg>
              Special Requests
            </a>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}