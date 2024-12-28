/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand': {
          50: '#f7f8f3',
          100: '#e9ecd8',
          200: '#d4dbb3',
          300: '#bcc98d',
          400: '#a5b768',
          500: '#8fa54b',
          600: '#75893d',
          700: '#5c6c31',
          800: '#445026',
          900: '#2d341a',
        },
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
};
