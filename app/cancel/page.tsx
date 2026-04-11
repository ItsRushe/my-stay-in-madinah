// app/cancel/page.tsx
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { createClient } from "../../lib/supabase/server";

export const dynamic = 'force-dynamic';

export default async function CancelPage({ searchParams }: { searchParams: Promise<{ booking_id?: string }> }) {
  // If the user cancels, free up the room immediately
  const resolvedParams = await searchParams;
  
  if (resolvedParams.booking_id) {
    const supabase = await createClient();
    await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', resolvedParams.booking_id);
  }

  return (
    <main className="pt-20 bg-ivory min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white p-10 md:p-16 rounded-3xl shadow-2xl text-center max-w-2xl border border-gray-100">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8 text-red-400">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </div>
          <h1 className="font-playfair text-3xl md:text-4xl text-ink font-medium mb-4">Checkout Cancelled</h1>
          <p className="text-ink/60 font-light text-lg mb-10 leading-relaxed">
            Your booking process was interrupted and no charges were made. The hold on your room has been released. You can try booking again whenever you are ready.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/rooms" className="w-full sm:w-auto inline-block bg-ink text-white px-10 py-4 font-medium hover:bg-gold transition-colors duration-300 shadow-xl">
              View Rooms
            </Link>
            <a href="https://wa.me/966508151408" target="_blank" rel="noreferrer" className="w-full sm:w-auto inline-block border-2 border-ink text-ink px-10 py-4 font-medium hover:bg-ink hover:text-white transition-colors duration-300">
              Need Help?
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}