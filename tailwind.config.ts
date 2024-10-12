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
    },
  },
  plugins: [],
};
export default config;
