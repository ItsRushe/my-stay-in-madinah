"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar({ activePage = "home" }: { activePage?: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const[isLangOpen, setIsLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");

  const languages =[
    { code: "EN", name: "English" },
    { code: "AR", name: "العربية" },
    { code: "RU", name: "Русский" },
  ];

  // Read the current language from the cookie and flip the layout if Arabic!
  useEffect(() => {
    const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
    if (match && match[1]) {
      const lang = match[1].toUpperCase();
      setCurrentLang(lang);
      
      // FLIP DOM DIRECTION FOR ARABIC
      if (lang === 'AR') {
        document.documentElement.dir = 'rtl';
        document.documentElement.lang = 'ar';
      } else {
        document.documentElement.dir = 'ltr';
        document.documentElement.lang = lang.toLowerCase();
      }
    } else {
      setCurrentLang("EN");
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    }
  },[]);

  const switchLanguage = (langCode: string) => {
    const code = langCode.toLowerCase();
    if (code === "en") {
      document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${window.location.hostname}; path=/;`;
    } else {
      document.cookie = `googtrans=/en/${code}; path=/`;
      document.cookie = `googtrans=/en/${code}; domain=${window.location.hostname}; path=/`;
    }
    setIsLangOpen(false);
    setIsMobileMenuOpen(false);
    window.location.reload(); 
  };

  return (
    <nav className="fixed top-0 w-full z-[100] bg-ivory/95 backdrop-blur-md border-b border-gray-200 transition-all duration-300">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 py-4 flex justify-between items-center relative z-20">
        
        {/* BRAND LOGOS - translate="no" and class notranslate protects it! */}
        <Link href="/" className="flex items-center gap-4 group notranslate" translate="no">
          <img src="/icon-logo.png" alt="My Stay in Madinah Key Icon" className="h-8 md:h-11 w-auto object-contain transition-transform duration-500 group-hover:scale-105" />
          <span className="text-gold font-jost text-lg md:text-xl font-medium tracking-[0.15em] uppercase hidden sm:block transition-opacity duration-500 group-hover:opacity-80">
            My Stay In Madinah
          </span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center text-sm tracking-wide text-ink/80">
          <Link href="/" className={`${activePage === 'home' ? 'text-gold font-medium' : 'hover:text-gold'} transition-colors`}>Home</Link>
          <Link href="/rooms" className={`${activePage === 'rooms' ? 'text-gold font-medium' : 'hover:text-gold'} transition-colors`}>Rooms</Link>
          <Link href="/tours" className={`${activePage === 'tours' ? 'text-gold font-medium' : 'hover:text-gold'} transition-colors`}>Tours</Link>
          <Link href="/contact" className={`${activePage === 'contact' ? 'text-gold font-medium' : 'hover:text-gold'} transition-colors`}>Contact</Link>
          
          {/* Language Toggle (Desktop) */}
          <div className="relative notranslate" translate="no">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1 hover:text-gold transition-colors focus:outline-none font-medium"
            >
              {currentLang}
              <svg className={`w-4 h-4 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {isLangOpen && (
              <div className="absolute top-full right-0 mt-4 w-32 bg-white border border-gray-100 shadow-xl flex flex-col py-2 z-50 text-left">
                {languages.map((lang) => (
                  <button 
                    key={lang.code}
                    onClick={() => switchLanguage(lang.code)}
                    className={`text-left px-4 py-2 hover:bg-ivory hover:text-gold transition-colors ${currentLang === lang.code ? 'text-gold font-medium bg-ivory' : 'text-ink'}`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link href="/contact" className="bg-ink hover:bg-gold text-white px-6 py-3 font-medium transition-all duration-300 shadow-md rounded-none">Book Direct</Link>
        </div>
        
        {/* Mobile Hamburger Button */}
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-ink hover:text-gold focus:outline-none">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
          </svg>
        </button>
      </div>
      
      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 flex flex-col items-center py-8 gap-6 text-ink shadow-2xl z-10">
          <Link href="/" className={`${activePage === 'home' ? 'text-gold font-medium' : 'hover:text-gold'} text-lg transition-colors`}>Home</Link>
          <Link href="/rooms" className={`${activePage === 'rooms' ? 'text-gold font-medium' : 'hover:text-gold'} text-lg transition-colors`}>Rooms</Link>
          <Link href="/tours" className={`${activePage === 'tours' ? 'text-gold font-medium' : 'hover:text-gold'} text-lg transition-colors`}>Tours</Link>
          <Link href="/contact" className={`${activePage === 'contact' ? 'text-gold font-medium' : 'hover:text-gold'} text-lg transition-colors`}>Contact</Link>
          
          {/* Mobile Language Selection */}
          <div className="flex gap-6 pt-4 border-t border-gray-100 w-1/2 justify-center notranslate" translate="no">
            {languages.map((lang) => (
              <button 
                key={lang.code}
                onClick={() => switchLanguage(lang.code)}
                className={`text-sm font-medium transition-colors ${currentLang === lang.code ? 'text-gold border-b border-gold' : 'text-ink/50 hover:text-ink'}`}
              >
                {lang.code}
              </button>
            ))}
          </div>

          <Link href="/contact" className="bg-gold hover:bg-ink text-white px-10 py-4 font-medium transition-all duration-300 mt-2 rounded-none">Book Direct</Link>
        </div>
      )}
    </nav>
  );
}