import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Star, Quote, ArrowRight, CheckCircle2, Heart } from 'lucide-react';

interface TestimonialsPageProps {
  onOpenBooking: () => void;
  onNavigate: (path: string) => void;
}

export const TestimonialsPage: React.FC<TestimonialsPageProps> = ({ onOpenBooking, onNavigate }) => {
  const reviews = [
    {
      name: 'Kavindu Perera',
      role: 'Private Birthday Screening',
      stars: 5,
      date: '2 days ago',
      quote: 'Booked the cinema theater for my fiancée’s surprise birthday. The setup, decor, and acoustic quality blew us away. Having the entire place to ourselves was unbeatable.',
      package: 'Cinema Package + Birthday Deco',
    },
    {
      name: 'Tharindu Fernando',
      role: 'FIFA 24 Squad Tournament',
      stars: 5,
      date: '1 week ago',
      quote: 'Best gaming experience in Sri Lanka. 4 controllers, 120Hz display with zero lag. We played for 3 hours non-stop and immediately booked again for next month.',
      package: 'PS5 Gaming Lounge',
    },
    {
      name: 'Shenali & Dilan',
      role: 'Anniversary Movie Night',
      stars: 5,
      date: '2 weeks ago',
      quote: 'The motorized recliners are so comfortable you never want to get up. The 4K laser picture quality is far crisper than any commercial cinema in Colombo.',
      package: 'Private Cinema Experience',
    },
    {
      name: 'Avishka Mendis',
      role: 'Marvel Movie Marathon',
      stars: 5,
      date: '3 weeks ago',
      quote: 'Brought our own flash drive and connected it directly to their media station. Sound quality was theater-grade. The staff gave us 100% privacy.',
      package: 'Private Cinema Theater',
    },
    {
      name: 'Ruchira Silva',
      role: 'Weekend Gaming Session',
      stars: 5,
      date: '1 month ago',
      quote: 'The popcorn and drink bucket were delicious. The booking process was super smooth and confirmed within seconds. Highly recommend!',
      package: 'PS5 Lounge + Jumbo Popcorn',
    },
    {
      name: 'Nipuni Jayasuriya',
      role: 'Family Movie Afternoon',
      stars: 5,
      date: '1 month ago',
      quote: 'We took our kids for an animated movie screening. Safe, clean, and private. No noisy crowds or sticky seats. Truly 5-star hospitality.',
      package: 'Private Cinema Experience',
    },
  ];

  return (
    <div className="bg-[#f5f3ef] min-h-screen text-neutral-900 selection:bg-[#E50914] selection:text-white">
      <PageHeader
        eyebrow="UNFILTERED GUEST STORIES"
        title="Loved By"
        italicTitle="Every Visitor"
        description="Read authentic feedback and experiences from guests who chose The Rio for their birthdays, gaming tournaments, anniversaries, and movie nights."
        onBackToHome={() => onNavigate('/')}
        badge="4.9 / 5.0 RATING"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Rating Overview Banner */}
        <div className="bg-white rounded-3xl p-8 border border-black/10 shadow-sm mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="text-4xl sm:text-5xl font-black text-neutral-900 tracking-tight">4.9</div>
            <div>
              <div className="flex items-center gap-1 text-[#E50914]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-xs font-semibold text-neutral-500 mt-1 block">
                Based on 250+ private sessions
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-neutral-700 bg-[#f5f3ef] px-4 py-2.5 rounded-full border border-black/5">
            <CheckCircle2 className="w-4 h-4 text-[#E50914]" />
            <span>100% Verified Guest Reviews</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-black/10 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1 text-[#E50914]">
                    {[...Array(r.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{r.date}</span>
                </div>

                <p className="text-sm text-neutral-700 leading-relaxed italic">
                  "{r.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-black/5">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-sm text-neutral-900">{r.name}</h4>
                    <span className="text-xs text-neutral-500 block">{r.role}</span>
                  </div>
                </div>
                <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-[#E50914] bg-[#E50914]/5 px-2.5 py-1 rounded-md inline-block">
                  {r.package}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-neutral-950 text-white rounded-3xl p-10 sm:p-12 border border-white/10 shadow-2xl">
          <h3 className="text-3xl font-black uppercase tracking-tight">Ready to create your own scene?</h3>
          <p className="text-sm text-white/60 mt-2 max-w-xl mx-auto">
            Book a 3-hour private cinema or PS5 gaming session today with instant online confirmation.
          </p>
          <button
            onClick={onOpenBooking}
            className="mt-6 px-8 py-3.5 bg-[#E50914] hover:bg-[#c40811] text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 inline-flex items-center gap-2 shadow-lg shadow-[#E50914]/30"
          >
            <span>Start Your Booking</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
