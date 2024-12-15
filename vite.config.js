import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      // Add Quill to optimizeDeps for proper handling in Vite
    },
  },
  optimizeDeps: {
    include: ["quill"], // Ensures that Quill is optimized and available for import
  },
});
