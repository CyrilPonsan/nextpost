import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
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
