import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  italicTitle?: string;
  description: string;
  onBackToHome: () => void;
  badge?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  italicTitle,
  description,
  onBackToHome,
  badge = 'THE RIO / 2026',
}) => {
  return (
    <div className="pt-28 pb-12 sm:pt-36 sm:pb-16 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white relative overflow-hidden border-b border-white/10">
      {/* Ambient background glow */}
      <div className="absolute -top-24 right-1/4 w-96 h-96 bg-[#E50914]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-white/60 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Main Experience</span>
          </button>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#E50914] bg-[#E50914]/10 border border-[#E50914]/20 px-3 py-1 rounded-full">
            {badge}
          </span>
        </div>

        <div className="max-w-3xl">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#ff5b63]">
            {eyebrow}
          </span>
          <h1 className="mt-3 text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
            {title} {italicTitle && <em className="font-serif italic font-normal normal-case">{italicTitle}</em>}
          </h1>
          <p className="mt-5 text-base sm:text-lg text-white/60 leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
