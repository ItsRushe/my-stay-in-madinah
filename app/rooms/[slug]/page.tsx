import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BookingWidget from '../../../components/BookingWidget';
import ImageGallery from '../../../components/ImageGallery';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { createClient } from '../../../lib/supabase/server';
import { getTranslations } from 'next-intl/server';
import { isRoomBookable } from '../../../lib/bookable';
import { roomSlugToId } from '../../../lib/roomSlug';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const id = roomSlugToId(slug);
  const supabase = await createClient();
  const { data: room } = await supabase.from('rooms').select('name, description, images').eq('id', id).single();

  if (!room) return { title: 'Room Not Found' };

  return {
    title: `${room.name} — Book Direct in Madinah`,
    description: `${room.description?.slice(0, 140)} Book directly with no platform fees and get the guaranteed best rate.`,
    alternates: { canonical: `/rooms/${slug}` },
    openGraph: {
      title: `${room.name} | My Stay in Madinah`,
      description: room.description?.slice(0, 160),
      url: `/rooms/${slug}`,
      images: room.images?.[0] ? [{ url: room.images[0], alt: room.name }] : [],
    },
  };
}

export default async function RoomPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const id = roomSlugToId(slug);
  const supabase = await createClient();
  const { data: room, error } = await supabase.from('rooms').select('*').eq('id', id).single();

  if (error || !room) notFound();

  const t = await getTranslations('RoomDetail');

  return (
    <main className="pt-20 bg-ivory">
      <Navbar activePage="rooms" />

      <a href={`https://wa.me/966508151408?text=As-salamu%20alaykum,%20I%20would%20like%20to%20inquire%20about%20booking%20${room.name}.`} target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 bg-[#25D366] text-white p-3 md:p-4 rounded-none shadow-[0_10px_40px_rgba(37,211,102,0.4)] hover:scale-105 transition-transform duration-300 flex items-center justify-center group">
        <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 .003 5.385.003 12.031c0 2.126.556 4.198 1.613 6.02L.03 24l6.105-1.602a11.968 11.968 0 0 0 5.896 1.542h.005c6.643 0 12.025-5.384 12.025-12.028C24.055 5.385 18.675 0 12.031 0zm-.005 21.954a9.982 9.982 0 0 1-5.09-1.39l-.365-.217-3.784.992.998-3.69-.237-.377a9.96 9.96 0 0 1-1.523-5.27C1.995 6.486 6.483 2 12.031 2c5.545 0 10.033 4.488 10.033 10.003 0 5.513-4.488 10-10.038 10h-.001zm5.505-7.519c-.302-.151-1.787-.882-2.064-.983-.277-.101-.48-.151-.681.151-.202.302-.78 1.034-.956 1.235-.177.202-.353.227-.655.076-1.574-.789-2.73-1.66-3.784-3.32-.177-.278.177-.278.756-1.41.076-.151.038-.278-.038-.428-.076-.151-.681-1.636-.932-2.24-.246-.59-.496-.51-.681-.52-.177-.01-.378-.01-.58-.01-.202 0-.529.076-.806.378-.277.302-1.058 1.034-1.058 2.518 0 1.484 1.084 2.92 1.235 3.12.151.202 2.116 3.224 5.127 4.524 1.965.848 2.704.899 3.484.75.78-.151 2.368-.968 2.704-1.902.336-.934.336-1.737.236-1.903-.101-.166-.378-.267-.68-.418z"/></svg>
      </a>

      <section className="pt-16 md:pt-24 pb-12 px-6 md:px-12 max-w-[90rem] mx-auto text-ink">
        <Link href="/rooms" className="inline-flex items-center gap-2 opacity-50 hover:text-gold transition-colors mb-6 text-sm font-medium uppercase tracking-wider">
          {t('back')}
        </Link>
        <h1 className="font-playfair text-4xl md:text-6xl font-medium mb-4">{room.name}</h1>
        <div className="flex items-center gap-4 opacity-60">
          <span className="flex items-center gap-1">
            <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            {room.capacity}
          </span>
        </div>
      </section>

      <ImageGallery images={room.images} />

      <section className="px-6 md:px-12 max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
        <div className="lg:col-span-2 text-ink">

          <h2 className="font-playfair text-3xl font-medium mb-6">{t('about_space')}</h2>
          <p className="font-light leading-relaxed mb-10 text-lg opacity-80">{room.description}</p>

          <h3 className="font-playfair text-2xl font-medium mb-6 border-b border-gray-200 pb-4">{t('amenities')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
            {room.amenities.map((amenity: string, index: number) => (
              <div key={index} className="flex items-center gap-3 font-light opacity-80">
                <svg className="w-5 h-5 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path></svg>
                {amenity}
              </div>
            ))}
          </div>

          <h3 className="font-playfair text-2xl font-medium mb-6 border-b border-gray-200 pb-4 mt-12">{t('location')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-8">
            <div className="flex items-center gap-3 font-light opacity-80">
              <svg className="w-5 h-5 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              {t('location1')}
            </div>
            <div className="flex items-center gap-3 font-light opacity-80">
              <svg className="w-5 h-5 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              {t('location2')}
            </div>
            <div className="flex items-center gap-3 font-light opacity-80">
              <svg className="w-5 h-5 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
              {t('location3')}
            </div>
          </div>

          <a
            href="https://www.google.com/maps/place/24%C2%B028'02.9%22N+39%C2%B033'51.6%22E/@24.4692505,39.5621593,1395m/data=!3m1!1e3!4m4!3m3!8m2!3d24.4674664!4d39.5643387?hl=en&entry=ttu&g_ep=EgoyMDI2MDMyMy4xIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-ink text-ink px-8 py-3 font-medium hover:bg-ink hover:text-white transition-colors duration-300 rounded-none shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
            {t('map')}
          </a>

        </div>

        <div className="relative">
          <BookingWidget room={{ ...room, pricePerNight: room.price_per_night }} bookable={isRoomBookable(room.id)} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
