// app/rooms/page.tsx
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { createClient } from "../../lib/supabase/server";

// Forces the page to fetch fresh data from Supabase
export const dynamic = 'force-dynamic';

export default async function RoomsPage() {
  // Connect to Supabase
  const supabase = await createClient();
  
  // Fetch all rooms from the Supabase database
  const { data: rooms, error } = await supabase.from('rooms').select('*').order('price_per_night', { ascending: true });

  if (error) {
    console.error("Error fetching rooms:", error);
    return <div className="p-20 text-center text-red-500">Failed to load rooms. Please check database connection.</div>;
  }

  return (
    <main className="pt-20 bg-ivory">
      <Navbar activePage="rooms" />

      {/* HEADER */}
      <header className="bg-ink py-24 md:py-32 px-6 border-b border-white/10 text-center">
        <h1 className="font-playfair text-4xl md:text-6xl text-white font-medium mb-6">Our Premium Rooms</h1>
        <p className="text-ivory/60 font-light text-lg max-w-2xl mx-auto">Experience boutique luxury in Madinah. Book direct to guarantee the lowest rate without hidden platform fees.</p>
      </header>

      {/* DYNAMIC ROOMS LIST FROM SUPABASE */}
      <section className="py-20 px-6 md:px-12 max-w-[90rem] mx-auto space-y-16 text-ink">
        {rooms?.map((room: any, index: number) => (
          <div key={room.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-100 group">
            <Link href={`/rooms/${room.id}`} className={`w-full h-[300px] md:h-[450px] rounded-xl overflow-hidden relative block ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
              <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-ink/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </Link>
            <div className={index % 2 !== 0 ? 'lg:order-1' : ''}>
              <span className="text-gold text-xs font-semibold uppercase tracking-widest mb-2 block">{room.capacity}</span>
              <h2 className="font-playfair text-3xl md:text-4xl font-medium mb-4">{room.name}</h2>
              <p className="text-xl text-gold font-medium mb-4">£{room.price_per_night} <span className="text-sm font-light text-ink/50 uppercase">/ Night</span></p>
              <p className="font-light leading-relaxed mb-6 opacity-80 line-clamp-3">{room.description}</p>
              
              <ul className="grid grid-cols-2 gap-4 mb-8 text-sm font-light opacity-80">
                {room.amenities.slice(0, 4).map((amenity: string, i: number) => (
                  <li key={i} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> 
                    {amenity}
                  </li>
                ))}
              </ul>
              <Link href={`/rooms/${room.id}`} className="inline-block bg-ink text-white px-8 py-4 font-medium hover:bg-gold transition-colors duration-300 shadow-md">
                View Details & Book
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* BRANDED FOOTER */}
      <Footer />  {/* 👈 REPLACED 20 LINES OF CODE WITH THIS ONE LINE! */}
    </main>
  );
}