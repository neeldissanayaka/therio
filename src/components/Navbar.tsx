import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (packageId?: 'movie' | 'ps5') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
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
    { label: 'Packages', href: '#packages' },
    { label: 'PS5 Gaming', href: '#gaming' },
    { label: 'About', href: '#about' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-2xl border-b border-black/10 shadow-[0_16px_50px_rgba(0,0,0,.08)] py-3'
          : 'bg-gradient-to-b from-black/90 via-black/45 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo: The Rio matching Elegant Dark */}
        <a
          href="#"
          id="brand-logo-link"
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-10 h-10 bg-[#E50914] rounded-[1.1rem] flex items-center justify-center font-black text-xl italic text-white shadow-lg shadow-[#E50914]/25 group-hover:scale-105 transition-transform duration-300">
            R
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className={`font-display font-black text-2xl tracking-tighter uppercase ${isScrolled ? 'text-neutral-900' : 'text-white'}`}>
                The Rio
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E50914]"></span>
            </div>
            <span className={`text-[9px] uppercase font-bold tracking-[0.25em] -mt-1 ${isScrolled ? 'text-black/50' : 'text-white/50'}`}>
              Private cinema · PS5 · experiences
            </span>
          </div>
        </a>

        {/* Center Navigation Links matching user requirements */}
        <nav id="desktop-nav-menu" className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-widest uppercase">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              id={`nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`hover:text-[#E50914] transition-colors duration-200 tracking-widest relative py-1 ${isScrolled ? 'text-black/70' : 'text-white/80'}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Button: Book Now */}
        <div className="hidden md:flex items-center gap-4">
          <button
            id="nav-book-now-btn"
            onClick={() => onOpenBooking()}
            className={`flex items-center gap-2 px-6 py-2.5 font-bold uppercase tracking-widest text-xs hover:bg-[#E50914] hover:text-white rounded-sm transition-all duration-300 shadow-md active:scale-95 group ${isScrolled ? 'bg-neutral-950 text-white' : 'bg-white text-black'}`}
          >
            <span>Book Now</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          id="mobile-menu-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 rounded-sm transition-colors ${isScrolled ? 'bg-black/5 text-neutral-900 hover:bg-black/10' : 'bg-white/10 text-white hover:bg-white/20'}`}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-dropdown-menu"
          className="md:hidden bg-white/98 backdrop-blur-2xl border-b border-black/10 px-6 py-5 flex flex-col gap-4 animate-in slide-in-from-top duration-200"
        >
          <div className="flex items-center justify-between pb-3 border-b border-black/10">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/50">
              Menu Navigation
            </span>
            <span className="text-xs text-[#E50914] font-bold uppercase tracking-wider">The Rio Lounge</span>
          </div>
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              id={`mobile-nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-sm uppercase tracking-widest font-semibold text-black/80 hover:text-[#E50914] py-1.5 transition-colors"
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
              className="w-full py-3 bg-[#E50914] hover:bg-[#c40811] text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-[#E50914]/30 rounded-sm transition-all"
            >
              <span>Start your night</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
