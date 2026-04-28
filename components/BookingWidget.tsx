"use client";
import { useState, useEffect } from 'react';
import { startBookingCheckout } from '../app/actions/booking';
import { useCurrency } from './CurrencyProvider';
import { useTranslations } from 'next-intl';

export default function BookingWidget({ room, bookable = true, maintenance = false }: { room: any; bookable?: boolean; maintenance?: boolean }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [today, setToday] = useState('');

  const { currency, RATES, formatPrice, mounted } = useCurrency();
  const t = useTranslations('Booking');

  useEffect(() => {
    setToday(new Date().toISOString().split('T')[0]);
  }, []);

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const nights = calculateNights();
  const rate = mounted && RATES[currency] ? RATES[currency].rate : 1;
  const convertedPricePerNight = Math.round(room.pricePerNight * rate);
  const totalConvertedPrice = nights * convertedPricePerNight;

  const handleCheckout = async () => {
    if (nights <= 0) return;
    setLoading(true);
    setError('');

    try {
      const response = await startBookingCheckout({
        roomId: room.id,
        currency: currency,
        checkIn: checkIn,
        checkOut: checkOut,
        nights: nights
      });

      if (response?.error) {
        setError(response.error);
        setLoading(false);
        return;
      }

      if (response?.url) {
        window.location.href = response.url;
      } else {
        setError("Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch (err: any) {
      setError("Something went wrong. Please try again or contact us on WhatsApp.");
      setLoading(false);
    }
  };

  if (maintenance) {
    return (
      <div className="sticky top-32 bg-white p-8 shadow-2xl border border-gray-100 flex flex-col items-center rounded-none">
        <img src="/icon-logo.png" className="h-12 w-auto mb-4 opacity-30 object-contain" alt="Icon" />
        <h3 className="font-playfair text-2xl text-ink font-medium mb-1 text-center">{room.name}</h3>
        <p className="text-xl font-medium text-ink/30 mb-6" dir="ltr">
          {mounted ? formatPrice(room.pricePerNight) : `£${room.pricePerNight}`} <span className="text-sm font-light uppercase">{t('per_night')}</span>
        </p>

        <div className="w-full border border-dashed border-amber-200 bg-amber-50 py-8 px-6 text-center mb-6">
          <svg className="w-8 h-8 text-amber-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-700 mb-1">Under Maintenance</p>
          <p className="text-sm text-amber-600 font-light">This room is temporarily unavailable. Please check back soon or contact us on WhatsApp.</p>
        </div>

        <a href={`https://wa.me/966508151408?text=Hi,%20I'm%20interested%20in%20${encodeURIComponent(room.name)}%20—%20when%20will%20it%20be%20available?`} target="_blank" rel="noreferrer" className="w-full bg-[#25D366] text-white py-4 font-medium hover:opacity-90 transition-opacity duration-300 flex items-center justify-center gap-2 rounded-none shadow-lg">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 .003 5.385.003 12.031c0 2.126.556 4.198 1.613 6.02L.03 24l6.105-1.602a11.968 11.968 0 0 0 5.896 1.542h.005c6.643 0 12.025-5.384 12.025-12.028C24.055 5.385 18.675 0 12.031 0zm-.005 21.954a9.982 9.982 0 0 1-5.09-1.39l-.365-.217-3.784.992.998-3.69-.237-.377a9.96 9.96 0 0 1-1.523-5.27C1.995 6.486 6.483 2 12.031 2c5.545 0 10.033 4.488 10.033 10.003 0 5.513-4.488 10-10.038 10h-.001zm5.505-7.519c-.302-.151-1.787-.882-2.064-.983-.277-.101-.48-.151-.681.151-.202.302-.78 1.034-.956 1.235-.177.202-.353.227-.655.076-1.574-.789-2.73-1.66-3.784-3.32-.177-.278.177-.278.756-1.41.076-.151.038-.278-.038-.428-.076-.151-.681-1.636-.932-2.24-.246-.59-.496-.51-.681-.52-.177-.01-.378-.01-.58-.01-.202 0-.529.076-.806.378-.277.302-1.058 1.034-1.058 2.518 0 1.484 1.084 2.92 1.235 3.12.151.202 2.116 3.224 5.127 4.524 1.965.848 2.704.899 3.484.75.78-.151 2.368-.968 2.704-1.902.336-.934.336-1.737.236-1.903-.101-.166-.378-.267-.68-.418z"/></svg>
          Ask on WhatsApp
        </a>
      </div>
    );
  }

  if (!bookable) {
    return (
      <div className="sticky top-32 bg-white p-8 shadow-2xl border border-gray-100 flex flex-col items-center rounded-none">
        <img src="/icon-logo.png" className="h-12 w-auto mb-4 opacity-30 object-contain" alt="Icon" />
        <h3 className="font-playfair text-2xl text-ink font-medium mb-1 text-center">{room.name}</h3>
        <p className="text-xl font-medium text-ink/30 mb-6" dir="ltr">
          {mounted ? formatPrice(room.pricePerNight) : `£${room.pricePerNight}`} <span className="text-sm font-light uppercase">{t('per_night')}</span>
        </p>

        <div className="w-full border border-dashed border-gray-200 bg-gray-50 py-8 px-6 text-center mb-6">
          <svg className="w-8 h-8 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Coming Soon</p>
          <p className="text-sm text-gray-400 font-light">This room is not available for online booking yet. Enquire via WhatsApp to check availability.</p>
        </div>

        <a href={`https://wa.me/966508151408?text=Hi,%20I'm%20interested%20in%20${encodeURIComponent(room.name)}%20—%20is%20it%20available%20to%20book?`} target="_blank" rel="noreferrer" className="w-full bg-[#25D366] text-white py-4 font-medium hover:opacity-90 transition-opacity duration-300 flex items-center justify-center gap-2 rounded-none shadow-lg">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 .003 5.385.003 12.031c0 2.126.556 4.198 1.613 6.02L.03 24l6.105-1.602a11.968 11.968 0 0 0 5.896 1.542h.005c6.643 0 12.025-5.384 12.025-12.028C24.055 5.385 18.675 0 12.031 0zm-.005 21.954a9.982 9.982 0 0 1-5.09-1.39l-.365-.217-3.784.992.998-3.69-.237-.377a9.96 9.96 0 0 1-1.523-5.27C1.995 6.486 6.483 2 12.031 2c5.545 0 10.033 4.488 10.033 10.003 0 5.513-4.488 10-10.038 10h-.001zm5.505-7.519c-.302-.151-1.787-.882-2.064-.983-.277-.101-.48-.151-.681.151-.202.302-.78 1.034-.956 1.235-.177.202-.353.227-.655.076-1.574-.789-2.73-1.66-3.784-3.32-.177-.278.177-.278.756-1.41.076-.151.038-.278-.038-.428-.076-.151-.681-1.636-.932-2.24-.246-.59-.496-.51-.681-.52-.177-.01-.378-.01-.58-.01-.202 0-.529.076-.806.378-.277.302-1.058 1.034-1.058 2.518 0 1.484 1.084 2.92 1.235 3.12.151.202 2.116 3.224 5.127 4.524 1.965.848 2.704.899 3.484.75.78-.151 2.368-.968 2.704-1.902.336-.934.336-1.737.236-1.903-.101-.166-.378-.267-.68-.418z"/></svg>
          Enquire on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className="sticky top-32 bg-white p-8 shadow-2xl border border-gray-100 flex flex-col items-center rounded-none">
      <img src="/icon-logo.png" className="h-12 w-auto mb-4 opacity-50 object-contain" alt="Icon" />
      <h3 className="font-playfair text-2xl text-ink font-medium mb-1">{t('book_room', { name: room.name })}</h3>

      <p className="text-xl font-medium text-gold mb-6" dir="ltr">
        {mounted ? formatPrice(room.pricePerNight) : `£${room.pricePerNight}`} <span className="text-sm font-light text-ink/50 uppercase">{t('per_night')}</span>
      </p>

      {error && <div className="w-full bg-red-50 text-red-600 text-sm p-3 mb-4 text-center border border-red-100 rounded-none">{error}</div>}

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="w-full">
          <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">{t('check_in')}</label>
          <input type="date" min={today} value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold text-ink rounded-none bg-white" dir="ltr" />
        </div>
        <div className="w-full">
          <label className="block text-xs font-semibold text-ink uppercase tracking-wider mb-2">{t('check_out')}</label>
          <input type="date" min={checkIn || today} value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-gold text-ink rounded-none bg-white" dir="ltr" />
        </div>
      </div>

      {nights > 0 && (
        <div className="w-full flex justify-between items-center py-4 border-t border-gray-100 mb-4 text-ink">
          <span className="font-light">{t('nights', { count: nights })}</span>
          <span className="font-semibold text-lg" dir="ltr">
            {mounted ? formatPrice(room.pricePerNight * nights) : `£${room.pricePerNight * nights}`}
          </span>
        </div>
      )}

      <button onClick={handleCheckout} disabled={loading || nights <= 0} className="w-full bg-ink text-white py-4 font-medium hover:bg-gold transition-colors duration-300 shadow-xl mb-4 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-none">
        {loading ? t('securing') : t('book_now')}
      </button>

      <p className="text-xs text-ink/40 mb-3 mt-4 tracking-widest font-medium uppercase">{t('enquire_label')}</p>
      <a href={`https://wa.me/966508151408?text=Hi,%20I'm%20interested%20in%20booking%20${encodeURIComponent(room.name)}.`} target="_blank" rel="noreferrer" className="w-full bg-transparent border border-[#25D366] text-[#25D366] py-3 font-medium hover:bg-[#25D366] hover:text-white transition-colors duration-300 flex items-center justify-center gap-2 rounded-none">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 .003 5.385.003 12.031c0 2.126.556 4.198 1.613 6.02L.03 24l6.105-1.602a11.968 11.968 0 0 0 5.896 1.542h.005c6.643 0 12.025-5.384 12.025-12.028C24.055 5.385 18.675 0 12.031 0zm-.005 21.954a9.982 9.982 0 0 1-5.09-1.39l-.365-.217-3.784.992.998-3.69-.237-.377a9.96 9.96 0 0 1-1.523-5.27C1.995 6.486 6.483 2 12.031 2c5.545 0 10.033 4.488 10.033 10.003 0 5.513-4.488 10-10.038 10h-.001zm5.505-7.519c-.302-.151-1.787-.882-2.064-.983-.277-.101-.48-.151-.681.151-.202.302-.78 1.034-.956 1.235-.177.202-.353.227-.655.076-1.574-.789-2.73-1.66-3.784-3.32-.177-.278.177-.278.756-1.41.076-.151.038-.278-.038-.428-.076-.151-.681-1.636-.932-2.24-.246-.59-.496-.51-.681-.52-.177-.01-.378-.01-.58-.01-.202 0-.529.076-.806.378-.277.302-1.058 1.034-1.058 2.518 0 1.484 1.084 2.92 1.235 3.12.151.202 2.116 3.224 5.127 4.524 1.965.848 2.704.899 3.484.75.78-.151 2.368-.968 2.704-1.902.336-.934.336-1.737.236-1.903-.101-.166-.378-.267-.68-.418z"/></svg>
        {t('enquire_whatsapp')}
      </a>
    </div>
  );
}
