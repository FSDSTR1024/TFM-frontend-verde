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
    modules: {
      localsConvention: 'camelCaseOnly' // Usa camelCase para nombres de clases
    },
    postcss: false // Deshabilita PostCSS explícitamente
  },
  server: {
    port: 3001, // Puerto del servidor de desarrollo
    open: true, // Abre el navegador automáticamente
    hmr: {
      overlay: false // Desactiva el overlay de errores de Vite (opcional)
    }
  },
  optimizeDeps: {
    include: ['@emotion/react', '@emotion/styled'], // Optimiza Emotion
    esbuildOptions: {
      define: {
        global: 'globalThis' // Define globalThis para compatibilidad
      }
    }
  },
  build: {
    outDir: 'dist', // Carpeta de salida para el build
    sourcemap: true // Genera sourcemaps para debugging
  }
})
