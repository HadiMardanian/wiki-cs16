/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // CS 1.6 Color Palette
        'cs-black': '#0f0f0f',
        'cs-dark': '#1a1a1a',
        'cs-darker': '#121212',
        'cs-green': '#00FF00',
        'cs-green-dim': '#00CC00',
        'cs-yellow': '#FFD700',
        'cs-yellow-dim': '#B8860B',
        'cs-orange': '#FF8C00',
        'cs-orange-dim': '#CC7000',
        'cs-red': '#FF0000',
        'cs-white': '#FFFFFF',
        'cs-gray': '#808080',
        'cs-gray-dark': '#404040',
      },
      fontFamily: {
        'mono': ['Courier New', 'monospace'],
        'pixel': ['"Press Start 2P"', 'cursive'],
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'scanline': 'scanline 8s linear infinite',
        'flicker': 'flicker 0.15s infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        flicker: {
          '0%': { opacity: '0.97' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.98' },
        },
      },
      boxShadow: {
        'cs-glow': '0 0 10px rgba(0, 255, 0, 0.3)',
        'cs-glow-strong': '0 0 20px rgba(0, 255, 0, 0.5)',
      },
    },
  },
  plugins: [],
}
