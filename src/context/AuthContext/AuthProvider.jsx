import { useEffect, useState, useCallback } from 'react'
import api from '@/services/api/axios'
import { AuthContext } from './AuthContext'

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authToken, setAuthToken] = useState(null)
  const [checking, setChecking] = useState(true)

  // ==============================
  // Definir la función `validateStoredSession`
  // ==============================
  const validateStoredSession = async () => {
    try {
      const response = await api.get('/auth/validate-token', {
        withCredentials: true, // La cookie se enviará automáticamente
      })

      console.log('✅ Sesión válida:', response.data)
      setIsLoggedIn(true)
    } catch (error) {
      console.warn(
        '❌ Sesión no válida:',
        error.response?.data || error.message
      )
      setIsLoggedIn(false)
    } finally {
      setChecking(false)
    }
  }

  // ==============================
  // jecutar `validateStoredSession` al cargar la página
  // ==============================
  useEffect(() => {
    validateStoredSession()
  }, [])

  // ==============================
  // Implementar Refresh Token cada 55 minutos
  // ==============================
  useEffect(() => {
    if (isLoggedIn) {
      const interval = setInterval(
        async () => {
          try {
            await api.post('/auth/refresh-token', {}, { withCredentials: true })
          } catch (error) {
            console.error('Error al renovar el token:', error)
            setIsLoggedIn(false)
          }
        },
        55 * 60 * 1000
      )

      return () => clearInterval(interval)
    }
  }, [isLoggedIn])

  // ==============================
  // Función login
  // ==============================
  const login = useCallback(async (credentials, navigate) => {
    try {
      console.log('Intentando iniciar sesión con:', credentials)

      if (!credentials?.email || !credentials?.password) {
        console.error('❌ Error: Email o password no proporcionados.')
        return
      }

      const response = await api.post('/auth/login', credentials, {
        withCredentials: true,
      })

      console.log('Usuario logueado:', response.data)

      // Validar sesión después del login (AQUÍ ESTABA EL ERROR)
      await validateStoredSession()

      navigate('/dashboard', { replace: true })
    } catch (error) {
      console.error('Error en login:', error)
    }
  }, [])

  // ==============================
  // Función logout
  // ==============================
  const logout = useCallback(async (navigate) => {
    try {
      await api.post('/auth/logout', {}, { withCredentials: true })
    } catch (error) {
      console.error('Error en logout:', error)
    }

    setIsLoggedIn(false)
    navigate('/login', { replace: true })
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, checking, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
