// components/ImageGallery.tsx
"use client";
import { useState, useEffect } from 'react';

export default function ImageGallery({ images }: { images: string[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  },[]);

  return (
    <>
      <section className="px-6 md:px-12 max-w-[90rem] mx-auto mb-20 relative">
        <div className="absolute right-10 top-4 z-10 hidden md:flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-none shadow-sm text-ink/60 text-xs font-medium uppercase tracking-wider pointer-events-none">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
          Click images to enlarge
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-auto md:h-[600px]">
          <div className="md:col-span-2 rounded-none overflow-hidden h-[300px] md:h-full bg-gray-100 group relative cursor-zoom-in" onClick={() => setSelectedImage(images[0])}>
            <img src={images[0]} alt="Room View 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4 md:h-full">
            <div className="rounded-none overflow-hidden h-[200px] md:h-full bg-gray-100 group relative cursor-zoom-in" onClick={() => setSelectedImage(images[1])}>
              <img src={images[1]} alt="Room View 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
            <div className="rounded-none overflow-hidden h-[200px] md:h-full bg-gray-100 group relative cursor-zoom-in" onClick={() => setSelectedImage(images[2])}>
              <img src={images[2]} alt="Room View 3" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          </div>
        </div>
        <div className="mt-4 rounded-none overflow-hidden h-[300px] md:h-[500px] bg-gray-100 group relative cursor-zoom-in" onClick={() => setSelectedImage(images[3])}>
          <img src={images[3]} alt="Room View 4" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-ink/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center backdrop-blur-sm" onClick={() => setSelectedImage(null)}>
          <button onClick={() => setSelectedImage(null)} className="absolute top-6 right-6 text-white hover:text-gold transition-colors focus:outline-none p-2">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          <img src={selectedImage} alt="Full Screen Room View" className="max-w-[95vw] max-h-[90vh] object-contain shadow-2xl rounded-none" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  );
}