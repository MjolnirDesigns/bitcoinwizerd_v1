/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import aspectRatio from '@tailwindcss/aspect-ratio';
import tailwindcssAnimate from 'tailwindcss-animate';

const config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Consolidated app directory
    './components/**/*.{js,ts,jsx,tsx,mdx}', // Consolidated components
    './lib/**/*.{js,ts,jsx,tsx,mdx}', // Kept lib directory
    './src/styles/**/*.css', // Fixed glob pattern for CSS files
  ],
  theme: {
    extend: {
      colors: {
        'crown-chakra': '#8400ff',
        'mystic-blue': '#0033ff',
        'wizerd-blue': '#33ccff',
        'alien-green': '#33e000',
        'cyber-yellow': '#ffff00',
        'bitcoin-light': '#ffbb00',
        'bitcoin-orange': '#ff9900',
        'bitcoin-dark': '#ff7700',
        'punk-pink': '#ff33cc',
        'blood-red': '#d90000',
        'crimson-darkred': '#880000',
        'storm-grey': '#919191',
        'wizerd-grey': '#393939',
        'wizerd-darkgrey': '#2b2b2b',
        'wizerd-darkestgrey': '#171717',
        'bg-dark': '#1c1c1c',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      fontFamily: {
        geo: ['Geo', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
        ubuntu: ['Ubuntu', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        'crypto-glow': '0 0 10px rgba(242, 169, 0, 0.5)',
        'dark-lift': '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      container: {
        center: true,
        padding: '50px',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderColor: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
      },
      ringColor: {
        ring: 'hsl(var(--ring))',
      },
    },
    darkMode: 'class', // Moved to theme object to avoid redundancy
    screens: {
      xs: '393px',
      sm: '512px',
      md: '640px',
      lg: '768px',
      xl: '1280px',
    },
  },
  plugins: [forms, typography, aspectRatio, tailwindcssAnimate],
};

export default config;