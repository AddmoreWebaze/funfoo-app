
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        smoke: '#FEFCEC',

        'orange-100': '#feb466',
        'orange-200': '#fea84d',
        'orange-300': '#fe9b33',
        'orange-400': '#fe8f1a',
        'orange-500': '#FE8200',
        'orange-600': '#e57500',
        'orange-700': '#cb6800',
        'orange-800': '#b25b00',

        green: '#6FC649',

        'green-100' : '#e2f4db',
        'green-200' : '#9ad780',
        'green-300' : '#8cd16d',
        'green-400' : '#7dcc5b',
        'green-500' : '#6FC649',
        'green-600' : '#64b242',
        'green-700' : '#599e3a',
        'green-800' : '#4e8b33',

        cyan: '#00FFFF'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@headlessui/vue'),
    require('@tailwindcss/typography')
  ],
}
