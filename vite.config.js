// Definición de __filename y __dirname para entornos ESM
import { fileURLToPath } from 'url'
import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Convertir la URL del módulo actual en rutas de archivo
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configuración de Vite
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin']
      },
      jsxRuntime: 'automatic'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias para src/
      '@components': path.resolve(__dirname, './src/components'), // Alias para components
      '@assets': path.resolve(__dirname, './src/assets') // Alias para assets
    }
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    },
    postcss: false
  },
  server: {
    port: 3001,
    open: true,
    hmr: {
      overlay: false
    }
  },
  optimizeDeps: {
    include: ['@emotion/react', '@emotion/styled'],
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
