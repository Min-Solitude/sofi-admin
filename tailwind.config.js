/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4158D0",
        secondary: "#C850C0",
        tertiary: "#FFCC70",
      },
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        OpenSans: ["Open Sans", "sans-serif"],
      },
      boxShadow: {
        main: "2px 4px 12px rgba(0,0,0,.08)",
      },
    },
  },
  plugins: [require("daisyui")],
};
