import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      "night",
      {
        stepPost: {
          primary: "#140a82",

          secondary: "#FF5E1A",

          accent: "#45C5ED",

          neutral: "#fff",

          info: "#45C5ED",

          success: "#24A640",

          warning: "#FFCC40",

          error: "#ff0000",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
} satisfies Config;
