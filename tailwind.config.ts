import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        background: "#0A0A0A",
        abyss: "#050505",
        surface: "#141414",
        surface2: "#1A1A1A",
        gold: {
          DEFAULT: "#C9A24B",
          dark: "#A8853A",
          light: "#D8B96A",
        },
        bronze: "#9A7B4F",
        ink: "#F2EFE9",
        ivory: "#F2EFE9",
        mute: "#8A8A8A",
        hairline: "#262626",
      },
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "Playfair Display", "serif"],
        crest: ["var(--font-cinzel)", "Trajan", "Cinzel", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        widest2: "0.3em",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Zoom cinematográfico muy lento para videos de fondo.
        kenburns: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        "line-grow": {
          "0%": { transform: "scaleY(0)" },
          "100%": { transform: "scaleY(1)" },
        },
      },
      animation: {
        "fade-in": "fade-in 600ms ease-out",
        "fade-up": "fade-up 600ms ease-out",
        kenburns: "kenburns 28s ease-in-out infinite alternate",
        shimmer: "shimmer 1.6s linear infinite",
        "line-grow": "line-grow 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
