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
    const validateToken = async () => {
      try {
        const response = await api.get('/auth/validate-token', {
          withCredentials: true, // Asegura el envío de cookies para validar el token
        })

        setUser(response.data) // Establece la información del usuario si el token es válido
        setIsLoggedIn(true) // Cambia el estado de autenticación a verdadero
      } catch (error) {
        console.error('Token inválido o expirado:', error)
        setIsLoggedIn(false) // Cambia el estado de autenticación a falso si el token no es válido
      } finally {
        setChecking(false) // Finaliza el estado de verificación
      }
    }

    validateToken() // Llama a la función para validar el token al cargar la aplicación
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
      setUser(null) // Limpia la información del usuario en el estado
      setIsLoggedIn(false) // Cambia el estado de autenticación a falso
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  // ================================
  // Proveedor del Contexto de Autenticación
  // ================================
  return (
    <AuthContext.Provider value={{ isLoggedIn, user, checking, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
