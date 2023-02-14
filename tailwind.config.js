const defaultTheme = require("tailwindcss/defaultTheme");
const properties = require("./src/properties.json");

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "414px",
        ...defaultTheme.screens,
        "2xl": "1366px",
      },
      colors: {
        primary: properties.appearence.primary_color,
        "primary-dimmed": properties.appearence.primary_color_dimmed,
        secondary: properties.appearence.secondary_color,
      },
      fontFamily: {
        orbitron: ["Orbitron"],
      },
    },
  },
  plugins: [],
};
