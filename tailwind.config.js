const theme = require('./src/design');

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme,
  plugins: [],
};
