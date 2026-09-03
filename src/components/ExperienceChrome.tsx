import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const sections = [
  { id: 'hero-section', label: 'Home' },
  { id: 'packages', label: 'Packages' },
  { id: 'gaming', label: 'Gaming' },
  { id: 'about', label: 'About' },
  { id: 'testimonials', label: 'Guests' },
  { id: 'contact', label: 'Contact' },
];

export const ExperienceChrome: React.FC = () => {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setProgress(Math.min(100, Math.max(0, (y / max) * 100)));

      let current = 0;
      sections.forEach((section, index) => {
        const el = document.getElementById(section.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.45) current = index;
      });
      setActive(current);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <div className="rio-scroll-progress" aria-hidden="true"><span style={{ transform: `scaleY(${progress / 100})` }} /></div>
      <div className="rio-section-rail" aria-label="Section navigation">
        <div className="rio-section-rail-label">THE RIO / 2026</div>
        {sections.map((section, index) => (
          <button
            key={section.id}
            type="button"
            onClick={() => jump(section.id)}
            className={`rio-rail-dot ${index === active ? 'is-active' : ''}`}
            aria-label={`Go to ${section.label}`}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
          </button>
        ))}
        <a href="#contact" onClick={(e) => { e.preventDefault(); jump('contact'); }} className="rio-rail-cta">
          <ArrowUpRight />
        </a>
      </div>
      <div className="rio-noise" aria-hidden="true" />
    </>
  );
};
