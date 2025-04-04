/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        base:{
          peach:'rgb(207,151,113)',
          taupe:'rgb(99,63,69)',
          drb:'rgb(51,0,0)',
        }
      }
    },
  },
  plugins: [],
}

