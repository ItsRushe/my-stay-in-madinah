"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useCurrency } from "./CurrencyProvider";

export default function Navbar({ activePage = "home" }: { activePage?: string }) {
  const[isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCurrOpen, setIsCurrOpen] = useState(false);
  const[currentLang, setCurrentLang] = useState("EN");
  
  const { currency, changeCurrency, mounted, RATES } = useCurrency();

  const languages =[
    { code: "EN", name: "English", fi: "gb" }, 
    { code: "AR", name: "العربية", fi: "sa" }, 
    { code: "RU", name: "Русский", fi: "ru" }
  ];
  
  const currencies = ["GBP", "USD", "EUR", "SAR"];

  useEffect(() => {
    const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/);
    if (match && match[1] && match[1].toLowerCase() !== 'en') {
      const lang = match[1].toUpperCase();
      setCurrentLang(lang);
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
    const domain = window.location.hostname;
    const dotDomain = domain.startsWith('.') ? domain : `.${domain}`;
    const domainParts = domain.split('.');

    if (code === "en") {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${domain}; path=/;`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${dotDomain}; path=/;`;
      
      if (domainParts.length > 2) {
        const baseDomain = domainParts.slice(1).join('.');
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${baseDomain}; path=/;`;
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${baseDomain}; path=/;`;
      }
      
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';

    } else {
      document.cookie = `googtrans=/en/${code}; path=/;`;
      document.cookie = `googtrans=/en/${code}; domain=${domain}; path=/;`;
      document.cookie = `googtrans=/en/${code}; domain=${dotDomain}; path=/;`;
    }
    
    setIsLangOpen(false);
    setIsMobileMenuOpen(false);
    window.location.assign(window.location.href);
  };

  const activeLangObj = languages.find(l => l.code === currentLang) || languages[0];

  const toggleLanguage = () => {
    setIsLangOpen(!isLangOpen);
    if (isCurrOpen) setIsCurrOpen(false);
  };

  const toggleCurrency = () => {
    setIsCurrOpen(!isCurrOpen);
    if (isLangOpen) setIsLangOpen(false);
  };

  const renderCurrencyDisplay = (currCode: string) => {
      if (currCode === "SAR") {
          return <span className="w-full text-center tracking-widest uppercase">SAR</span>;
      }
      return (
          <div className="flex items-center justify-center gap-3 w-full">
              <span className="text-lg w-4 text-center">{RATES && RATES[currCode as keyof typeof RATES] ? RATES[currCode as keyof typeof RATES].symbol : ""}</span>
              <span className="text-sm tracking-widest uppercase opacity-70">{currCode}</span>
          </div>
      );
  };

  const renderTopButtonDisplay = () => {
    if (!mounted || !RATES) return "SAR";
    if (currency === "SAR") return "SAR";
    return `${RATES[currency as keyof typeof RATES]?.symbol} ${currency}`;
  }

  return (
    <nav dir="ltr" className="fixed top-0 w-full z-[100] bg-ivory/95 backdrop-blur-md border-b border-gray-200 transition-all duration-300">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 py-4 flex items-center justify-between gap-8">

        {/* LEFT: Logo */}
        <Link href="/" translate="no" className="flex items-center gap-4 group notranslate shrink-0">
          <img src="/icon-logo.png" alt="My Stay in Madinah Key Icon" className="h-8 md:h-11 w-auto object-contain transition-transform duration-500 group-hover:scale-105" />
          <span className="text-gold font-jost text-lg md:text-xl font-medium tracking-[0.15em] uppercase hidden xl:block transition-opacity duration-500 group-hover:opacity-80 whitespace-nowrap">
            My Stay In Madinah
          </span>
        </Link>

        {/* RIGHT: Nav links + divider + utilities */}
        <div className="hidden lg:flex items-center gap-0">

          {/* Page Links */}
          <div className="flex items-center gap-7 text-sm tracking-wide text-ink/75 pr-7">
            <Link href="/" className={`${activePage === 'home' ? 'text-gold font-medium' : 'hover:text-gold'} transition-colors`}>Home</Link>
            <Link href="/about" className={`${activePage === 'about' ? 'text-gold font-medium' : 'hover:text-gold'} transition-colors`}>About Us</Link>
            <Link href="/rooms" className={`${activePage === 'rooms' ? 'text-gold font-medium' : 'hover:text-gold'} transition-colors`}>Rooms</Link>
            <Link href="/tours" className={`${activePage === 'tours' ? 'text-gold font-medium' : 'hover:text-gold'} transition-colors`}>Tours</Link>
            <Link href="/contact" className={`${activePage === 'contact' ? 'text-gold font-medium' : 'hover:text-gold'} transition-colors`}>Contact</Link>
          </div>

          {/* Vertical divider */}
          <div className="w-px h-5 bg-ink/15 shrink-0" />

          {/* Utility controls */}
          <div className="flex items-center gap-5 pl-7 text-sm text-ink/75">

            {/* CURRENCY TOGGLE */}
            <div className="relative notranslate" translate="no">
              <button onClick={toggleCurrency} className="flex items-center gap-1 hover:text-gold transition-colors focus:outline-none font-medium text-sm tracking-wide">
                {renderTopButtonDisplay()}
                <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${isCurrOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </button>
              {isCurrOpen && (
                <div className="absolute top-full right-0 mt-4 w-32 bg-white border border-gray-100 shadow-xl flex flex-col py-2 z-50 text-center">
                  {currencies.map((curr) => (
                    <button
                      key={curr}
                      onClick={() => { changeCurrency(curr as any); setIsCurrOpen(false); }}
                      className={`flex items-center justify-center w-full px-4 py-3 hover:bg-ivory hover:text-gold transition-colors text-sm font-medium ${currency === curr ? 'text-gold bg-ivory' : 'text-ink'}`}
                    >
                      {renderCurrencyDisplay(curr)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* LANGUAGE TOGGLE */}
            <div className="relative notranslate" translate="no">
              <button onClick={toggleLanguage} className="flex items-center gap-2 hover:text-gold transition-colors focus:outline-none">
                <span className={`fi fi-${activeLangObj.fi}`} style={{ width: '22px', height: '16px', borderRadius: '2px', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
                <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </button>
              {isLangOpen && (
                <div className="absolute top-full right-0 mt-4 w-36 bg-white border border-gray-100 shadow-xl flex flex-col py-2 z-50 text-left">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => switchLanguage(lang.code)}
                      className={`flex items-center gap-3 px-4 py-3 hover:bg-ivory hover:text-gold transition-colors ${currentLang === lang.code ? 'text-gold font-medium bg-ivory' : 'text-ink'}`}
                    >
                      <span className={`fi fi-${lang.fi} shrink-0`} style={{ width: '22px', height: '16px', borderRadius: '2px', boxShadow: '0 1px 3px rgba(0,0,0,0.15)' }} />
                      <span className="text-sm">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden text-ink hover:text-gold focus:outline-none ml-auto">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      
      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 flex flex-col items-center py-8 gap-6 text-ink shadow-2xl z-10 lg:hidden">
          <Link href="/" className={`${activePage === 'home' ? 'text-gold font-medium' : 'hover:text-gold'} text-lg transition-colors`}>Home</Link>
          <Link href="/about" className={`${activePage === 'about' ? 'text-gold font-medium' : 'hover:text-gold'} text-lg transition-colors`}>About Us</Link>
          <Link href="/rooms" className={`${activePage === 'rooms' ? 'text-gold font-medium' : 'hover:text-gold'} text-lg transition-colors`}>Rooms</Link>
          <Link href="/tours" className={`${activePage === 'tours' ? 'text-gold font-medium' : 'hover:text-gold'} text-lg transition-colors`}>Tours</Link>
          <Link href="/contact" className={`${activePage === 'contact' ? 'text-gold font-medium' : 'hover:text-gold'} text-lg transition-colors`}>Contact</Link>
          
          <div className="flex gap-8 pt-6 border-t border-gray-100 w-full justify-center notranslate" translate="no" dir="ltr">
            {currencies.map((curr) => (
              <button 
                key={curr} 
                onClick={() => { changeCurrency(curr as any); setIsMobileMenuOpen(false); }} 
                className={`text-lg transition-all duration-300 font-medium tracking-widest uppercase ${currency === curr ? 'text-gold scale-110' : 'text-ink/50 hover:text-ink'}`}
              >
                {curr === "SAR" ? "SAR" : RATES?.[curr as keyof typeof RATES]?.symbol || curr}
              </button>
            ))}
          </div>

          <div className="flex gap-8 pt-4 pb-2 w-2/3 justify-center notranslate" translate="no" dir="ltr">
            {languages.map((lang) => (
              <button 
                key={lang.code} 
                onClick={() => switchLanguage(lang.code)} 
                className={`transition-all duration-300 ${currentLang === lang.code ? 'opacity-100 scale-110 drop-shadow-md' : 'opacity-40 hover:opacity-100'}`}
              >
                <span className={`fi fi-${lang.fi}`} style={{ width: '30px', height: '22px', borderRadius: '2px', display: 'inline-block' }} />
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}