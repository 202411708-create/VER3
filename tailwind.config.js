/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'muji-dark': '#3a3a3a',
        'muji-mid': '#6b6b6b',
        'muji-light': '#9ca3af',
        'muji-beige': '#e8e3db',
        'muji-bg': '#f5f3ef',
        'muji-blue': '#7c9cbf',
        'muji-blue-light': '#b8cfe0',
        'muji-pink': '#d4a5a5',
        'muji-pink-light': '#e8d4d4',
        'muji-green': '#8fae8d',
        'muji-yellow': '#e8d6a8',
        'muji-red': '#c49090',
        'muji-orange': '#d4a574',
      },
    },
  },
  plugins: [],
}
