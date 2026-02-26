import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // The dev server proxy is intentionally removed.
  // In development, set VITE_API_URL=http://localhost:8080/api/v1 in your .env file.
  // In production (Netlify), set VITE_API_URL to your Render backend URL.
  optimizeDeps: {
    include: ['react-is']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          charts: ['recharts'],
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          pdf: ['jspdf', 'jspdf-autotable', 'html2canvas']
        }
      }
    }
  },
  define: {
    global: 'globalThis',
  },
})
