/** @type {import('tailwindcss').Config} *//** @type {import('tailwindcss').Config} *//** @type {import('tailwindcss').Config} */

module.exports = {

  content: [module.exports = {module.exports = {

    './pages/**/*.{js,ts,jsx,tsx,mdx}',

    './components/**/*.{js,ts,jsx,tsx,mdx}',  content: [  content: [

    './app/**/*.{js,ts,jsx,tsx,mdx}',

  ],    './pages/**/*.{js,ts,jsx,tsx,mdx}',    './app/**/*.{js,ts,jsx,tsx,mdx}',

  theme: {

    extend: {},    './components/**/*.{js,ts,jsx,tsx,mdx}',    './pages/**/*.{js,ts,jsx,tsx,mdx}',

  },

  plugins: [],    './app/**/*.{js,ts,jsx,tsx,mdx}',    './components/**/*.{js,ts,jsx,tsx,mdx}',

}
  ],  ],

  theme: {  theme: {

    extend: {},    extend: {

  },      colors: {

  plugins: [],        primary: '#3B82F6',

}        secondary: '#6B7280',
      },
    },
  },
  plugins: [],
}

