import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./config/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        onyx: {
          50: "#fafafa",
          100: "#f0f0f0",
          200: "#e0e0e0",
          300: "#c6c6c6",
          400: "#a3a3a3",
          500: "#808080",
          600: "#5e5e5e",
          700: "#404040",
          800: "#292929",
          900: "#010101",
        },
        luxury: {
          black: "#0a0a0a",
          dark: "#141414",
          charcoal: "#1c1c1c",
          gray: "#2a2a2a",
          muted: "#8a8a8a",
          light: "#ffffff",
          mist: "#f7f7f7",
          warm: "#f2f2f2",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display": ["clamp(3rem, 8vw, 8rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "heading-1": ["clamp(2.5rem, 5vw, 5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "heading-2": ["clamp(2rem, 3.5vw, 3.5rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "heading-3": ["clamp(1.5rem, 2.5vw, 2.5rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "body-lg": ["1.25rem", { lineHeight: "1.7" }],
        "body": ["1rem", { lineHeight: "1.7" }],
        "small": ["0.875rem", { lineHeight: "1.6" }],
        "tiny": ["0.75rem", { lineHeight: "1.5" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "1200": "1200ms",
      },
      backdropBlur: {
        "xs": "2px",
      },
    },
  },
  plugins: [],
};

export default config;
