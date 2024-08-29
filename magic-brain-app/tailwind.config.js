/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        'h1': '30px',
        'h2': '24px',
        'h3': '20px',        
      },
      colors: {
          customOrange: "#E36628",
          customBlue: "#226d8a"
      },
    },
  },
  plugins: [require("daisyui")],
};
