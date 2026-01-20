import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const StatsCounter = () => {
  const stats = [
    { id: 1, end: 150, suffix: '+', label: 'Projects Completed', icon: '🚀' },
    { id: 2, end: 50, suffix: '+', label: 'Happy Clients', icon: '😊' },
    { id: 3, end: 8, suffix: '+', label: 'Years Experience', icon: '⭐' },
    { id: 4, end: 99, suffix: '%', label: 'Client Satisfaction', icon: '💯' }
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);
          
          stats.forEach((stat, index) => {
            let current = 0;
            const increment = stat.end / 50;
            const timer = setInterval(() => {
              current += increment;
              if (current >= stat.end) {
                setCounts(prev => {
                  const newCounts = [...prev];
                  newCounts[index] = stat.end;
                  return newCounts;
                });
                clearInterval(timer);
              } else {
                setCounts(prev => {
                  const newCounts = [...prev];
                  newCounts[index] = Math.floor(current);
                  return newCounts;
                });
              }
            }, 30);
          });
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('stats-counter');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section id="stats-counter" className="py-20 bg-muted/20 border-y border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Trusted by Businesses Worldwide
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Our numbers speak for themselves
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-lg bg-card border border-border hover:border-primary transition-all group"
            >
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {counts[index]}{stat.suffix}
              </div>
              <div className="text-sm md:text-base text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
