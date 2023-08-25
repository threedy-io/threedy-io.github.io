/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    daisyui: {
      themes: [
        {
          threedyDraft: {
            primary: '#641ae6',
            secondary: '#d926a9',
            accent: '#00ffac',
            neutral: '#2a323c',
            'base-100': '#091227',
            info: '#3abff8',
            success: '#36d399',
            warning: '#fbbd23',
            error: '#f87272',
          },
        },
      ],
    },
    extend: {},
  },
  plugins: [require('daisyui')],
};
