/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray1: "#212121",
        gray2: "#2f2f2f",
      },
    },
  },
  plugins: [],
};
