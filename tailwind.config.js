/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': '450px',},
    
    extend: {
      
      colors: {
        VeryDarkBlue : '#202c37',
        DarkBlue:'#2b3945',
        DarkGray : '#858585' , 
        VeryLightGray : '#fafafa',
      } , 
      
    },
  },
  plugins: [],
  utilities: {
    '.without-ring': {
      '@apply': 'focus:ring-0 focus:ring-offset-0',
    },
  },
}

