const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        'shamel': ['Baloo Bhaijaan 2', 'Noto Kufi Arabic', 'sans-serif'],
        'baloo': ['Baloo Bhaijaan 2', 'Noto Kufi Arabic', 'sans-serif'],
        'primary': ['Baloo Bhaijaan 2', 'Noto Kufi Arabic', 'sans-serif'],
        'sans': ['Baloo Bhaijaan 2', 'Noto Kufi Arabic', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
};

