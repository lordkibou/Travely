/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter Tight", ...defaultTheme.fontFamily.sans],
      },
    },
    container: {
      padding: {
        md: '10rem',
      }
    },
  },
  plugins: [],
}

//What does it mean to define container here under theme?
//r: https://tailwindcss.com/docs/container