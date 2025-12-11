import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "#A0522D",
        "background-light": "#F5F5DC",
        "background-dark": "#1a1a1a",
        "text-light": "#333333",
        "text-dark": "#e0e0e0",
        "secondary-text-light": "#555555",
        "secondary-text-dark": "#aaaaaa",
        "border-light": "#e5e5e5",
        "border-dark": "#333333",
        "card-light": "#FFFFFF",
        "card-dark": "#2c2c2c",
      },
      fontFamily: {
        display: ["Merriweather", "serif"],
        body: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
