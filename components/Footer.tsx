// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink py-16 px-6 md:px-12 border-t border-white/5 flex flex-col items-center">
      <div className="max-w-[90rem] mx-auto w-full flex flex-col items-center">
        
        <Link href="/" className="flex flex-col items-center group mb-8 cursor-pointer notranslate" translate="no">
          <img src="/icon-logo.png" alt="My Stay in Madinah Key Icon" className="h-16 md:h-20 w-auto object-contain mb-4 opacity-90 transition-transform duration-700 group-hover:scale-105 drop-shadow-2xl" />
          <span className="text-gold font-jost text-xl font-medium tracking-[0.2em] uppercase opacity-90 drop-shadow-lg">My Stay In Madinah</span>
        </Link>

        <div className="flex gap-6 mb-10">
          <a href="https://wa.me/201067040337" target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#25D366] transition-colors" aria-label="WhatsApp">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 .003 5.385.003 12.031c0 2.126.556 4.198 1.613 6.02L.03 24l6.105-1.602a11.968 11.968 0 0 0 5.896 1.542h.005c6.643 0 12.025-5.384 12.025-12.028C24.055 5.385 18.675 0 12.031 0zm-.005 21.954a9.982 9.982 0 0 1-5.09-1.39l-.365-.217-3.784.992.998-3.69-.237-.377a9.96 9.96 0 0 1-1.523-5.27C1.995 6.486 6.483 2 12.031 2c5.545 0 10.033 4.488 10.033 10.003 0 5.513-4.488 10-10.038 10h-.001zm5.505-7.519c-.302-.151-1.787-.882-2.064-.983-.277-.101-.48-.151-.681.151-.202.302-.78 1.034-.956 1.235-.177.202-.353.227-.655.076-1.574-.789-2.73-1.66-3.784-3.32-.177-.278.177-.278.756-1.41.076-.151.038-.278-.038-.428-.076-.151-.681-1.636-.932-2.24-.246-.59-.496-.51-.681-.52-.177-.01-.378-.01-.58-.01-.202 0-.529.076-.806.378-.277.302-1.058 1.034-1.058 2.518 0 1.484 1.084 2.92 1.235 3.12.151.202 2.116 3.224 5.127 4.524 1.965.848 2.704.899 3.484.75.78-.151 2.368-.968 2.704-1.902.336-.934.336-1.737.236-1.903-.101-.166-.378-.267-.68-.418z"/></svg>
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-xs md:text-sm text-white/60 font-light mb-10">
          <Link href="/about" className="hover:text-gold transition-colors">About Us</Link>
          <Link href="/rooms" className="hover:text-gold transition-colors">Rooms</Link>
          <Link href="/tours" className="hover:text-gold transition-colors">Tours</Link>
          <Link href="/policy" className="hover:text-gold transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-gold transition-colors">Terms & Conditions</Link>
          <Link href="/contact" className="hover:text-gold transition-colors">Contact</Link>
        </div>

        <div className="w-full border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-white/40">
          <p>&copy; 2026 My Stay in Madinah. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="tracking-wide">SECURE PAYMENTS BY</span>
            <svg viewBox="0 0 60 25" xmlns="http://www.w3.org/2000/svg" className="w-12 h-auto text-white/60"><path d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5v1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM43.7 15.3c-1.44 0-2.44-.6-2.92-1.22v5.57h-4.09V5.7h4.09v1.06c.7-.8 1.92-1.37 3.39-1.37 3.12 0 5.39 2.54 5.39 7.45 0 5.14-2.54 7.61-5.86 7.61zm-1.11-8.52c-1.56 0-2.91 1.2-2.91 3.7s1.36 3.91 2.91 3.91c1.55 0 2.93-1.36 2.93-3.91s-1.36-3.7-2.93-3.7zM31.25 20.08h-4.09V5.7h4.09v14.38zm-2.04-16.72c-1.32 0-2.39-1.06-2.39-2.38 0-1.31 1.07-2.37 2.39-2.37 1.31 0 2.38 1.06 2.38 2.37 0 1.32-1.07 2.38-2.38 2.38zM24.76 11.23v-5.5h-4.09v14.35h4.09v-5.26c0-2.28 1.4-2.85 2.55-2.85.25 0 .52.03.74.07V7.81c-.26-.06-.59-.11-.93-.11-1.36 0-2.08.57-2.36 1.1zM14.93 20.08h-4.09v-7.9c0-1.92-.81-2.61-2.01-2.61-1.4 0-2.52 1.15-2.52 3.1v7.4h-4.09V5.7h4.09v1.33c.8-1.07 1.98-1.63 3.36-1.63 2.92 0 5.26 1.83 5.26 5.67v8.99zM2.87 2.9C2.87 1.31 1.81.25.49.25-.83.25-1.9.1.8-1.9 2.37c0 1.32 1.07 2.39 2.39 2.39 1.32 0 2.38-1.07 2.38-2.38z" fill="currentColor"/></svg>
          </div>
        </div>
      </div>
    </footer>
  );
}