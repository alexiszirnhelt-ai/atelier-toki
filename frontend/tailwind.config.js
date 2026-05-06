/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Palette Toki
        paper: "#F7F4EE", // blanc cassé, fond principal
        sand: "#EDE6D6", // sable, fond alternatif
        ink: {
          DEFAULT: "#1A1816", // encre noire
          soft: "#5C564E", // encre douce
        },
        indigo: {
          deep: "#3D4A5C", // indigo profond
        },
        clay: "#A8543A", // terracotta (accent rare)
      },
      fontFamily: {
        serif: ['"Shippori Mincho"', "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        jp: ['"Noto Serif JP"', "serif"],
      },
      letterSpacing: {
        widest: "0.25em",
      },
    },
  },
  plugins: [],
};
