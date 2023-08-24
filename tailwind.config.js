/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#4158D0',
                secondary: '#C850C0',
                tertiary: '#FFCC70'
            },
            fontFamily: {
                Poppins: ['Poppins', 'sans-serif'],
                OpenSans: ['Open Sans', 'sans-serif']
            },
            boxShadow: {
                main: '0px 4px 4px rgba(0, 0, 0, 0.25)'
            }
        }
    },
    plugins: [require('daisyui')]
}
