// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Mencakup semua file di dalam folder src
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // Jika ada halaman di root (untuk Pages Router)
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // Jika ada komponen di root
  ],
  theme: {
    extend: {
      colors: {
        amber: {
          500: "#e0b06b", // Warna emas custom dari brosur
          600: "#c7954e",
          700: "#ae7c3f",
          800: "#946330",
          900: "#7a4b22",
        },
      },
    },
  },
  plugins: [],
};

export default config;
