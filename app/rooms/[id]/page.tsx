// app/rooms/[id]/page.tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import BookingWidget from '../../../components/BookingWidget';
import ImageGallery from '../../../components/ImageGallery';
import Navbar from '../../../components/Navbar';
import { createClient } from '../../../lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function RoomPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  // Connect to Supabase
  const supabase = await createClient();
  
  // Fetch specific room from database
  const { data: room, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('id', resolvedParams.id)
    .single();

  if (error || !room) {
    notFound(); 
  }

  return (
    <main className="pt-20 bg-ivory">
      <Navbar activePage="rooms" />

      {/* PAGE HEADER */}
      <section className="pt-16 md:pt-24 pb-12 px-6 md:px-12 max-w-[90rem] mx-auto text-ink">
        <Link href="/rooms" className="inline-flex items-center gap-2 opacity-50 hover:text-gold transition-colors mb-6 text-sm font-medium uppercase tracking-wider">
          &larr; Back to Rooms
        </Link>
        <h1 className="font-playfair text-4xl md:text-6xl font-medium mb-4">{room.name}</h1>
        <div className="flex items-center gap-4 opacity-60">
          <span className="flex items-center gap-1">
            <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg> 
            {room.capacity}
          </span>
        </div>
      </section>

      {/* IMAGE GALLERY */}
      <ImageGallery images={room.images} />

      {/* ROOM DETAILS & BOOKING WIDGET */}
      <section className="px-6 md:px-12 max-w-[90rem] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16 mb-24">
        <div className="lg:col-span-2 text-ink">
          <h2 className="font-playfair text-3xl font-medium mb-6">About this space</h2>
          <p className="font-light leading-relaxed mb-10 text-lg opacity-80">{room.description}</p>

          <h3 className="font-playfair text-2xl font-medium mb-6 border-b border-gray-200 pb-4">Room Amenities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
            {room.amenities.map((amenity: string, index: number) => (
              <div key={index} className="flex items-center gap-3 font-light opacity-80">
                <svg className="w-5 h-5 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7"></path></svg> 
                {amenity}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Booking Widget */}
        <div className="relative">
          {/* Note: We map price_per_night from DB to pricePerNight for the component */}
          <BookingWidget room={{...room, pricePerNight: room.price_per_night}} />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ink py-12 px-6 md:px-12 border-t border-white/5 flex flex-col items-center">
        <Link href="/" translate="no" className="flex flex-col items-center group mb-10 md:mb-12 cursor-pointer notranslate">
         <img src="/icon-logo.png" alt="My Stay in Madinah Key Icon" className="h-16 md:h-24 w-auto object-contain mb-5 opacity-90 transition-transform duration-700 group-hover:scale-105 drop-shadow-2xl" />
         <span className="text-gold font-jost text-xl md:text-2xl font-medium tracking-[0.2em] uppercase opacity-90 drop-shadow-lg">My Stay In Madinah</span>
        </Link>
        <p className="text-white/40 text-xs font-light">&copy; 2026 My Stay in Madinah. All rights reserved.</p>
      </footer>
    </main>
  );
}