// tailwind.config.ts
import type {Config} from "tailwindcss"

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        caveat: 'var(--font-caveat, "Caveat", sans-serif)',
        inter: 'var(--font-inter, "Inter", sans-serif)',
        orbitron: 'var(--font-orbitron, "Orbitron", sans-serif)',
      },
      colors: {
        test: "#00007c",
      },
    },
  },
  plugins: [],
} satisfies Config
