import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "rgb(var(--paper) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        herb: "rgb(var(--herb) / <alpha-value>)",
        saffron: "rgb(var(--saffron) / <alpha-value>)",
        paprika: "rgb(var(--paprika) / <alpha-value>)",
        card: "rgb(var(--cream-card) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      borderRadius: {
        card: "0.375rem",
      },
    },
  },
  plugins: [],
};
export default config;
