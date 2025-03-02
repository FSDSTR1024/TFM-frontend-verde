import { useEffect, useState, useCallback } from 'react'
import api from '@/services/api/axios'
import { AuthContext } from './AuthContext'

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [checking, setChecking] = useState(true)

  // ==============================
  // Validar sesión desde cookies
  // ==============================
  useEffect(() => {
    let isMounted = true

    const validateSession = async () => {
      try {
        const response = await api.get('/auth/validate-token')
        if (isMounted) {
          setUser(response.data)
          setIsLoggedIn(true) // ✅ Actualización directa
        }
      } catch (error) {
        if (isMounted) {
          setUser(null)
          setIsLoggedIn(false)
        }
      } finally {
        if (isMounted) setChecking(false)
      }
    }

    validateSession()
    return () => (isMounted = false)
  }, [])

  // ==============================
  // Función para iniciar sesión
  // ==============================
  // Función login
  const login = useCallback(async (credentials, navigate) => {
    try {
      const response = await api.post('/auth/login', credentials)

      // PRIMERO actualiza el estado
      setUser(response.data)
      setIsLoggedIn(true)

      // LUEGO navega
      navigate('/profile', { replace: true })
    } catch (error) {
      /* ... */
    }
  }, [])

  // ==============================
  // Función para cerrar sesión
  // ==============================
  // Función logout
  const logout = useCallback(async (navigate) => {
    try {
      await api.post('/auth/sign-out')

      // PRIMERO actualiza el estado
      setUser(null)
      setIsLoggedIn(false)

      // LUEGO navega
      navigate('/login', { replace: true })
    } catch (error) {
      /* ... */
    }
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, checking, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
