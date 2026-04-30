// app/checkin/room-3/page.tsx
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Stripe from "stripe";
import { createClient } from "../../../lib/supabase/server";

export const dynamic = 'force-dynamic';

const IconWhatsApp = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.031 0C5.385 0 .003 5.385.003 12.031c0 2.126.556 4.198 1.613 6.02L.03 24l6.105-1.602a11.968 11.968 0 0 0 5.896 1.542h.005c6.643 0 12.025-5.384 12.025-12.028C24.055 5.385 18.675 0 12.031 0zm-.005 21.954a9.982 9.982 0 0 1-5.09-1.39l-.365-.217-3.784.992.998-3.69-.237-.377a9.96 9.96 0 0 1-1.523-5.27C1.995 6.486 6.483 2 12.031 2c5.545 0 10.033 4.488 10.033 10.003 0 5.513-4.488 10-10.038 10h-.001zm5.505-7.519c-.302-.151-1.787-.882-2.064-.983-.277-.101-.48-.151-.681.151-.202.302-.78 1.034-.956 1.235-.177.202-.353.227-.655.076-1.574-.789-2.73-1.66-3.784-3.32-.177-.278.177-.278.756-1.41.076-.151.038-.278-.038-.428-.076-.151-.681-1.636-.932-2.24-.246-.59-.496-.51-.681-.52-.177-.01-.378-.01-.58-.01-.202 0-.529.076-.806.378-.277.302-1.058 1.034-1.058 2.518 0 1.484 1.084 2.92 1.235 3.12.151.202 2.116 3.224 5.127 4.524 1.965.848 2.704.899 3.484.75.78-.151 2.368-.968 2.704-1.902.336-.934.336-1.737.236-1.903-.101-.166-.378-.267-.68-.418z"/>
  </svg>
);

export default async function CheckinRoom3Page({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const resolvedParams = await searchParams;
  const sessionId = resolvedParams.session_id;

  let guestFirstName = "";
  let guestFullName = "";
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
        .select('id, check_in, check_out')
        .eq('stripe_session_id', sessionId)
        .single();

      if (booking) {
        orderNumber = booking.id.split('-')[0].toUpperCase();
        checkIn = booking.check_in || "";
        checkOut = booking.check_out || "";
      }
    } catch (error) {
      console.error("Error fetching check-in personalization:", error);
    }
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split('-');
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' });
  };

  const whatsappBase = "https://wa.me/966508151408";
  const lockboxMsg = orderNumber
    ? `Hi, I am ${guestFullName || 'a guest'} (Order #${orderNumber}). Please could you send me the lockbox code for Room 3?`
    : `Hi, please could you send me the lockbox code for Room 3?`;
  const whatsappLockbox = `${whatsappBase}?text=${encodeURIComponent(lockboxMsg)}`;
  const helpMsg = orderNumber
    ? `Hi, I am ${guestFullName || 'a guest'} (Order #${orderNumber}) and I need help accessing Room 3.`
    : `Hi, I need help accessing Room 3.`;
  const whatsappHelp = `${whatsappBase}?text=${encodeURIComponent(helpMsg)}`;

  const mapsUrl = "https://maps.app.goo.gl/XgBjYkPWxYMZVNCp8";
  const mapsEmbedUrl = "https://maps.google.com/maps?q=24.4674506,39.5644021&z=17&output=embed";

  const steps = [
    {
      tag: "Arrival",
      title: "Locate the Building",
      photo: "/checkin/photos/building.jpg",
      photoLabel: "Your Building",
      body: (
        <>
          <p className="font-light leading-relaxed opacity-75 mb-3">
            Navigate to <strong className="font-semibold text-ink">عبيد العيدي, Al Jamawat, Madinah 42371</strong>. You are looking for a cream and dark-grey building on the corner. At street level you will see <strong className="font-semibold text-ink">two black entrance doors</strong> side by side with steps leading up to each.
          </p>
          <p className="font-light leading-relaxed opacity-75">
            Your entrance is the <strong className="font-semibold text-ink">door on the left — marked with the number 3</strong> on the wall beside it.
          </p>
        </>
      ),
    },
    {
      tag: "Key Collection",
      title: "Collect Your Key from the Lockbox",
      photo: "/checkin/photos/lockbox.jpg",
      photoLabel: "Lockbox",
      secondaryPhoto: "/checkin/photos/entrance-door.jpg",
      secondaryLabel: "Entrance Door",
      body: (
        <>
          <p className="font-light leading-relaxed opacity-75 mb-3">
            At your entrance door (number 3), you will find a <strong className="font-semibold text-ink">lockbox mounted on the wall</strong> to the left of the door handle. Your lockbox code was included in your <strong className="font-semibold text-ink">confirmation email</strong>.
          </p>
          <p className="font-light leading-relaxed opacity-75">
            Enter the code and open the lockbox. Inside you will find <strong className="font-semibold text-ink">two keys</strong> — one for the courtyard entrance door, and a <strong className="font-semibold text-ink">room card</strong> to unlock your room.
          </p>
          <div className="border-l-2 border-gold/50 pl-5 mt-5 space-y-3">
            <p className="text-sm font-light text-ink/70">
              <strong className="text-gold font-semibold">Important:</strong> Please check your confirmation email for the lockbox code before you arrive. If you cannot find it, message us on WhatsApp and we will send it to you.
            </p>
            <a href={whatsappLockbox} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 border border-ink/20 px-4 py-2 text-xs font-medium tracking-wide uppercase hover:border-gold hover:text-gold transition-colors">
              <IconWhatsApp />
              Request Lockbox Code
            </a>
          </div>
        </>
      ),
    },
    {
      tag: "Entrance",
      title: "Enter the Courtyard",
      photo: "/checkin/photos/courtyard.jpg",
      photoLabel: "Courtyard",
      body: (
        <>
          <p className="font-light leading-relaxed opacity-75 mb-3">
            Use the <strong className="font-semibold text-ink">courtyard key</strong> to unlock the entrance door. Walk through into the <strong className="font-semibold text-ink">open courtyard</strong>. You will see stairs ahead with a black iron railing and a dark gate door on your right.
          </p>
          <p className="font-light leading-relaxed opacity-75">
            Head up the stairs to reach Room 3.
          </p>
        </>
      ),
    },
    {
      tag: "Your Room",
      title: "Welcome to Room 3",
      photo: "/checkin/photos/room-door.jpg",
      photoLabel: "Room 3",
      body: (
        <>
          <p className="font-light leading-relaxed opacity-75 mb-3">
            At the top of the stairs you will find <strong className="font-semibold text-ink">Room 3</strong> — clearly numbered on the white door. Use the <strong className="font-semibold text-ink">room card</strong> from the lockbox to unlock and enter.
          </p>
          <p className="font-light leading-relaxed opacity-75">
            Make yourself at home. We hope you enjoy your stay in Madinah.
          </p>
        </>
      ),
    },
  ];

  const greeting = guestFirstName ? `Welcome, ${guestFirstName}` : "Your Check-In Guide";
  const subGreeting = guestFirstName
    ? "Everything you need to access Room 3. Follow the steps below to collect your key and settle in."
    : "Everything you need to access Room 3 at My Stay in Madinah. Follow the simple steps below to collect your key and settle in.";

  return (
    <main className="bg-ivory pt-20">
      <Navbar />

      {/* HERO */}
      <header className="bg-ink py-24 md:py-32 px-6 border-b border-white/10 text-center">
        {orderNumber ? (
          <div className="inline-flex items-center gap-4 mb-4">
            <span className="h-[1px] w-8 md:w-12 bg-gold" />
            <span className="text-gold tracking-[0.2em] text-[10px] md:text-xs uppercase font-medium">Order #{orderNumber}</span>
            <span className="h-[1px] w-8 md:w-12 bg-gold" />
          </div>
        ) : (
          <div className="inline-flex items-center gap-4 mb-4">
            <span className="h-[1px] w-8 md:w-12 bg-gold" />
            <span className="text-gold tracking-[0.2em] text-[10px] md:text-xs uppercase font-medium">Check-In Guide · Room 3</span>
            <span className="h-[1px] w-8 md:w-12 bg-gold" />
          </div>
        )}
        <h1 className="font-playfair text-4xl md:text-6xl text-white font-medium mb-6 notranslate" translate="no">
          {greeting}
        </h1>
        <p className="text-ivory/60 font-light text-lg max-w-2xl mx-auto">
          {subGreeting}
        </p>
      </header>

      {/* BOOKING SUMMARY BAR */}
      <div className="bg-ink border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 border border-white/10">
            <div className="px-6 py-5">
              <span className="block text-gold text-[10px] font-semibold tracking-widest uppercase mb-1">Room</span>
              <span className="text-white font-medium text-sm">Room 3</span>
            </div>
            <div className="px-6 py-5">
              <span className="block text-gold text-[10px] font-semibold tracking-widest uppercase mb-1">Check-in</span>
              <span className="text-white font-medium text-sm">3:00 PM</span>
              {checkIn && <span className="block text-white/40 text-xs mt-0.5 notranslate" translate="no">{formatDate(checkIn)}</span>}
            </div>
            <div className="px-6 py-5">
              <span className="block text-gold text-[10px] font-semibold tracking-widest uppercase mb-1">Check-out</span>
              <span className="text-white font-medium text-sm">11:00 AM</span>
              {checkOut && <span className="block text-white/40 text-xs mt-0.5 notranslate" translate="no">{formatDate(checkOut)}</span>}
            </div>
            <div className="px-6 py-5 col-span-2 md:col-span-1">
              <span className="block text-gold text-[10px] font-semibold tracking-widest uppercase mb-1">Address</span>
              <span className="block text-white font-medium text-sm leading-snug" dir="rtl">عبيد العيدي, Al Jamawat</span>
              <span className="block text-white/60 font-light text-xs leading-snug mt-0.5">Madinah 42371, Saudi Arabia</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAP / DIRECTIONS */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="flex items-center gap-2.5 text-gold mb-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <p className="text-xs font-semibold tracking-widest uppercase">Find Us</p>
        </div>
        <h2 className="font-playfair text-3xl md:text-4xl font-medium text-ink mb-6">Getting to the Property</h2>

        <div className="border border-ink/10 bg-white overflow-hidden shadow-lg">
          <div className="relative">
            <iframe
              src={mapsEmbedUrl}
              width="100%"
              height="380"
              style={{ border: 0, display: 'block' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Driving route from Madinah Airport to My Stay in Madinah"
              className="w-full h-[320px] md:h-[420px]"
            />
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-4 py-2.5 shadow-md flex items-center gap-2.5 text-xs pointer-events-none">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#BA6A42" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span className="text-ink font-semibold">My Stay in Madinah</span>
            </div>
          </div>
          <div className="p-6 md:p-7 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10">
            <div>
              <p className="font-semibold text-ink mb-1">My Stay in Madinah</p>
              <p className="text-sm font-light text-ink/70" dir="rtl">عبيد العيدي, Al Jamawat, Madinah 42371, Saudi Arabia</p>
            </div>
            <a href={mapsUrl} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 bg-ink text-white px-6 py-3 text-xs font-medium tracking-widest uppercase hover:bg-gold transition-colors">
              Open in Google Maps →
            </a>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pb-16 md:pb-24">
        <div className="flex items-center gap-2.5 text-gold mb-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
          <p className="text-xs font-semibold tracking-widest uppercase">Step by Step</p>
        </div>
        <h2 className="font-playfair text-3xl md:text-4xl font-medium text-ink mb-12">How to Access Your Room</h2>

        <div className="space-y-20 md:space-y-24">
          {steps.map((step, idx) => {
            const reverse = idx % 2 === 1;
            const num = String(idx + 1).padStart(2, '0');
            const PhotoLabel = ({ children }: { children: React.ReactNode }) => (
              <span className="absolute top-3 left-3 bg-ivory/95 backdrop-blur text-ink text-[10px] font-semibold tracking-[0.2em] uppercase px-2.5 py-1 border border-gold/40 inline-flex items-center gap-1.5 shadow-sm">
                <span className="w-1 h-1 bg-gold rounded-full" />
                {children}
              </span>
            );
            return (
              <div key={idx} className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center pt-16 border-t border-ink/10 ${idx === 0 ? 'border-t-0 pt-0' : ''}`}>
                <div className={`md:col-span-5 ${reverse ? 'md:order-2' : ''}`}>
                  <p className="font-playfair text-5xl md:text-6xl text-ink/15 font-medium leading-none mb-3 notranslate" translate="no">{num}</p>
                  <p className="text-xs font-semibold tracking-[0.28em] uppercase text-gold mb-3">{step.tag}</p>
                  <h3 className="font-playfair text-2xl md:text-3xl text-ink font-medium mb-5 leading-tight">{step.title}</h3>
                  {step.body}
                </div>
                <div className={`md:col-span-7 ${reverse ? 'md:order-1' : ''}`}>
                  {step.secondaryPhoto ? (
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                      <div className="relative overflow-hidden shadow-xl bg-ink/5 aspect-[3/4]">
                        <img src={step.photo} alt={step.photoLabel} className="w-full h-full object-cover" />
                        <PhotoLabel>{step.photoLabel}</PhotoLabel>
                      </div>
                      <div className="relative overflow-hidden shadow-xl bg-ink/5 aspect-[3/4]">
                        <img src={step.secondaryPhoto} alt={step.secondaryLabel} className="w-full h-full object-cover" />
                        <PhotoLabel>{step.secondaryLabel}</PhotoLabel>
                      </div>
                    </div>
                  ) : (
                    <div className="relative overflow-hidden shadow-xl bg-ink/5 aspect-[4/3]">
                      <img src={step.photo} alt={step.photoLabel} className="w-full h-full object-cover" />
                      <PhotoLabel>{step.photoLabel}</PhotoLabel>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* HELP CTA */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pb-24">
        <div className="bg-ink text-white p-10 md:p-14 text-center">
          <div className="flex items-center justify-center gap-2.5 text-gold mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <p className="text-xs font-semibold tracking-widest uppercase">Need Help?</p>
          </div>
          <h2 className="font-playfair text-2xl md:text-3xl font-medium mb-4">We are here, around the clock.</h2>
          <p className="font-light text-white/60 mb-8 max-w-xl mx-auto">
            If you have any issues accessing the property or your room, message us directly on WhatsApp and we will help you immediately.
          </p>
          <a href={whatsappHelp} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 font-medium hover:bg-[#1da851] transition-colors duration-300 shadow-lg">
            <IconWhatsApp />
            Message Us on WhatsApp
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
