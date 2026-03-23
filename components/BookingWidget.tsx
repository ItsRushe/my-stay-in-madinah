"use client";
import { useState } from 'react';
import { startBookingCheckout } from '../app/actions/booking';

export default function BookingWidget({ room }: { room: any }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const nights = calculateNights();
  const totalPrice = nights * room.pricePerNight;

  const handleCheckout = async () => {
    if (nights <= 0) return;
    setLoading(true);
    setError('');

    try {
      const response = await startBookingCheckout({
        roomId: room.id,
        roomName: room.name,
        pricePerNight: room.pricePerNight,
        checkIn,
        checkOut,
        nights
      });

      if (response.url) {
        window.location.href = response.url; 
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during checkout.");
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="sticky top-32 bg-white p-8 shadow-2xl border border-gray-100 flex flex-col items-center rounded-none">
      <img src="/icon-logo.png" className="h-12 w-auto mb-4 opacity-50 object-contain" alt="Icon" />
      <h3 className="font-playfair text-2xl text-ink font-medium mb-1">Book {room.name}</h3>
      <p className="text-xl font-medium text-gold mb-6">£{room.pricePerNight} <span className="text-sm font-light text-ink/50 uppercase">/ Night</span></p>
      
      {error && (
        <div className="w-full bg-red-50 text-red-600 text-sm p-3 mb-4 text-center border border-red-100 rounded-none">
          {error}
        </div>
      )}

      {/* FIXED MOBILE GRID: Stacks on tiny screens (grid-cols-1), side-by-side on sm and above */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="w-full">
          <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">Check-in</label>
          <input type="date" min={today} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold text-ink rounded-none bg-white" />
        </div>
        <div className="w-full">
          <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">Check-out</label>
          <input type="date" min={checkIn || today} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold text-ink rounded-none bg-white" />
        </div>
      </div>

      {nights > 0 && (
        <div className="w-full flex justify-between items-center py-4 border-t border-gray-100 mb-4 text-ink">
          <span className="font-light">{nights} Nights</span>
          <span className="font-semibold text-lg">£{totalPrice}</span>
        </div>
      )}

      {/* SHARP BUTTON */}
      <button onClick={handleCheckout} disabled={loading || nights <= 0} className="w-full bg-ink text-white py-4 font-medium hover:bg-gold transition-colors duration-300 shadow-xl mb-4 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-none">
        {loading ? 'Securing Room...' : 'Book & Pay Now'}
      </button>

      <p className="text-xs text-ink/40 mb-3 mt-2">OR INSTANT BOOK VIA WHATSAPP</p>
      
      {/* SHARP BUTTON */}
      <a href={`https://wa.me/201067040337?text=As-salamu%20alaykum,%20I%20would%20like%20to%20book%20${room.name}.`} target="_blank" rel="noreferrer" className="w-full bg-transparent border border-[#25D366] text-[#25D366] py-3 font-medium hover:bg-[#25D366] hover:text-white transition-colors duration-300 flex items-center justify-center gap-2 rounded-none">
        Message Us
      </a>
    </div>
  );
}