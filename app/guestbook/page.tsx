// app/guestbook/page.tsx
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Stripe from "stripe";
import { createClient } from "../../lib/supabase/server";

// Forces dynamic rendering to read the URL parameter
export const dynamic = 'force-dynamic';

export default async function GuestbookPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const resolvedParams = await searchParams;
  const sessionId = resolvedParams.session_id;

  let guestFirstName = "";
  let roomName = "";
  let orderNumber = "";

  // If they arrived from the email link with a session_id, personalize the page!
  if (sessionId) {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: "2026-02-25.clover",
      });
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.customer_details?.name) {
        // Grab just their first name for a warmer greeting
        guestFirstName = session.customer_details.name.split(' ')[0];
      }

      const supabase = await createClient();
      const { data: booking } = await supabase
        .from('bookings')
        .select('id, room_id, rooms(name)')
        .eq('stripe_session_id', sessionId)
        .single();

      if (booking) {
        orderNumber = booking.id.split('-')[0].toUpperCase();
        // @ts-ignore
        if (booking.rooms?.name) roomName = booking.rooms.name;
      }
    } catch (error) {
      console.error("Error fetching guestbook personalization:", error);
    }
  }

  // Dynamic content based on whether we know who they are
  const greeting = guestFirstName ? `Welcome to Madinah, ${guestFirstName}` : "Welcome to Madinah";
  const subGreeting = roomName ? `Your personalized guide for your stay at ${roomName}.` : "Everything you need for a seamless, peaceful stay in the Prophet's city.";
  
  // Format WhatsApp Link
  const whatsappMsg = orderNumber 
    ? `Hi, I am a current guest (Order #${orderNumber}) and need assistance.` 
    : `Hi, I am a current guest and need assistance.`;
  const whatsappUrl = `https://wa.me/201067040337?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <main className="bg-ivory pt-20">
      <Navbar activePage="guestbook" />

      {/* DYNAMIC HEADER */}
      <header className="bg-ink py-24 md:py-32 px-6 border-b border-white/10 text-center">
        {orderNumber && (
          <div className="inline-flex items-center gap-4 mb-4">
            <span className="h-[1px] w-8 md:w-12 bg-gold"></span>
            <span className="text-gold tracking-[0.2em] text-[10px] md:text-xs uppercase font-medium">Order #{orderNumber}</span>
            <span className="h-[1px] w-8 md:w-12 bg-gold"></span>
          </div>
        )}
        <h1 className="font-playfair text-4xl md:text-6xl text-white font-medium mb-6 notranslate" translate="no">
          {greeting}
        </h1>
        <p className="text-ivory/60 font-light text-lg max-w-2xl mx-auto notranslate" translate="no">
          {subGreeting}
        </p>
      </header>

      <section className="py-16 md:py-24 px-6 md:px-12 max-w-4xl mx-auto space-y-16 text-ink">
        
        {/* WELCOME */}
        <div className="border-l-2 border-gold pl-6 md:pl-10">
          <h2 className="font-playfair text-3xl font-medium mb-4">Your Sanctuary</h2>
          <p className="font-light leading-relaxed opacity-80">
            Alhamdulillah, we are honored to host you during your visit. Our concierge team has meticulously prepared your accommodation to ensure a serene and comfortable environment so you can focus entirely on your spiritual journey.
          </p>
        </div>

        {/* CHECK-IN / CHECK-OUT */}
        <div className="border-l-2 border-gold pl-6 md:pl-10">
          <h2 className="font-playfair text-3xl font-medium mb-4">Check-In & Check-Out</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-light opacity-80">
            <div className="bg-white p-6 border border-gray-100 shadow-sm rounded-none">
              <span className="block text-gold text-xs font-semibold tracking-widest uppercase mb-1">Check-in Time</span>
              <span className="text-2xl font-medium text-ink">3:00 PM</span>
            </div>
            <div className="bg-white p-6 border border-gray-100 shadow-sm rounded-none">
              <span className="block text-gold text-xs font-semibold tracking-widest uppercase mb-1">Check-out Time</span>
              <span className="text-2xl font-medium text-ink">11:00 AM</span>
            </div>
          </div>
          <p className="font-light text-sm mt-4 opacity-70">
            * Early check-in or late check-out is subject to availability. Please contact the concierge via WhatsApp to request.
          </p>
        </div>

        {/* PROPERTY & HOUSE RULES */}
        <div className="border-l-2 border-gold pl-6 md:pl-10">
          <h2 className="font-playfair text-3xl font-medium mb-4">Property & House Rules</h2>
          <ul className="space-y-4 font-light opacity-80 list-none">
            <li className="flex items-start gap-3">
              <span className="text-gold mt-1">✦</span>
              <div><strong>Quiet Hours:</strong> We kindly request guests to observe quiet hours between 10:00 PM and 7:00 AM to respect fellow pilgrims.</div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold mt-1">✦</span>
              <div><strong>No Smoking:</strong> Smoking is strictly prohibited inside the rooms and building premises.</div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold mt-1">✦</span>
              <div><strong>Cleanliness:</strong> Please help us maintain the pristine condition of the property. Daily housekeeping is provided.</div>
            </li>
          </ul>
        </div>

        {/* TRANSPORT & NEARBY */}
        <div className="border-l-2 border-gold pl-6 md:pl-10">
          <h2 className="font-playfair text-3xl font-medium mb-4">Transport & Nearby</h2>
          <p className="font-light leading-relaxed opacity-80 mb-4">
            Our property is located in the Al-Aziziyyah district. Getting to Al-Masjid an-Nabawi is effortless:
          </p>
          <ul className="space-y-3 font-light opacity-80">
            <li><strong>By Uber/Careem:</strong> Approximately 10-15 minutes depending on traffic.</li>
            <li><strong>Haramain Railway:</strong> The high-speed train station is just a 20-minute drive from the property.</li>
            <li><strong>Nearby Amenities:</strong> There are several supermarkets, local cafés, and authentic dining options within a 5-minute walk.</li>
          </ul>
          <a href="https://www.google.com/maps/place/24%C2%B028'02.9%22N+39%C2%B033'51.6%22E/@24.4692505,39.5621593,1395m" target="_blank" rel="noreferrer" className="inline-block mt-6 border-b border-ink pb-1 font-medium hover:text-gold hover:border-gold transition-colors">
            Open Google Maps Guide &rarr;
          </a>
        </div>

        {/* CONTACTS */}
        <div className="border-l-2 border-gold pl-6 md:pl-10">
          <h2 className="font-playfair text-3xl font-medium mb-4">24/7 Concierge Contact</h2>
          <p className="font-light leading-relaxed opacity-80 mb-6">
            If you need anything at all during your stay—from extra towels to booking a private tour—our team is available around the clock.
          </p>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 font-medium hover:bg-[#1da851] transition-colors duration-300 shadow-xl rounded-none notranslate" translate="no">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 .003 5.385.003 12.031c0 2.126.556 4.198 1.613 6.02L.03 24l6.105-1.602a11.968 11.968 0 0 0 5.896 1.542h.005c6.643 0 12.025-5.384 12.025-12.028C24.055 5.385 18.675 0 12.031 0zm-.005 21.954a9.982 9.982 0 0 1-5.09-1.39l-.365-.217-3.784.992.998-3.69-.237-.377a9.96 9.96 0 0 1-1.523-5.27C1.995 6.486 6.483 2 12.031 2c5.545 0 10.033 4.488 10.033 10.003 0 5.513-4.488 10-10.038 10h-.001zm5.505-7.519c-.302-.151-1.787-.882-2.064-.983-.277-.101-.48-.151-.681.151-.202.302-.78 1.034-.956 1.235-.177.202-.353.227-.655.076-1.574-.789-2.73-1.66-3.784-3.32-.177-.278.177-.278.756-1.41.076-.151.038-.278-.038-.428-.076-.151-.681-1.636-.932-2.24-.246-.59-.496-.51-.681-.52-.177-.01-.378-.01-.58-.01-.202 0-.529.076-.806.378-.277.302-1.058 1.034-1.058 2.518 0 1.484 1.084 2.92 1.235 3.12.151.202 2.116 3.224 5.127 4.524 1.965.848 2.704.899 3.484.75.78-.151 2.368-.968 2.704-1.902.336-.934.336-1.737.236-1.903-.101-.166-.378-.267-.68-.418z"/></svg>
            Message Concierge
          </a>
        </div>

      </section>

      <Footer />
    </main>
  );
}