import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css' // Asegura que los estilos globales se carguen

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

