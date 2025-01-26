import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  base: '/TextShare-ui',  // Make sure this matches your GitHub repository name
  define: {
    'process.env': {
      VITE_API_URL: JSON.stringify(process.env.VITE_API_URL),
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
