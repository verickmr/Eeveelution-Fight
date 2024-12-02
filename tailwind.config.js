/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { colors: {
       
        fire: '#F08030',
        'fire-dark': '#9C531F',
        water: '#6890F0',
        'water-dark': '#445E9C',
        electric: '#F8D030',
        'electric-dark': '#A1871F',
        grass: '#78C850',
        'grass-dark': '#4E8234',
        ice: '#98D8D8',
        'ice-dark': '#638D8D',
        
        psychic: '#F85888',
        'psychic-dark': '#A13959',
        
        dark: '#705848',
        'dark-dark': '#49392F',
        
        fairy: '#EE99AC',
        'fairy-dark': '#9B6479',
      },
    },
  },
  plugins: [],
}