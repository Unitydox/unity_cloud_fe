/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = withMT({
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#2E3192',
        secondary: '#F7941D',
        "blue": {
          "50": "#eaeaf4",
          "100": "#d5d6e9",
          "200": "#E8F0FE",
          "300": "#8283be",
          "400": "#585aa8",
          "500": "#2e3192",
          "600": "#252775",
          "700": "#1c1d58",
          "800": "#12143a",
          "900": "#090a1d"
        },
        "orange": {
          "50": "#fef4e8",
          "100": "#fdead2",
          "200": "#fcd4a5",
          "300": "#fabf77",
          "400": "#f9a94a",
          "500": "#f7941d",
          "600": "#c67617",
          "700": "#945911",
          "800": "#633b0c",
          "900": "#311e06"
        }
      },
    }
  },
  plugins: []
})
