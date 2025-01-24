// eslint.config.js
import * as importPlugin from 'eslint-plugin-import' // ← Namespace import
import jsdocPlugin from 'eslint-plugin-jsdoc'
import prettierPlugin from 'eslint-plugin-prettier'
import reactPlugin from 'eslint-plugin-react'

export default [
  {
    ignores: ['node_modules/', 'dist/', 'build/'],
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: { React: 'readonly' },
    },
    settings: {
      react: { version: '18' },
      jsdoc: { mode: 'typescript' },
    },
    plugins: {
      react: reactPlugin,
      prettier: prettierPlugin,
      jsdoc: jsdocPlugin,
      import: importPlugin, // ✅ Plugin importado correctamente
    },
    rules: {
      /* ... resto de reglas ... */
    },
  },
  // Config para tests
  {
    files: ['**/*.test.jsx'],
    env: { jest: true },
    rules: { 'react/prop-types': 'off' },
  },
]
