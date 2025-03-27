import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthProvider from './context/AuthContext/AuthProvider'

try {
  const root = createRoot(document.getElementById('root'))
  root.render(
    <StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </StrictMode>
  )
} catch (error) {
  console.error('Error al iniciar la aplicación:', error)
}
