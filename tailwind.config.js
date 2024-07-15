/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const plugin = require('tailwindcss/plugin');

export default withMT( {
  darkMode:"class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
     "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    fontSize: {
      xs: ['12px', '16px'],
      sm: ['14px', '20px'],
      base: ['16px', '19.5px'],
      lg: ['18px', '21.94px'],
      xl: ['20px', '24.38px'],
      '2xl': ['24px', '29.26px'],
      '3xl': ['28px', '50px'],
      '4xl': ['48px', '58px'],
      '8xl': ['96px', '106px']
    },
    extend: {
      fontFamily: {
        palanquin: ['Palanquin', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        'primary': "#ECEEFF",
        "coral-red": "#FF6452",
        "slate-gray": "#6D6D6D",
        "pale-blue": "#F5F6FF",
        "white-400": "rgba(255, 255, 255, 0.80)",
        "shogun"  : {
          "accentA": "#612541",
          "accentB": "#efc957",
          50:"#E8D9E8",
          100: "#BBADD2",
          200: "#A589CA",
          300: "#7B5CAD",
          400: "#6333AE",
          500: "#4440C0",
          600: "#392A64",
          700: "#292263",
          800: "#291C3A",
          850: "#340252",
          900: "#26053a",
          950: "#11021b"
        },
        "nahida"  : {
          "accentA": "#ffbf00",
          "accentB": "#efc957",
          100: "#392A64",
          200: "#9ed437",
          300: "#6b932f",
          400: "#1c861c",
          500: "#004600",
          650: "#063006"
        }
      },
      boxShadow: {
        '3xl': '0 10px 40px rgba(0, 0, 0, 0.1)',
        'surround' : ' 25px 25px 100px 100px rgb(0 0 0 / 0.1),-25px -25px 100px 100px rgb(0 0 0 / 0.1)'
      },
      backgroundImage: {
        'pexel1': "url('images/pexels-quang-nguyen-vinh-2132240.jpg')",
        'pexel2':  "url('images/pexels-scott-webb-1903970.jpg')",
        'pexel3':  "url('images/pexels-rie-sadohara-2968327.jpg')",
        'pexel4':  "url('images/pexels-quang-nguyen-vinh-2132227.jpg')",

      },
      screens: {
        "wide": "1440px",
        'xl': '1300px',
        '2xl': '1440px',
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
})
