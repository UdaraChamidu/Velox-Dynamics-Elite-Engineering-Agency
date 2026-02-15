import React from 'react';
import Card from './Card';

const TestimonialMarquee = ({ testimonials }) => {
  // Triple the array for smoother infinite loop with enough content
  const tripleTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <div className="relative overflow-hidden py-10">
      {/* Gradient Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="flex animate-marquee-slow hover:[animation-play-state:paused]">
        {tripleTestimonials.map((testimonial, i) => (
          <div
            key={`${testimonial.id}-${i}`}
            className="flex-shrink-0 w-[400px] mx-4"
          >
            <Card className="h-full p-8 hover:border-primary/50 transition-colors duration-300">
              <div className="text-4xl text-primary/50 mb-4 font-serif">"</div>
              <p className="text-muted-foreground mb-6 line-clamp-4 leading-relaxed">
                {testimonial.content}
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-sm">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee-slow {
          animation: marquee-slow 60s linear infinite;
          width: max-content;
        }
      `}</style>
    </div>
  );
};

export default TestimonialMarquee;
