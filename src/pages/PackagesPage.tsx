import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Film, Gamepad2, Check, ArrowRight, ShieldCheck, Clock, Users, Sparkles, Coffee } from 'lucide-react';

interface PackagesPageProps {
  onOpenBooking: (packageId?: 'movie' | 'ps5') => void;
  onNavigate: (path: string) => void;
}

export const PackagesPage: React.FC<PackagesPageProps> = ({ onOpenBooking, onNavigate }) => {
  return (
    <div className="bg-[#f5f3ef] min-h-screen text-neutral-900 selection:bg-[#E50914] selection:text-white">
      <PageHeader
        eyebrow="EXCLUSIVE PACKAGES"
        title="Curated Private"
        italicTitle="Sessions"
        description="Every package reserves the entire cinema lounge exclusively for you and your group. Zero strangers, studio-grade audio, 4K HDR projection, and ultimate privacy."
        onBackToHome={() => onNavigate('/')}
        badge="PACKAGES & PRICING"
      />

      {/* Main Packages Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Cinema Theater Experience */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-black/10 shadow-xl flex flex-col justify-between relative overflow-hidden group hover:border-[#E50914]/40 transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E50914]/5 rounded-bl-full pointer-events-none" />
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center shadow-lg">
                  <Film className="w-6 h-6 text-[#E50914]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#E50914] bg-[#E50914]/10 px-3 py-1 rounded-full">
                  MOST POPULAR
                </span>
              </div>

              <span className="text-[11px] font-extrabold uppercase tracking-widest text-neutral-400">
                01 / CINEMATIC RETREAT
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-neutral-900 mt-1">
                Private Cinema Theater
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 mt-3 leading-relaxed">
                Immerse yourself in blockbuster movies, binge-worthy series, or personal media on our 150-inch 4K laser projection screen with Dolby Atmos acoustic tuning.
              </p>

              <div className="my-6 p-5 bg-[#f5f3ef] rounded-2xl flex items-baseline justify-between border border-black/5">
                <div>
                  <span className="text-3xl sm:text-4xl font-black text-neutral-900">Rs. 3,000</span>
                  <span className="text-xs font-semibold text-neutral-500 ml-2">/ 3 Hour Session</span>
                </div>
                <span className="text-xs font-bold text-neutral-700 bg-white px-2.5 py-1 rounded-lg border border-black/5">
                  Includes 3 Guests
                </span>
              </div>

              <div className="space-y-3 mb-8">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Included Amenities:</h3>
                {[
                  '150-inch 4K Laser Cinema Screen with HDR10+',
                  'Dolby Atmos 7.1.4 Surround Sound Configuration',
                  'Ultra-Plush Motorized Leather Recliners with Footrests',
                  'Netflix, Prime Video, Disney+, Apple TV & Plex Installed',
                  'Connect your own Laptop / Flash Drive / HDMI Source',
                  'Private Ambient Lighting with Customizable Mood Controls',
                  'Complimentary Mineral Water & Popcorn Bucket',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm font-medium text-neutral-800">
                    <Check className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onOpenBooking('movie')}
              className="w-full py-4 bg-neutral-950 hover:bg-[#E50914] text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg group-hover:shadow-[#E50914]/25"
            >
              <span>Book Cinema Experience</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* PS5 Next-Gen Gaming Lounge */}
          <div className="bg-neutral-950 text-white rounded-3xl p-8 sm:p-10 border border-white/10 shadow-2xl flex flex-col justify-between relative overflow-hidden group hover:border-[#E50914]/40 transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E50914]/15 rounded-bl-full pointer-events-none" />
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center border border-white/10">
                  <Gamepad2 className="w-6 h-6 text-[#E50914]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#ff5961] bg-[#E50914]/20 border border-[#E50914]/30 px-3 py-1 rounded-full">
                  HIGH PERFORMANCE
                </span>
              </div>

              <span className="text-[11px] font-extrabold uppercase tracking-widest text-white/40">
                02 / NEXT-GEN SQUAD BATTLES
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mt-1">
                PS5 Gaming Lounge
              </h2>
              <p className="text-sm sm:text-base text-white/60 mt-3 leading-relaxed">
                Take gaming to the ultimate standard. Dual PlayStation 5 consoles, low-latency 120Hz display setup, and 4 wireless DualSense controllers for intense co-op or versus action.
              </p>

              <div className="my-6 p-5 bg-white/5 rounded-2xl flex items-baseline justify-between border border-white/10">
                <div>
                  <span className="text-3xl sm:text-4xl font-black text-white">Rs. 3,500</span>
                  <span className="text-xs font-semibold text-white/50 ml-2">/ 3 Hour Session</span>
                </div>
                <span className="text-xs font-bold text-white/80 bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
                  Includes 3 Guests
                </span>
              </div>

              <div className="space-y-3 mb-8">
                <h3 className="text-xs font-bold uppercase tracking-wider text-white/40">Included Amenities:</h3>
                {[
                  'PlayStation 5 Console with Ultra-High-Speed NVMe SSD',
                  '4x DualSense Wireless Controllers with Haptic Feedback',
                  'Pre-installed Top Games: EA Sports FC 24, Spider-Man 2, GTA V, Mortal Kombat 1',
                  'Low Latency Gaming Mode (Under 5ms input lag)',
                  'Ultra-wide 4K HDR High-Refresh Display',
                  'PlayStation Plus Deluxe Subscription Library Access',
                  'Complimentary High-Energy Beverages & Snacks',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm font-medium text-white/90">
                    <Check className="w-4 h-4 text-[#E50914] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onOpenBooking('ps5')}
              className="w-full py-4 bg-[#E50914] hover:bg-[#c40811] text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#E50914]/30"
            >
              <span>Book Gaming Session</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Add-ons & Extras Breakdown */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#E50914]">
              CUSTOMIZE YOUR NIGHT
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-neutral-900 mt-2">
              Optional Add-on Enhancements
            </h2>
            <p className="text-sm text-neutral-600 mt-2">
              Select any of these add-ons during the checkout step to upgrade your experience.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Coffee,
                title: 'Jumbo Popcorn & Dip Combo',
                price: 'Rs. 800',
                desc: 'Warm buttered caramel or salted popcorn with cheese and salsa dipping sauces.',
              },
              {
                icon: Sparkles,
                title: 'Soda & Mocktail Bucket',
                price: 'Rs. 650',
                desc: 'Chilled artisanal sparkling sodas, mojitos, and iced energy drinks on ice.',
              },
              {
                icon: Users,
                title: 'Birthday & Anniversary Deco',
                price: 'Rs. 2,000',
                desc: 'Custom mood lighting, celebration banner, party props, and cake serving setup.',
              },
              {
                icon: Clock,
                title: 'Extra 1-Hour Extension',
                price: 'Rs. 1,200',
                desc: 'Extend your reserved slot by 60 minutes for extra movie runtime or gaming rounds.',
              },
            ].map((addon, idx) => {
              const Icon = addon.icon;
              return (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-black/5 shadow-md flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-900 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-[#E50914]" />
                    </div>
                    <h3 className="font-extrabold text-base text-neutral-900">{addon.title}</h3>
                    <p className="text-xs text-neutral-500 mt-2 leading-relaxed">{addon.desc}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-black/5 flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-400">Add-on Price</span>
                    <strong className="text-sm font-black text-[#E50914]">{addon.price}</strong>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Guest Policy & Guarantees */}
        <div className="mt-16 bg-white rounded-3xl p-8 border border-black/10 shadow-sm grid md:grid-cols-3 gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#E50914]/10 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-[#E50914]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-neutral-900 uppercase tracking-wide">Extra Guests</h4>
              <p className="text-xs text-neutral-600 mt-1">Up to 3 guests included in base price. Additional guests can be added for just Rs. 1,000 per person (max 6 total).</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#E50914]/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#E50914]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-neutral-900 uppercase tracking-wide">100% Private Lock</h4>
              <p className="text-xs text-neutral-600 mt-1">The entire room is locked and reserved exclusively for your party during your 3-hour window.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#E50914]/10 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-[#E50914]" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-neutral-900 uppercase tracking-wide">4 Daily Sessions</h4>
              <p className="text-xs text-neutral-600 mt-1">Available slots daily: 10:00 AM, 01:30 PM, 05:00 PM, and 08:30 PM.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
