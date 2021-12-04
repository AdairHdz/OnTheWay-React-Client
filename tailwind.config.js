module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        "not-found-background": "url('/src/assets/images/not_found.png')"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
