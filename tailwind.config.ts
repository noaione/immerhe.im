import type { Config } from "tailwindcss";
import huiPlugin from "@headlessui/tailwindcss";

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        cecilia: {
          50: "#EDFDF5",
          100: "#DAFBEC",
          200: "#B1F6D6",
          300: "#84F1BE",
          400: "#3AE897",
          500: "#19D77E",
          600: "#17C573",
          700: "#14AE66",
          800: "#119357",
          900: "#0C693E",
          950: "#08492B",
        },
      },
    },
  },
  plugins: [huiPlugin],
} as Partial<Config>;
