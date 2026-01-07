/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cs: {
          bg: '#0f0f0f',
          panel: '#101010',
          green: '#00ff00',
          amber: '#caa84a',
          amberBright: '#fff7b0',
          console: 'rgba(0,0,0,0.55)',
        },
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', '"Courier New"', 'Courier', 'monospace'],
        mono: ['"Courier New"', 'Courier', 'monospace'],
      },
      boxShadow: {
        cs: '0 0 0 1px rgba(0,255,0,0.35), 0 12px 40px rgba(0,0,0,0.55)',
      },
    },
  },
  plugins: [],
}

