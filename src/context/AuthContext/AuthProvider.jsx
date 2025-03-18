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
   * Verifica la sesión del usuario.
   * - Se ejecuta al montar el componente
   * - Se ejecuta cada vez que `isLoggedIn` cambia
   */
  const verifySession = async () => {
    setChecking(true)
    const sessionUser = await getUserSession()
    if (sessionUser) {
      setUser(sessionUser)
      setIsLoggedIn(true)
    } else {
      setUser(null)
      setIsLoggedIn(false)
    }
    setChecking(false)
  }

  // 🔥 Se ejecuta al montar el componente
  useEffect(() => {
    verifySession()
  }, [])

  // 🔥 Nuevo efecto: detecta cuando `isLoggedIn` cambia y actualiza la sesión automáticamente
  useEffect(() => {
    if (isLoggedIn) {
      verifySession() // 🔥 Refresca la sesión automáticamente después del login
    }
  }, [isLoggedIn])

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, checking, login, handleLogout, verifySession }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
