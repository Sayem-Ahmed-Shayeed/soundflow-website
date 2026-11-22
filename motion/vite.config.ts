import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// builds the Motion Brew islands into ../mb (one script, one stylesheet) for the static page
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "../mb",
    emptyOutDir: true,
    cssCodeSplit: false,
    rollupOptions: {
      input: "islands.tsx",
      output: { entryFileNames: "islands.js", assetFileNames: "islands[extname]", format: "es" },
    },
  },
});
