/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F7F4EE",
        sand: "#EDE6D6",
        ink: {
          DEFAULT: "#1A1816",
          soft: "#5C564E",
        },
        indigo: {
          deep: "#3D4A5C",
        },
        clay: "#A8543A",
      },
      fontFamily: {
        serif: ['"Shippori Mincho"', "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        jp: ['"Noto Serif JP"', "serif"],
      },
      letterSpacing: {
        widest: "0.25em",
      },
      keyframes: {
        "slide-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "slide-in": "slide-in 0.3s ease-out",
      },
    },
  },
  plugins: [],
};
