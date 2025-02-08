import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js', // Asegura que Vite reconozca PostCSS
  },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets').replace(/\\/g, '/'), // 🔥 Corrige problemas en Windows
    },
  },
})

