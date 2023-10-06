//@ts-check

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      // Custom fonts. Remove if not wanted, but be sure to add a new sans and serif font or update the Typography atom.
      sans: ["'Poppins'", "sans-serif"],
      serif: ["'Roboto Slab'", "serif"],
      mono: ["'DM Mono'", "monospace"],
    },
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["garden"],
  },
};
