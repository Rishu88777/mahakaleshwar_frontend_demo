import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    host: true,
    allowedHosts: true, // ngrok / tunnel hosts during development (opened inside WhatsApp webview)
    proxy: {
      '/api': {
        target: process.env.VITE_PROXY_TARGET || 'http://localhost:8081',
        changeOrigin: true
      }
    }
  }
})
