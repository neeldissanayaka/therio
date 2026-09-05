import React from 'react';
import { ArrowUpRight, Film, Gamepad2, ShieldCheck, Lock } from 'lucide-react';

interface FooterProps {
  currentPath?: string;
  onNavigate: (path: string) => void;
  onOpenBooking: (packageId?: 'movie' | 'ps5') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <footer id="footer" className="footer-v18 bg-[#f5f3ef] text-neutral-900 border-t border-black/10">
      <div className="footer-v18-shell max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="footer-v18-hero flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-12 border-b border-black/10">
          <div>
            <span className="footer-v18-kicker text-xs font-black uppercase tracking-[0.25em] text-neutral-400">
              THE RIO / PRIVATE ENTERTAINMENT
            </span>
            <h2 className="mt-2 text-4xl sm:text-6xl font-black uppercase tracking-tight text-neutral-900 leading-[0.88]">
              Leave the ordinary<br />
              <em className="font-serif italic font-normal normal-case">outside.</em>
            </h2>
          </div>
          <button
            onClick={onOpenBooking}
            className="footer-v18-cta px-8 py-4 bg-neutral-950 hover:bg-[#E50914] text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-[#E50914]/25 shrink-0"
          >
            <span>Book the experience</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-12 border-b border-black/10">
          {/* Brand Col */}
          <div className="md:col-span-1 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-neutral-900 text-white flex items-center justify-center font-black text-xl italic shadow-md">
                R
              </div>
              <div>
                <b className="font-black tracking-tight text-base uppercase text-neutral-900">THE RIO</b>
                <span className="block text-[9px] font-bold uppercase tracking-widest text-neutral-400">
                  PRIVATE CINEMA & GAMING
                </span>
              </div>
            </div>
            <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
              Colombo's premier ultra-private cinema and PS5 gaming lounge. Designed for pure audio-visual immersion.
            </p>
          </div>

          {/* Dedicated Multi-Page Navigation */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-1">
              EXPLORE PAGES
            </span>
            <a
              href="/packages"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/packages');
              }}
              className="text-xs font-semibold text-neutral-700 hover:text-[#E50914] transition-colors flex items-center gap-2"
            >
              <Film className="w-3.5 h-3.5 text-[#E50914]" />
              <span>Packages & Rates</span>
            </a>
            <a
              href="/gaming"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/gaming');
              }}
              className="text-xs font-semibold text-neutral-700 hover:text-[#E50914] transition-colors flex items-center gap-2"
            >
              <Gamepad2 className="w-3.5 h-3.5 text-[#E50914]" />
              <span>PS5 Gaming Lounge</span>
            </a>
            <a
              href="/about"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/about');
              }}
              className="text-xs font-semibold text-neutral-700 hover:text-[#E50914] transition-colors"
            >
              The Acoustic Experience
            </a>
            <a
              href="/testimonials"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/testimonials');
              }}
              className="text-xs font-semibold text-neutral-700 hover:text-[#E50914] transition-colors"
            >
              Guest Stories & Reviews
            </a>
            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/contact');
              }}
              className="text-xs font-semibold text-neutral-700 hover:text-[#E50914] transition-colors"
            >
              Concierge Inquiry
            </a>
          </div>

          {/* Quick Actions & Reservation */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-1">
              RESERVATIONS
            </span>
            <a
              href="/booking.html"
              onClick={(e) => {
                e.preventDefault();
                onOpenBooking('movie');
              }}
              className="text-xs font-semibold text-neutral-700 hover:text-[#E50914] transition-colors flex items-center gap-1.5"
            >
              <span>Book Cinema Session</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="/booking.html?package=ps5"
              onClick={(e) => {
                e.preventDefault();
                onOpenBooking('ps5');
              }}
              className="text-xs font-semibold text-neutral-700 hover:text-[#E50914] transition-colors flex items-center gap-1.5"
            >
              <span>Book Gaming Squad</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="/admin.html"
              className="text-xs font-semibold text-neutral-500 hover:text-neutral-900 transition-colors flex items-center gap-1.5 mt-2"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Management Portal</span>
            </a>
          </div>

          {/* Security & Guarantees */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-1">
              SECURITY & PRIVACY
            </span>
            <div className="flex items-start gap-2 text-xs text-neutral-600">
              <ShieldCheck className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
              <span>256-Bit Encrypted Payments via PayHere Merchant Gateway</span>
            </div>
            <p className="text-[11px] text-neutral-400 leading-relaxed mt-2">
              All bookings are strictly private and locked out. No credit card details are ever stored on our servers.
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold text-neutral-400 uppercase tracking-widest">
          <span>© {new Date().getFullYear()} THE RIO CINEMA & GAMING LOUNGE</span>
          <span>PRIVATE BY DESIGN · 100% EXCLUSIVE LOCKOUT</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-neutral-900 transition-colors"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
};
