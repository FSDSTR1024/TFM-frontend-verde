// @ts-check
import eslint from '@eslint/js'
import prettierPlugin from 'eslint-plugin-prettier/recommended'
import reactRecommended from 'eslint-plugin-react/configs/recommended.js'
import globals from 'globals' // ✅ Paquete necesario para los globales del navegador

export default [
  eslint.configs.recommended,
  reactRecommended,
  prettierPlugin,
  {
    files: ['**/*.{js,jsx}'],
    ignores: ['**/node_modules/**', '**/dist/**', '**/storybook-static/**', '.eslintrc.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser, // ✅ Incluye todos los globales del navegador (window, document, etc.)
        ...globals.node, // ✅ Globales de Node.js (process)
        React: 'readonly'
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      // React
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'error',
      'react/react-in-jsx-scope': 'off',

      // Variables no utilizadas
      'no-unused-vars': 'warn',

      // Console control
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error', 'info'] // ✅ Métodos permitidos
        }
      ],

      // Prettier
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
          printWidth: 100, // ✅ Especifica tus preferencias
          singleQuote: true // ✅ Ejemplo de opción adicional
        }
      ]
    },
    settings: {
      react: {
        version: 'detect' // ✅ Mejor que 'detecte' automáticamente
      }
    }
  }
]
