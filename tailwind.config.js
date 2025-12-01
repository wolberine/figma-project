/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['suisse-intl', 'sans-serif'],
        mono: ['suisse-intl-mono', 'monospace'],
        kicker: ['bank-gothic', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        background: '#050505',
        surface: '#121212',
        primary: '#D4F24F', // Keeping the acid green for accents if needed, or we can adjust based on the image which seems more muted/gold/white.
        // Looking at the image, it's mostly white text on black, with some gold/bronze accents.
        gold: '#C5A968',
        secondary: '#888888',
        border: '#222222',
      }
    },
  },
  plugins: [],
}

