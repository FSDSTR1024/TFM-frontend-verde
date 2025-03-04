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
  const validateSession = async () => {
    try {
      const response = await api.get('/auth/validate-token', {
        withCredentials: true,
      })

      console.log('Sesión válida', error.response?.data || error.message) // Eliminar después de desarrollo.
      setUser(response.data)
      setIsLoggedIn(true)
    } catch (error) {
      console.warn('Sesión no valida', error.response?.data || error.message)
      setUser(null)
      setIsLoggedIn(false)
    } finally {
      setChecking(false)
    }
  }

  useEffect(() => {
    validateSession() // verificamos sesión al cargar la app
  }, [])
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
            console.error('Error al renovar el token:', error) // Borrar esta depuración cuando hayamos solucionado el problema
            setIsLoggedIn(false)
            setUser(null)
          }
        },
        55 * 60 * 1000
      ) // Se ejecuta cada 55 minutos (5 minutos antes de que expire el token)

      return () => clearInterval(interval)
    }
  }, [isLoggedIn])

  // ==============================
  // Función register
  // ==============================
  const register = useCallback(async (credentials, navigate) => {
    try {
      const response = await api.post('/auth/register', credentials, {
        withCredentials: true,
      })

      // PRIMERO actualiza el estado con los datos del usuario
      setUser(response.data.user)
      setIsLoggedIn(true)

      // LUEGO navega al perfil del usuario
      navigate('/profile', { replace: true })
    } catch (error) {
      console.error('Error en register:', error)
    }
  }, [])

  // ==============================
  // Función login
  // ==============================
  const login = useCallback(async (credentials, navigate) => {
    try {
      const response = await api.post('/auth/login', credentials, {
        withCredentials: true,
      })

      // PRIMERO actualiza el estado
      console.log('Usuario logueado', response.data.user) // Eliminarlo después de encontrar el error

      // Debemos asegurarnos de que axios utilice el nuevo token en futuras solicitudes antes de cualquier otra acción
      api.defaults.headers.common['Authorization'] =
        `Bearer ${response.data.accessToken}`

      // Validar sesión inmediatamente despuésdel login
      await validateSession()

      // Después acualizamos el estado del usuario
      setUser(response.data.user)
      setIsLoggedIn(true)

      // LUEGO navega
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

      // PRIMERO actualiza el estado
      console.log('Cierre de sesión exitoso.')

      // Limpiar token en axios
      delete api.defaults.headers.common['Authorization']

      // Limpiar estado global de los usuarios
      setUser(null)
      setIsLoggedIn(false)

      // LUEGO navega
      navigate('/login', { replace: true })
    } catch (error) {
      console.error('Error en logout:', error)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, checking, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
