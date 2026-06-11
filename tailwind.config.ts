import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Vazirmatn", "system-ui", "Segoe UI", "Tahoma", "sans-serif"],
      },
      colors: {
        // Deep academic indigo as the primary brand color
        brand: {
          50: "#eef0ff",
          100: "#e0e2ff",
          200: "#c6c9ff",
          300: "#a4a6fd",
          400: "#827ff8",
          500: "#6a5ef0",
          600: "#5a45e2",
          700: "#4c37c7",
          800: "#3f30a1",
          900: "#372d80",
          950: "#221b4d",
        },
        ink: {
          DEFAULT: "#1e1b2e",
          soft: "#4b4860",
          muted: "#7b788d",
        },
        gold: {
          400: "#fbbf24",
          500: "#f59e0b",
        },
        paper: "#f7f7fb",
        line: "#e9e8f1",
      },
      boxShadow: {
        card: "0 1px 2px rgba(34, 27, 77, 0.04), 0 8px 24px -12px rgba(34, 27, 77, 0.18)",
        lift: "0 12px 40px -16px rgba(57, 48, 161, 0.35)",
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
