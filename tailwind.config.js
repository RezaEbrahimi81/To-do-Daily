/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    container: {
      padding:{
        DEFAULT: '15PX',

      }

    },
    screens:{
      sm: '640px',
      md: '768px',
      xl: '1280px',
    },
    fontFamily:{
      primary: 'Rowdies',
      secondary: 'Rosario',
    },

    extend: {
      colors: {
        primary: '#FF4F5A',
        secondary: '#6B6B6B',
      },
    },

    
  plugins: [],
}}

