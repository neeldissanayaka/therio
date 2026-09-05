import React from 'react';
import { ShieldCheck, Volume2, Armchair, Coffee, ArrowUpRight, Star, Sparkles } from 'lucide-react';

interface AboutSectionProps {
  onNavigate?: (path: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  const highlights = [
    { icon: Armchair, title: 'Plush Recliners', desc: 'Deep-recline VIP seating with cup holders and food trays.' },
    { icon: Volume2, title: 'Dolby Atmos', desc: 'Immersive acoustics tuned for blockbuster impact.' },
    { icon: ShieldCheck, title: '100% Private', desc: 'Your own cinema suite. No strangers. No interruptions.' },
    { icon: Coffee, title: 'Food & Drinks', desc: 'Popcorn, hot bites, iced coffees, mocktails and more.' },
  ];

  return (
    <section id="about" className="about-modern-section relative overflow-hidden border-t border-black/[0.06]">
      <div className="about-modern-orb about-orb-one" />
      <div className="about-modern-orb about-orb-two" />
      <div className="about-shell max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="about-modern-grid">
          <div className="about-collage">
            <div className="about-photo about-photo-main group">
              <img src="/theater_hall.jpg" alt="The Rio private cinema hall" />
              <div className="about-photo-shade" />
              <div className="about-photo-caption">
                <span>THE RIO</span>
                <b>PRIVATE CINEMA</b>
              </div>
            </div>

            <div className="about-photo about-photo-secondary group">
              <img src="/ps5_lounge.jpg" alt="The Rio PS5 lounge" />
              <div className="about-photo-shade" />
              <div className="about-photo-caption compact"><span>PS5</span><b>GAME LOUNGE</b></div>
            </div>

            <div className="about-stat-card">
              <div className="about-stat-top"><span>Guest experience</span><ArrowUpRight /></div>
              <strong>4.9<span>/5</span></strong>
              <div className="about-stars">{[1,2,3,4,5].map((n) => <Star key={n} fill="currentColor" />)}</div>
              <p>Rated by guests who came for movies, gaming and unforgettable nights.</p>
            </div>

            <div className="about-mini-card">
              <Sparkles />
              <span>PRIVATE<br /><b>BY DESIGN</b></span>
            </div>
          </div>

          <div className="about-copy">
            <span className="about-kicker">A PRIVATE CINEMA EXPERIENCE</span>
            <h2>Made for nights<br /><em>worth remembering.</em></h2>
            <p className="about-lead">
              The Rio brings cinema, gaming and comfort together in one private space — built for dates,
              birthdays, friend groups and serious game nights.
            </p>
            <p className="about-body">
              From the first frame to the final match, every detail is designed to feel effortless, intimate
              and a little more special than a regular night out.
            </p>

            <div className="about-feature-grid">
              {highlights.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="about-feature-card">
                  <div className="about-feature-icon"><Icon /></div>
                  <div><h3>{title}</h3><p>{desc}</p></div>
                </div>
              ))}
            </div>

            <div className="about-bottom-line flex items-center justify-between">
              <span>PRIVATE BY DESIGN</span>
              {onNavigate ? (
                <button
                  onClick={() => onNavigate('/about')}
                  className="text-xs font-bold text-[#E50914] hover:text-[#c40811] flex items-center gap-1.5 transition-colors uppercase tracking-wider underline underline-offset-4"
                >
                  <span>Explore Acoustic Specs & Story</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <>
                  <span className="about-line" />
                  <span>BOOK YOUR PRIVATE NIGHT</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
