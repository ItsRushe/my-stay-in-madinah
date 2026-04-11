import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Contact & Book Direct — Madinah Accommodation",
  description:
    "Contact My Stay in Madinah to book your room directly via WhatsApp or our booking form. Skip the platforms, save on fees, and get the guaranteed best rate.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Book Direct | My Stay in Madinah",
    description:
      "Get in touch to book your Madinah stay directly. No fees, instant confirmation, and guaranteed best rates.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <main className="bg-ivory min-h-screen">
      <Navbar activePage="contact" />

      {/* STICKY WHATSAPP BUBBLE */}
      <a
        href="https://wa.me/966508151408?text=As-salamu%20alaykum,%20I%20would%20like%20to%20inquire%20about%20booking%20a%20room."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-[0_10px_40px_rgba(37,211,102,0.4)] hover:scale-105 transition-transform duration-300 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.031 0C5.385 0 .003 5.385.003 12.031c0 2.126.556 4.198 1.613 6.02L.03 24l6.105-1.602a11.968 11.968 0 0 0 5.896 1.542h.005c6.643 0 12.025-5.384 12.025-12.028C24.055 5.385 18.675 0 12.031 0zm-.005 21.954a9.982 9.982 0 0 1-5.09-1.39l-.365-.217-3.784.992.998-3.69-.237-.377a9.96 9.96 0 0 1-1.523-5.27C1.995 6.486 6.483 2 12.031 2c5.545 0 10.033 4.488 10.033 10.003 0 5.513-4.488 10-10.038 10h-.001zm5.505-7.519c-.302-.151-1.787-.882-2.064-.983-.277-.101-.48-.151-.681.151-.202.302-.78 1.034-.956 1.235-.177.202-.353.227-.655.076-1.574-.789-2.73-1.66-3.784-3.32-.177-.278.177-.278.756-1.41.076-.151.038-.278-.038-.428-.076-.151-.681-1.636-.932-2.24-.246-.59-.496-.51-.681-.52-.177-.01-.378-.01-.58-.01-.202 0-.529.076-.806.378-.277.302-1.058 1.034-1.058 2.518 0 1.484 1.084 2.92 1.235 3.12.151.202 2.116 3.224 5.127 4.524 1.965.848 2.704.899 3.484.75.78-.151 2.368-.968 2.704-1.902.336-.934.336-1.737.236-1.903-.101-.166-.378-.267-.68-.418z" />
        </svg>
      </a>

      {/* HERO */}
      <section className="bg-ink text-ivory pt-36 pb-24 px-6 md:px-12 text-center">
        <p className="text-gold text-xs tracking-[0.25em] uppercase font-medium mb-4">Book Direct &amp; Save</p>
        <h1 className="font-playfair text-5xl md:text-7xl font-medium leading-tight max-w-3xl mx-auto">
          Let&apos;s Plan<br />Your Stay
        </h1>
        <p className="mt-6 text-ivory/60 font-light text-lg max-w-xl mx-auto leading-relaxed">
          Reach out directly and skip platform fees entirely. Our concierge team responds promptly — usually within the hour.
        </p>
      </section>

      {/* GOLD DIVIDER */}
      <div className="h-px bg-gold/30 w-full" />

      {/* MAIN CONTENT */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-start">

        {/* LEFT — CONTACT METHODS */}
        <div className="lg:col-span-2 space-y-6 lg:sticky lg:top-28">

          <div>
            <h2 className="font-playfair text-3xl font-medium text-ink mb-2">Get in Touch</h2>
            <p className="text-ink/50 font-light text-sm leading-relaxed">Choose the channel that suits you best. All inquiries receive a personal response.</p>
          </div>

          {/* WhatsApp Card */}
          <a
            href="https://wa.me/966508151408?text=As-salamu%20alaykum,%20I%20would%20like%20to%20inquire%20about%20booking%20a%20room."
            target="_blank"
            rel="noreferrer"
            className="group flex items-start gap-5 bg-white border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-[#25D366]/30 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-[#25D366]/10 rounded-full flex items-center justify-center flex-shrink-0 text-[#25D366] group-hover:bg-[#25D366]/20 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 0C5.385 0 .003 5.385.003 12.031c0 2.126.556 4.198 1.613 6.02L.03 24l6.105-1.602a11.968 11.968 0 0 0 5.896 1.542h.005c6.643 0 12.025-5.384 12.025-12.028C24.055 5.385 18.675 0 12.031 0zm-.005 21.954a9.982 9.982 0 0 1-5.09-1.39l-.365-.217-3.784.992.998-3.69-.237-.377a9.96 9.96 0 0 1-1.523-5.27C1.995 6.486 6.483 2 12.031 2c5.545 0 10.033 4.488 10.033 10.003 0 5.513-4.488 10-10.038 10h-.001zm5.505-7.519c-.302-.151-1.787-.882-2.064-.983-.277-.101-.48-.151-.681.151-.202.302-.78 1.034-.956 1.235-.177.202-.353.227-.655.076-1.574-.789-2.73-1.66-3.784-3.32-.177-.278.177-.278.756-1.41.076-.151.038-.278-.038-.428-.076-.151-.681-1.636-.932-2.24-.246-.59-.496-.51-.681-.52-.177-.01-.378-.01-.58-.01-.202 0-.529.076-.806.378-.277.302-1.058 1.034-1.058 2.518 0 1.484 1.084 2.92 1.235 3.12.151.202 2.116 3.224 5.127 4.524 1.965.848 2.704.899 3.484.75.78-.151 2.368-.968 2.704-1.902.336-.934.336-1.737.236-1.903-.101-.166-.378-.267-.68-.418z" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-ink text-sm tracking-wide uppercase">WhatsApp</h3>
                <span className="text-[#25D366] text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Message Now →</span>
              </div>
              <p className="text-ink/60 font-light text-sm mt-1">+966 50 815 1408</p>
              <p className="text-ink/40 text-xs mt-1">Fastest response · Usually within 1 hour</p>
            </div>
          </a>

          {/* Email Card */}
          <a
            href="mailto:info@mystayinmadinah.com"
            className="group flex items-start gap-5 bg-white border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-gold/30 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0 text-gold group-hover:bg-gold/20 transition-colors">
              {/* Concierge bell icon */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-ink text-sm tracking-wide uppercase">Email Concierge</h3>
                <span className="text-gold text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Send Email →</span>
              </div>
              <p className="text-ink/60 font-light text-sm mt-1 break-all">info@mystayinmadinah.com</p>
              <p className="text-ink/40 text-xs mt-1">For detailed inquiries &amp; special requests</p>
            </div>
          </a>

          {/* Location Card */}
          <div className="flex items-start gap-5 bg-white border border-gray-100 p-6 shadow-sm">
            <div className="w-12 h-12 bg-ink/5 rounded-full flex items-center justify-center flex-shrink-0 text-ink">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-ink text-sm tracking-wide uppercase">Location</h3>
              <p className="text-ink/60 font-light text-sm mt-1">Al-Aziziyyah District</p>
              <p className="text-ink/40 text-xs mt-1">Madinah, Saudi Arabia</p>
            </div>
          </div>

          {/* Guarantee badge */}
          <div className="border-l-2 border-gold pl-5 py-1">
            <p className="text-ink/70 text-sm font-light leading-relaxed">
              Book direct and we guarantee the <span className="text-gold font-medium">lowest available rate</span> — no platform surcharges, no hidden fees.
            </p>
          </div>
        </div>

        {/* RIGHT — INQUIRY FORM */}
        <div className="lg:col-span-3 bg-white border border-gray-100 shadow-sm p-8 md:p-12">
          <div className="mb-10">
            <h2 className="font-playfair text-3xl font-medium text-ink">Send an Inquiry</h2>
            <p className="text-ink/50 font-light text-sm mt-2">Fill in the form below and we&apos;ll come back to you with a personalised quote.</p>
          </div>

          <form action="https://api.web3forms.com/submit" method="POST" className="space-y-8">
            <input type="hidden" name="access_key" value="cf93d9fd-7d5e-45dd-9e48-3dcee22fcf48" />
            <input type="hidden" name="subject" value="New Direct Booking Inquiry from Website" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="group">
                <label className="block text-xs font-medium tracking-widest uppercase text-ink/50 mb-3">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Omar Abdullah"
                  className="w-full border-b border-gray-200 bg-transparent pb-3 focus:outline-none focus:border-ink transition-colors font-light placeholder-gray-300 text-ink text-sm"
                />
              </div>
              <div className="group">
                <label className="block text-xs font-medium tracking-widest uppercase text-ink/50 mb-3">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="w-full border-b border-gray-200 bg-transparent pb-3 focus:outline-none focus:border-ink transition-colors font-light placeholder-gray-300 text-ink text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <label className="block text-xs font-medium tracking-widest uppercase text-ink/50 mb-3">Check-in</label>
                <input
                  type="date"
                  name="check_in"
                  required
                  className="w-full border-b border-gray-200 bg-transparent pb-3 focus:outline-none focus:border-ink transition-colors font-light text-ink/60 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium tracking-widest uppercase text-ink/50 mb-3">Check-out</label>
                <input
                  type="date"
                  name="check_out"
                  required
                  className="w-full border-b border-gray-200 bg-transparent pb-3 focus:outline-none focus:border-ink transition-colors font-light text-ink/60 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium tracking-widest uppercase text-ink/50 mb-3">Message or Special Requests</label>
              <textarea
                name="message"
                rows={4}
                required
                placeholder="Let us know how we can make your visit perfect..."
                className="w-full border-b border-gray-200 bg-transparent pb-3 focus:outline-none focus:border-ink transition-colors font-light placeholder-gray-300 text-ink text-sm resize-none"
              />
            </div>

            <input type="checkbox" name="botcheck" className="hidden" style={{ display: "none" }} />

            <button
              type="submit"
              className="w-full bg-ink text-ivory py-4 text-sm font-medium tracking-widest uppercase hover:bg-gold transition-colors duration-300"
            >
              Request Best Direct Rate
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
