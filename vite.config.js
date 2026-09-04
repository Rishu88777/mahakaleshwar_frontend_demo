import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    host: true,
    allowedHosts: true, // tunnel / LAN hosts during development (opened inside WhatsApp webview)
    proxy: {
      '/api': {
        target: process.env.VITE_PROXY_TARGET || 'http://35.200.250.116:9081',
        changeOrigin: true
      },
      // lets the app run with an empty VITE_API_BASE_URL in dev, same as prod
      '/whatsapp/bot': {
        target: process.env.VITE_PROXY_TARGET || 'http://35.200.250.116:9081',
        changeOrigin: true
      }
    }
  }
})
