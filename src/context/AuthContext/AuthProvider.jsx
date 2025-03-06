import { useEffect, useState, useCallback } from 'react'
import api from '@/services/api/axios'
import { AuthContext } from './AuthContext'

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [checking, setChecking] = useState(true)
  const [user, setUser] = useState(null)

  // ==============================
  // Validar sesión almacenada
  // ==============================
  const validateStoredSession = async () => {
    try {
      const response = await api.get('/auth/validate-token', {
        withCredentials: true,
      })

      console.log('Sesión válida:', response.data)
      setUser(response.data.user)
      setIsLoggedIn(true)
    } catch (error) {
      console.warn('Sesión no válida:', error.response?.data || error.message)

      // Si el token es inválido o hay un error, cerramos sesión automáticamente
      logout()
    } finally {
      setChecking(false) // Finalizamos la validación de sesión
    }
  }

  // Ejecutar `validateStoredSession` al cargar la página
  useEffect(() => {
    validateStoredSession()
  }, [])

  // ==============================
  // Refresh Token cada 55 minutos
  // ==============================
  useEffect(() => {
    if (isLoggedIn) {
      const interval = setInterval(
        async () => {
          try {
            const response = await api.post(
              '/auth/refresh-token',
              {},
              { withCredentials: true }
            )
            setUser(response.data.user) // Actualizamos el usuario tras refresh
          } catch (error) {
            console.error('Error al renovar el token:', error)
            setUser(null)
            setIsLoggedIn(false)
          }
        },
        55 * 60 * 1000
      )

      return () => clearInterval(interval)
    }
  }, [isLoggedIn])

  // ==============================
  // Función de login
  // ==============================
  const login = useCallback(async (credentials, navigate) => {
    try {
      console.log('Intentando iniciar sesión con:', credentials)

      if (!credentials?.email || !credentials?.password) {
        console.error('Error: Email o password no proporcionados.')
        return
      }

      const response = await api.post('/auth/login', credentials, {
        withCredentials: true,
      })

      console.log('Usuario logueado:', response.data)

      // Validar sesión después del login
      await validateStoredSession()

      navigate('/dashboard', { replace: true })
    } catch (error) {
      console.error('Error en login:', error)
    }
  }, [])

  // ==============================
  // Función de logout
  // ==============================
  const logout = useCallback(async (navigate) => {
    try {
      await api.post('/auth/logout', {}, { withCredentials: true })
    } catch (error) {
      console.error('Error en logout:', error)
    } finally {
      // Aseguramos que la cookie se elimine correctamente
      document.cookie = 'Token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;'
      document.cookie =
        'refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;'
      setUser(null)
      setIsLoggedIn(false)
      navigate('/login', { replace: true })
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, checking, user, setUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
