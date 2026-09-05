import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Gamepad2, Zap, Trophy, Flame, Disc, ArrowRight, Monitor } from 'lucide-react';

import fc24Img from '../assets/images/ea_sports_fc24_game_1788632655476.jpg';
import spidermanImg from '../assets/images/superhero_city_game_1788632757889.jpg';
import tekkenImg from '../assets/images/tekken_fighting_game_1788632691154.jpg';
import mk1Img from '../assets/images/mortal_kombat_game_1788632703928.jpg';
import gt7Img from '../assets/images/gran_turismo_racing_game_1788632727011.jpg';
import codImg from '../assets/images/tactical_fps_game_1788632742874.jpg';

interface GamingPageProps {
  onOpenBooking: () => void;
  onNavigate: (path: string) => void;
}

export const GamingPage: React.FC<GamingPageProps> = ({ onOpenBooking, onNavigate }) => {
  const games = [
    {
      title: 'EA Sports FC 24',
      genre: 'Sports / Soccer',
      players: '1-4 Players',
      cover: fc24Img,
      badge: 'Squad Favorite',
      desc: 'HyperMotionV realism, authentic UEFA clubs and local 4-player head-to-head matches.',
    },
    {
      title: 'Marvel Spider-Man 2',
      genre: 'Action / Adventure',
      players: 'Single Player Experience',
      cover: spidermanImg,
      badge: '4K 120Hz VRR',
      desc: 'Near-instant fast travel, haptic web-swinging and dual-hero combat across Queens and Manhattan.',
    },
    {
      title: 'Tekken 8',
      genre: 'Fighting Versus',
      players: '1-2 Players 60FPS',
      cover: tekkenImg,
      badge: 'Competitive Versus',
      desc: 'Unreal Engine 5 destruction, Heat system mechanics and lightning-fast local tournament battles.',
    },
    {
      title: 'Mortal Kombat 1',
      genre: 'Fighting / Action',
      players: '1-2 Players Versus',
      cover: mk1Img,
      badge: 'Kameo Fighters',
      desc: 'Reborn universe fatalities, smooth bone-crushing combo strings and vibrant cinematic arenas.',
    },
    {
      title: 'Gran Turismo 7',
      genre: 'Racing Simulation',
      players: '1-2 Players Split Screen',
      cover: gt7Img,
      badge: 'True HDR Laser',
      desc: 'Over 400 precision-modeled cars with realistic asphalt grip, physics and weather simulation.',
    },
    {
      title: 'Call of Duty: Modern Warfare III / Warzone',
      genre: 'FPS Multiplayer Squad',
      players: 'Squad Multiplayer',
      cover: codImg,
      badge: 'Low-Latency Mode',
      desc: 'Tactical battle royale and squad missions with 3D spatial surround sound for footsteps and reloads.',
    },
  ];

  return (
    <div className="bg-[#090909] min-h-screen text-white selection:bg-[#E50914] selection:text-white">
      <PageHeader
        eyebrow="NEXT-GEN BATTLEGROUND"
        title="PS5 Gaming"
        italicTitle="Lounge"
        description="A dedicated private gaming suite featuring dual PlayStation 5 consoles, 4K 120Hz HDR laser projection, 4 DualSense wireless haptic controllers, and low input latency."
        onBackToHome={() => onNavigate('/')}
        badge="PS5 LOUNGE"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hardware & Spec Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden group hover:border-[#E50914]/50 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#E50914]/20 border border-[#E50914]/30 flex items-center justify-center text-[#ff5b63] mb-6">
              <Monitor className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight">4K 120Hz Laser Display</h3>
            <p className="text-sm text-white/60 mt-2 leading-relaxed">
              Experience silky-smooth 120 frames-per-second gameplay on a massive 150-inch custom acoustic projection screen with HDR10 dynamic range.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden group hover:border-[#E50914]/50 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#E50914]/20 border border-[#E50914]/30 flex items-center justify-center text-[#ff5b63] mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight">Ultra Low Input Lag</h3>
            <p className="text-sm text-white/60 mt-2 leading-relaxed">
              Dedicated Game Mode bypasses post-processing pipelines to provide sub-5 millisecond response times for competitive FIFA and fighting matches.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden group hover:border-[#E50914]/50 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#E50914]/20 border border-[#E50914]/30 flex items-center justify-center text-[#ff5b63] mb-6">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight">4-Player Squad Station</h3>
            <p className="text-sm text-white/60 mt-2 leading-relaxed">
              Equipped with four DualSense wireless controllers featuring progressive adaptive triggers and dynamic haptic vibration feedback.
            </p>
          </div>
        </div>

        {/* Featured Games Section */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#ff5b63]">
                INSTALLED & READY TO PLAY
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mt-1">
                PS5 Game Library
              </h2>
            </div>
            <span className="text-xs font-bold text-white/60 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              50+ Titles on PlayStation Plus
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {games.map((g, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group hover:border-[#E50914]/60 transition-all duration-300 flex flex-col"
              >
                <div className="h-48 overflow-hidden relative bg-neutral-900">
                  <img
                    src={g.cover}
                    alt={g.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider text-[#ff5b63] border border-white/10">
                    {g.players}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{g.genre}</span>
                    <h4 className="text-lg font-black text-white mt-1">{g.title}</h4>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                    <span className="flex items-center gap-1.5"><Disc className="w-3.5 h-3.5 text-[#E50914]" /> Digital 4K Edition</span>
                    <span className="text-white font-bold">Ready</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Squad Pricing Callout Card */}
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 border border-[#E50914]/30 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-[#E50914]/20 border border-[#E50914]/40 px-3 py-1 rounded-full text-xs font-bold text-[#ff5b63] uppercase tracking-wider mb-4">
              <Flame className="w-3.5 h-3.5" />
              <span>Squad Match Setup</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
              Reserve Your 3-Hour Gaming Session
            </h3>
            <p className="text-sm sm:text-base text-white/60 mt-3 leading-relaxed">
              Starting from Rs. 3,500 for up to 3 gamers (Rs. 1,000 per additional guest up to 6). Includes 4 wireless controllers, all games, and private suite lockout.
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="w-full lg:w-auto px-8 py-4 bg-[#E50914] hover:bg-[#c40811] text-white font-black text-xs uppercase tracking-widest rounded-full transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-[#E50914]/30 shrink-0 hover:scale-105"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Book Gaming Session Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
