import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenBooking: (packageId?: 'movie' | 'ps5') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Packages', path: '/packages', hash: '#packages' },
    { label: 'PS5 Gaming', path: '/gaming', hash: '#gaming' },
    { label: 'About', path: '/about', hash: '#about' },
    { label: 'Testimonials', path: '/testimonials', hash: '#testimonials' },
    { label: 'Contact', path: '/contact', hash: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: { label: string; path: string; hash: string }) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(item.path);
  };

  const isSubPage = currentPath !== '/';

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || isSubPage
          ? 'bg-white/95 backdrop-blur-2xl border-b border-black/10 shadow-[0_16px_50px_rgba(0,0,0,.08)] py-3'
          : 'bg-gradient-to-b from-black/90 via-black/45 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="/"
          id="brand-logo-link"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('/');
          }}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-10 h-10 bg-[#E50914] rounded-[1.1rem] flex items-center justify-center font-black text-xl italic text-white shadow-lg shadow-[#E50914]/25 group-hover:scale-105 transition-transform duration-300">
            R
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className={`font-display font-black text-2xl tracking-tighter uppercase ${isScrolled || isSubPage ? 'text-neutral-900' : 'text-white'}`}>
                The Rio
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E50914]"></span>
            </div>
            <span className={`text-[9px] uppercase font-bold tracking-[0.25em] -mt-1 ${isScrolled || isSubPage ? 'text-black/50' : 'text-white/50'}`}>
              Private cinema · PS5 · experiences
            </span>
          </div>
        </a>

        {/* Center Navigation Links */}
        <nav id="desktop-nav-menu" className="hidden md:flex items-center gap-7 text-xs font-semibold tracking-widest uppercase">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <a
                key={item.label}
                href={item.path}
                id={`nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={(e) => handleNavClick(e, item)}
                className={`transition-colors duration-200 tracking-widest relative py-1 ${
                  isActive
                    ? 'text-[#E50914] font-black'
                    : isScrolled || isSubPage
                    ? 'text-black/70 hover:text-[#E50914]'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E50914] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            id="nav-book-now-btn"
            onClick={() => onOpenBooking()}
            className={`flex items-center gap-2 px-6 py-2.5 font-bold uppercase tracking-widest text-xs hover:bg-[#E50914] hover:text-white rounded-full transition-all duration-300 shadow-md active:scale-95 group ${
              isScrolled || isSubPage ? 'bg-neutral-950 text-white' : 'bg-white text-black'
            }`}
          >
            <span>Book Now</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          id="mobile-menu-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 rounded-full transition-colors ${
            isScrolled || isSubPage ? 'bg-black/5 text-neutral-900 hover:bg-black/10' : 'bg-white/10 text-white hover:bg-white/20'
          }`}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-dropdown-menu"
          className="md:hidden bg-white/98 backdrop-blur-2xl border-b border-black/10 px-6 py-5 flex flex-col gap-4 animate-in slide-in-from-top duration-200"
        >
          <div className="flex items-center justify-between pb-3 border-b border-black/10">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/50">
              The Rio Multi-Page Navigation
            </span>
            <span className="text-xs text-[#E50914] font-bold uppercase tracking-wider">Lounge Access</span>
          </div>

          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              onNavigate('/');
            }}
            className={`text-sm uppercase tracking-widest font-semibold py-1.5 transition-colors ${
              currentPath === '/' ? 'text-[#E50914] font-black' : 'text-black/80 hover:text-[#E50914]'
            }`}
          >
            Home Overview
          </a>

          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.path}
              id={`mobile-nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={(e) => handleNavClick(e, item)}
              className={`text-sm uppercase tracking-widest font-semibold py-1.5 transition-colors ${
                currentPath === item.path ? 'text-[#E50914] font-black' : 'text-black/80 hover:text-[#E50914]'
              }`}
            >
              {item.label}
            </a>
          ))}

          <div className="pt-3 border-t border-black/10 flex flex-col gap-2">
            <button
              id="mobile-book-now-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 bg-[#E50914] hover:bg-[#c40811] text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-[#E50914]/30 rounded-full transition-all"
            >
              <span>Reserve Session</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
