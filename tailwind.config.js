/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        12: 'repeat(12, 1fr)',
        15: 'repeat(15, 1fr)',
        20: 'repeat(20, 1fr)',
      }
    },
  },
  plugins: [],
};
