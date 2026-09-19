import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        background: "#120E1C",
        surface: "#1A1428",
        surface2: "#231B35",
        border: "#3C2B4B",
        text: "#E0C0FF",
        muted: "#B996D0",
        accent: "#FFD28C",
        highlight: "#FF82B4",
        brand: "#7F3384",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255, 210, 140, 0.16), 0 18px 50px rgba(18, 14, 28, 0.45)",
      },
      backgroundImage: {
        grid: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.75" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.7s ease-out both",
        pulseSoft: "pulseSoft 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
