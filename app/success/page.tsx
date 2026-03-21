// app/success/page.tsx
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function SuccessPage() {
  return (
    <main className="pt-20 bg-ivory min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white p-10 md:p-16 rounded-3xl shadow-2xl text-center max-w-2xl border border-gray-100">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 text-green-500">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h1 className="font-playfair text-4xl md:text-5xl text-ink font-medium mb-4">Booking Confirmed</h1>
          <p className="text-ink/60 font-light text-lg mb-10 leading-relaxed">
            Alhamdulillah, your payment was successful and your premium room is secured. We have sent a confirmation email with your booking details. We look forward to welcoming you to Madinah.
          </p>
          <Link href="/" className="inline-block bg-ink text-white px-10 py-4 font-medium hover:bg-gold transition-colors duration-300 shadow-xl">
            Return to Home
          </Link>
        </div>
      </div>
    </main>
  );
}