import React from 'react';
import { ArrowUpRight, Film, Gamepad2 } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer id="footer" className="footer-v18">
      <div className="footer-v18-shell max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="footer-v18-hero">
          <div>
            <span className="footer-v18-kicker">THE RIO / PRIVATE ENTERTAINMENT</span>
            <h2>Leave the ordinary<br /><em>outside.</em></h2>
          </div>
          <button onClick={onOpenBooking} className="footer-v18-cta">Book the experience <ArrowUpRight /></button>
        </div>

        <div className="footer-v18-grid">
          <div className="footer-v18-brand">
            <div className="footer-v18-mark">R</div>
            <div><b>THE RIO</b><span>PRIVATE CINEMA · PS5 · EXPERIENCES</span></div>
          </div>
          <div className="footer-v18-links">
            <a href="#packages"><Film /> Cinema</a>
            <a href="#gaming"><Gamepad2 /> PS5 Gaming</a>
            <a href="#about">About the experience</a>
            <a href="#testimonials">Guest stories</a>
          </div>
          <div className="footer-v18-links right">
            <a href="#contact">Start a brief <ArrowUpRight /></a>
            <a href="#packages">View packages</a>
            <a href="#hero-section">Back to top ↑</a>
          </div>
        </div>

        <div className="footer-v18-bottom">
          <span>© {new Date().getFullYear()} THE RIO</span>
          <span>PRIVATE BY DESIGN · BUILT FOR BETTER NIGHTS</span>
          <span>01—06</span>
        </div>
      </div>
    </footer>
  );
};
