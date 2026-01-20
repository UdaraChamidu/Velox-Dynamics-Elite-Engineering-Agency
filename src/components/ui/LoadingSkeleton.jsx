import React from 'react';
import { motion } from 'framer-motion';

const LoadingSkeleton = ({ variant = 'card', count = 1, className = '' }) => {
  const variants = {
    card: (
      <div className={`bg-card border border-border rounded-lg p-6 space-y-4 ${className}`}>
        <div className="w-16 h-16 bg-gradient-to-r from-muted/50 to-muted rounded-lg animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 bg-gradient-to-r from-muted/50 to-muted rounded animate-pulse w-3/4" />
          <div className="h-4 bg-gradient-to-r from-muted/50 to-muted rounded animate-pulse w-full" />
          <div className="h-4 bg-gradient-to-r from-muted/50 to-muted rounded animate-pulse w-5/6" />
        </div>
      </div>
    ),
    text: (
      <div className={`space-y-2 ${className}`}>
        <div className="h-4 bg-gradient-to-r from-muted/50 to-muted rounded animate-pulse w-full" />
        <div className="h-4 bg-gradient-to-r from-muted/50 to-muted rounded animate-pulse w-5/6" />
        <div className="h-4 bg-gradient-to-r from-muted/50 to-muted rounded animate-pulse w-4/6" />
      </div>
    ),
    avatar: (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="w-12 h-12 bg-gradient-to-r from-muted/50 to-muted rounded-full animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gradient-to-r from-muted/50 to-muted rounded animate-pulse w-1/3" />
          <div className="h-3 bg-gradient-to-r from-muted/50 to-muted rounded animate-pulse w-1/4" />
        </div>
      </div>
    ),
    list: (
      <div className={`space-y-3 ${className}`}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-muted/50 to-muted rounded animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-3 bg-gradient-to-r from-muted/50 to-muted rounded animate-pulse w-3/4" />
              <div className="h-3 bg-gradient-to-r from-muted/50 to-muted rounded animate-pulse w-1/2" />
            </div>
          </div>
        ))}
      </div>
    ),
    image: (
      <div className={`aspect-video bg-gradient-to-r from-muted/50 to-muted rounded-lg animate-pulse ${className}`} />
    )
  };

  return (
    <div aria-busy="true" aria-label="Loading content">
      {[...Array(count)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          {variants[variant]}
        </motion.div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
