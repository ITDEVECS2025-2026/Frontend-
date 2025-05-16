import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1440px',

      '3xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      fontFamily : {
        'Poppins': ['poppins', 'sans-serif'],
        'Inter': ['inter', 'sans-serif'],
      },
      colors: {
        primary: {
          "25":"#E9E9E9",
          "50":"#DDDDDD",
          "100":"#B9B9B9",
          "200":"#1E1E1E",
          "300":"#1B1B1B",
          "400":"#181818",
          "500":"#171717",
          "600":"#121212",
          "700":"#0D0D0D",
          "800":"#0B0B0B", 
        },
        secondary: {
          "25":"#F7F7F6",
          "50":"#F3F3F1",
          "100":"#E6E5E2",
          "200":"#AFACA2",
          "300":"#9E9B92",
          "400":"#8C8A82",
          "500":"#83817A",
          "600":"#696761",
          "700":"#4F4D49",
          "800":"#3D3C39",
        },
        user: {
          "Hover-1":"#AF9000",
          "Hover-2":"#A48E3D",
          "White":"#FFF9E2",
          "Neutral":"#FFFFFF",
          "Gray":"#323231",
          "Glass Effect":"Gradient",
        },
        function:{
          "Success":"#3839C1A",
          "Error":"#E13B11",
          "Warning":"#F4D000",
        },
      },
    },
  },

  plugins: [],
};
export default config;
