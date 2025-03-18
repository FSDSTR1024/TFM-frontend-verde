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

  /**
   * Función para cerrar sesión.
   * - Llama al backend para eliminar la sesión
   * - Limpia el estado global del usuario
   * - Redirige al login
   */
  const handleLogout = useCallback(async () => {
    console.log('Ejecutando logout...')
    const success = await logout()
    if (success) {
      console.log('Logout exitoso, limpiando sesión...')
      setUser(null)
      setIsLoggedIn(false)
      setChecking(false)
      window.location.href = '/login' // 🔥 Redirigir al login tras cerrar sesión
    } else {
      console.error('Error en el logout.')
    }
  }, [])

  /**
   * Efecto para comprobar la sesión al montar el componente.
   */
  useEffect(() => {
    const verifySession = async () => {
      const sessionUser = await getUserSession()
      if (sessionUser) {
        setUser(sessionUser)
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
        setUser(null)
      }
      setChecking(false)
    }

    verifySession()
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
