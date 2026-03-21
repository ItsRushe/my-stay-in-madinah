import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function ToursPage() {
  return (
    <main className="pt-20">
      <Navbar activePage="tours" />

      {/* STICKY WHATSAPP */}
      <a href="https://wa.me/201067040337?text=As-salamu%20alaykum,%20I%20would%20like%20to%20inquire%20about%20booking%20a%20tour." target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 bg-[#25D366] text-white p-3 md:p-4 rounded-full shadow-[0_10px_40px_rgba(37,211,102,0.4)] hover:scale-105 transition-transform duration-300 flex items-center justify-center group">
        <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 .003 5.385.003 12.031c0 2.126.556 4.198 1.613 6.02L.03 24l6.105-1.602a11.968 11.968 0 0 0 5.896 1.542h.005c6.643 0 12.025-5.384 12.025-12.028C24.055 5.385 18.675 0 12.031 0zm-.005 21.954a9.982 9.982 0 0 1-5.09-1.39l-.365-.217-3.784.992.998-3.69-.237-.377a9.96 9.96 0 0 1-1.523-5.27C1.995 6.486 6.483 2 12.031 2c5.545 0 10.033 4.488 10.033 10.003 0 5.513-4.488 10-10.038 10h-.001zm5.505-7.519c-.302-.151-1.787-.882-2.064-.983-.277-.101-.48-.151-.681.151-.202.302-.78 1.034-.956 1.235-.177.202-.353.227-.655.076-1.574-.789-2.73-1.66-3.784-3.32-.177-.278.177-.278.756-1.41.076-.151.038-.278-.038-.428-.076-.151-.681-1.636-.932-2.24-.246-.59-.496-.51-.681-.52-.177-.01-.378-.01-.58-.01-.202 0-.529.076-.806.378-.277.302-1.058 1.034-1.058 2.518 0 1.484 1.084 2.92 1.235 3.12.151.202 2.116 3.224 5.127 4.524 1.965.848 2.704.899 3.484.75.78-.151 2.368-.968 2.704-1.902.336-.934.336-1.737.236-1.903-.101-.166-.378-.267-.68-.418z"/></svg>
      </a>

      <header className="bg-ink py-24 md:py-32 px-6 border-b border-white/10 text-center">
        <h1 className="font-playfair text-4xl md:text-6xl text-white font-medium mb-6">Curated Ziyarah Experiences</h1>
        <p className="text-ivory/60 font-light text-lg max-w-2xl mx-auto">Discover the rich spiritual heritage of Madinah with our deeply knowledgeable local guides. All tours include free cancellation up to 24 hours before your experience.</p>
      </header>

      <section className="py-20 px-6 md:px-12 max-w-[90rem] mx-auto space-y-24 text-ink">
        {/* Heritage Tour */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="grid grid-cols-3 gap-4 h-[350px] md:h-[500px]">
            <div className="col-span-2 rounded-2xl overflow-hidden relative bg-gray-100"><img src="/heritage-1.jpg" alt="Prophet's Mosque" className="w-full h-full object-cover" /></div>
            <div className="grid grid-rows-2 gap-4">
              <div className="rounded-2xl overflow-hidden relative bg-gray-100"><img src="/heritage-2.jpg" alt="Minarets" className="w-full h-full object-cover" /></div>
              <div className="rounded-2xl overflow-hidden relative bg-gray-100"><img src="/heritage-3.jpg" alt="Architecture" className="w-full h-full object-cover" /></div>
            </div>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase">3-4 Hours</span>
              <span className="bg-ink/5 text-ink px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase">Up to 3 People</span>
            </div>
            <h2 className="font-playfair text-3xl md:text-5xl font-medium mb-2">Madinah Islamic Heritage Tour</h2>
            <p className="text-2xl text-gold font-medium mb-6">£99 <span className="text-sm font-light opacity-50 uppercase tracking-wide">Per Group</span></p>
            <div className="space-y-4 font-light leading-relaxed mb-8 text-lg opacity-80">
              <p>Immerse yourself in the profound history of the Prophet's city. This comprehensive journey takes you through the most significant historical landmarks in Madinah.</p>
            </div>
            <a href="https://wa.me/201067040337?text=I%20would%20like%20to%20book%20the%20Madinah%20Islamic%20Heritage%20Tour%20(£99)." target="_blank" rel="noreferrer" className="inline-flex items-center justify-center bg-ink text-white px-10 py-4 font-medium hover:bg-gold transition-colors duration-300 shadow-xl w-full sm:w-auto">
              Book via WhatsApp
            </a>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Uhud Tour */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="bg-gold/10 text-gold px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase">4 Hours</span>
              <span className="bg-ink/5 text-ink px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase">Up to 4 People</span>
            </div>
            <h2 className="font-playfair text-3xl md:text-5xl font-medium mb-2">Uhud Battlefield Private Tour</h2>
            <p className="text-2xl text-gold font-medium mb-6">£60 <span className="text-sm font-light opacity-50 uppercase tracking-wide">Per Group</span></p>
            <div className="space-y-4 font-light leading-relaxed mb-8 text-lg opacity-80">
              <p>Walk the sacred grounds of the historic Battle of Uhud. Stand before the towering red mountains, pay your respects at the Martyrs' Cemetery, and climb Archers' Hill.</p>
            </div>
            <a href="https://wa.me/201067040337?text=I%20would%20like%20to%20book%20the%20Uhud%20Battlefield%20Private%20Tour%20(£60)." target="_blank" rel="noreferrer" className="inline-flex items-center justify-center bg-ink text-white px-10 py-4 font-medium hover:bg-gold transition-colors duration-300 shadow-xl w-full sm:w-auto">
              Book via WhatsApp
            </a>
          </div>
          <div className="grid grid-cols-3 gap-4 h-[350px] md:h-[500px] order-1 lg:order-2">
            <div className="col-span-2 rounded-2xl overflow-hidden relative bg-gray-100"><img src="/uhud-1.jpg" alt="Uhud" className="w-full h-full object-cover" /></div>
            <div className="grid grid-rows-2 gap-4">
              <div className="rounded-2xl overflow-hidden relative bg-gray-100"><img src="/uhud-3.jpg" alt="Uhud" className="w-full h-full object-cover" /></div>
              <div className="rounded-2xl overflow-hidden relative bg-gray-100"><img src="/uhud-2.jpg" alt="Uhud" className="w-full h-full object-cover" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ink py-12 px-6 md:px-12 border-t border-white/5 flex flex-col items-center">
        <Link href="/" className="flex flex-col items-center group mb-6 cursor-pointer">
          <img src="/icon-logo.png" alt="Icon" className="h-16 w-auto object-contain mb-3 opacity-90 transition-transform duration-700 group-hover:scale-105" />
          <span className="text-gold font-jost text-xl font-medium tracking-[0.2em] uppercase opacity-90">My Stay In Madinah</span>
        </Link>
        <p className="text-white/40 text-xs font-light">&copy; 2026 My Stay in Madinah. All rights reserved.</p>
      </footer>
    </main>
  );
}