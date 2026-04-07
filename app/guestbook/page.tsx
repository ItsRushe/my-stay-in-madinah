// app/guestbook/page.tsx
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Stripe from "stripe";
import { createClient } from "../../lib/supabase/server";

export const dynamic = 'force-dynamic';

// ─── Icons ───────────────────────────────────────────────────────────────────
const IconWhatsApp = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.031 0C5.385 0 .003 5.385.003 12.031c0 2.126.556 4.198 1.613 6.02L.03 24l6.105-1.602a11.968 11.968 0 0 0 5.896 1.542h.005c6.643 0 12.025-5.384 12.025-12.028C24.055 5.385 18.675 0 12.031 0zm-.005 21.954a9.982 9.982 0 0 1-5.09-1.39l-.365-.217-3.784.992.998-3.69-.237-.377a9.96 9.96 0 0 1-1.523-5.27C1.995 6.486 6.483 2 12.031 2c5.545 0 10.033 4.488 10.033 10.003 0 5.513-4.488 10-10.038 10h-.001zm5.505-7.519c-.302-.151-1.787-.882-2.064-.983-.277-.101-.48-.151-.681.151-.202.302-.78 1.034-.956 1.235-.177.202-.353.227-.655.076-1.574-.789-2.73-1.66-3.784-3.32-.177-.278.177-.278.756-1.41.076-.151.038-.278-.038-.428-.076-.151-.681-1.636-.932-2.24-.246-.59-.496-.51-.681-.52-.177-.01-.378-.01-.58-.01-.202 0-.529.076-.806.378-.277.302-1.058 1.034-1.058 2.518 0 1.484 1.084 2.92 1.235 3.12.151.202 2.116 3.224 5.127 4.524 1.965.848 2.704.899 3.484.75.78-.151 2.368-.968 2.704-1.902.336-.934.336-1.737.236-1.903-.101-.166-.378-.267-.68-.418z"/>
  </svg>
);
// ─────────────────────────────────────────────────────────────────────────────

export default async function GuestbookPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const resolvedParams = await searchParams;
  const sessionId = resolvedParams.session_id;

  let guestFirstName = "";
  let guestFullName = "";
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
        guestFullName = session.customer_details.name;
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
  const subGreeting = roomName
    ? `Your personalized guide for your stay at ${roomName}.`
    : "Everything you need for a seamless, peaceful stay in the Prophet's city.";

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split('-');
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
  };

  // WhatsApp links
  const whatsappBase = "https://wa.me/201067040337";
  const conciergeMsg = orderNumber
    ? `Hi, I am ${guestFullName || 'a guest'} (Order #${orderNumber}) and need assistance.`
    : `Hi, I am a guest and need assistance.`;
  const whatsappConcierge = `${whatsappBase}?text=${encodeURIComponent(conciergeMsg)}`;

  const lateCheckoutMsg = orderNumber
    ? `Hi, I am ${guestFullName || 'a guest'} (Order #${orderNumber}, checking out on ${formatDate(checkOut)}). I would like to request a late check-out. Is this possible?`
    : `Hi, I would like to request a late check-out. Is this possible?`;
  const whatsappLateCheckout = `${whatsappBase}?text=${encodeURIComponent(lateCheckoutMsg)}`;

  const earlyCheckinMsg = orderNumber
    ? `Hi, I am ${guestFullName || 'a guest'} (Order #${orderNumber}, checking in on ${formatDate(checkIn)}). I would like to request an early check-in. Is this possible?`
    : `Hi, I would like to request an early check-in. Is this possible?`;
  const whatsappEarlyCheckin = `${whatsappBase}?text=${encodeURIComponent(earlyCheckinMsg)}`;

  return (
    <main className="bg-ivory pt-20">
      <Navbar activePage="guestbook" />

      {/* HERO */}
      <header className="bg-ink py-24 md:py-32 px-6 border-b border-white/10 text-center">
        {orderNumber && (
          <div className="inline-flex items-center gap-4 mb-4">
            <span className="h-[1px] w-8 md:w-12 bg-gold" />
            <span className="text-gold tracking-[0.2em] text-[10px] md:text-xs uppercase font-medium">Order #{orderNumber}</span>
            <span className="h-[1px] w-8 md:w-12 bg-gold" />
          </div>
        )}
        <h1 className="font-playfair text-4xl md:text-6xl text-white font-medium mb-6 notranslate" translate="no">
          {greeting}
        </h1>
        <p className="text-ivory/60 font-light text-lg max-w-2xl mx-auto notranslate" translate="no">
          {subGreeting}
        </p>
      </header>

      {/* BOOKING SUMMARY BAR */}
      {(orderNumber || checkIn) && (
        <div className="bg-ink border-t border-white/5">
          <div className="max-w-4xl mx-auto px-6 md:px-12 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 border border-white/10">
              {orderNumber && (
                <div className="px-6 py-5">
                  <span className="block text-gold text-[10px] font-semibold tracking-widest uppercase mb-1">Order</span>
                  <span className="text-white font-medium text-sm notranslate" translate="no">#{orderNumber}</span>
                </div>
              )}
              {roomName && (
                <div className="px-6 py-5">
                  <span className="block text-gold text-[10px] font-semibold tracking-widest uppercase mb-1">Room</span>
                  <span className="text-white font-medium text-sm notranslate" translate="no">{roomName}</span>
                </div>
              )}
              {checkIn && (
                <div className="px-6 py-5">
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

      {/* MAIN CONTENT */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-20 text-ink">

        {/* WELCOME */}
        <section>
          <div className="flex items-center gap-2.5 text-gold mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            <p className="text-xs font-semibold tracking-widest uppercase">Your Sanctuary</p>
          </div>
          <h2 className="font-playfair text-3xl font-medium mb-4">We are honoured to host you.</h2>
          <p className="font-light leading-relaxed opacity-75 max-w-2xl">
            Our concierge team has meticulously prepared your accommodation so you can focus entirely on your spiritual journey. This guide covers everything from arrival to local essentials — all in one place.
          </p>
        </section>

        {/* DIVIDER */}
        <div className="h-[1px] bg-ink/10" />

        {/* ARRIVAL & DEPARTURE */}
        <section>
          <div className="flex items-center gap-2.5 text-gold mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <p className="text-xs font-semibold tracking-widest uppercase">Arrival & Departure</p>
          </div>
          <h2 className="font-playfair text-3xl font-medium mb-8">Check-in & Check-out</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-ink/40 mb-2">Check-in</p>
              <p className="text-3xl font-medium font-playfair mb-1">3:00 PM</p>
              {checkIn && <p className="text-sm text-ink/50 notranslate" translate="no">{formatDate(checkIn)}</p>}
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-ink/40 mb-2">Check-out</p>
              <p className="text-3xl font-medium font-playfair mb-1">11:00 AM</p>
              {checkOut && <p className="text-sm text-ink/50 notranslate" translate="no">{formatDate(checkOut)}</p>}
            </div>
          </div>

          <div className="border-l-2 border-gold/30 pl-5 space-y-3">
            <p className="text-sm font-light text-ink/70">
              Need an early check-in or late check-out? Contact us on WhatsApp and we will do our best to accommodate you subject to availability.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <a href={whatsappEarlyCheckin} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 border border-ink/20 px-4 py-2 text-xs font-medium tracking-wide uppercase hover:border-gold hover:text-gold transition-colors notranslate" translate="no">
                <IconWhatsApp />
                Request Early Check-in
              </a>
              <a href={whatsappLateCheckout} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 border border-ink/20 px-4 py-2 text-xs font-medium tracking-wide uppercase hover:border-gold hover:text-gold transition-colors notranslate" translate="no">
                <IconWhatsApp />
                Request Late Check-out
              </a>
            </div>
          </div>
        </section>

        <div className="h-[1px] bg-ink/10" />

        {/* HOUSE RULES */}
        <section>
          <div className="flex items-center gap-2.5 text-gold mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <p className="text-xs font-semibold tracking-widest uppercase">House Rules</p>
          </div>
          <h2 className="font-playfair text-3xl font-medium mb-8">Property Guidelines</h2>
          <ul className="space-y-5">
            {[
              { title: "Quiet Hours", body: "10:00 PM – 7:00 AM. We kindly ask all guests to observe silence during these hours to respect fellow guests." },
              { title: "No Smoking", body: "Smoking is strictly prohibited inside the rooms, corridors, and all building premises." },
              { title: "Housekeeping", body: "Daily housekeeping is included. Please help us maintain the pristine condition of your room." },
              { title: "Overnight Guests", body: "Only registered guests may stay overnight. Please inform us in advance of any visitors." },
            ].map(rule => (
              <li key={rule.title} className="flex items-start gap-4 border-b border-ink/8 pb-5 last:border-0">
                <span className="text-gold/50 mt-1 shrink-0 text-lg leading-none">—</span>
                <div>
                  <strong className="block text-sm font-semibold mb-0.5">{rule.title}</strong>
                  <span className="text-sm font-light text-ink/70 leading-relaxed">{rule.body}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <div className="h-[1px] bg-ink/10" />

        {/* GETTING AROUND */}
        <section>
          <div className="flex items-center gap-2.5 text-gold mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 4v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            <p className="text-xs font-semibold tracking-widest uppercase">Getting Around</p>
          </div>
          <h2 className="font-playfair text-3xl font-medium mb-3">Transport & Rides</h2>
          <p className="font-light text-ink/70 leading-relaxed mb-8 max-w-2xl">
            Our property is in Al-Aziziyyah. Al-Masjid an-Nabawi is approximately 10–15 minutes by car. These apps all work reliably in Madinah:
          </p>

          <ul className="space-y-5 mb-8">
            {[
              { name: "Uber", body: "Widely available. Set your pickup to the property address for accurate routing." },
              { name: "Careem", body: "The most popular ride app in Saudi Arabia. Often cheaper than Uber for short trips. Available on iOS and Android." },
              { name: "inDrive", body: "Negotiate fares directly with drivers — useful for longer trips or during surge pricing." },
            ].map(app => (
              <li key={app.name} className="flex items-start gap-4 border-b border-ink/8 pb-5 last:border-0">
                <span className="text-gold/50 mt-1 shrink-0 text-lg leading-none">—</span>
                <div>
                  <strong className="block text-sm font-semibold mb-0.5">{app.name}</strong>
                  <span className="text-sm font-light text-ink/70 leading-relaxed">{app.body}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className="space-y-1.5 mb-6 text-sm text-ink/60 font-light">
            <p>Al-Masjid an-Nabawi — approx. 10–15 min by car</p>
            <p>Haramain High-Speed Rail Station — approx. 20 min by car</p>
          </div>

          <a href="https://www.google.com/maps/place/24%C2%B028'02.9%22N+39%C2%B033'51.6%22E/@24.4692505,39.5621593,1395m"
            target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium border-b border-ink pb-0.5 hover:text-gold hover:border-gold transition-colors">
            Open Property Location in Google Maps &rarr;
          </a>
        </section>

        <div className="h-[1px] bg-ink/10" />

        {/* FOOD DELIVERY */}
        <section>
          <div className="flex items-center gap-2.5 text-gold mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>
            <p className="text-xs font-semibold tracking-widest uppercase">Food Delivery</p>
          </div>
          <h2 className="font-playfair text-3xl font-medium mb-3">Order to Your Door</h2>
          <p className="font-light text-ink/70 leading-relaxed mb-8 max-w-2xl">
            All major Saudi delivery platforms operate in Madinah with fast delivery times. Most support both Arabic and English:
          </p>
          <ul className="space-y-5">
            {[
              { name: "HungerStation", body: "The most popular food delivery app in Saudi Arabia. Massive restaurant selection covering local Madinah cuisine, international chains, and fast food." },
              { name: "Jahez", body: "A homegrown Saudi platform. Great for local grills, shawarma spots, and Madinah's traditional cuisine." },
              { name: "Mrsool", body: "On-demand delivery from any shop or restaurant — including places not listed on other apps. Very flexible." },
              { name: "Talabat", body: "Widely used across the GCC. Good for international brands, Arabic food, and late-night orders." },
            ].map(app => (
              <li key={app.name} className="flex items-start gap-4 border-b border-ink/8 pb-5 last:border-0">
                <span className="text-gold/50 mt-1 shrink-0 text-lg leading-none">—</span>
                <div>
                  <strong className="block text-sm font-semibold mb-0.5">{app.name}</strong>
                  <span className="text-sm font-light text-ink/70 leading-relaxed">{app.body}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <div className="h-[1px] bg-ink/10" />

        {/* COFFEE */}
        <section>
          <div className="flex items-center gap-2.5 text-gold mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
            <p className="text-xs font-semibold tracking-widest uppercase">Nearby Coffee</p>
          </div>
          <h2 className="font-playfair text-3xl font-medium mb-3">Cafés Close to You</h2>
          <p className="font-light text-ink/70 leading-relaxed mb-8 max-w-2xl">
            These cafés are all within walking distance of the property and are open from early morning through to late at night:
          </p>
          <ul className="space-y-5">
            {[
              { name: "Dr. Café Coffee", dist: "approx. 350 m · 5 min walk", body: "A beloved Saudi specialty coffee chain. Excellent espresso, matcha lattes, and fresh pastries. The closest quality café to the property." },
              { name: "Dunkin'", dist: "approx. 500 m · 7 min walk", body: "Familiar menu with affordable coffee, donuts, and light bites. Open very early — ideal after Fajr." },
              { name: "Tim Hortons", dist: "approx. 750 m · 10 min walk", body: "A relaxed café atmosphere with affordable coffee and a comfortable space to sit and unwind." },
              { name: "Local Arabic Qahwa", dist: "throughout the neighbourhood", body: "Cardamom-spiced coffee served with dates — a quintessential Madinah experience. Available from street-side stalls and small shops all around Al-Aziziyyah. Highly recommended." },
            ].map(c => (
              <li key={c.name} className="flex items-start gap-4 border-b border-ink/8 pb-5 last:border-0">
                <span className="text-gold/50 mt-1 shrink-0 text-lg leading-none">—</span>
                <div>
                  <strong className="block text-sm font-semibold mb-0.5">{c.name}</strong>
                  <span className="block text-[11px] font-medium text-gold/80 tracking-wide uppercase mb-1">{c.dist}</span>
                  <span className="text-sm font-light text-ink/70 leading-relaxed">{c.body}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <div className="h-[1px] bg-ink/10" />

        {/* LAUNDRY */}
        <section>
          <div className="flex items-center gap-2.5 text-gold mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><circle cx="12" cy="13" r="3"/></svg>
            <p className="text-xs font-semibold tracking-widest uppercase">Laundry & Dry Cleaning</p>
          </div>
          <h2 className="font-playfair text-3xl font-medium mb-3">Laundry Services Nearby</h2>
          <p className="font-light text-ink/70 leading-relaxed mb-8 max-w-2xl">
            Several laundry and dry cleaning shops are within walking distance in the Al-Aziziyyah neighbourhood:
          </p>
          <ul className="space-y-5">
            {[
              { name: "Al-Aziziyyah Laundry", dist: "approx. 200 m · 3 min walk", body: "A local laundry and ironing service used regularly by residents in the area. Fast turnaround, usually same-day for drop-offs before 10:00 AM." },
              { name: "Neighbourhood Laundries", dist: "throughout Al-Aziziyyah", body: "Several small dry cleaning shops are scattered throughout the neighbourhood within 5–10 minutes on foot. Your concierge can direct you to the closest one." },
            ].map(l => (
              <li key={l.name} className="flex items-start gap-4 border-b border-ink/8 pb-5 last:border-0">
                <span className="text-gold/50 mt-1 shrink-0 text-lg leading-none">—</span>
                <div>
                  <strong className="block text-sm font-semibold mb-0.5">{l.name}</strong>
                  <span className="block text-[11px] font-medium text-gold/80 tracking-wide uppercase mb-1">{l.dist}</span>
                  <span className="text-sm font-light text-ink/70 leading-relaxed">{l.body}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <div className="h-[1px] bg-ink/10" />

        {/* EMERGENCY CONTACTS */}
        <section>
          <div className="flex items-center gap-2.5 text-gold mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.29 6.29l1.32-1.32a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <p className="text-xs font-semibold tracking-widest uppercase">Important Numbers</p>
          </div>
          <h2 className="font-playfair text-3xl font-medium mb-3">Emergency Contacts</h2>
          <p className="font-light text-ink/70 leading-relaxed mb-8 max-w-2xl">
            We hope you never need these. All Saudi emergency services operate 24 hours a day:
          </p>
          <ul className="space-y-5 mb-6">
            {[
              { name: "Police / Ambulance", number: "911", note: "Single emergency number for all services in Saudi Arabia" },
              { name: "Civil Defence (Fire)", number: "998", note: "Fire and structural emergencies" },
              { name: "King Fahad Hospital — Madinah", number: "+966 14 845 5555", note: "Nearest major public hospital", href: "tel:+966148455555" },
              { name: "Tourist Police", number: "920002814", note: "For tourist-related incidents or lost documents" },
            ].map(e => (
              <li key={e.name} className="flex items-start gap-4 border-b border-ink/8 pb-5 last:border-0">
                <span className="text-gold/50 mt-1 shrink-0 text-lg leading-none">—</span>
                <div className="flex-1 flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <strong className="block text-sm font-semibold mb-0.5">{e.name}</strong>
                    <span className="text-xs font-light text-ink/50">{e.note}</span>
                  </div>
                  <a href={e.href || `tel:${e.number.replace(/\s/g, '')}`}
                    className="text-xl font-medium font-playfair hover:text-gold transition-colors notranslate shrink-0" translate="no">
                    {e.number}
                  </a>
                </div>
              </li>
            ))}
          </ul>
          <p className="text-sm font-light text-ink/50">
            For non-emergencies, always contact your concierge on WhatsApp first — we can coordinate on your behalf.
          </p>
        </section>

        <div className="h-[1px] bg-ink/10" />

        {/* CONCIERGE */}
        <section>
          <div className="flex items-center gap-2.5 text-gold mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <p className="text-xs font-semibold tracking-widest uppercase">Need Help?</p>
          </div>
          <h2 className="font-playfair text-3xl font-medium mb-4">24/7 Concierge</h2>
          <p className="font-light text-ink/70 leading-relaxed mb-8 max-w-2xl">
            From extra towels to booking a private tour — our team is on hand around the clock. Message us on WhatsApp for the fastest response.
          </p>
          <a href={whatsappConcierge} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 font-medium hover:bg-[#1da851] transition-colors duration-300 shadow-lg notranslate" translate="no">
            <IconWhatsApp />
            Message Concierge on WhatsApp
          </a>
        </section>

      </div>

      <Footer />
    </main>
  );
}
