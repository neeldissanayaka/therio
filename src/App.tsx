import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PackagesSection } from './components/PackagesSection';
import { GamingSection } from './components/GamingSection';
import { AboutSection } from './components/AboutSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Ticket } from 'lucide-react';
import { Reveal } from './components/Reveal';
import { useMouseWheelSections } from './hooks/useMouseWheelSections';
import { ExperienceChrome } from './components/ExperienceChrome';

// Dedicated Multi-Page Views
import { PackagesPage } from './pages/PackagesPage';
import { GamingPage } from './pages/GamingPage';
import { AboutPage } from './pages/AboutPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const p = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
    return p;
  });

  // Dynamically update document title based on the active page
  useEffect(() => {
    switch (currentPath) {
      case '/packages':
        document.title = 'Packages & Pricing — The Rio Private Cinema & PS5 Lounge';
        break;
      case '/gaming':
        document.title = 'PS5 Gaming Lounge — 4K 120Hz Arena — The Rio';
        break;
      case '/about':
        document.title = 'The Acoustic Experience & Architecture — The Rio';
        break;
      case '/testimonials':
      case '/reviews':
        document.title = 'Guest Stories & Reviews — The Rio Private Cinema';
        break;
      case '/contact':
        document.title = 'Concierge Desk & Planning — The Rio';
        break;
      default:
        document.title = 'The Rio — Private Cinema & PS5 Lounge Colombo';
        break;
    }
  }, [currentPath]);

  // Enable mouse wheel full-page snapping ONLY on the home overview page
  useMouseWheelSections(currentPath === '/');

  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
      setCurrentPath(p);
      window.scrollTo(0, 0);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    const normalized = path.toLowerCase().replace(/\/$/, '') || '/';
    if (normalized !== currentPath) {
      window.history.pushState({}, '', normalized);
      setCurrentPath(normalized);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const handleOpenBooking = (packageId?: 'movie' | 'ps5') => {
    const query = packageId ? `?package=${packageId}` : '';
    window.location.assign(`/booking.html${query}`);
  };

  // Render dedicated sub-page if route matches
  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/packages':
        return <PackagesPage onOpenBooking={handleOpenBooking} onNavigate={navigate} />;
      case '/gaming':
        return <GamingPage onOpenBooking={() => handleOpenBooking('ps5')} onNavigate={navigate} />;
      case '/about':
        return <AboutPage onOpenBooking={() => handleOpenBooking()} onNavigate={navigate} />;
      case '/testimonials':
      case '/reviews':
        return <TestimonialsPage onOpenBooking={() => handleOpenBooking()} onNavigate={navigate} />;
      case '/contact':
        return <ContactPage onOpenBooking={() => handleOpenBooking()} onNavigate={navigate} />;
      default:
        // Default: Full Cinematic Continuous Landing Page
        return (
          <>
            <ExperienceChrome />
            <main className="desktop-section-flow">
              <Reveal direction="zoom" className="aos-section-shell aos-hero-shell">
                <HeroSection onOpenBooking={handleOpenBooking} onExplorePackages={() => navigate('/packages')} />
              </Reveal>
              <Reveal className="aos-section-shell">
                <PackagesSection onSelectPackage={handleOpenBooking} onNavigate={navigate} />
              </Reveal>
              <Reveal direction="right" className="aos-section-shell">
                <GamingSection onBookGaming={() => handleOpenBooking('ps5')} onNavigate={navigate} />
              </Reveal>
              <Reveal className="aos-section-shell">
                <AboutSection onNavigate={navigate} />
              </Reveal>
              <Reveal className="aos-section-shell">
                <TestimonialsSection onNavigate={navigate} />
              </Reveal>
              <Reveal className="aos-section-shell">
                <ContactSection />
              </Reveal>
            </main>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-[#E50914] selection:text-white font-sans">
      <Navbar currentPath={currentPath} onNavigate={navigate} onOpenBooking={handleOpenBooking} />

      {renderCurrentPage()}

      <Footer currentPath={currentPath} onNavigate={navigate} onOpenBooking={() => handleOpenBooking()} />

      <button
        id="floating-book-btn"
        onClick={() => handleOpenBooking()}
        className="floating-v18-book"
        aria-label="Open booking reservation"
      >
        <Ticket className="w-4 h-4" />
        <span>Book</span>
      </button>
    </div>
  );
}
