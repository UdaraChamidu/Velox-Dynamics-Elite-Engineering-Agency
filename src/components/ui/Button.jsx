import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  onClick,
  type = 'button',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-250 focus-ring disabled:opacity-50 disabled:cursor-not-allowed btn-shimmer";
  
  const variants = {
    primary: "bg-primary text-primary-foreground hover:glow-md active:scale-95",
    secondary: "bg-secondary text-secondary-foreground hover:glow-md active:scale-95",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground active:scale-95",
    ghost: "text-primary hover:bg-muted active:scale-95",
    danger: "bg-destructive text-destructive-foreground hover:glow-md active:scale-95"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <motion.button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      onClick={onClick}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
