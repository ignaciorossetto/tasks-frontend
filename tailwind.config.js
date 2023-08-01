/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'polo-blue': {
        '50': '#f3f8fb',
        '100': '#e4edf5',
        '200': '#d0e1ed',
        '300': '#b0cee0',
        '400': '#7faccc',
        '500': '#6e9ac3',
        '600': '#5b83b5',
        '700': '#5072a5',
        '800': '#455e88',
        '900': '#3b4f6d',
        '950': '#283243',
    },}
    },
  },
  plugins: [],
}

