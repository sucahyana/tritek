/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                transparent: 'transparent',
                current: 'currentColor',
                'background': '#156dac',
                'text': '#792d89',
                'content': '#548474',
                'first': '#925060',
                'second': '#715cc6',
                'third': '#2d9bab',
                'fourth': '#d9534f',
                martinique: {
                    '50': '#f3f4fb',
                    '100': '#e3e5f6',
                    '200': '#ced3ef',
                    '300': '#abb4e5',
                    '400': '#8490d6',
                    '500': '#666dcb',
                    '600': '#5354bd',
                    '700': '#4c48ad',
                    '800': '#443f8e',
                    '900': '#3a3771',
                    '950': '#2f2c53',
                },
            },
        },
    },
    plugins: [
        require('daisyui'),
    ],
}
