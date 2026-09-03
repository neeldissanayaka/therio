import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Gamepad2, Tv, Users2, Zap } from 'lucide-react';
import { Reveal } from './Reveal';

interface GamingSectionProps { onBookGaming: () => void; }

const slides = [
  {
    image: '/media/gaming/grand-theft-auto-vi-3840x2160-26939.webp',
    eyebrow: '01 / GRAND THEFT AUTO VI',
    title: 'VICE CITY.\nFULL THROTTLE.',
    text: 'Step into a neon-soaked open world and make the big screen your private Vice City playground.',
  },
  {
    image: '/media/gaming/forza-horizon-6-3840x2160-25224.webp',
    eyebrow: '02 / FORZA HORIZON 6',
    title: 'RACE THE NIGHT.',
    text: 'High-speed Japanese streets, supercars and huge momentum — built for a proper 4K racing session.',
  },
  {
    image: '/media/gaming/grid-legends-racing-3840x2160-10156.webp',
    eyebrow: '03 / ASPHALT LEGENDS',
    title: 'NITRO.\nNO BRAKES.',
    text: 'Arcade speed, neon tracks and ridiculous overtakes. Turn the room into your own racing arena.',
  },
  {
    image: '/media/gaming/italian-passion-car-3840x2160-26953.webp',
    eyebrow: '04 / FORZA HORIZON 6',
    title: 'CHASE THE\nHORIZON.',
    text: 'Festival lights, mountain roads and full-screen motion — made for competitive nights with the crew.',
  },
  {
    image: '/media/gaming/the-walking-dead-3840x2160-15719.webp',
    eyebrow: '05 / THE WALKING DEAD',
    title: 'SURVIVE\nTOGETHER.',
    text: 'Switch the mood from racing to survival with a darker, story-driven session that pulls everyone in.',
  },
];

const gamesList = ['EA SPORTS FC 24', 'Tekken 8', 'Spider-Man 2', 'Mortal Kombat 1', 'Gran Turismo 7', 'Call of Duty: MW3'];

export const GamingSection: React.FC<GamingSectionProps> = ({ onBookGaming }) => {
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const gamingRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setReady(true);
    const section = gamingRef.current;
    if (!section || window.matchMedia('(max-width: 1023px)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const render = () => {
      const current = currentRef.current;
      const target = targetRef.current;
      current.x += (target.x - current.x) * 0.07;
      current.y += (target.y - current.y) * 0.07;
      section.style.setProperty('--gaming-mouse-x', `${current.x.toFixed(2)}px`);
      section.style.setProperty('--gaming-mouse-y', `${current.y.toFixed(2)}px`);
      section.style.setProperty('--gaming-spot-x', `${50 + current.x / 3}%`);
      section.style.setProperty('--gaming-spot-y', `${50 + current.y / 3}%`);
      frameRef.current = requestAnimationFrame(render);
    };

    const onMove = (event: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      targetRef.current = { x: nx * 22, y: ny * 13 };
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
    const timer = window.setInterval(() => setActive((v) => (v + 1) % slides.length), 6000);
    return () => window.clearInterval(timer);
  }, []);

  const next = () => setActive((v) => (v + 1) % slides.length);
  const prev = () => setActive((v) => (v - 1 + slides.length) % slides.length);

  return (
    <section ref={gamingRef} id="gaming" className="relative min-h-screen overflow-hidden bg-[#050505] text-white border-y border-white/10 gaming-section gaming-mouse-stage">
      {slides.map((slide, i) => (
        <div key={slide.title} className={`gaming-slide gaming-mouse-layer ${i === active ? 'is-active' : ''}`}>
          <img
            src={slide.image}
            alt=""
            loading={i === active ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={i === active ? 'high' : 'auto'}
            onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = '/ps5_lounge.jpg'; }}
          />
        </div>
      ))}
      <div className="gaming-overlay" />
      <div className="gaming-cursor-light" />
      <div className="absolute inset-0 gaming-noise pointer-events-none" />

      <div className="relative z-10 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 flex items-center">
        <div className="w-full">
          <Reveal direction="left" className="gaming-reveal">
            <div className="section-kicker"><Gamepad2 className="w-3.5 h-3.5" /> Next-Gen PlayStation 5 Arena</div>
            <div className="mt-6 gaming-copy-stage">
              <div className="gaming-copy-key" key={active}>
                <div className="text-[.62rem] tracking-[.24em] font-extrabold text-[#ff646b]">{slides[active].eyebrow}</div>
                <h2 className="display-heading text-white mt-4">{slides[active].title}</h2>
                <p className="mt-6 text-white/65 max-w-xl text-sm sm:text-base leading-relaxed">{slides[active].text}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button onClick={onBookGaming} className="premium-button group">
                Book PS5 Arena
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="gaming-price"><span>3 HOURS</span><strong>Rs. 3,500</strong></div>
            </div>
          </Reveal>

          <div className="gaming-slide-controls" aria-label="Gaming slides">
            <button className="gaming-nav gaming-nav-prev" onClick={prev} aria-label="Previous gaming slide"><ArrowLeft /></button>
            <div className="gaming-progress">
              {slides.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} className={i === active ? 'is-active' : ''} aria-label={`Go to slide ${i + 1}`} />
              ))}
            </div>
            <button className="gaming-nav gaming-nav-next" onClick={next} aria-label="Next gaming slide"><ArrowRight /></button>
          </div>

          <div className="gaming-feature-strip gaming-aos-loop">
            {[
              { icon: Tv, title: '4K / 120Hz' },
              { icon: Users2, title: '4 DualSense' },
              { icon: Zap, title: 'Low Latency' },
            ].map(({ icon: Icon, title }) => <div key={title}><Icon />{title}</div>)}
          </div>
        </div>
      </div>
    </section>
  );
};
