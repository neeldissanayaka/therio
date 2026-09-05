import React from 'react';
import { ArrowUpRight, Quote, Star } from 'lucide-react';

interface TestimonialsSectionProps {
  onNavigate?: (path: string) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onNavigate }) => {
  const reviews = [
    {
      name: 'Kavindu Perera',
      role: 'PS5 Guest',
      comment: 'Playing FC 24 and Tekken 8 on a huge cinema screen with that Dolby sound was unbelievable. The whole session felt premium.',
      initials: 'KP',
      tone: 'red',
      tilt: '-1.1deg',
    },
    {
      name: 'Dilini & Sachith',
      role: 'Cinema Guests',
      comment: 'We celebrated a birthday with a private Interstellar screening. The privacy, reclining seats and little details made the night unforgettable.',
      initials: 'DS',
      tone: 'cream',
      tilt: '0.8deg',
    },
    {
      name: 'Shenal Fernando',
      role: 'Movie & Gaming',
      comment: 'The sound quality blew us away. Three hours with friends, a massive screen and complete privacy — easily one of the best value experiences.',
      initials: 'SF',
      tone: 'gold',
      tilt: '-0.6deg',
    },
    {
      name: 'Nethmi Silva',
      role: 'Birthday Guest',
      comment: 'The room felt like our own private cinema. Music, movies, food and the atmosphere all came together perfectly for the birthday.',
      initials: 'NS',
      tone: 'black',
      tilt: '1deg',
    },
    {
      name: 'Dilan Fernando',
      role: 'Gaming Guest',
      comment: 'The PS5 setup is seriously next level. Big screen, great sound and zero distractions. We are definitely coming back for another session.',
      initials: 'DF',
      tone: 'rose',
      tilt: '-0.7deg',
    },
  ];

  return (
    <section id="testimonials" className="testimonials-section relative overflow-hidden">
      <div className="testimonials-bg-orb orb-a" />
      <div className="testimonials-bg-orb orb-b" />
      <div className="testimonials-grain" />

      <div className="testimonials-shell testimonials-reference-shell max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <header className="testimonials-reference-heading">
          <div className="testimonial-heading-topline">
            <span className="testimonial-heading-kicker">THE RIO · GUEST BOOK</span>
            <span className="testimonial-heart">♥</span>
          </div>
          <h2>Don’t just take our<br /><span>word for it.</span></h2>
          <p>Real nights. Real reactions. See why guests keep coming back to The Rio.</p>
        </header>

        <div className="testimonial-masonry">
          {reviews.map((review, index) => (
            <article
              key={review.name}
              className={`testimonial-reference-card ${review.tone} ${index === 2 ? 'testimonial-card-center' : ''}`}
              style={{ '--card-tilt': review.tilt } as React.CSSProperties}
            >
              <div className="testimonial-card-top">
                <div className={`testimonial-reference-avatar ${review.tone}`}>{review.initials}</div>
                <div className="testimonial-reference-person">
                  <h3>{review.name}</h3>
                  <p>{review.role}</p>
                </div>
                <div className="testimonial-card-mark">✦</div>
              </div>

              <div className="testimonial-reference-stars" aria-label="5 star review">
                {[1,2,3,4,5].map((n) => <Star key={n} fill="currentColor" />)}
              </div>

              <Quote className="testimonial-reference-quote" />
              <p className="testimonial-reference-copy">{review.comment}</p>

              <div className="testimonial-card-footer">
                <span>VERIFIED GUEST</span>
                <ArrowUpRight />
              </div>
            </article>
          ))}
        </div>

        <div className="testimonial-reference-bottom flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="testimonial-reference-rating">
            <span className="rating-number">4.9</span>
            <div>
              <div className="testimonial-reference-stars small">{[1,2,3,4,5].map((n) => <Star key={n} fill="currentColor" />)}</div>
              <span>From The Rio guests</span>
            </div>
          </div>
          {onNavigate && (
            <button
              onClick={() => onNavigate('/testimonials')}
              className="text-xs font-bold text-[#E50914] hover:text-[#c40811] flex items-center gap-1.5 transition-colors uppercase tracking-wider underline underline-offset-4"
            >
              <span>Read Full Stories & Leave a Review</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}
          <span className="testimonial-reference-note">Every stay leaves a story.</span>
        </div>
      </div>
    </section>
  );
};
