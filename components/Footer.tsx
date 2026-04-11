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
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-xs md:text-sm text-white/60 font-light mb-16">
          <Link href="/about" className="hover:text-gold transition-colors">About Us</Link>
          <Link href="/rooms" className="hover:text-gold transition-colors">Rooms</Link>
          <Link href="/tours" className="hover:text-gold transition-colors">Tours</Link>
          <Link href="/policy" className="hover:text-gold transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-gold transition-colors">Terms & Conditions</Link>
          <Link href="/contact" className="hover:text-gold transition-colors">Contact</Link>
        </div>

        {/* Bottom Bar: Absolute Centering */}
        <div className="w-full border-t border-white/10 pt-8 relative flex flex-col md:flex-row items-center justify-center text-xs text-white/40 min-h-[80px] gap-8 md:gap-0">
          
          {/* Left: Copyright */}
          <div className="md:absolute md:left-0 text-center md:text-left w-full md:w-auto">
            <p>&copy; 2026 My Stay in Madinah. All rights reserved.</p>
          </div>
          
          {/* Center: Socials + Stripe Badge */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            
            {/* Social Icons */}
            <div className="flex gap-6">
              <a href="https://wa.me/966508151408" target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#25D366] transition-colors" aria-label="WhatsApp">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 .003 5.385.003 12.031c0 2.126.556 4.198 1.613 6.02L.03 24l6.105-1.602a11.968 11.968 0 0 0 5.896 1.542h.005c6.643 0 12.025-5.384 12.025-12.028C24.055 5.385 18.675 0 12.031 0zm-.005 21.954a9.982 9.982 0 0 1-5.09-1.39l-.365-.217-3.784.992.998-3.69-.237-.377a9.96 9.96 0 0 1-1.523-5.27C1.995 6.486 6.483 2 12.031 2c5.545 0 10.033 4.488 10.033 10.003 0 5.513-4.488 10-10.038 10h-.001zm5.505-7.519c-.302-.151-1.787-.882-2.064-.983-.277-.101-.48-.151-.681.151-.202.302-.78 1.034-.956 1.235-.177.202-.353.227-.655.076-1.574-.789-2.73-1.66-3.784-3.32-.177-.278.177-.278.756-1.41.076-.151.038-.278-.038-.428-.076-.151-.681-1.636-.932-2.24-.246-.59-.496-.51-.681-.52-.177-.01-.378-.01-.58-.01-.202 0-.529.076-.806.378-.277.302-1.058 1.034-1.058 2.518 0 1.484 1.084 2.92 1.235 3.12.151.202 2.116 3.224 5.127 4.524 1.965.848 2.704.899 3.484.75.78-.151 2.368-.968 2.704-1.902.336-.934.336-1.737.236-1.903-.101-.166-.378-.267-.68-.418z"/></svg>
              </a>
              <a href="#" target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#E1306C] transition-colors" aria-label="Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
            
            {/* Desktop Divider */}
            <div className="hidden md:block w-px h-5 bg-white/20"></div>

            {/* FLAWLESS STRIPE BADGE USING YOUR IMAGE FILE */}
            <div className="flex items-center gap-3">
              <span className="tracking-widest uppercase text-[10px] text-white/50 font-medium">Secure Payments By</span>
              {/* brightness-0 invert forces the image to become pure white! */}
              <img src="/stripe-logo.png" alt="Stripe" className="h-6 w-auto opacity-70 object-contain brightness-0 invert" />
            </div>
            
          </div>
          
        </div>
      </div>
    </footer>
  );
}