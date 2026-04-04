import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PriceDisplay from "../../components/PriceDisplay";
import { createClient } from "../../lib/supabase/server";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Ziyarah Tours in Madinah — Guided Experiences",
  description:
    "Discover curated Ziyarah tour experiences in Madinah led by knowledgeable local guides. Visit the Prophet's Mosque, Uhud, and other sacred sites with My Stay in Madinah.",
  alternates: { canonical: "/tours" },
  openGraph: {
    title: "Curated Ziyarah Tours in Madinah | My Stay in Madinah",
    description:
      "Explore Madinah's sacred sites with expert local guides. Tours covering the Prophet's Mosque, Uhud, and more. Book directly for the best rates.",
    url: "/tours",
  },
};

export default async function ToursPage() {
  const supabase = await createClient();
  const { data: tours } = await supabase.from('tours').select('*').order('created_at', { ascending: true });

  return (
    <main className="pt-20 bg-ivory">
      <Navbar activePage="tours" />

      <a href="https://wa.me/201067040337?text=As-salamu%20alaykum,%20I%20would%20like%20to%20inquire%20about%20booking%20a%20tour." target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 bg-[#25D366] text-white p-3 md:p-4 rounded-none shadow-[0_10px_40px_rgba(37,211,102,0.4)] hover:scale-105 transition-transform duration-300 flex items-center justify-center group">
        <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 .003 5.385.003 12.031c0 2.126.556 4.198 1.613 6.02L.03 24l6.105-1.602a11.968 11.968 0 0 0 5.896 1.542h.005c6.643 0 12.025-5.384 12.025-12.028C24.055 5.385 18.675 0 12.031 0zm-.005 21.954a9.982 9.982 0 0 1-5.09-1.39l-.365-.217-3.784.992.998-3.69-.237-.377a9.96 9.96 0 0 1-1.523-5.27C1.995 6.486 6.483 2 12.031 2c5.545 0 10.033 4.488 10.033 10.003 0 5.513-4.488 10-10.038 10h-.001zm5.505-7.519c-.302-.151-1.787-.882-2.064-.983-.277-.101-.48-.151-.681.151-.202.302-.78 1.034-.956 1.235-.177.202-.353.227-.655.076-1.574-.789-2.73-1.66-3.784-3.32-.177-.278.177-.278.756-1.41.076-.151.038-.278-.038-.428-.076-.151-.681-1.636-.932-2.24-.246-.59-.496-.51-.681-.52-.177-.01-.378-.01-.58-.01-.202 0-.529.076-.806.378-.277.302-1.058 1.034-1.058 2.518 0 1.484 1.084 2.92 1.235 3.12.151.202 2.116 3.224 5.127 4.524 1.965.848 2.704.899 3.484.75.78-.151 2.368-.968 2.704-1.902.336-.934.336-1.737.236-1.903-.101-.166-.378-.267-.68-.418z"/></svg>
      </a>

      <header className="bg-ink py-24 md:py-32 px-6 border-b border-white/10 text-center">
        <h1 className="font-playfair text-4xl md:text-6xl text-white font-medium mb-6">Curated Ziyarah Experiences</h1>
        <p className="text-ivory/60 font-light text-lg max-w-2xl mx-auto">Discover the rich spiritual heritage of Madinah with our deeply knowledgeable local guides. All tours include free cancellation up to 24 hours before your experience.</p>
      </header>

      <section className="py-20 px-6 md:px-12 max-w-[90rem] mx-auto text-ink">
        {tours?.map((tour: any, index: number) => (
          <div key={tour.id}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              {/* IMAGE GRID - Sharp Edges */}
              <div className={`grid grid-cols-3 gap-4 h-[350px] md:h-[500px] ${index % 2 !== 0 ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}`}>
                <div className="col-span-2 rounded-none overflow-hidden relative bg-gray-100">
                  <img src={tour.images[0]} alt={tour.name} className="w-full h-full object-cover lightbox-trigger cursor-zoom-in hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="grid grid-rows-2 gap-4">
                  <div className="rounded-none overflow-hidden relative bg-gray-100">
                    <img src={tour.images[1]} alt={tour.name} className="w-full h-full object-cover lightbox-trigger cursor-zoom-in hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="rounded-none overflow-hidden relative bg-gray-100">
                    <img src={tour.images[2]} alt={tour.name} className="w-full h-full object-cover lightbox-trigger cursor-zoom-in hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
              </div>
              
              {/* TEXT DETAILS */}
              <div className={`${index % 2 !== 0 ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}`}>
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="bg-gold/10 text-gold px-3 py-1 rounded-none text-xs font-semibold tracking-wider uppercase">{tour.duration}</span>
                  <span className="bg-ink/5 text-ink px-3 py-1 rounded-none text-xs font-semibold tracking-wider uppercase">{tour.group_size}</span>
                </div>
                <h2 className="font-playfair text-3xl md:text-5xl font-medium mb-2">{tour.name}</h2>
                <p className="text-3xl text-gold font-medium mb-6">
                  <PriceDisplay amountGBP={tour.price} />
                  <span className="text-sm font-light opacity-50 uppercase tracking-wide ml-2">Per Group</span>
                </p>
                <div className="space-y-4 font-light leading-relaxed mb-8 text-lg opacity-80">
                  <p>{tour.description}</p>
                </div>

                <div className="flex items-center gap-3 text-sm text-green-600 font-medium bg-green-50 p-4 rounded-none mb-8 border border-green-100">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Book with confidence: Free cancellation up to 24 hours before start (local time).
                </div>

                <a href={`https://wa.me/201067040337?text=${encodeURIComponent(tour.whatsapp_text)}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center bg-ink text-white px-10 py-4 font-medium hover:bg-gold transition-colors duration-300 shadow-xl w-full sm:w-auto rounded-none">
                  Book via WhatsApp
                </a>
              </div>
            </div>

            {index !== tours.length - 1 && <hr className="border-gray-200 my-24" />}
          </div>
        ))}
      </section>

      {/* FULLSCREEN IMAGE LIGHTBOX MODAL */}
      <div id="lightbox" className="fixed inset-0 z-[200] bg-black/95 hidden items-center justify-center backdrop-blur-sm opacity-0 transition-opacity duration-300">
          <button id="close-lightbox" className="absolute top-6 right-6 text-white hover:text-gold transition-colors focus:outline-none p-2">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          <img id="lightbox-img" src="" alt="Full Screen Tour View" className="max-w-[95vw] max-h-[90vh] object-contain shadow-2xl rounded-none" />
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', () => {
              const lightbox = document.getElementById('lightbox');
              const lightboxImg = document.getElementById('lightbox-img');
              const closeBtn = document.getElementById('close-lightbox');
              const triggers = document.querySelectorAll('.lightbox-trigger');

              triggers.forEach(trigger => {
                  trigger.addEventListener('click', (e) => {
                      lightboxImg.src = e.target.src;
                      lightbox.classList.remove('hidden');
                      lightbox.classList.add('flex');
                      setTimeout(() => lightbox.classList.remove('opacity-0'), 10);
                      document.body.style.overflow = 'hidden'; 
                  });
              });

              const closeLightbox = () => {
                  lightbox.classList.add('opacity-0');
                  setTimeout(() => {
                      lightbox.classList.add('hidden');
                      lightbox.classList.remove('flex');
                      lightboxImg.src = '';
                      document.body.style.overflow = ''; 
                  }, 300); 
              };

              closeBtn.addEventListener('click', closeLightbox);
              lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
              document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) closeLightbox(); });
          });
        `
      }} />

      <Footer />
    </main>
  );
}