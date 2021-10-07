module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        caveat: 'Caveat Brush'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
