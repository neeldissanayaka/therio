import React, { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Film, Gamepad2, Sparkles, Check, ArrowRight, Clock, MapPin, Mail, Phone, ShieldCheck } from 'lucide-react';

interface ContactPageProps {
  onOpenBooking: () => void;
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenBooking, onNavigate }) => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [experience, setExperience] = useState('Cinema');

  const options = [
    { label: 'Cinema', icon: Film, desc: 'Private screening' },
    { label: 'PS5', icon: Gamepad2, desc: 'Squad session' },
    { label: 'Celebration', icon: Sparkles, desc: 'Birthday / Anniversary' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="bg-[#f5f3ef] min-h-screen text-neutral-900 selection:bg-[#E50914] selection:text-white">
      <PageHeader
        eyebrow="DIRECT CONCIERGE"
        title="Custom Session"
        italicTitle="Planning"
        description="Have a specific film, game tournament, or custom celebration idea in mind? Send your brief to our concierge team or proceed directly to instant online booking."
        onBackToHome={() => onNavigate('/')}
        badge="CONCIERGE DESK"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Information & FAQ */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-black/10 shadow-sm">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#E50914]">
                INSTANT RESERVATIONS
              </span>
              <h3 className="text-2xl font-black uppercase tracking-tight text-neutral-900 mt-1">
                Prefer Instant Booking?
              </h3>
              <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
                Skip the inquiry form and instantly lock in your desired date and time slot with secure PayHere checkout.
              </p>
              <button
                onClick={onOpenBooking}
                className="mt-6 w-full py-3.5 bg-[#E50914] hover:bg-[#c40811] text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#E50914]/25"
              >
                <span>Launch Booking Engine</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-neutral-900 text-white rounded-3xl p-8 border border-white/10 shadow-xl">
              <h4 className="text-lg font-black uppercase tracking-tight mb-4 text-white">Experience Highlights</h4>
              <div className="space-y-4 text-xs font-medium text-white/70">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#E50914] shrink-0" />
                  <span>3-Hour Standard Session Duration (Extension available)</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#E50914] shrink-0" />
                  <span>100% Private Lockout (No other guests inside)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Film className="w-4 h-4 text-[#E50914] shrink-0" />
                  <span>Bring any movie / game or use pre-installed streaming</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Brief Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-black/10 shadow-xl">
            <div className="flex items-center justify-between pb-6 border-b border-black/10">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">PLAN YOUR SCENE</span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900 mt-1">
                  Tell Us The Vibe
                </h3>
              </div>
              <span className="text-xs font-bold text-[#E50914] bg-[#E50914]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                ACTIVE
              </span>
            </div>

            {submitted ? (
              <div className="py-16 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#E50914] text-white flex items-center justify-center shadow-lg shadow-[#E50914]/30 mb-4">
                  <Check className="w-8 h-8" />
                </div>
                <span className="text-xs font-extrabold text-[#E50914] uppercase tracking-widest">BRIEF RECEIVED</span>
                <h4 className="text-2xl font-black text-neutral-900 mt-2">We Have Your Details!</h4>
                <p className="text-sm text-neutral-600 mt-2 max-w-sm">
                  Our concierge coordinator will review your request and get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-xs uppercase tracking-widest font-bold text-neutral-700 underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                {/* Experience selector */}
                <div>
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-500 block mb-2">
                    SELECT EXPERIENCE TYPE
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {options.map(({ label, icon: Icon, desc }) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setExperience(label)}
                        className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                          experience === label
                            ? 'border-[#E50914] bg-[#E50914]/5 text-[#E50914]'
                            : 'border-black/10 hover:border-black/20 text-neutral-700'
                        }`}
                      >
                        <Icon className="w-4 h-4 mb-2" />
                        <div>
                          <b className="text-xs font-black block">{label}</b>
                          <small className="text-[9px] text-neutral-500 block">{desc}</small>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-500 block mb-1.5">
                      YOUR NAME *
                    </label>
                    <input
                      required
                      type="text"
                      maxLength={80}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="What should we call you?"
                      className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[#f5f3ef] text-sm text-neutral-900 focus:outline-none focus:border-[#E50914] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-500 block mb-1.5">
                      CONTACT NUMBER *
                    </label>
                    <input
                      required
                      type="tel"
                      maxLength={30}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 077 123 4567"
                      className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[#f5f3ef] text-sm text-neutral-900 focus:outline-none focus:border-[#E50914] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-500 block mb-1.5">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    required
                    type="email"
                    maxLength={254}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Where should we send details?"
                    className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[#f5f3ef] text-sm text-neutral-900 focus:outline-none focus:border-[#E50914] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-500 block mb-1.5">
                    YOUR SESSION PLAN / QUESTIONS *
                  </label>
                  <textarea
                    required
                    maxLength={500}
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Preferred date, movie title, game tournament setup, celebration ideas..."
                    className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[#f5f3ef] text-sm text-neutral-900 focus:outline-none focus:border-[#E50914] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-neutral-950 hover:bg-[#E50914] text-white font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Submit Custom Brief</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
