const withMT = require('@material-tailwind/react/utils/withMT');
const plugin = require('tailwindcss/plugin');

const capitalizeFirst = plugin(function ({ addUtilities }) {
  const newUtilities = {
    '.capitalize-first:first-letter': {
      textTransform: 'uppercase',
    },
  };
  addUtilities(newUtilities, ['responsive', 'hover']);
});

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      xs: '380px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      'lg-max': { max: '1024px' },
      xl: '1280px',
      '2xl': '1536px',
    },
    fontFamily: {
      sans: ['Montserrat'],
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      colors: {
        brand: {
          purple: '#1B0221',
          'purple-light': '#32063d',
          'purple-dark': '#150118',
          pink: '#FD7068',
          orange: '#FFB117',
        },
        sky: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      backgroundImage: {
        'pink-to-purple':
          'linear-gradient( to right, #fd7068, #cd4a65, #972c5c, #60164c, #2c0535 )',
        'pink-to-orange':
          'linear-gradient(to right bottom, #fd6e6a, #ff7f57, #ff9442, #ffad29, #ffc600)',
      },
    },
  },
  plugins: [capitalizeFirst],
});
