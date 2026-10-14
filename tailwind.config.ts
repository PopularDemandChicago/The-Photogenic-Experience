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
        luxury: {
          black: "#0a0a0a",
          charcoal: "#141414",
          graphite: "#1c1c1c",
          silver: "#c0c0c0",
          platinum: "#e8e8e8",
          chrome: "#a8a8a8",
        },
        accent: {
          DEFAULT: "#7C3AED",
          light: "#A78BFA",
          dark: "#5B21B6",
          muted: "#8B5CF6",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        luxury: "0 0 40px -10px rgba(192, 192, 192, 0.15)",
        "luxury-lg": "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
        glow: "0 0 30px rgba(255, 255, 255, 0.06)",
      },
      animation: {
        "fade-in": "fadeIn 1.2s ease-out forwards",
        "slide-up": "slideUp 1s ease-out forwards",
        shimmer: "shimmer 3s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
        float: "float 3s ease-in-out infinite",
        flash: "flash 0.45s ease-out forwards",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        wiggle: "wiggle 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(-5deg)" },
          "50%": { transform: "translateY(-10px) rotate(5deg)" },
        },
        flash: {
          "0%": { opacity: "0.85" },
          "100%": { opacity: "0" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(124, 58, 237, 0.25)" },
          "50%": { boxShadow: "0 0 40px rgba(124, 58, 237, 0.55)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-3deg)" },
          "75%": { transform: "rotate(3deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
