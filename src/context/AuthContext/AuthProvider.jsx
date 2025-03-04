import { useEffect, useState, useCallback } from 'react'
import api from '@/services/api/axios'
import { AuthContext } from './AuthContext'

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [authToken, setAuthToken] = useState(null)
  const [checking, setChecking] = useState(true)

  // ==============================
  // Validar sesión con el token en memoria
  // ==============================
  const validateSession = async () => {
    if (!authToken) {
      console.warn('No hay token en memoria, no se puede validar la sesión.')
      setIsLoggedIn(false)
      setChecking(false)
      return
    }

    try {
      const response = await api.get('/auth/validate-token', {
        headers: { Authorization: `Bearer ${authToken}` },
        withCredentials: true,
      })

      console.log('Sesión válida', response.data)
      setIsLoggedIn(true)
    } catch (error) {
      console.warn('Sesión no válida', error.response?.data || error.message)
      setIsLoggedIn(false)
    } finally {
      setChecking(false)
    }
  }

  // ==============================
  // Implementar Refresh Token
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
      ) // Se ejecuta cada 55 minutos (5 minutos antes de que expire el token)

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

      // 🔹 Guardar el token en el estado del contexto
      setAuthToken(response.data.token)

      // 🔹 Asignar el token a Axios inmediatamente
      api.defaults.headers.common['Authorization'] =
        `Bearer ${response.data.token}`

      // 🔹 Validar sesión después del login
      await validateSession()

      setIsLoggedIn(true)
      navigate('/profile', { replace: true })
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

    // 🔹 Eliminar el token en memoria
    setAuthToken(null)
    delete api.defaults.headers.common['Authorization']

    setIsLoggedIn(false)
    navigate('/login', { replace: true })
  }, [])

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, checking, authToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
