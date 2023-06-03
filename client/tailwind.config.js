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
        primary : '#001f54',
        secondary:'#001f54',
        primaryViolet : '#01497c',
        primaryBlue : '#172B4C',
        lightPink : '#468faf',
        darkPink : '#01497c',
        bgPink : '#FEF0EF',
        lightblue:'#E8F4FE',
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

