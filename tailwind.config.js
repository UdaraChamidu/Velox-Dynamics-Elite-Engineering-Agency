/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', // slate-700
        input: 'var(--color-input)', // slate-800
        ring: 'var(--color-ring)', // purple-500
        background: 'var(--color-background)', // gray-950
        foreground: 'var(--color-foreground)', // slate-50
        primary: {
          DEFAULT: 'var(--color-primary)', // purple-500
          foreground: 'var(--color-primary-foreground)', // slate-900
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // pink-500
          foreground: 'var(--color-secondary-foreground)', // slate-50
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // red-500
          foreground: 'var(--color-destructive-foreground)', // slate-50
        },
        muted: {
          DEFAULT: 'var(--color-muted)', // slate-800
          foreground: 'var(--color-muted-foreground)', // slate-400
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // emerald-500
          foreground: 'var(--color-accent-foreground)', // slate-900
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // slate-900
          foreground: 'var(--color-popover-foreground)', // slate-50
        },
        card: {
          DEFAULT: 'var(--color-card)', // slate-900
          foreground: 'var(--color-card-foreground)', // slate-50
        },
        success: {
          DEFAULT: 'var(--color-success)', // emerald-500
          foreground: 'var(--color-success-foreground)', // slate-900
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // amber-500
          foreground: 'var(--color-warning-foreground)', // slate-900
        },
        error: {
          DEFAULT: 'var(--color-error)', // red-500
          foreground: 'var(--color-error-foreground)', // slate-50
        },
      },
      borderRadius: {
        sm: 'var(--radius-sm)', // 6px
        md: 'var(--radius-md)', // 12px
        lg: 'var(--radius-lg)', // 18px
        xl: 'var(--radius-xl)', // 24px
      },
      fontFamily: {
        heading: ['Orbitron', 'sans-serif'],
        body: ['Source Sans 3', 'sans-serif'],
        caption: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      boxShadow: {
        'glow-sm': '0 0 8px rgba(168, 85, 247, 0.1)',
        'glow-md': '0 0 16px rgba(168, 85, 247, 0.2)',
        'glow-lg': '0 0 24px rgba(168, 85, 247, 0.3)',
        'glow-xl': '0 0 32px rgba(168, 85, 247, 0.4)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '250': '250ms',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -10px, 0)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 8px rgba(168, 85, 247, 0.2)' },
          '50%': { boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' },
        },
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}