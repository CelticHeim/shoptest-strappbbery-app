/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#353C59',
          light: '#F0F1F5',
        },
        secondary: {
          DEFAULT: '#686B75',
          light: '#F0F1F5',
        },
        accent: '#D15253',
        background: {
          light: '#F0F1F5',
          dark: '#FFFFFF',
        },
        text: {
          primary: '#353C59',
          secondary: '#686B75',
          light: '#F0F1F5',
        },
        status: {
          danger: '#D15253',
          success: '#4CAF50',
          warning: '#FF9800',
          info: '#2196F3',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
