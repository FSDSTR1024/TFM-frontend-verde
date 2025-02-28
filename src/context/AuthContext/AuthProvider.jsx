// =========================================
// Contexto de Autenticación para el Frontend
// =========================================

import { useEffect, useState } from 'react'
import api from '@/services/api/axios' // Instancia de Axios configurada
import { AuthContext } from './AuthContext' // Contexto global de autenticación

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Estado de autenticación
  const [user, setUser] = useState(null) // Información del usuario
  const [checking, setChecking] = useState(true) // Estado de carga

  // ================================
  //  Validación de sesión con el backend
  // ================================
  useEffect(() => {
    const validateSession = async () => {
      try {
        const response = await api.get('/auth/session', {
          withCredentials: true, // Enviar cookies automáticamente
        })

        setUser(response.data)
        setIsLoggedIn(true)
      } catch (error) {
        console.error('Sesión inválida o expirada:', error)
        setIsLoggedIn(false)
      } finally {
        setChecking(false)
      }
    }

    validateSession()
  }, [])

  // ================================
  // Función de Inicio de Sesión (Login)
  // ================================
  const login = async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials, {
        withCredentials: true, // Recibir cookies seguras
      })

      setUser(response.data)
      setIsLoggedIn(true)
    } catch (error) {
      console.error('Error en la autenticación:', error)
      throw new Error('Credenciales incorrectas o error en el servidor')
    }
  }

  // ================================
  // Función de Cierre de Sesión (Logout)
  // ================================
  const logout = async () => {
    try {
      await api.post('/auth/logout', {}, { withCredentials: true })

      setUser(null)
      setIsLoggedIn(false)
      window.location.href = '/login' // Redirigir al login tras cerrar sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, checking, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
