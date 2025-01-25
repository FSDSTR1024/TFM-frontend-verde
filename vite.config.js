import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  css: {
    postcss: {
      syntax: 'postcss-html', // Mejor análisis para CSS Modules
      modules: {
        localsConvention: 'camelCase', // Compatibilidad con tu configuración
      },
    },
  },
})
