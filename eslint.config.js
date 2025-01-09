import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'
import reactPlugin from 'eslint-plugin-react'

export default [
  {
    ignores: ['node_modules/', 'dist/', 'build/'], // Ignorar directorios
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: 'readonly', // Si usas JSX sin importar React explícitamente
      },
    },
    settings: {
      react: {
        version: '18', // Especifica tu versión de React aquí
      },
    },
    plugins: {
      react: reactPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules, // Reglas recomendadas para React
      ...prettierConfig.rules, // Configuración de Prettier
      'prettier/prettier': 'error', // Forzar formato de Prettier
      'react/react-in-jsx-scope': 'off', // Desactivar regla obsoleta para React 17+
    },
  },
]
