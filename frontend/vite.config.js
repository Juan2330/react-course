import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(),],
  preview: {
    port: 5173, 
    host: true,
    allowedHosts: [
      "react-course-frontend-production.up.railway.app"
    ]
  },
  server: {
    proxy: {
      '/api': {
        target: 'react-course-production.up.railway.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});