import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 3003,
    proxy: {
      "/api": {
        target: "http://localhost:3002/",
        changeOrigin: true,
      },
      "/uploads/images": {
        target: "http://localhost:3002",
        changeOrigin: true,
      },
    },
  },
});
