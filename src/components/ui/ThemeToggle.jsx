import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-14 h-7 rounded-full bg-muted border border-border flex items-center transition-colors ${className}`}
      aria-label="Toggle theme"
    >
      <motion.div
        className="absolute w-6 h-6 rounded-full bg-primary flex items-center justify-center"
        animate={{
          x: theme === 'dark' ? 2 : 30
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {theme === 'dark' ? (
          <Moon className="w-3 h-3 text-primary-foreground" />
        ) : (
          <Sun className="w-3 h-3 text-primary-foreground" />
        )}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
