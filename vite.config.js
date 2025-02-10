import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'
import tailwindcss from '@tailwindcss/vite'

// Convertir la URL del módulo actual en rutas de archivo
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configuración de Vite
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
        
      },
      jsxRuntime: 'automatic'
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets')
    }
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    }
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
