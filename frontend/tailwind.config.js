/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    container: {
      padding: '10rem',
    }
  },
  plugins: [],
}

//What does it mean to define container here under theme?
//r: https://tailwindcss.com/docs/container