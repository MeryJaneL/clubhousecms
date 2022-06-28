module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  important: '#__next',
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
