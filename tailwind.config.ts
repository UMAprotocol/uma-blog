import type { Config } from "tailwindcss";
import { autoFit } from "./styles/plugins";

const config = {
  darkMode: ["class"],
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
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      spacing: {
        "page-padding-x": "var(--page-padding-x)",
        "page-padding-x-lg": "var(--page-padding-x-lg)",
        "content-max-width": "var(--content-max-width)",
        "outer-max-width": "var(--outer-content-max-width)",
      },
      colors: {
        border: "hsl(var(--text-primary) / 0.03)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        "line-pattern": {
          background: "hsl(var(--text-primary) / 0.03)",
          line: "hsl(var(--text-secondary) / 100)",
        },
        background: {
          DEFAULT: "hsl(var(--background-primary) / <alpha-value>)",
          secondary: "hsl(var(--background-secondary) / <alpha-value>)",
          card: "hsl(var(--text-primary) / 0.03)",
        },
        text: {
          DEFAULT: "hsl(var(--text-primary) / <alpha-value>)",
          secondary: "hsl(var(--text-secondary) / <alpha-value>)",
        },
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        accent: "hsl(var(--accent) / <alpha-value>)",
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          secondary: "hsl(var(--popover-secondary) / <alpha-value>)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        sans: ["var(--font-halyard-display)", "sans-serif"],
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/container-queries"),
    autoFit,
  ],
} satisfies Config;

export default config;
