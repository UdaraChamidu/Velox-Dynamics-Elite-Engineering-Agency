import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = true,
  glow = false,
  ...props 
}) => {
  const baseStyles = "bg-card border-2 border-primary/20 text-card-foreground rounded-xl border border-border transition-all duration-250";
  const hoverStyles = hover ? "hover:border-primary hover:border-2  hover:glow-md hover:-translate-y-1" : "";
  const glowStyles = glow ? "glow-md" : "";

  return (
    <motion.div
      className={`${baseStyles} ${hoverStyles} ${glowStyles} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
