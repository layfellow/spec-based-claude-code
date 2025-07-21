/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D2130',
        success: '#28a745',
        danger: '#dc3545',
      }
    },
  },
  plugins: [],
}