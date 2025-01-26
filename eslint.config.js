// @ts-check
import eslint from '@eslint/js'
import prettierPlugin from 'eslint-plugin-prettier/recommended'
import reactRecommended from 'eslint-plugin-react/configs/recommended.js'

export default [
  eslint.configs.recommended,
  reactRecommended,
  prettierPlugin,
  {
    // Configuración personalizada para React y JSX
    files: ['**/*.{js,jsx}'],
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/storybook-static/**',
      '.eslintrc.js' // Ignorar si existe
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        React: 'readonly',
        process: 'readonly'
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      // Reglas específicas de React
      'react/prop-types': 'off',
      'react/jsx-uses-react': 'error',
      'react/react-in-jsx-scope': 'off',

      // Mejores prácticas
      'no-unused-vars': 'warn',
      'no-console': 'warn',

      // Compatibilidad con Prettier
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto'
        }
      ]
    },
    settings: {
      react: {
        version: '18.3.1' // Especificar tu versión exacta
      }
    }
  }
]
