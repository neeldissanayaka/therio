import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PackagesSection } from './components/PackagesSection';
import { GamingSection } from './components/GamingSection';
import { AboutSection } from './components/AboutSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { Ticket } from 'lucide-react';
import { Reveal } from './components/Reveal';
import { useMouseWheelSections } from './hooks/useMouseWheelSections';
import { ExperienceChrome } from './components/ExperienceChrome';

export default function App() {
  useMouseWheelSections();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedPackageForBooking, setSelectedPackageForBooking] = useState<'movie' | 'ps5'>('movie');

  const handleOpenBooking = (packageId?: 'movie' | 'ps5') => {
    if (packageId) setSelectedPackageForBooking(packageId);
    setBookingModalOpen(true);
  };

  const handleScrollToPackages = () => {
    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePayment = () => {
    window.location.assign('/payment.html');
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-[#E50914] selection:text-white font-sans">
      <Navbar onOpenBooking={handleOpenBooking} />
      <ExperienceChrome />

      <main className="desktop-section-flow">
        <Reveal direction="zoom" className="aos-section-shell aos-hero-shell"><HeroSection onOpenBooking={handleOpenBooking} onExplorePackages={handleScrollToPackages} /></Reveal>
        <Reveal className="aos-section-shell"><PackagesSection onSelectPackage={handleOpenBooking} /></Reveal>
        <Reveal direction="right" className="aos-section-shell"><GamingSection onBookGaming={() => handleOpenBooking('ps5')} /></Reveal>
        <Reveal className="aos-section-shell"><AboutSection /></Reveal>
        <Reveal className="aos-section-shell"><TestimonialsSection /></Reveal>
        <Reveal className="aos-section-shell"><ContactSection /></Reveal>
      </main>

      <Footer onOpenBooking={() => handleOpenBooking()} />

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialPackageId={selectedPackageForBooking}
        onProceedToPayment={handlePayment}
      />

      <button
        id="floating-book-btn"
        onClick={() => handleOpenBooking()}
        className="floating-v18-book"
        aria-label="Open booking"
      >
        <Ticket className="w-4 h-4" />
        <span>Book</span>
      </button>
    </div>
  );
}
