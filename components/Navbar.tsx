"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useCurrency } from "./CurrencyProvider";

export default function Navbar({ activePage = "home" }: { activePage?: string }) {
  const[isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCurrOpen, setIsCurrOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");
  
  const { currency, changeCurrency, mounted, RATES } = useCurrency();

  const languages =[
    { code: "EN", name: "English", flag: "🇬🇧" }, 
    { code: "AR", name: "العربية", flag: "🇸🇦" }, 
    { code: "RU", name: "Русский", flag: "🇷🇺" }
  ];
  
  // 👉 FIXED: Added the missing currencies array back here!
  const currencies =["GBP", "USD", "EUR", "SAR"];

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
    <nav className="fixed top-0 w-full z-[100] bg-ivory/95 backdrop-blur-md border-b border-gray-200 transition-all duration-300">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 py-4 flex justify-between items-center relative z-20">
        
        {/* LEFT: Brand Logos */}
        <div className="flex-1 flex justify-start">
          <Link href="/" translate="no" className="flex items-center gap-4 group notranslate">
            <img src="/icon-logo.png" alt="My Stay in Madinah Key Icon" className="h-8 md:h-11 w-auto object-contain transition-transform duration-500 group-hover:scale-105" />
            <span className="text-gold font-jost text-lg md:text-xl font-medium tracking-[0.15em] uppercase hidden xl:block transition-opacity duration-500 group-hover:opacity-80 whitespace-nowrap">
              My Stay In Madinah
            </span>
          </Link>
        </div>
        
        {/* CENTER: Page Links */}
        <div className="hidden lg:flex flex-1 justify-center items-center gap-8 text-sm tracking-wide text-ink/80 absolute left-1/2 transform -translate-x-1/2">
          <Link href="/" className={`${activePage === 'home' ? 'text-gold font-medium' : 'hover:text-gold'} transition-colors`}>Home</Link>
          <Link href="/about" className={`${activePage === 'about' ? 'text-gold font-medium' : 'hover:text-gold'} transition-colors`}>About Us</Link>
          <Link href="/rooms" className={`${activePage === 'rooms' ? 'text-gold font-medium' : 'hover:text-gold'} transition-colors`}>Rooms</Link>
          <Link href="/tours" className={`${activePage === 'tours' ? 'text-gold font-medium' : 'hover:text-gold'} transition-colors`}>Tours</Link>
          <Link href="/contact" className={`${activePage === 'contact' ? 'text-gold font-medium' : 'hover:text-gold'} transition-colors`}>Contact</Link>
        </div>
        
        {/* RIGHT: Utilities */}
        <div className="hidden lg:flex flex-1 justify-end items-center gap-6 text-sm tracking-wide text-ink/80">
          
          {/* CURRENCY TOGGLE */}
          <div className="relative notranslate" translate="no">
            <button onClick={toggleCurrency} className="flex items-center gap-1 hover:text-gold transition-colors focus:outline-none font-medium text-base">
              {renderTopButtonDisplay()}
              <svg className={`w-4 h-4 transition-transform duration-300 ${isCurrOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
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
            <button onClick={toggleLanguage} className="flex items-center gap-2 hover:text-gold transition-colors focus:outline-none font-medium text-lg">
              {activeLangObj.flag}
              <svg className={`w-4 h-4 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19