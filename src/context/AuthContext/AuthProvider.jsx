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
   * Función para iniciar sesión.
   * - Actualiza el estado global del usuario y la sesión.
   */
  const login = (userData) => {
    console.log('Actualizando estado global con login():', userData) // Depuracion borrar en produccion
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
    console.log('Ejecutando logout...')
    const success = await logout()
    if (success) {
      console.log('Logout exitoso, limpiando sesión...')
      setUser(null)
      setIsLoggedIn(false)
      setChecking(false)
      window.location.href = '/login' // 🔚 Redirige al login tras cerrar sesión
    } else {
      console.error('Error en el logout.')
    }
  }, [])

  /**
   * Verifica la sesión del usuario al montar el componente.
   */
  useEffect(() => {
    const checkSession = async () => {
      const sessionUser = await getUserSession()
      if (sessionUser) {
        setUser(sessionUser) // Actualiza el estado global del usuario
        setIsLoggedIn(true)
      }
      setChecking(false)
    }

    checkSession()
    console.log('Nuevo user.profileImage en AuthProvider:', user?.profileImage) // Depuración borrar en producción
  }, [isLoggedIn, user?.profileImage])

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, checking, login, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
