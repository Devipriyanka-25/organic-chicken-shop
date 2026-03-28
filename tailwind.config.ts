import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Organic/Green theme for meat shop
        sage: {
          50: "#f6f9f6",
          100: "#e3eee3",
          200: "#d0e5d0",
          300: "#b3d6b3",
          400: "#8dc18d",
          500: "#6faf6f",
          600: "#5a9b5a",
          700: "#467d46",
          800: "#386838",
          900: "#2d5a2d",
        },
        earth: {
          50: "#faf9f7",
          100: "#f0ede8",
          200: "#e8e2dc",
          300: "#d9cfc5",
          400: "#c4ada0",
          500: "#b0937f",
          600: "#9d7a68",
          700: "#815d50",
          800: "#6b4d44",
          900: "#5a423b",
        },
        fresh: {
          50: "#f7fdf5",
          100: "#ebfae6",
          200: "#d8f4d0",
          300: "#b5e8ab",
          400: "#8dd97c",
          500: "#65c854",
          600: "#51b340",
          700: "#409733",
          800: "#357a2b",
          900: "#2c6424",
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "pulse-subtle": "pulseSubtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: {
            opacity: "0",
            transform: "translateY(10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
