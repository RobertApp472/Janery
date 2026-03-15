/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#065f46', // Verde marca
        secondary: '#2563eb',
        accent: '#e0e7ff',
        card: '#fff',
        bg: '#f7f7f7',
      },
      fontFamily: {
        sans: [
          'Inter',
          'Segoe UI',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
