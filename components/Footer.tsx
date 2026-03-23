// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-ink py-16 px-6 md:px-12 border-t border-white/5 flex flex-col items-center">
      <div className="max-w-[90rem] mx-auto w-full flex flex-col items-center">
        
        {/* Brand Logo */}
        <Link href="/" translate="no" className="flex flex-col items-center group mb-12 cursor-pointer notranslate">
          <img src="/icon-logo.png" alt="My Stay in Madinah Key Icon" className="h-16 md:h-20 w-auto object-contain mb-4 opacity-90 transition-transform duration-700 group-hover:scale-105 drop-shadow-2xl" />
          <span className="text-gold font-jost text-xl font-medium tracking-[0.2em] uppercase opacity-90 drop-shadow-lg">My Stay In Madinah</span>
        </Link>

        {/* Page Links */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-xs md:text-sm text-white/60 font-light mb-12">
          <Link href="/about" className="hover:text-gold transition-colors">About Us</Link>
          <Link href="/rooms" className="hover:text-gold transition-colors">Rooms</Link>
          <Link href="/tours" className="hover:text-gold transition-colors">Tours</Link>
          <Link href="/policy" className="hover:text-gold transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-gold transition-colors">Terms & Conditions</Link>
          <Link href="/contact" className="hover:text-gold transition-colors">Contact</Link>
        </div>

        {/* Bottom Bar: 3 Column Grid for Perfect Centering */}
        <div className="w-full border-t border-white/10 pt-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-xs text-white/40">
          
          {/* Left: Copyright */}
          <div className="text-center md:text-left order-3 md:order-1">
            <p>&copy; 2026 My Stay in Madinah. All rights reserved.</p>
          </div>
          
          {/* Center: Social Icons + Stripe Badge */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 order-1 md:order-2">
            {/* Social Icons */}
            <div className="flex gap-4">
              <a href="https://wa.me/201067040337" target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#25D366] transition-colors" aria-label="WhatsApp">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 .003 5.385.003 12.031c0 2.126.556 4.198 1.613 6.02L.03 24l6.105-1.602a11.968 11.968 0 0 0 5.896 1.542h.005c6.643 0 12.025-5.384 12.025-12.028C24.055 5.385 18.675 0 12.031 0zm-.005 21.954a9.982 9.982 0 0 1-5.09-1.39l-.365-.217-3.784.992.998-3.69-.237-.377a9.96 9.96 0 0 1-1.523-5.27C1.995 6.486 6.483 2 12.031 2c5.545 0 10.033 4.488 10.033 10.003 0 5.513-4.488 10-10.038 10h-.001zm5.505-7.519c-.302-.151-1.787-.882-2.064-.983-.277-.101-.48-.151-.681.151-.202.302-.78 1.034-.956 1.235-.177.202-.353.227-.655.076-1.574-.789-2.73-1.66-3.784-3.32-.177-.278.177-.278.756-1.41.076-.151.038-.278-.038-.428-.076-.151-.681-1.636-.932-2.24-.246-.59-.496-.51-.681-.52-.177-.01-.378-.01-.58-.01-.202 0-.529.076-.806.378-.277.302-1.058 1.034-1.058 2.518 0 1.484 1.084 2.92 1.235 3.12.151.202 2.116 3.224 5.127 4.524 1.965.848 2.704.899 3.484.75.78-.151 2.368-.968 2.704-1.902.336-.934.336-1.737.236-1.903-.101-.166-.378-.267-.68-.418z"/></svg>
              </a>
              <a href="#" target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#E1306C] transition-colors" aria-label="Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
            
            {/* Divider Line (Desktop Only) */}
            <div className="hidden md:block w-px h-5 bg-white/20"></div>

            {/* Stripe Badge */}
            <div className="flex items-center gap-3">
              <span className="tracking-widest uppercase text-[10px]">Secure Payments By</span>
              <svg viewBox="0 0 60 25" xmlns="http://www.w3.org/2000/svg" className="w-12 h-auto text-white/60"><path d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5v1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM43.7 15.3c-1.44 0-2.44-.6-2.92-1.22v5.57h-4.09V5.7h4.09v1.06c.7-.8 1.92-1.37 3.39-1.37 3.12 0 5.39 2.54 5.39 7.45 0 5.14-2.54 7.61-5.86 7.61zm-1.11-8.52c-1.56 0-2.91 1.2-2.91 3.7s1.36 3.91 2.91 3.91c1.55 0 2.93-1.36 2.93-3.91s-1.36-3.7-2.93-3.7zM31.25 20.08h-4.09V5.7h4.09v14.38zm-2.04-16.72c-1.32 0-2.39-1.06-2.39-2.38 0-1.31 1.07-2.37 2.39-2.37 1.31 0 2.38 1.06 2.38 2.37 0 1.32-1.07 2.38-2.38 2.38zM24.76 11.23v-5.5h-4.09v14.35h4.09v-5.26c0-2.28 1.4-2.85 2.55-2.85.25 0 .52.03.74.07V7.81c-.26-.06-.59-.11-.93-.11-1.36 0-2.08.57-2.36 1.1zM14.93 20.08h-4.09v-7.9c0-1.92-.81-2.61-2.01-2.61-1.4 0-2.52 1.15-2.52 3.1v7.4h-4.09V5.7h4.09v1.33c.8-1.07 1.98-1.63 3.36-1.63 2.92 0 5.26 1.83 5.26 5.67v8.99zM2.87 2.9C2.87 1.31 1.81.25.49.25-.83.25-1.9.1.8-1.9 2.37c0 1.32 1.07 2.39 2.39 2.39 1.32 0 2.38-1.07 2.38-2.38z" fill="currentColor"/></svg>
            </div>
          </div>
          
          {/* Right: Empty for perfect flex centering */}
          <div className="hidden md:block order-2 md:order-3"></div>

        </div>
      </div>
    </footer>
  );
}