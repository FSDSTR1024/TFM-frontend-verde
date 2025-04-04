import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@Components': path.resolve(__dirname, 'src/Components'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@services': path.resolve(__dirname, 'src/services'),
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    historyApiFallback: true,
  },
})

