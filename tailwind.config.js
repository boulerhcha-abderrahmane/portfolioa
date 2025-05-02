/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'bounce-slow': 'bounce-slow 3s ease-in-out infinite',
        'float': 'float 4s ease-in-out infinite',
        'gradient': 'gradient 5s ease infinite',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
      },
      keyframes: {
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'gradient': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 0.8 },
        },
      },
      scale: {
        '102': '1.02',
        '105': '1.05',
      },
      transitionProperty: {
        'transform': 'transform',
      },
    },
  },
  plugins: [],
};
