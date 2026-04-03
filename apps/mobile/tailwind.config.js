/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FDF0F5',
          100: '#F7D6E6',
          200: '#EDADC8',
          300: '#D9699A',
          400: '#B5477A', // main brand
          600: '#8B3059',
          800: '#6B2040',
          900: '#3D0E20'
        },
        accent: {
          DEFAULT: '#6B2D50',
          light: '#F4EBF0',
        },
        gold: {
          DEFAULT: '#C9956A',
          light: '#FDF5EC',
        },
        surface: '#F5F0F2',
        border: '#E8DDE2',
      },
    },
  },
  plugins: [],
}
