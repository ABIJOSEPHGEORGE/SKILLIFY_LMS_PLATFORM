/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        primary : '#FD9697',
        secondary:'#F56962',
        primaryViolet : '#5F5982',
        primaryBlue : '#172B4C',
        lightPink : '#F2EDED',
        darkPink : '#F66863',
        bgPink : '#FEF0EF'
      },
      fontFamily:{
        poppins:['Poppins', 'sans-serif']
      }
     
    },
  },
  plugins: [],
}

