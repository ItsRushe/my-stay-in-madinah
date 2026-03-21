// components/Navbar.tsx
"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar({ activePage = "home" }: { activePage?: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-[100] bg-ivory/90 backdrop-blur-md border-b border-gray-200 transition-all duration-300">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 py-4 flex justify-between items-center relative z-20">
        
        {/* Brand Logos */}
        <Link href="/" className="flex items-center gap-4 group">
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
          <Link href="/contact" className="bg-ink hover:bg-gold text-white px-5 py-2 rounded-sm font-medium transition-all duration-300 shadow-md">Book Direct</Link>
        </div>
        
        {/* Mobile Hamburger Button */}
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-ink hover:text-gold focus:outline-none">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      
      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-ink/95 backdrop-blur-xl border-b border-white/10 flex flex-col items-center py-8 gap-6 text-ivory shadow-2xl z-10">
          <Link href="/" className={`${activePage === 'home' ? 'text-gold' : 'hover:text-gold'} text-lg transition-colors`}>Home</Link>
          <Link href="/rooms" className={`${activePage === 'rooms' ? 'text-gold' : 'hover:text-gold'} text-lg transition-colors`}>Rooms</Link>
          <Link href="/tours" className={`${activePage === 'tours' ? 'text-gold' : 'hover:text-gold'} text-lg transition-colors`}>Tours</Link>
          <Link href="/contact" className={`${activePage === 'contact' ? 'text-gold' : 'hover:text-gold'} text-lg transition-colors`}>Contact</Link>
          <Link href="/contact" className="bg-gold hover:bg-white text-ink px-8 py-3 rounded-sm font-medium transition-all duration-300 mt-2">Book Direct</Link>
        </div>
      )}
    </nav>
  );
}
