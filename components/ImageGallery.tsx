"use client";
import { useState, useEffect, useCallback } from 'react';

export default function ImageGallery({ images }: { images: string[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const total = images.length;

  const prev = useCallback(() => {
    setLightboxIndex(i => i === null ? null : (i - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    setLightboxIndex(i => i === null ? null : (i + 1) % total);
  }, [total]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, prev, next]);

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  const extraCount = total - 3;

  if (!images || images.length === 0) return null;

  return (
    <>
      <section className="px-6 md:px-12 max-w-[90rem] mx-auto mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:h-[580px]">
          <div
            className="md:col-span-2 overflow-hidden h-[280px] md:h-full bg-gray-100 group relative cursor-zoom-in"
            onClick={() => setLightboxIndex(0)}
          >
            <img src={images[0]} alt="Room view" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-1 gap-3 md:h-full">
            {images[1] && (
              <div
                className="overflow-hidden h-[180px] md:h-full bg-gray-100 group relative cursor-zoom-in"
                onClick={() => setLightboxIndex(1)}
              >
                <img src={images[1]} alt="Room view" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            )}

            {images[2] && (
              <div
                className="overflow-hidden h-[180px] md:h-full bg-gray-100 group relative cursor-zoom-in"
                onClick={() => setLightboxIndex(2)}
              >
                <img src={images[2]} alt="Room view" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                {extraCount > 0 && (
                  <div className="absolute inset-0 bg-ink/55 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white font-playfair text-3xl font-medium">+{extraCount}</span>
                    <span className="text-white/80 text-xs uppercase tracking-widest mt-1 font-medium">more photos</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {total > 3 && (
          <button
            onClick={() => setLightboxIndex(3)}
            className="mt-4 inline-flex items-center gap-2 text-ink/50 hover:text-gold transition-colors text-xs font-medium uppercase tracking-widest"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            View all {total} photos
          </button>
        )}
      </section>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[200] bg-black/96 flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors focus:outline-none p-2 z-10"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/50 text-sm font-medium tracking-widest tabular-nums">
            {lightboxIndex + 1} / {total}
          </div>

          {total > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 md:left-6 text-white hover:text-gold transition-colors focus:outline-none p-3 bg-white/5 hover:bg-white/10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          <img
            src={images[lightboxIndex]}
            alt={`Room photo ${lightboxIndex + 1}`}
            className="max-w-[80vw] max-h-[75vh] object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          {total > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 md:right-6 text-white hover:text-gold transition-colors focus:outline-none p-3 bg-white/5 hover:bg-white/10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          <div
            className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto px-2 pb-1"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(i)}
                className={`shrink-0 w-14 h-14 md:w-16 md:h-16 overflow-hidden border-2 transition-all duration-200 ${
                  i === lightboxIndex ? 'border-gold opacity-100 scale-105' : 'border-transparent opacity-40 hover:opacity-70'
                }`}
              >
                <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
