// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///D:/Mount%20Wolf%20Projects/ALJUBAIRI/Al-JubairiAdmin/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/Mount%20Wolf%20Projects/ALJUBAIRI/Al-JubairiAdmin/node_modules/@vitejs/plugin-vue/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///D:/Mount%20Wolf%20Projects/ALJUBAIRI/Al-JubairiAdmin/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      // Add Quill to optimizeDeps for proper handling in Vite
    }
  },
  optimizeDeps: {
    include: ["quill"]
    // Ensures that Quill is optimized and available for import
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxNb3VudCBXb2xmIFByb2plY3RzXFxcXEFMSlVCQUlSSVxcXFxBbC1KdWJhaXJpQWRtaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXE1vdW50IFdvbGYgUHJvamVjdHNcXFxcQUxKVUJBSVJJXFxcXEFsLUp1YmFpcmlBZG1pblxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovTW91bnQlMjBXb2xmJTIwUHJvamVjdHMvQUxKVUJBSVJJL0FsLUp1YmFpcmlBZG1pbi92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gXCJub2RlOnVybFwiO1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xyXG5pbXBvcnQgdnVlIGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWVcIjtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW3Z1ZSgpXSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICBcIkBcIjogZmlsZVVSTFRvUGF0aChuZXcgVVJMKFwiLi9zcmNcIiwgaW1wb3J0Lm1ldGEudXJsKSksXHJcbiAgICAgIC8vIEFkZCBRdWlsbCB0byBvcHRpbWl6ZURlcHMgZm9yIHByb3BlciBoYW5kbGluZyBpbiBWaXRlXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgb3B0aW1pemVEZXBzOiB7XHJcbiAgICBpbmNsdWRlOiBbXCJxdWlsbFwiXSwgLy8gRW5zdXJlcyB0aGF0IFF1aWxsIGlzIG9wdGltaXplZCBhbmQgYXZhaWxhYmxlIGZvciBpbXBvcnRcclxuICB9LFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4VSxTQUFTLGVBQWUsV0FBVztBQUNqWCxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFGK0wsSUFBTSwyQ0FBMkM7QUFLaFEsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLElBQUksQ0FBQztBQUFBLEVBQ2YsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQTtBQUFBLElBRXREO0FBQUEsRUFDRjtBQUFBLEVBQ0EsY0FBYztBQUFBLElBQ1osU0FBUyxDQUFDLE9BQU87QUFBQTtBQUFBLEVBQ25CO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
