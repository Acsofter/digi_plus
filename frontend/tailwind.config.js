/** @type {import('tailwindcss').Config} */
export const darkMode = "selector"
export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    colors: {
      primary: {
        DEFAULT: "rgba(10,86,232,255)",
      },

      secondary: {
        DEFAULT: "rgba(56,113,246,255)",
      },

      light: {
        DEFAULT: "rgba(249,250,252,255)",
      },

      dark: {
        DEFAULT: "rgba(71,84,103,255)",
      },

      base: {
        DEFAULT: "rgba(16,23,39,255)",
      },
      danger: {
        DEFAULT: "rgba(249,54,54,255)",
      },

      success: {
        DEFAULT: "rgba(52,211,153,255)",
      },

      warning: {
        DEFAULT: "rgba(255,193,7,255)",
      },

      info: {
        DEFAULT: "rgba(59,130,246,255)",
      },

      gray: {
        DEFAULT: "rgba(148,163,184,255)",
      },
    },
  },
};
export const plugins = [];
