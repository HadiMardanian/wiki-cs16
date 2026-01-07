/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0f0f0f",
        panel: "rgba(0,0,0,0.55)",
        green: "#00FF00",
        dull: "#c9a400",
        bright: "#fff7a8",
        // CS 1.6 Theme Colors
        'cs-black': '#0f0f0f',
        'cs-dark': '#1a1a1a',
        'cs-darker': '#121212',
        'cs-green': '#00FF00',
        'cs-yellow': '#FFD700',
        'cs-yellow-dim': '#B8860B',
        'cs-orange': '#FF8C00',
        'cs-red': '#FF4444',
        'cs-gray': '#888888',
      },
      boxShadow: {
        'crt': '0 0 0 1px rgba(0,255,0,0.25), 0 0 22px rgba(0,255,0,0.08)',
        'cs-glow': '0 0 10px rgba(0, 255, 0, 0.3)',
        'cs-glow-strong': '0 0 20px rgba(0, 255, 0, 0.5)',
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    }
  },
  plugins: []
};
