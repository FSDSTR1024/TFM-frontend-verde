// =========================================
// Contexto de Autenticación para el Frontend
// =========================================

import { useEffect, useState } from 'react'
import api from '@/services/api/axios' // Importación de la instancia de Axios configurada
import { AuthContext } from './AuthContext' // Contexto global de autenticación

/**
 * Proveedor de Autenticación que gestiona el estado global del usuario.
 *
 * @param {Object} children - Componentes secundarios que tendrán acceso al contexto.
 */
const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Estado para verificar si el usuario está autenticado
  const [user, setUser] = useState(null) // Información del usuario autenticado
  const [checking, setChecking] = useState(true) // Estado para verificar si la autenticación está en proceso

  // ================================
  // Validación del Token al Recargar la Página
  // ================================
  /**
   * Valida automáticamente el token JWT almacenado en cookies cada vez que se recarga la página.
   */
  useEffect(() => {
    const validateSession = async () => {
      try {
        const response = await api.get('/auth/session', {
          withCredentials: true, // De esta forma enviamos automáticamente las cookies al backend
        })

        setUser(response.data)
        setIsLoggedIn(true)
      } catch (error) {
        setIsLoggedIn(false)
      } finally {
        setChecking(false)
      }

      validateSession()
    }
  }, [])

  // ================================
  // Función de Inicio de Sesión (Login)
  // ================================
  /**
   * Inicia sesión y almacena la información del usuario en el contexto global.
   *
   * @param {Object} userData - Información del usuario autenticado (token, username, email, image).
   */
  const login = (userData) => {
    setUser(userData) // Guarda la información del usuario en el estado
    setIsLoggedIn(true) // Cambia el estado de autenticación a verdadero
  }

  // ================================
  // Función de Cierre de Sesión (Logout)
  // ================================
  /**
   * Cierra la sesión del usuario eliminando el token de autenticación.
   */
  const logout = async () => {
    try {
      await api.post('/auth/sign-out', {}, { withCredentials: true }) // Solicitud para limpiar la cookie del servidor
      localStorage.removeItem('token') // debemos eliminar el token del localStorage
      setUser(null) // Limpia el usuario en el estado
      setIsLoggedIn(false) // Cambia el estado de autenticación a falso

      window.location.href = '/login'
    } catch (error) {
      console.error('Error al cerrar la sesión:', error)
    }
  }

  // ================================
  // Proveedor del Contexto de Autenticación
  // ================================
  return (
    <AuthContext.Provider value={{ isLoggedIn, user, checking }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
