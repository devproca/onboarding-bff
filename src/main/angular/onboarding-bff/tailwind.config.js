module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['odd'],
      backgroundColor: ['even']
    },
  },
  plugins: [],
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
}
