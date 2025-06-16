import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  resolve: {
    alias: {
      "@": "/src",
      "@services": "/services",
      "@store": "/redux",
    },
  },

  optimizeDeps: {
    include: [
      '@emotion/react', 
      '@emotion/styled', 
      '@mui/material',
      '@mui/icons-material/Visibility',
      '@mui/icons-material/VisibilityOff',
      '@mui/icons-material'
    ]
  },
  
  define: {
    global: 'globalThis'
  },

  build: {
    target: 'esnext',
    minify: 'esbuild',
    cssCodeSplit: true,
    sourcemap: false,
    
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['@mui/material', '@mui/icons-material', 'rsuite'],
          utils: ['axios', '@tanstack/react-query', 'formik', 'yup']
        }
      }
    },
    

    
    cssMinify: true,
    
    chunkSizeWarningLimit: 1000
  },

  server: {
    fs: {
      allow: ['..']
    }
  }
});
