module.exports = {
  purge: ['./src/**/*.tsx', './src/**/*.html'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['active', 'disabled'],
      textColor: ['disabled'],
      cursor: ['disabled'],
      borderColor: ['disabled'],
    },
  },
  plugins: [
    require('postcss-import'),
  ],
};
