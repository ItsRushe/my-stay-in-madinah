import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PriceDisplay from "../components/PriceDisplay";
import { createClient } from "../lib/supabase/server";
import { getTranslations, getLocale } from 'next-intl/server';
import { roomTranslationsAr } from "../lib/translations/rooms";
import { tourTranslationsAr } from "../lib/translations/tours";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "My Stay in Madinah | Premium Direct Booking — No Platform Fees",
  description:
    "Book premium boutique accommodation in Madinah directly with no platform fees. Guaranteed lowest rates, hotel-grade cleanliness, and a central location near the Prophet's Mosque. Save up to 20% vs Airbnb.",
  alternates: { canonical: "/" },
};

export default async function Home() {
  const supabase = await createClient();
  const { data: rooms } = await supabase.from('rooms').select('*').order('price_per_night', { ascending: true });
  const { data: tours } = await supabase.from('tours').select('*').order('created_at', { ascending: true });
  const { data: thingsToDo } = await supabase.from('things_to_do').select('*').order('created_at', { ascending: true });

  const t = await getTranslations('Home');
  const locale = await getLocale();
  const isAr = locale === 'ar';

  return (
    <main className="bg-ivory">
      <Navbar activePage="home" />

      {/* STICKY WHATSAPP WIDGET */}
      <a href="https://wa.me/966508151408?text=As-salamu%20alaykum,%20I%20would%20like%20to%20inquire%20about%20booking%20a%20room." target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 bg-[#25D366] text-white p-3 md:p-4 rounded-none shadow-[0_10px_40px_rgba(37,211,102,0.4)] hover:scale-105 transition-transform duration-300 flex items-center justify-center group">
        <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 .003 5.385.003 12.031c0 2.126.556 4.198 1.613 6.02L.03 24l6.105-1.602a11.968 11.968 0 0 0 5.896 1.542h.005c6.643 0 12.025-5.384 12.025-12.028C24.055 5.385 18.675 0 12.031 0zm-.005 21.954a9.982 9.982 0 0 1-5.09-1.39l-.365-.217-3.784.992.998-3.69-.237-.377a9.96 9.96 0 0 1-1.523-5.27C1.995 6.486 6.483 2 12.031 2c5.545 0 10.033 4.488 10.033 10.003 0 5.513-4.488 10-10.038 10h-.001zm5.505-7.519c-.302-.151-1.787-.882-2.064-.983-.277-.101-.48-.151-.681.151-.202.302-.78 1.034-.956 1.235-.177.202-.353.227-.655.076-1.574-.789-2.73-1.66-3.784-3.32-.177-.278.177-.278.756-1.41.076-.151.038-.278-.038-.428-.076-.151-.681-1.636-.932-2.24-.246-.59-.496-.51-.681-.52-.177-.01-.378-.01-.58-.01-.202 0-.529.076-.806.378-.277.302-1.058 1.034-1.058 2.518 0 1.484 1.084 2.92 1.235 3.12.151.202 2.116 3.224 5.127 4.524 1.965.848 2.704.899 3.484.75.78-.151 2.368-.968 2.704-1.902.336-.934.336-1.737.236-1.903-.101-.166-.378-.267-.68-.418z"/></svg>
      </a>

      {/* HERO SECTION */}
      <header className="relative min-h-screen w-full bg-ivory flex flex-col justify-center overflow-hidden pt-32 lg:pt-24 pb-16">
        <div className="max-w-[90rem] mx-auto w-full px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center relative z-10">
          <div className="lg:col-span-6 flex flex-col justify-center order-1 lg:order-1 text-center lg:text-start">
            <div className="inline-flex items-center justify-center lg:justify-start gap-4 mb-6 md:mb-8">
              <span className="h-[1px] w-8 md:w-12 bg-gold"></span>
              <span className="text-gold tracking-[0.2em] text-[10px] md:text-xs lg:text-sm uppercase font-medium">{t('boutique_label')}</span>
              <span className="h-[1px] w-8 md:w-12 bg-gold lg:hidden"></span>
            </div>
            <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] text-ink font-medium tracking-tight md:leading-[1.05] mb-6 md:mb-8">
              {t('hero_title')}<br /><span className="text-gold italic font-normal">{t('hero_title_italic')}</span>
            </h1>
            <p className="text-base md:text-lg text-ink/70 font-light max-w-xl mx-auto lg:mx-0 mb-10 md:mb-12 leading-relaxed">
              {t('hero_subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full sm:w-auto justify-center lg:justify-start">
              <Link href="/rooms" className="bg-ink hover:bg-gold text-white px-8 py-4 text-center transition-all duration-500 font-medium tracking-wide w-full sm:w-auto shadow-xl rounded-none">{t('cta_reserve')}</Link>
              <Link href="/contact" className="border border-ink/20 hover:border-ink text-ink px-8 py-4 text-center transition-all duration-500 font-medium flex items-center justify-center gap-3 w-full sm:w-auto rounded-none">{t('cta_chat')}</Link>
            </div>
          </div>
          <div className="lg:col-span-6 relative order-2 lg:order-2 flex justify-center lg:justify-end mt-4 lg:mt-0">
            <div className="relative w-full max-w-[90%] sm:max-w-md xl:max-w-lg aspect-[4/5] overflow-hidden shadow-2xl border border-gray-100 rounded-none">
              <img src="/room-1.jpg" alt="Premium Madinah Room" className="w-full h-full object-cover animate-pan" />
            </div>
            <div className="absolute -bottom-6 -left-2 md:bottom-10 md:-left-8 bg-white/95 backdrop-blur-md p-5 shadow-xl border border-gray-100 flex items-center gap-4 rounded-none">
              <div className="w-12 h-12 bg-gold/10 flex items-center justify-center text-gold text-2xl rounded-none">★</div>
              <div>
                <p className="text-ink font-playfair font-medium text-lg leading-tight">{t('top_rated')}</p>
                <p className="text-ink/50 text-[10px] uppercase tracking-wider font-semibold">{t('top_rated_sub')}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* TRUST PILLARS */}
      <section className="py-12 md:py-20 px-6 md:px-12 bg-ivory">
        <div className="max-w-[90rem] mx-auto border-t border-b border-gray-200 py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 lg:gap-12">
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left sm:border-s border-ink/10 sm:ps-6 hover:border-gold transition-colors duration-500 cursor-default">
              <svg className="w-7 h-7 text-gold mb-4 md:mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <h3 className="font-playfair text-xl text-ink font-medium mb-2 md:mb-3">{t('pillar1_title')}</h3>
              <p className="text-ink/60 font-light text-sm leading-relaxed max-w-xs">{t('pillar1_desc')}</p>
            </div>
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left sm:border-s border-ink/10 sm:ps-6 hover:border-gold transition-colors duration-500 cursor-default">
              <svg className="w-7 h-7 text-gold mb-4 md:mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              <h3 className="font-playfair text-xl text-ink font-medium mb-2 md:mb-3">{t('pillar2_title')}</h3>
              <p className="text-ink/60 font-light text-sm leading-relaxed max-w-xs">{t('pillar2_desc')}</p>
            </div>
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left sm:border-s border-ink/10 sm:ps-6 hover:border-gold transition-colors duration-500 cursor-default">
              <svg className="w-7 h-7 text-gold mb-4 md:mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
              <h3 className="font-playfair text-xl text-ink font-medium mb-2 md:mb-3">{t('pillar3_title')}</h3>
              <p className="text-ink/60 font-light text-sm leading-relaxed max-w-xs">{t('pillar3_desc')}</p>
            </div>
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left sm:border-s border-ink/10 sm:ps-6 hover:border-gold transition-colors duration-500 cursor-default">
              <svg className="w-7 h-7 text-gold mb-4 md:mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              <h3 className="font-playfair text-xl text-ink font-medium mb-2 md:mb-3">{t('pillar4_title')}</h3>
              <p className="text-ink/60 font-light text-sm leading-relaxed max-w-xs">{t('pillar4_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ROOM PREVIEW SLIDER */}
      <section className="py-20 md:py-24 bg-white overflow-hidden">
        <div className="max-w-[90rem] mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="inline-flex items-center gap-4 mb-4">
              <span className="h-[1px] w-8 bg-gold"></span>
              <span className="text-gold tracking-[0.2em] text-xs uppercase font-medium">{t('rooms_label')}</span>
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl text-ink font-semibold">{t('rooms_title')}</h2>
          </div>
          <Link href="/rooms" className="text-ink hover:text-gold transition-colors font-medium border-b border-ink hover:border-gold pb-1">{t('rooms_view_all')}</Link>
        </div>

        <div className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-6 px-6 md:px-12 pb-10 w-full max-w-[100rem] mx-auto">
          {rooms?.map((room: any) => {
            const arData = roomTranslationsAr[room.id];
            const displayName = isAr && arData ? arData.name : room.name;
            const displayDesc = isAr && arData ? arData.description : room.description;
            const displayCapacity = isAr && arData ? arData.capacity : room.capacity;

            return (
              <div key={room.id} className="snap-start shrink-0 w-[85vw] sm:w-[400px] bg-ivory border border-gray-100 overflow-hidden shadow-lg group flex flex-col rounded-none">
                <div className="h-64 w-full overflow-hidden relative">
                  <img src={room.images[0]} alt={displayName} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  <div className="absolute top-4 end-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-semibold text-ink shadow-sm rounded-none" dir="ltr">{displayCapacity}</div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="font-playfair text-2xl text-ink font-medium mb-2">{displayName}</h3>
                  <p className="text-xl font-medium text-gold mb-4" dir="ltr">
                    <PriceDisplay amountGBP={room.price_per_night} /> <span className="text-sm font-light text-ink/50 uppercase">{t('per_night')}</span>
                  </p>
                  <p className="text-ink/70 font-light text-sm line-clamp-2 mb-8 flex-grow">{displayDesc}</p>
                  <Link href={`/rooms/${room.id}`} className="w-full block text-center border border-ink text-ink py-3 font-medium hover:bg-ink hover:text-white transition-colors duration-300 rounded-none">{t('rooms_view')}</Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* THINGS TO DO SLIDER */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-ivory overflow-hidden">
        <div className="max-w-[90rem] mx-auto mb-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <div className="inline-flex items-center gap-4 mb-4">
                <span className="h-[1px] w-8 bg-gold"></span>
                <span className="text-gold tracking-[0.2em] text-xs uppercase font-medium">{t('things_label')}</span>
              </div>
              <h2 className="font-playfair text-4xl md:text-5xl text-ink font-semibold">{t('things_title')}</h2>
            </div>
            <p className="text-ink/60 font-light text-base md:text-lg max-w-md leading-relaxed">
              {t('things_desc')}
            </p>
          </div>
        </div>

        <div className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-6 px-6 md:px-12 pb-10 w-full max-w-[100rem] mx-auto">
          {thingsToDo?.map((item: any) => (
            <div key={item.id} className="snap-start shrink-0 w-[85vw] sm:w-[400px] group relative h-64 md:h-[320px] overflow-hidden rounded-none shadow-xl cursor-pointer border border-white/10">
              <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"></div>
              <div className="absolute top-4 end-4 bg-gold text-white px-3 py-1 text-xs uppercase tracking-widest font-medium shadow-sm z-10 rounded-none">
                {item.tag}
              </div>
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end z-10 pointer-events-none">
                <h3 className="font-playfair text-2xl font-medium text-white mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">{item.title}</h3>
                <p className="text-gold text-xs font-medium uppercase tracking-wider transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-75">{item.distance}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* THE SMARTER ALTERNATIVE */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl text-ink font-semibold mb-4">{t('compare_title')}</h2>
            <p className="text-ink/60 font-light text-base md:text-lg max-w-xl mx-auto">{t('compare_sub')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-gray-200 overflow-hidden shadow-xl md:shadow-2xl rounded-none">
            <div className="bg-ivory p-8 sm:p-10 md:p-14 border-b md:border-b-0 md:border-e border-gray-200">
              <h3 className="font-playfair text-xl md:text-2xl text-ink/50 mb-6 md:mb-8 border-b border-gray-200 pb-4">{t('platform_way')}</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4 text-ink/70"><span className="text-red-400 font-bold mt-1">✕</span><div><strong className="block text-ink font-medium text-sm md:text-base">{t('platform1_title')}</strong><span className="text-xs md:text-sm font-light">{t('platform1_desc')}</span></div></li>
                <li className="flex items-start gap-4 text-ink/70"><span className="text-red-400 font-bold mt-1">✕</span><div><strong className="block text-ink font-medium text-sm md:text-base">{t('platform2_title')}</strong><span className="text-xs md:text-sm font-light">{t('platform2_desc')}</span></div></li>
                <li className="flex items-start gap-4 text-ink/70"><span className="text-red-400 font-bold mt-1">✕</span><div><strong className="block text-ink font-medium text-sm md:text-base">{t('platform3_title')}</strong><span className="text-xs md:text-sm font-light">{t('platform3_desc')}</span></div></li>
              </ul>
            </div>
            <div className="bg-ink p-8 sm:p-10 md:p-14">
              <h3 className="font-playfair text-xl md:text-2xl text-gold mb-6 md:mb-8 border-b border-ink/50 pb-4">{t('direct_way')}</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4 text-ivory"><svg className="w-5 h-5 text-gold mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg><div><strong className="block font-medium text-sm md:text-base">{t('direct1_title')}</strong><span className="text-xs md:text-sm font-light text-ivory/70">{t('direct1_desc')}</span></div></li>
                <li className="flex items-start gap-4 text-ivory"><svg className="w-5 h-5 text-gold mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg><div><strong className="block font-medium text-sm md:text-base">{t('direct2_title')}</strong><span className="text-xs md:text-sm font-light text-ivory/70">{t('direct2_desc')}</span></div></li>
                <li className="flex items-start gap-4 text-ivory"><svg className="w-5 h-5 text-gold mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg><div><strong className="block font-medium text-sm md:text-base">{t('direct3_title')}</strong><span className="text-xs md:text-sm font-light text-ivory/70">{t('direct3_desc')}</span></div></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TOURS SECTION */}
      <section className="py-20 md:py-32 px-6 md:px-12 bg-ink text-ivory relative overflow-hidden">
        <div className="max-w-[90rem] mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-4 mb-6">
              <span className="h-[1px] w-8 md:w-12 bg-gold"></span>
              <span className="text-gold tracking-[0.2em] text-[10px] md:text-xs uppercase font-medium">{t('tours_label')}</span>
              <span className="h-[1px] w-8 md:w-12 bg-gold"></span>
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-tight text-white">{t('tours_title')}</h2>
            <p className="text-ivory/60 font-light text-lg md:text-xl leading-relaxed">{t('tours_desc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {tours?.slice(0, 2).map((tour: any) => {
              const arData = tourTranslationsAr[tour.id];
              const displayName = isAr && arData ? arData.name : tour.name;
              const displayDesc = isAr && arData ? arData.description : tour.description;
              const displayDuration = isAr && arData ? arData.duration : tour.duration;
              const displayGroupSize = isAr && arData ? arData.group_size : tour.group_size;

              return (
                <div key={tour.id} className="group relative h-[500px] md:h-[600px] w-full overflow-hidden rounded-none cursor-pointer border border-white/10 shadow-2xl">
                  <img src={tour.images[0]} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt={displayName} />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-transparent opacity-90 transition-opacity duration-500"></div>
                  <div className="absolute top-6 end-6 bg-gold text-white px-4 py-2 text-xs uppercase tracking-widest font-medium shadow-sm rounded-none">
                    {displayDuration}
                  </div>
                  <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end z-10">
                    <div className="flex justify-between items-end mb-4">
                      <h3 className="font-playfair text-3xl md:text-4xl text-white font-medium">{displayName}</h3>
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-medium text-gold" dir="ltr"><PriceDisplay amountGBP={tour.price} /></span>
                      <span className="text-white/50 text-xs tracking-wider uppercase font-semibold">{t('per_group')} ({displayGroupSize})</span>
                    </div>
                    <p className="text-white/70 font-light mb-8 text-base md:text-lg leading-relaxed line-clamp-3">{displayDesc}</p>
                    <Link href="/tours" className="w-full sm:w-max text-center border border-white/30 text-white py-4 px-10 font-medium hover:bg-gold hover:border-gold transition-colors duration-300 rounded-none backdrop-blur-sm">
                      {t('view_details')}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <Link href="/tours" className="inline-flex items-center gap-2 text-gold hover:text-white transition-colors font-medium border-b border-gold hover:border-white pb-1">
              {t('view_all_tours')}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
