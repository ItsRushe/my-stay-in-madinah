import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PriceDisplay from "../../components/PriceDisplay";
import { createClient } from "../../lib/supabase/server";
import { getTranslations, getLocale } from 'next-intl/server';
import { roomTranslationsAr } from "../../lib/translations/rooms";
import { isRoomBookable } from "../../lib/bookable";
import { roomIdToSlug } from "../../lib/roomSlug";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Rooms & Suites — Direct Booking in Madinah",
  description:
    "Browse our premium rooms and suites in Madinah. Book directly with no platform fees and get the guaranteed lowest rate for your stay near the Prophet's Mosque.",
  alternates: { canonical: "/rooms" },
  openGraph: {
    title: "Premium Rooms & Suites in Madinah | My Stay in Madinah",
    description:
      "Browse and book our boutique rooms in Madinah directly. No Airbnb fees, no hidden charges — just honest, guaranteed best rates.",
    url: "/rooms",
  },
};

export default async function RoomsPage() {
  const supabase = await createClient();
  const { data: rawRooms } = await supabase.from('rooms').select('*').order('price_per_night', { ascending: true });
  const rooms = rawRooms?.sort((a, b) => (isRoomBookable(b.id) ? 1 : 0) - (isRoomBookable(a.id) ? 1 : 0));
  const t = await getTranslations('Rooms');
  const locale = await getLocale();
  const isAr = locale === 'ar';

  return (
    <main className="pt-20 bg-ivory">
      <Navbar activePage="rooms" />

      <a href="https://wa.me/966508151408?text=As-salamu%20alaykum,%20I%20would%20like%20to%20inquire%20about%20booking%20a%20room." target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 bg-[#25D366] text-white p-3 md:p-4 rounded-none shadow-[0_10px_40px_rgba(37,211,102,0.4)] hover:scale-105 transition-transform duration-300 flex items-center justify-center group">
        <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 .003 5.385.003 12.031c0 2.126.556 4.198 1.613 6.02L.03 24l6.105-1.602a11.968 11.968 0 0 0 5.896 1.542h.005c6.643 0 12.025-5.384 12.025-12.028C24.055 5.385 18.675 0 12.031 0zm-.005 21.954a9.982 9.982 0 0 1-5.09-1.39l-.365-.217-3.784.992.998-3.69-.237-.377a9.96 9.96 0 0 1-1.523-5.27C1.995 6.486 6.483 2 12.031 2c5.545 0 10.033 4.488 10.033 10.003 0 5.513-4.488 10-10.038 10h-.001zm5.505-7.519c-.302-.151-1.787-.882-2.064-.983-.277-.101-.48-.151-.681.151-.202.302-.78 1.034-.956 1.235-.177.202-.353.227-.655.076-1.574-.789-2.73-1.66-3.784-3.32-.177-.278.177-.278.756-1.41.076-.151.038-.278-.038-.428-.076-.151-.681-1.636-.932-2.24-.246-.59-.496-.51-.681-.52-.177-.01-.378-.01-.58-.01-.202 0-.529.076-.806.378-.277.302-1.058 1.034-1.058 2.518 0 1.484 1.084 2.92 1.235 3.12.151.202 2.116 3.224 5.127 4.524 1.965.848 2.704.899 3.484.75.78-.151 2.368-.968 2.704-1.902.336-.934.336-1.737.236-1.903-.101-.166-.378-.267-.68-.418z"/></svg>
      </a>

      <header className="bg-ink py-24 md:py-32 px-6 border-b border-white/10 text-center">
        <h1 className="font-playfair text-4xl md:text-6xl text-white font-medium mb-6">{t('title')}</h1>
        <p className="text-ivory/60 font-light text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
      </header>

      <section className="py-20 px-6 md:px-12 max-w-[90rem] mx-auto space-y-16 text-ink">
        {rooms?.map((room: any, index: number) => {
          const arData = roomTranslationsAr[room.id];
          const displayName = isAr && arData ? arData.name : room.name;
          const displayDesc = isAr && arData ? arData.description : room.description;
          const displayCapacity = isAr && arData ? arData.capacity : room.capacity;
          const displayAmenities = isAr && arData ? arData.amenities : room.amenities;

          const bookable = isRoomBookable(room.id);
          const maintenance = bookable && room.is_available === false;
          const dimmed = !bookable || maintenance;

          return (
            <div key={room.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white p-6 md:p-10 rounded-none shadow-xl border border-gray-100 group ${dimmed ? 'opacity-70' : ''}`}>
              <Link href={`/rooms/${roomIdToSlug(room.id)}`} className={`w-full h-[300px] md:h-[450px] rounded-none overflow-hidden relative block ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <img src={room.images[0]} alt={displayName} className={`w-full h-full object-cover transition-transform duration-700 ${!dimmed ? 'group-hover:scale-105' : 'grayscale'}`} />
                <div className="absolute inset-0 bg-ink/10 group-hover:bg-transparent transition-colors duration-500"></div>
                {room.room_number && (
                  <div className="absolute bottom-4 right-4 bg-ink/80 text-white text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1">
                    Room {room.room_number}
                  </div>
                )}
                {maintenance && (
                  <div className="absolute top-4 left-4 bg-amber-50 text-amber-700 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 border border-amber-200">
                    Under Maintenance
                  </div>
                )}
                {!bookable && (
                  <div className="absolute top-4 left-4 bg-white/90 text-ink/60 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 border border-gray-200">
                    Coming Soon
                  </div>
                )}
              </Link>
              <div className={index % 2 !== 0 ? 'lg:order-1' : ''}>
                <div className="flex items-center gap-3 mb-2">
                  {room.room_number && (
                    <span className="text-ink/30 text-xs font-semibold uppercase tracking-widest" dir="ltr">Room {room.room_number}</span>
                  )}
                  <span className="text-gold text-xs font-semibold uppercase tracking-widest" dir="ltr">{displayCapacity}</span>
                </div>
                <h2 className="font-playfair text-3xl md:text-4xl font-medium mb-4">{displayName}</h2>
                <p className="text-xl text-gold font-medium mb-4" dir="ltr">
                  <PriceDisplay amountGBP={room.price_per_night} /> <span className="text-sm font-light text-ink/50 uppercase">{t('per_night')}</span>
                </p>
                <p className="font-light leading-relaxed mb-6 opacity-80 line-clamp-3">{displayDesc}</p>
                <ul className="grid grid-cols-2 gap-4 mb-8 text-sm font-light opacity-80">
                  {displayAmenities.slice(0, 4).map((amenity: string, i: number) => (
                    <li key={i} className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      {amenity}
                    </li>
                  ))}
                </ul>
                {bookable && !maintenance ? (
                  <Link href={`/rooms/${roomIdToSlug(room.id)}`} className="inline-block bg-ink text-white px-8 py-4 font-medium hover:bg-gold transition-colors duration-300 shadow-md rounded-none">
                    {t('view_details')}
                  </Link>
                ) : maintenance ? (
                  <div className="inline-flex items-center gap-3 border border-amber-200 bg-amber-50 text-amber-700 px-8 py-4 rounded-none cursor-default select-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    <span className="text-sm font-medium uppercase tracking-widest">Under Maintenance</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-3 border border-gray-200 bg-gray-50 text-gray-400 px-8 py-4 rounded-none cursor-default select-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    <span className="text-sm font-medium uppercase tracking-widest">Coming Soon</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </section>

      <Footer />
    </main>
  );
}
