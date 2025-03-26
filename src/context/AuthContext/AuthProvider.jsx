import { useEffect, useState, useCallback } from 'react'
import { login, logout, getUserSession } from '@/services/api/authController'
import { AuthContext } from './AuthContext'

/**
 * Proveedor de Autenticación que gestiona el estado global de la sesión del usuario.
 */
const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [checking, setChecking] = useState(true)
  const [user, setUser] = useState(null)

  const API_BASE = import.meta.env.VITE_API_BASE

  /**
   * Función para iniciar sesión.
   * - Actualiza el estado global del usuario y la sesión.
   */
  const login = (userData) => {
    setUser(userData)
    setIsLoggedIn(true)
  }

  /**
   * Función para cerrar sesión.
   * - Llama al backend para eliminar la sesión
   * - Limpia el estado global del usuario
   * - Redirige al login
   */
  const handleLogout = useCallback(async () => {
    const success = await logout()
    if (success) {
      setUser(null)
      setIsLoggedIn(false)
      setChecking(false)
      window.location.href = '/login' // 🔚 Redirige al login tras cerrar sesión
    } else {
      console.error('Error en el logout.')
    }
  }, [])

  /**
   * Función para verificar la sesión del usuario.
   * - Llama al backend para validar la sesión
   * - Actualiza el estado global de la sesión
   *
   */

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch(`${API_BASE}/auth/validate-token`, {
          method: 'GET',
          credentials: 'include',
        })

        if (response.ok) {
          const data = await response.json()
          setUser(data)
          setIsLoggedIn(true)
        }
      } catch (error) {
        console.error('Error al validar sesión:', error)
      } finally {
        setChecking(false)
      }
    }

    checkSession()
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, checking, login, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
