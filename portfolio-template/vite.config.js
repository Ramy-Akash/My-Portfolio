import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Zero-config build — deploys as-is on Netlify / Vercel / GitHub Pages.
export default defineConfig({
  plugins: [react()],
  base: "./",
});
