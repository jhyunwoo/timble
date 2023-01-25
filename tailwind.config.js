/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "cnsablue-100": "#41b6e6",
        "cnsablue-200": "#0072ce",
        "cnsablue-300": "#0033a0",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
}
