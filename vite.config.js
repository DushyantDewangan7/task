import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://script.google.com/macros/s/AKfycbyPKlFts8A4ctwiEUfPZK1Xn-0WWzjD0HIN3StFaN1MgAsSDCW-o9ahQxGgtTh61Lo4iA/exec',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [react()],
})
