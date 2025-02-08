import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#213435',
        'secondary-dark': '#46685b',
        'primary-light': '#e1e3ac',
        'hover-state': '#648a64',
        'error-color': '#c44536',
      },
      fontFamily: {
        primary: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        base: '0 2px 8px rgba(33, 52, 53, 0.1)', // primary-dark en RGB
      },
      transitionTimingFunction: {
        base: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [daisyui], // Importación correcta de DaisyUI
  daisyui: {
    themes: ['light', 'dark'],
  },
}

