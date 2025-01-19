/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
        'dark-bg': '#0a0a0a',
        'active-link': '#262626',
        'accent-bg': '#171717',
        'dark-border': '#404040',
        'primary-text': '#fafafa',
        'secondary-text': '#d4d4d4',
        'primary': '#3b82f6',
      },
  	}
  },
  plugins: [require("tailwindcss-animate")],
}