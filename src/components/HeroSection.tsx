import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Gamepad2, Play, Sparkles, Star } from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: (packageId?: 'movie' | 'ps5') => void;
  onExplorePackages: () => void;
}

const slides = [
  {
    id: 'spider-man',
    eyebrow: '01 / SPIDER-MAN: BRAND NEW DAY',
    title: 'CINEMA,\nBUT LOUDER.',
    copy: 'A blockbuster night deserves a blockbuster screen — cinematic scale, deep contrast and the kind of atmosphere that makes every frame hit harder.',
    image: '/media/hero/spider-man-brand-3840x2160-26949.webp',
    tag: 'Spider-Man / 2026',
    price: 'Rs. 3,000',
    packageId: 'movie' as const,
    Icon: Play,
  },
  {
    id: 'avengers',
    eyebrow: '02 / AVENGERS: DOOMSDAY',
    title: 'BIG SCREEN.\nZERO DISTANCE.',
    copy: 'Put yourself inside the action with a private cinema built for huge moments, immersive sound and uninterrupted movie nights.',
    image: '/media/hero/avengers-doomsday-3840x2160-26919.webp',
    tag: 'Avengers / 2026',
    price: 'Rs. 3,000',
    packageId: 'movie' as const,
    Icon: Sparkles,
  },
  {
    id: 'iron-man',
    eyebrow: '03 / IRON MAN — MARVEL CLASSICS',
    title: 'EVERY FRAME.\nFEELS EPIC.',
    copy: 'From iconic action to late-night rewatches, turn the room into your own premium screening suite.',
    image: '/media/hero/iron-man-war-machine-marvel-comics-marvel-superheroes-3840x2160-2750.webp',
    tag: 'Iron Man / 2008',
    price: 'Rs. 3,000',
    packageId: 'movie' as const,
    Icon: Play,
  },
  {
    id: 'action',
    eyebrow: '04 / ACTION NIGHT',
    title: 'YOUR NIGHT.\nYOUR CUT.',
    copy: 'Action, sci-fi, thrillers or a full marathon — choose the mood and make the screen the centre of the night.',
    image: '/media/hero/digger-2026-tom-3840x2160-26961.webp',
    tag: 'Action Night',
    price: 'From Rs. 3,000',
    packageId: 'movie' as const,
    Icon: Sparkles,
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking, onExplorePackages }) => {
  const [active, setActive] = useState(0);
  const [heroReady, setHeroReady] = useState(false);
  const slide = slides[active];
  const heroRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setHeroReady(true);
    const section = heroRef.current;
    if (!section || window.matchMedia('(max-width: 1023px)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const render = () => {
      const current = currentRef.current;
      const target = targetRef.current;
      current.x += (target.x - current.x) * 0.075;
      current.y += (target.y - current.y) * 0.075;
      section.style.setProperty('--mouse-x', `${current.x.toFixed(2)}px`);
      section.style.setProperty('--mouse-y', `${current.y.toFixed(2)}px`);
      section.style.setProperty('--spot-x', `${50 + current.x / 4}%`);
      section.style.setProperty('--spot-y', `${50 + current.y / 4}%`);
      frameRef.current = requestAnimationFrame(render);
    };

    const onMove = (event: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      targetRef.current = { x: nx * 18, y: ny * 11 };
    };

    const onLeave = () => { targetRef.current = { x: 0, y: 0 }; };
    section.addEventListener('mousemove', onMove, { passive: true });
    section.addEventListener('mouseleave', onLeave, { passive: true });
    frameRef.current = requestAnimationFrame(render);

    return () => {
      section.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', onLeave);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  useEffect(() => {
    slides.forEach((item) => {
      const img = new Image();
      img.decoding = 'async';
      img.src = item.image;
    });
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setActive((v) => (v + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, []);

  const go = (direction: number) => setActive((v) => (v + direction + slides.length) % slides.length);

  return (
    <section ref={heroRef} id="hero-section" className="relative min-h-screen overflow-hidden bg-[#050505] text-white hero-mouse-stage">
      <div className="absolute inset-0">
        {slides.map((item, index) => (
          <img
            key={item.id}
            src={item.image}
            alt=""
            aria-hidden="true"
            className={`hero-slide-image hero-mouse-layer ${index === active ? 'is-active' : ''}`}
            loading={index === active ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={index === active ? 'high' : 'auto'}
            onError={(event) => {
              event.currentTarget.onerror = null; event.currentTarget.src = '/theater_hall.jpg';
            }}
          />
        ))}
        <div className="hero-vignette" />
        <div className="hero-red-glow hero-mouse-glow" />
        <div className="hero-cursor-light" />
        <div className="hero-grid" />
      </div>

      <div className="relative z-20 h-screen min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-10 flex items-center">
        <div className="w-full grid lg:grid-cols-[1.1fr_.9fr] gap-12 items-center">
          <div className="max-w-3xl">
            <div className={`flex items-center gap-3 mb-7 hero-aos-item ${heroReady ? 'hero-aos-ready' : ''}`}>
              <span className="status-dot" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-bold text-white/60">
                PRIVATE ENTERTAINMENT / REDEFINED
              </span>
            </div>

            <div className="hero-copy-stage overflow-hidden mb-6">
              <p className="text-[#E50914] font-mono text-[11px] tracking-[0.28em] uppercase mb-4 animate-slide-up">
                {slide.eyebrow}
              </p>
              <h1 key={slide.id} className={`hero-title whitespace-pre-line ${heroReady ? 'hero-aos-ready' : ''}`}>
                {slide.title}
              </h1>
            </div>

            <p key={`${slide.id}-copy`} className={`max-w-2xl hero-aos-item ${heroReady ? 'hero-aos-ready' : ''} text-base sm:text-lg lg:text-xl text-white/65 leading-relaxed font-light animate-slide-up`}>
              {slide.copy}
            </p>

            <div className={`mt-9 flex flex-wrap items-center gap-4 animate-slide-up hero-aos-item ${heroReady ? 'hero-aos-ready' : ''}`}>
              <button
                id="hero-book-now-btn"
                onClick={() => onOpenBooking(slide.packageId)}
                className="premium-button group"
              >
                <span>Reserve Your Experience</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={onExplorePackages} className="ghost-button">
                Explore Packages
              </button>
            </div>

            <div className={`mt-10 flex flex-wrap items-center gap-7 text-xs text-white/50 hero-aos-item ${heroReady ? 'hero-aos-ready' : ''}`}>
              <div><strong className="text-white text-base">4.9</strong><span className="ml-2">Guest rating</span></div>
              <div className="h-6 w-px bg-white/15" />
              <div><strong className="text-white text-base">3h</strong><span className="ml-2">Private session</span></div>
              <div className="h-6 w-px bg-white/15" />
              <div><strong className="text-white text-base">3–4</strong><span className="ml-2">Guests</span></div>
            </div>
          </div>

          <div className="hidden lg:block relative min-h-[520px] hero-visual-clean">
            <div className="hero-orbit hero-orbit-one" />
            <div className="hero-orbit hero-orbit-two" />
            <div className="hero-visual-glow" />
            <div className="hero-visual-line hero-visual-line-one" />
            <div className="hero-visual-line hero-visual-line-two" />
            <div className="hero-visual-index">
              <span>THE RIO</span>
              <strong>0{active + 1}</strong>
              <span>/ 0{slides.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6 flex items-end justify-between gap-6">
          <div className="flex gap-2">
            {slides.map((item, index) => (
              <button
                key={item.id}
                aria-label={`Go to ${item.tag}`}
                onClick={() => setActive(index)}
                className={`slider-dot ${index === active ? 'active' : ''}`}
              >
                <span />
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={() => go(-1)} className="slider-arrow" aria-label="Previous slide"><ArrowLeft /></button>
            <button onClick={() => go(1)} className="slider-arrow" aria-label="Next slide"><ArrowRight /></button>
          </div>
        </div>
        <div className="hero-progress"><span key={active} /></div>
      </div>
    </section>
  );
};
