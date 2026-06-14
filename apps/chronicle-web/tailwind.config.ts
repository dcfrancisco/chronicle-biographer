import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: "hsl(var(--canvas))",
        paper: "hsl(var(--paper))",
        panel: "hsl(var(--panel))",
        ink: "hsl(var(--ink))",
        muted: "hsl(var(--muted))",
        accent: "hsl(var(--accent))",
        accent2: "hsl(var(--accent-2))",
        line: "hsl(var(--line))",
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))"
      },
      boxShadow: {
        soft: "0 24px 80px rgba(20, 28, 20, 0.18)",
        inset: "inset 0 1px 0 rgba(255,255,255,0.04)"
      },
      backgroundImage: {
        "paper-grid":
          "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        "studio-glow":
          "radial-gradient(circle at top left, rgba(186, 166, 108, 0.16), transparent 35%), radial-gradient(circle at top right, rgba(99, 140, 112, 0.14), transparent 32%), radial-gradient(circle at bottom left, rgba(62, 78, 121, 0.12), transparent 30%)"
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"]
      }
    }
  },
  plugins: []
};

export default config;
