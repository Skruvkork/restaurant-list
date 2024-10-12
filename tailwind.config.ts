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
        white: "var(--color-white)",
        black: "var(--color-black)",
        "off-white": "var(--color-off-white)",
        green: "var(--color-green)",
        stroke: "rgba(var(--color-stroke))",
      },
      fontSize: {
        base: ["0.75rem", {
          lineHeight: "var(--text-line-height)",
          letterSpacing: "var(--text-letter-spacing)",
        }],
        xl: ["0.875rem", {
          lineHeight: "var(--text-line-height)",
          letterSpacing: "var(--text-letter-spacing)",
        }],
        "2xl": ["1.5rem", {
          lineHeight: "var(--text-line-height)",
          letterSpacing: "var(--text-letter-spacing)",
        }],
        "3xl": ["2.5rem", {
          lineHeight: "var(--text-line-height)",
          letterSpacing: "var(--text-letter-spacing)",
        }]
      }
    },
  },
  plugins: [],
};
export default config;
