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

  if (!images || images.length === 0) return null;

  const topImages = images.slice(0, 3);
  const bottomImages = images.slice(3);

  return (
    <>
      <section className="px-6 md:px-12 max-w-[90rem] mx-auto mb-20">

        {/* Top row: hero + 2 stacked */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:h-[520px]">
          <div
            className="md:col-span-2 overflow-hidden h-[260px] md:h-full cursor-zoom-in group"
            onClick={() => setLightboxIndex(0)}
          >
            <img
              src={images[0]}
              alt="Room view"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-1 gap-3 md:h-full">
            {topImages[1] && (
              <div
                className="overflow-hidden h-[160px] md:h-full cursor-zoom-in group"
                onClick={() => setLightboxIndex(1)}
              >
                <img
                  src={images[1]}
                  alt="Room view"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
            )}
            {topImages[2] && (
              <div
                className="overflow-hidden h-[160px] md:h-full cursor-zoom-in group"
                onClick={() => setLightboxIndex(2)}
              >
                <img
                  src={images[2]}
                  alt="Room view"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
            )}
          </div>
        </div>

        {/* Bottom row: all remaining images in equal columns */}
        {bottomImages.length > 0 && (
          <div
            className={`mt-3 grid gap-3 ${
              bottomImages.length === 1 ? 'grid-cols-1' :
              bottomImages.length === 2 ? 'grid-cols-2' :
              'grid-cols-2 sm:grid-cols-3'
            }`}
          >
            {bottomImages.map((img, i) => (
              <div
                key={i}
                className="overflow-hidden h-[200px] md:h-[280px] cursor-zoom-in group"
                onClick={() => setLightboxIndex(i + 3)}
              >
                <img
                  src={img}
                  alt="Room view"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox — zoom only, clean white treatment */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[200] bg-white/97 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 text-ink/40 hover:text-ink transition-colors focus:outline-none p-2 z-10"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="absolute top-6 left-1/2 -translate-x-1/2 text-ink/40 text-xs font-medium tracking-widest uppercase">
            {lightboxIndex + 1} of {total}
          </div>

          {total > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 md:left-8 text-ink/40 hover:text-ink transition-colors focus:outline-none p-3"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          <img
            src={images[lightboxIndex]}
            alt={`Room photo ${lightboxIndex + 1}`}
            className="max-w-[82vw] max-h-[80vh] object-contain shadow-xl"
            onClick={(e) => e.stopPropagation()}
          />

          {total > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 md:right-8 text-ink/40 hover:text-ink transition-colors focus:outline-none p-3"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          <div
            className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto px-2"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(i)}
                className={`shrink-0 w-14 h-14 overflow-hidden border-2 transition-all duration-200 ${
                  i === lightboxIndex ? 'border-gold opacity-100' : 'border-transparent opacity-35 hover:opacity-60'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
