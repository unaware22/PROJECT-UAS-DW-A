/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html', 'script.js'],
  theme: {
    extend: {
      backgroundImage: {
        'background': "url('/img/wagyu (3).jpg')",
      },
      lineHeight: {
        tight: '0.8',
      },
      
      fontSize: {
        '9rem': '9rem',
        '10rem': '10rem',
        '11rem': '11rem',
        '12rem': '12rem',
        '13rem': '13rem',
        '15rem': '15rem',
        '17rem': '17rem',
      },
      colors: {
        'custom': '#FFE900',
      },
      fontFamily: {
        'customFont1': ['CustomFont1'],
        'customFont2': ['CustomFont2', 'sans-serif'],
        'customFont3': ['CustomFont3', 'sans-serif'],
        'customFont4': ['CustomFont4', 'sans-serif'],
        'BebasNeue' : ['Bebas Neue', 'sans-serif'],
        'Dramaturg' : ['Dramaturg', 'sans-serif'],
        'Kamerik205' : ['Kamerik205','sans-serif'],

      },
      screens: {
        'sm360': '360px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
