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
        bright: "#fff7a8"
      },
      boxShadow: {
        crt: "0 0 0 1px rgba(0,255,0,0.25), 0 0 22px rgba(0,255,0,0.08)"
      }
    }
  },
  plugins: []
};

