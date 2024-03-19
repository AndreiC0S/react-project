/** @type {import('tailwindcss').Config} */

import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({

  content : [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme : {
  extend: {
    keyframes: {
      fadeOut: {
        '0%': { opacity: '1' },
        '75%': { opacity: '1' },
        '100%': { opacity: '0' },
      },
    },
    animation: {
      fadeOut: 'fadeOut 3s ease-out',
    },
    spacing:{
      
    }
  },
  },
  plugins : [],
});
