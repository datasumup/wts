import { palette } from "./tailwind.palette";
import { animations, keyframes } from "./tailwind.animation";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ...palette,
      },
      keyframes: {
        ...keyframes,
      },
      animation: {
        ...animations,
      },
    },
  },
  plugins: [],
};
