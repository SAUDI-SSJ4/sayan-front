import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(),react()],
  resolve: {
    alias: {
      "@": "/src",
      "@services": "/services",
      "@store": "/redux",
    },
  },

  optimizeDeps: {
    include: ['@ffmpeg/ffmpeg'],
    "optimizeDeps": {
      "exclude": ["lottie-web"]
    },
    "build": {
      "rollupOptions": {
        "external": ["lottie-web"]
      }
    }
  },
});
