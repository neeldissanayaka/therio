import React, { useState } from 'react';
import { ArrowRight, Check, Film, Gamepad2, Sparkles } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [experience, setExperience] = useState('Cinema');

  const options = [
    { label: 'Cinema', icon: Film, desc: 'Private screening' },
    { label: 'PS5', icon: Gamepad2, desc: 'Squad session' },
    { label: 'Celebration', icon: Sparkles, desc: 'Make it special' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4500);
  };

  return (
    <section id="contact" className="contact-v18-section relative overflow-hidden">
      <div className="contact-v18-glow contact-v18-glow-a" />
      <div className="contact-v18-glow contact-v18-glow-b" />
      <div className="contact-v18-shell max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="contact-v18-topline">
          <span>06 / START SOMETHING</span>
          <span className="contact-v18-rule" />
          <span>NO SMALL TALK</span>
        </div>

        <div className="contact-v18-grid">
          <div className="contact-v18-copy">
            <span className="contact-v18-kicker">YOUR NEXT SCENE</span>
            <h2>Make it a night<br /><em>worth replaying.</em></h2>
            <p>Pick the mood. Shape the session. The interface does the rest — quick, clear and designed to keep the experience feeling premium from the first click.</p>

            <div className="contact-v18-choice-row">
              {options.map(({ label, icon: Icon, desc }) => (
                <button key={label} type="button" onClick={() => setExperience(label)} className={`contact-v18-choice ${experience === label ? 'is-active' : ''}`}>
                  <Icon />
                  <span><b>{label}</b><small>{desc}</small></span>
                </button>
              ))}
            </div>

            <div className="contact-v18-manifesto">
              <span>01</span><p>One private space.</p>
              <span>02</span><p>Your people.</p>
              <span>03</span><p>Your rules.</p>
            </div>
          </div>

          <div className="contact-v18-card">
            <div className="contact-v18-card-head">
              <div><span>QUICK BRIEF</span><h3>Tell us the vibe.</h3></div>
              <span className="contact-v18-live"><i /> READY</span>
            </div>

            {submitted ? (
              <div className="contact-v18-success">
                <div className="contact-v18-success-icon"><Check /></div>
                <span>BRIEF RECEIVED</span>
                <h4>Perfect. We have the mood.</h4>
                <p>Your {experience.toLowerCase()} session has been staged for the next step.</p>
                <button type="button" onClick={() => setSubmitted(false)}>Edit brief <ArrowRight /></button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-v18-form">
                <label><span>NAME</span><input required value={name} onChange={(e) => setName(e.target.value)} placeholder="What should we call you?" /></label>
                <div className="contact-v18-form-label"><span>EXPERIENCE</span><b>{experience}</b></div>
                <label><span>THE PLAN</span><textarea required rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Date, group size, movie, game, celebration idea..." /></label>
                <button type="submit">Build My Session <ArrowRight /></button>
              </form>
            )}
            <div className="contact-v18-note">No phone. No location fields. Just the experience.</div>
          </div>
        </div>
      </div>
    </section>
  );
};
