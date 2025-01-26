import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react', // Usa Emotion para JSX
      babel: {
        plugins: ['@emotion/babel-plugin'] // Habilita el plugin de Emotion
      },
      jsxRuntime: 'automatic' // Usa el nuevo JSX Runtime de React
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias para src/
      '@components': path.resolve(__dirname, './src/components'), // Alias para componentes
      '@assets': path.resolve(__dirname, './src/assets') // Alias para assets
    }
  },
  css: {
    postcss: './postcss.config.js', // Usa PostCSS para procesar CSS
    modules: {
      localsConvention: 'camelCaseOnly' // Usa camelCase para nombres de clases
    }
  },
  server: {
    port: 3000, // Puerto del servidor de desarrollo
    open: true // Abre el navegador automáticamente
  },
  optimizeDeps: {
    include: ['@emotion/react', '@emotion/styled'] // Optimiza Emotion
  }
})
