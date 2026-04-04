import type { Metadata } from "next";
import Link from "next/link";
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
    <main className="pt-20">
      <Navbar activePage="contact" />

      {/* STICKY WHATSAPP */}
      <a href="https://wa.me/201067040337?text=As-salamu%20alaykum,%20I%20would%20like%20to%20inquire%20about%20booking%20a%20room." target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-[0_10px_40px_rgba(37,211,102,0.4)] hover:scale-105 transition-transform duration-300 flex items-center justify-center group">
        <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 .003 5.385.003 12.031c0 2.126.556 4.198 1.613 6.02L.03 24l6.105-1.602a11.968 11.968 0 0 0 5.896 1.542h.005c6.643 0 12.025-5.384 12.025-12.028C24.055 5.385 18.675 0 12.031 0zm-.005 21.954a9.982 9.982 0 0 1-5.09-1.39l-.365-.217-3.784.992.998-3.69-.237-.377a9.96 9.96 0 0 1-1.523-5.27C1.995 6.486 6.483 2 12.031 2c5.545 0 10.033 4.488 10.033 10.003 0 5.513-4.488 10-10.038 10h-.001zm5.505-7.519c-.302-.151-1.787-.882-2.064-.983-.277-.101-.48-.151-.681.151-.202.302-.78 1.034-.956 1.235-.177.202-.353.227-.655.076-1.574-.789-2.73-1.66-3.784-3.32-.177-.278.177-.278.756-1.41.076-.151.038-.278-.038-.428-.076-.151-.681-1.636-.932-2.24-.246-.59-.496-.51-.681-.52-.177-.01-.378-.01-.58-.01-.202 0-.529.076-.806.378-.277.302-1.058 1.034-1.058 2.518 0 1.484 1.084 2.92 1.235 3.12.151.202 2.116 3.224 5.127 4.524 1.965.848 2.704.899 3.484.75.78-.151 2.368-.968 2.704-1.902.336-.934.336-1.737.236-1.903-.101-.166-.378-.267-.68-.418z"/></svg>
      </a>

      <section className="py-20 px-6 md:px-12 max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start text-ink">
        <div>
          <h1 className="font-playfair text-4xl md:text-6xl font-medium mb-6">Book Direct. <br/>Save Instantly.</h1>
          <p className="font-light text-lg mb-10 max-w-md opacity-80">By passing over Airbnb and booking directly with our concierge team, you automatically bypass platform fees and secure our lowest guaranteed rate.</p>
          
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0 text-gold">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
              <div>
                <h4 className="font-medium">Email Concierge</h4>
                <a href="mailto:info@mystayinmadinah.com" className="font-light text-sm mt-1 hover:text-gold transition-colors inline-block opacity-80">info@mystayinmadinah.com</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#25D366]/10 rounded-full flex items-center justify-center flex-shrink-0 text-[#25D366]">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 .003 5.385.003 12.031c0 2.126.556 4.198 1.613 6.02L.03 24l6.105-1.602a11.968 11.968 0 0 0 5.896 1.542h.005c6.643 0 12.025-5.384 12.025-12.028C24.055 5.385 18.675 0 12.031 0zm-.005 21.954a9.982 9.982 0 0 1-5.09-1.39l-.365-.217-3.784.992.998-3.69-.237-.377a9.96 9.96 0 0 1-1.523-5.27C1.995 6.486 6.483 2 12.031 2c5.545 0 10.033 4.488 10.033 10.003 0 5.513-4.488 10-10.038 10h-.001z"/></svg>
              </div>
              <div>
                <h4 className="font-medium">Instant WhatsApp</h4>
                <p className="font-light text-sm mt-1 opacity-80">+20 10 67040337</p>
                <a href="https://wa.me/201067040337?text=As-salamu%20alaykum,%20I%20would%20like%20to%20inquire%20about%20booking%20a%20room." target="_blank" rel="noreferrer" className="text-[#25D366] text-sm mt-2 inline-block font-medium hover:underline">Message Us Now &rarr;</a>
              </div>
            </div>
          </div>
        </div>

        {/* Web3Forms Integration */}
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl border border-gray-100">
          <h3 className="font-playfair text-2xl font-medium mb-8">Send an Inquiry</h3>
          <form action="https://api.web3forms.com/submit" method="POST" className="space-y-6">
            <input type="hidden" name="access_key" value="cf93d9fd-7d5e-45dd-9e48-3dcee22fcf48" />
            <input type="hidden" name="subject" value="New Direct Booking Inquiry from Website" />

            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input type="text" name="name" required className="w-full border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-gold transition-colors font-light placeholder-gray-400" placeholder="e.g. Omar Abdullah" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input type="email" name="email" required className="w-full border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-gold transition-colors font-light placeholder-gray-400" placeholder="you@example.com" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Check-in</label>
                <input type="date" name="check_in" required className="w-full border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-gold transition-colors font-light text-gray-500" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Check-out</label>
                <input type="date" name="check_out" required className="w-full border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-gold transition-colors font-light text-gray-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message or Special Requests</label>
              <textarea name="message" rows={4} required className="w-full border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-gold transition-colors font-light placeholder-gray-400 resize-none" placeholder="Let us know how we can make your Ziyarah perfect..."></textarea>
            </div>
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
            <button type="submit" className="w-full bg-ink text-white py-4 font-medium hover:bg-gold transition-colors duration-300 mt-4 shadow-xl">Request Best Direct Rate</button>
          </form>
        </div>
      </section>

      {/* BRANDED FOOTER */}
      <Footer />  {/* 👈 REPLACED 20 LINES OF CODE WITH THIS ONE LINE! */}
    </main>
  );
}