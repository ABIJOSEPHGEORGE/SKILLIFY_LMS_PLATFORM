/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  daisyui: {
    themes: [],
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        primary : '#FD9697',
        secondary:'#FEF0EF',
        primaryViolet : '#5F5982',
        primaryBlue : '#172B4C',
        lightPink : '#F2EDED',
        darkPink : '#F66863',
        bgPink : '#FEF0EF',
        lightblue:'#EFEFF6',
        bgcart:"#F56962"
      },
      fontFamily:{
        poppins:['Poppins', 'sans-serif']
      },
      
     
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require("daisyui"),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
})

