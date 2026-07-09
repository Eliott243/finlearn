/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2D6A6A',
          light: '#3D8B8B',
          dark: '#1F4F4F',
        },
        secondary: '#4A6670',
        background: '#F8FAFB',
        surface: '#FFFFFF',
        'text-primary': '#1A2B3C',
        'text-secondary': '#6B7C8D',
        accent: '#5B8DEF',
        border: '#E2E8F0',
        success: '#3D9970',
        danger: '#C45C5C',
      },
    },
  },
  plugins: [],
};
