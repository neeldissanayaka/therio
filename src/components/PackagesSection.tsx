import React from 'react';
import { Film, Gamepad2, Check, Clock, Users, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';
import { PACKAGES } from '../data/packagesData';

interface PackagesSectionProps {
  onSelectPackage: (packageId: 'movie' | 'ps5') => void;
  onNavigate?: (path: string) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onSelectPackage, onNavigate }) => {
  return (
    <section id="packages" className="pricing-section relative overflow-hidden border-t border-black/[0.06]">
      <div className="pricing-orb pricing-orb-one" />
      <div className="pricing-orb pricing-orb-two" />

      <div className="pricing-shell max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="pricing-heading">
          <div className="pricing-eyebrow">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simple pricing • private experience</span>
          </div>
          <h2>
            One booking.
            <span> An unforgettable night.</span>
          </h2>
          <p>
            Pick your private cinema or PS5 session. Every package is designed for a small group,
            premium comfort and zero distractions.
          </p>
        </div>

        <div className="pricing-trust-row">
          <div><ShieldCheck /><span>Private sessions</span></div>
          <i />
          <div><Clock /><span>3 hour experience</span></div>
          <i />
          <div><Users /><span>Up to 3 guests included</span></div>
        </div>

        <div className="pricing-grid">
          {PACKAGES.map((pkg, idx) => {
            const isMovie = pkg.id === 'movie';
            const Icon = isMovie ? Film : Gamepad2;
            const accent = isMovie ? 'Cinema' : 'Gaming';

            return (
              <article
                key={pkg.id}
                id={`package-card-${pkg.id}`}
                className={`pricing-card ${pkg.popular ? 'pricing-card-featured' : ''}`}
              >
                {pkg.badge && <div className="pricing-badge">{pkg.badge}</div>}

                <div className="pricing-card-top">
                  <div className="pricing-icon"><Icon /></div>
                  <div>
                    <span className="pricing-kicker">0{idx + 1} / {accent}</span>
                    <h3>{isMovie ? 'Private Cinema' : 'PS5 Gaming Lounge'}</h3>
                    <p>{pkg.duration} · {pkg.paxIncluded} guests</p>
                  </div>
                </div>

                <div className="pricing-price-row">
                  <div>
                    <span className="pricing-currency">LKR</span>
                    <strong>{pkg.priceLKR.toLocaleString()}</strong>
                  </div>
                  <span className="pricing-total">net total</span>
                </div>

                <p className="pricing-description">{pkg.description}</p>

                <div className="pricing-divider" />

                <div className="pricing-feature-title">What's included</div>
                <ul className="pricing-features">
                  {pkg.features.slice(0, 5).map((feature, i) => (
                    <li key={i}>
                      <span><Check /></span>
                      <p>{feature}</p>
                    </li>
                  ))}
                </ul>

                <button
                  id={`book-package-btn-${pkg.id}`}
                  onClick={() => onSelectPackage(pkg.id)}
                  className="pricing-cta"
                >
                  <span>Book {isMovie ? 'Cinema' : 'Gaming'}</span>
                  <ArrowUpRight />
                </button>
              </article>
            );
          })}
        </div>

        <div className="pricing-footnote flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <span>Extra guest: <b>Rs. 1,000 / person</b></span>
            <span>Snacks & drinks available inside the lounge</span>
          </div>
          {onNavigate && (
            <button
              onClick={() => onNavigate('/packages')}
              className="text-xs font-bold text-[#E50914] hover:text-[#c40811] flex items-center gap-1.5 transition-colors uppercase tracking-wider underline underline-offset-4"
            >
              <span>View Full Packages & In-Depth Comparison</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
