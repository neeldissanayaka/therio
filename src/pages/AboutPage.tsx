import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { ShieldCheck, Volume2, Eye, Award, Heart, Sparkles, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onOpenBooking: () => void;
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking, onNavigate }) => {
  return (
    <div className="bg-[#f5f3ef] min-h-screen text-neutral-900 selection:bg-[#E50914] selection:text-white">
      <PageHeader
        eyebrow="CINEMATIC CRAFTSMANSHIP"
        title="Engineered For"
        italicTitle="Pure Immersion"
        description="The Rio was born out of a simple observation: public theaters have lost their magic. Crowded halls, talking audiences, and rigid schedules. We built an uncompromising private theater where you control the experience."
        onBackToHome={() => onNavigate('/')}
        badge="THE RIO STORY"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Core Pillars Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white rounded-3xl p-8 border border-black/10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#E50914]/10 text-[#E50914] flex items-center justify-center mb-6">
                <Volume2 className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#E50914]">ACOUSTIC EXCELLENCE</span>
              <h3 className="text-2xl font-black uppercase tracking-tight text-neutral-900 mt-1">
                45dB Sound Isolation
              </h3>
              <p className="text-sm text-neutral-600 mt-3 leading-relaxed">
                Multi-layer acoustic fabric paneling and decoupled wall construction eliminate outside traffic noise while delivering punchy bass with zero reverberation.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-black/5 text-xs font-bold text-neutral-500">
              7.1.4 Dolby Atmos Tuned
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-black/10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#E50914]/10 text-[#E50914] flex items-center justify-center mb-6">
                <Eye className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#E50914]">OPTICAL MASTERY</span>
              <h3 className="text-2xl font-black uppercase tracking-tight text-neutral-900 mt-1">
                True 4K Laser Projection
              </h3>
              <p className="text-sm text-neutral-600 mt-3 leading-relaxed">
                High-lumen laser optical engine projecting onto an ambient light rejecting (ALR) 150-inch woven screen for ink-deep blacks and vibrant color reproduction.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-black/5 text-xs font-bold text-neutral-500">
              HDR10+ & Rec.709 Color Profile
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-black/10 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#E50914]/10 text-[#E50914] flex items-center justify-center mb-6">
                <Heart className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#E50914]">COMFORT & PRIVACY</span>
              <h3 className="text-2xl font-black uppercase tracking-tight text-neutral-900 mt-1">
                Motorized Leather Loungers
              </h3>
              <p className="text-sm text-neutral-600 mt-3 leading-relaxed">
                Individual electric recliners with integrated cup holders, USB fast-charging ports, and adjustable headrests engineered for complete body relaxation.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-black/5 text-xs font-bold text-neutral-500">
              Cleaned & Sanitized After Every Session
            </div>
          </div>
        </div>

        {/* Story & Philosophy Section */}
        <div className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-14 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#ff5b63]">
              THE PRIVATE REVOLUTION
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mt-3 leading-[0.95]">
              Designed For Moments That Matter.
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-white/70 mt-6 leading-relaxed">
              <p>
                Whether it is celebrating a milestone birthday, organizing an intimate anniversary screening, or gathering your closest squad for a weekend FIFA tournament, The Rio was crafted to feel personal from the second you step through the door.
              </p>
              <p>
                There are no tickets, no queues, and no strangers in your row. Just you, your favorite film or game, and pristine audiovisual fidelity.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4 items-center">
              <button
                onClick={onOpenBooking}
                className="px-8 py-3.5 bg-[#E50914] hover:bg-[#c40811] text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 flex items-center gap-2 shadow-lg shadow-[#E50914]/30"
              >
                <span>Book Your Session</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('/packages')}
                className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 border border-white/10"
              >
                <span>View Packages</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
