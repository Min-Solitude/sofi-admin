/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FBAB7E",
      },
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        OpenSans: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
