// app/guestbook/page.tsx
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Stripe from "stripe";
import { createClient } from "../../lib/supabase/server";

export const dynamic = 'force-dynamic';

export default async function GuestbookPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const resolvedParams = await searchParams;
  const sessionId = resolvedParams.session_id;

  let guestFirstName = "";
  let roomName = "";
  let orderNumber = "";
  let checkIn = "";
  let checkOut = "";

  if (sessionId) {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: "2026-02-25.clover",
      });
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.customer_details?.name) {
        guestFirstName = session.customer_details.name.split(' ')[0];
      }

      const supabase = await createClient();
      const { data: booking } = await supabase
        .from('bookings')
        .select('id, room_id, check_in, check_out, rooms(name)')
        .eq('stripe_session_id', sessionId)
        .single();

      if (booking) {
        orderNumber = booking.id.split('-')[0].toUpperCase();
        checkIn = booking.check_in || "";
        checkOut = booking.check_out || "";
        // @ts-ignore
        if (booking.rooms?.name) roomName = booking.rooms.name;
      }
    } catch (error) {
      console.error("Error fetching guestbook personalization:", error);
    }
  }

  const greeting = guestFirstName ? `Welcome to Madinah, ${guestFirstName}` : "Welcome to Madinah";
  const subGreeting = roomName ? `Your personalized guide for your stay at ${roomName}.` : "Everything you need for a seamless, peaceful stay in the Prophet's city.";

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split('-');
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
  };

  const whatsappMsg = orderNumber
    ? `Hi, I am a current guest (Order #${orderNumber}) and need assistance.`
    : `Hi, I am a current guest and need assistance.`;
  const whatsappUrl = `https://wa.me/201067040337?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <main className="bg-ivory pt-20">
      <Navbar activePage="guestbook" />

      {/* HERO HEADER */}
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

      {/* BOOKING SUMMARY CARD */}
      {(orderNumber || checkIn) && (
        <div className="bg-ink border-t border-white/5">
          <div className="max-w-4xl mx-auto px-6 md:px-12 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-white/10">
              {orderNumber && (
                <div className="px-6 py-5 border-r border-white/10">
                  <span className="block text-gold text-[10px] font-semibold tracking-widest uppercase mb-1">Order</span>
                  <span className="text-white font-medium text-sm notranslate" translate="no">#{orderNumber}</span>
                </div>
              )}
              {roomName && (
                <div className="px-6 py-5 border-r border-white/10">
                  <span className="block text-gold text-[10px] font-semibold tracking-widest uppercase mb-1">Room</span>
                  <span className="text-white font-medium text-sm notranslate" translate="no">{roomName}</span>
                </div>
              )}
              {checkIn && (
                <div className="px-6 py-5 border-r border-white/10">
                  <span className="block text-gold text-[10px] font-semibold tracking-widest uppercase mb-1">Check-in</span>
                  <span className="text-white font-medium text-sm notranslate" translate="no">{formatDate(checkIn)}</span>
                  <span className="block text-white/40 text-xs mt-0.5">from 3:00 PM</span>
                </div>
              )}
              {checkOut && (
                <div className="px-6 py-5">
                  <span className="block text-gold text-[10px] font-semibold tracking-widest uppercase mb-1">Check-out</span>
                  <span className="text-white font-medium text-sm notranslate" translate="no">{formatDate(checkOut)}</span>
                  <span className="block text-white/40 text-xs mt-0.5">by 11:00 AM</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
          <h2 className="font-playfair text-3xl font-medium mb-4">Arrival & Departure</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-light opacity-80">
            <div className="bg-white p-6 border border-gray-100 shadow-sm">
              <span className="block text-gold text-xs font-semibold tracking-widest uppercase mb-1">Check-in</span>
              <span className="text-2xl font-medium text-ink">3:00 PM</span>
              {checkIn && <span className="block text-sm text-ink/50 mt-1 notranslate" translate="no">{formatDate(checkIn)}</span>}
            </div>
            <div className="bg-white p-6 border border-gray-100 shadow-sm">
              <span className="block text-gold text-xs font-semibold tracking-widest uppercase mb-1">Check-out</span>
              <span className="text-2xl font-medium text-ink">11:00 AM</span>
              {checkOut && <span className="block text-sm text-ink/50 mt-1 notranslate" translate="no">{formatDate(checkOut)}</span>}
            </div>
          </div>
          <p className="font-light text-sm mt-4 opacity-70">
            Early check-in or late check-out is subject to availability. Contact us on WhatsApp to request.
          </p>
        </div>

        {/* PROPERTY & HOUSE RULES */}
        <div className="border-l-2 border-gold pl-6 md:pl-10">
          <h2 className="font-playfair text-3xl font-medium mb-4">House Rules</h2>
          <ul className="space-y-4 font-light opacity-80 list-none">
            <li className="flex items-start gap-3">
              <span className="text-gold mt-1">✦</span>
              <div><strong>Quiet Hours:</strong> Please observe quiet hours between 10:00 PM and 7:00 AM to respect fellow guests.</div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold mt-1">✦</span>
              <div><strong>No Smoking:</strong> Smoking is strictly prohibited inside the rooms and all building premises.</div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold mt-1">✦</span>
              <div><strong>Cleanliness:</strong> Daily housekeeping is provided. Please help us maintain the property's pristine condition.</div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-gold mt-1">✦</span>
              <div><strong>Guests:</strong> Only registered guests may stay overnight. Please inform us in advance of any visitors.</div>
            </li>
          </ul>
        </div>

        {/* TRANSPORT & RIDE APPS */}
        <div className="border-l-2 border-gold pl-6 md:pl-10">
          <h2 className="font-playfair text-3xl font-medium mb-2">Getting Around</h2>
          <p className="font-light leading-relaxed opacity-80 mb-6">
            Our property is in the Al-Aziziyyah district — a short ride from Al-Masjid an-Nabawi and central Madinah. These apps work reliably in the city:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white border border-gray-100 p-5 shadow-sm">
              <span className="block text-gold text-[10px] font-semibold tracking-widest uppercase mb-2">Uber</span>
              <p className="text-sm font-light opacity-80 leading-relaxed">Widely available in Madinah. Download the Uber app and set pickup to your exact address.</p>
            </div>
            <div className="bg-white border border-gray-100 p-5 shadow-sm">
              <span className="block text-gold text-[10px] font-semibold tracking-widest uppercase mb-2">Careem</span>
              <p className="text-sm font-light opacity-80 leading-relaxed">Saudi Arabia's most popular ride app. Often cheaper than Uber for short trips. Available on iOS & Android.</p>
            </div>
            <div className="bg-white border border-gray-100 p-5 shadow-sm">
              <span className="block text-gold text-[10px] font-semibold tracking-widest uppercase mb-2">inDrive</span>
              <p className="text-sm font-light opacity-80 leading-relaxed">Negotiate fares directly with drivers. A good option for longer trips or when surge pricing is active.</p>
            </div>
          </div>
          <ul className="space-y-2 font-light opacity-80 text-sm">
            <li>🕌 &nbsp;<strong>Al-Masjid an-Nabawi:</strong> approx. 10–15 min by car</li>
            <li>🚉 &nbsp;<strong>Haramain High-Speed Rail Station:</strong> approx. 20 min by car</li>
          </ul>
          <a href="https://www.google.com/maps/place/24%C2%B028'02.9%22N+39%C2%B033'51.6%22E/@24.4692505,39.5621593,1395m" target="_blank" rel="noreferrer" className="inline-block mt-6 border-b border-ink pb-1 font-medium hover:text-gold hover:border-gold transition-colors text-sm">
            Open Property Location in Google Maps &rarr;
          </a>
        </div>

        {/* FOOD ORDERING APPS */}
        <div className="border-l-2 border-gold pl-6 md:pl-10">
          <h2 className="font-playfair text-3xl font-medium mb-2">Food Delivery</h2>
          <p className="font-light leading-relaxed opacity-80 mb-6">
            All major Saudi delivery platforms operate in Madinah with fast delivery times, especially in central areas. Most support Arabic and English:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-100 p-5 shadow-sm">
              <span className="block text-gold text-[10px] font-semibold tracking-widest uppercase mb-2">HungerStation</span>
              <p className="text-sm font-light opacity-80 leading-relaxed">The most popular delivery app in Saudi Arabia. Huge restaurant selection including local Madinah cuisine, fast food, and more.</p>
            </div>
            <div className="bg-white border border-gray-100 p-5 shadow-sm">
              <span className="block text-gold text-[10px] font-semibold tracking-widest uppercase mb-2">Jahez</span>
              <p className="text-sm font-light opacity-80 leading-relaxed">A homegrown Saudi delivery service. Great for local restaurants, grills, and shawarma spots near the Masjid area.</p>
            </div>
            <div className="bg-white border border-gray-100 p-5 shadow-sm">
              <span className="block text-gold text-[10px] font-semibold tracking-widest uppercase mb-2">Mrsool</span>
              <p className="text-sm font-light opacity-80 leading-relaxed">On-demand delivery from any shop or restaurant — even places that aren't on other platforms. Very flexible.</p>
            </div>
            <div className="bg-white border border-gray-100 p-5 shadow-sm">
              <span className="block text-gold text-[10px] font-semibold tracking-widest uppercase mb-2">Talabat</span>
              <p className="text-sm font-light opacity-80 leading-relaxed">Widely used across the GCC. Good for international chains, Arabic food, and late-night delivery.</p>
            </div>
          </div>
        </div>

        {/* COFFEE SHOPS */}
        <div className="border-l-2 border-gold pl-6 md:pl-10">
          <h2 className="font-playfair text-3xl font-medium mb-2">Coffee & Cafés Nearby</h2>
          <p className="font-light leading-relaxed opacity-80 mb-6">
            Several well-known cafés are within easy reach of the property. Most are open after Fajr and well past midnight:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-100 p-5 shadow-sm">
              <span className="block text-gold text-[10px] font-semibold tracking-widest uppercase mb-2">Dr. Café Coffee</span>
              <p className="text-sm font-light opacity-80 leading-relaxed">A beloved Saudi specialty coffee chain. Excellent espresso, matcha, and fresh pastries. Multiple branches near the Haram area.</p>
            </div>
            <div className="bg-white border border-gray-100 p-5 shadow-sm">
              <span className="block text-gold text-[10px] font-semibold tracking-widest uppercase mb-2">Starbucks</span>
              <p className="text-sm font-light opacity-80 leading-relaxed">Several branches in central Madinah, including near Al-Masjid an-Nabawi. Familiar menu, reliable Wi-Fi, and comfortable seating.</p>
            </div>
            <div className="bg-white border border-gray-100 p-5 shadow-sm">
              <span className="block text-gold text-[10px] font-semibold tracking-widest uppercase mb-2">Tim Hortons</span>
              <p className="text-sm font-light opacity-80 leading-relaxed">A popular choice for guests who prefer a lighter, more casual coffee experience. Affordable and widely located.</p>
            </div>
            <div className="bg-white border border-gray-100 p-5 shadow-sm">
              <span className="block text-gold text-[10px] font-semibold tracking-widest uppercase mb-2">Local Arabic Qahwa</span>
              <p className="text-sm font-light opacity-80 leading-relaxed">Traditional Arabic coffee (cardamom-spiced, served with dates) is available from street-side vendors and small shops throughout the neighbourhood. A must-try.</p>
            </div>
          </div>
        </div>

        {/* EMERGENCY NUMBERS */}
        <div className="border-l-2 border-gold pl-6 md:pl-10">
          <h2 className="font-playfair text-3xl font-medium mb-2">Emergency Contacts</h2>
          <p className="font-light leading-relaxed opacity-80 mb-6">
            We hope you never need these — but it's good to have them saved. All Saudi emergency services operate 24/7:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <a href="tel:911" className="bg-white border border-gray-100 p-5 shadow-sm flex items-center gap-4 hover:border-gold transition-colors group">
              <span className="text-2xl">🚨</span>
              <div>
                <span className="block text-gold text-[10px] font-semibold tracking-widest uppercase mb-1">Police / Ambulance / Fire</span>
                <span className="text-2xl font-medium text-ink group-hover:text-gold transition-colors">911</span>
                <span className="block text-xs text-ink/50 mt-0.5">All emergencies — single number in Saudi Arabia</span>
              </div>
            </a>
            <a href="tel:998" className="bg-white border border-gray-100 p-5 shadow-sm flex items-center gap-4 hover:border-gold transition-colors group">
              <span className="text-2xl">🔥</span>
              <div>
                <span className="block text-gold text-[10px] font-semibold tracking-widest uppercase mb-1">Civil Defence</span>
                <span className="text-2xl font-medium text-ink group-hover:text-gold transition-colors">998</span>
                <span className="block text-xs text-ink/50 mt-0.5">Fire and structural emergencies</span>
              </div>
            </a>
            <a href="tel:+966148455555" className="bg-white border border-gray-100 p-5 shadow-sm flex items-center gap-4 hover:border-gold transition-colors group">
              <span className="text-2xl">🏥</span>
              <div>
                <span className="block text-gold text-[10px] font-semibold tracking-widest uppercase mb-1">King Fahad Hospital — Madinah</span>
                <span className="text-lg font-medium text-ink group-hover:text-gold transition-colors">+966 14 845 5555</span>
                <span className="block text-xs text-ink/50 mt-0.5">Nearest major public hospital</span>
              </div>
            </a>
            <a href="tel:920002814" className="bg-white border border-gray-100 p-5 shadow-sm flex items-center gap-4 hover:border-gold transition-colors group">
              <span className="text-2xl">🛡️</span>
              <div>
                <span className="block text-gold text-[10px] font-semibold tracking-widest uppercase mb-1">Tourist Police</span>
                <span className="text-2xl font-medium text-ink group-hover:text-gold transition-colors">920002814</span>
                <span className="block text-xs text-ink/50 mt-0.5">For tourist-related incidents or lost documents</span>
              </div>
            </a>
          </div>
          <p className="text-sm font-light opacity-60">
            For non-emergencies during your stay, always contact your concierge first via WhatsApp — we can coordinate on your behalf.
          </p>
        </div>

        {/* CONCIERGE CONTACT */}
        <div className="border-l-2 border-gold pl-6 md:pl-10">
          <h2 className="font-playfair text-3xl font-medium mb-4">24/7 Concierge</h2>
          <p className="font-light leading-relaxed opacity-80 mb-6">
            From extra towels to booking a private tour — our team is on hand around the clock. Message us on WhatsApp for the fastest response.
          </p>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-4 font-medium hover:bg-[#1da851] transition-colors duration-300 shadow-xl rounded-none notranslate" translate="no">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 .003 5.385.003 12.031c0 2.126.556 4.198 1.613 6.02L.03 24l6.105-1.602a11.968 11.968 0 0 0 5.896 1.542h.005c6.643 0 12.025-5.384 12.025-12.028C24.055 5.385 18.675 0 12.031 0zm-.005 21.954a9.982 9.982 0 0 1-5.09-1.39l-.365-.217-3.784.992.998-3.69-.237-.377a9.96 9.96 0 0 1-1.523-5.27C1.995 6.486 6.483 2 12.031 2c5.545 0 10.033 4.488 10.033 10.003 0 5.513-4.488 10-10.038 10h-.001zm5.505-7.519c-.302-.151-1.787-.882-2.064-.983-.277-.101-.48-.151-.681.151-.202.302-.78 1.034-.956 1.235-.177.202-.353.227-.655.076-1.574-.789-2.73-1.66-3.784-3.32-.177-.278.177-.278.756-1.41.076-.151.038-.278-.038-.428-.076-.151-.681-1.636-.932-2.24-.246-.59-.496-.51-.681-.52-.177-.01-.378-.01-.58-.01-.202 0-.529.076-.806.378-.277.302-1.058 1.034-1.058 2.518 0 1.484 1.084 2.92 1.235 3.12.151.202 2.116 3.224 5.127 4.524 1.965.848 2.704.899 3.484.75.78-.151 2.368-.968 2.704-1.902.336-.934.336-1.737.236-1.903-.101-.166-.378-.267-.68-.418z"/></svg>
            Message Concierge on WhatsApp
          </a>
        </div>

      </section>

      <Footer />
    </main>
  );
}
