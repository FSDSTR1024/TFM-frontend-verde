import { useEffect, useState, useCallback } from 'react'
import api from '@/services/api/axios'
import { AuthContext } from './AuthContext'

const AuthProvider = ({ children }) => {
  // ==============================
  // Estado Global de Autenticación
  // ==============================
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [checking, setChecking] = useState(true)
  const [user, setUser] = useState(null)

  // ==============================
  // Función de logout (Debe ir antes de `validateStoredSession`)
  // ==============================
  const logout = useCallback(async (navigate) => {
    try {
      await api.post('/auth/logout', {}, { withCredentials: true })
    } catch (error) {
      console.error('Error en logout:', error)
    } finally {
      setUser(null)
      setIsLoggedIn(false)

      if (navigate) {
        navigate('/login', { replace: true })
      }

      setChecking(false)

      setTimeout(() => {
        window.location.href = '/login'
      }, 100)
    }
  }, [])

  // ==============================
  // Validar sesión almacenada
  // ==============================
  const validateStoredSession = useCallback(async () => {
    console.log('Intentando validar sesión con /auth/validate-token...')
    try {
      const response = await api.get('/auth/validate-token', {
        withCredentials: true,
      })

      console.log('Respuesta de /auth/validate-token:', response)

      if (response.data) {
        setUser(response.data)
        setIsLoggedIn(true)

        // Guardar token en headers de axios para futuras solicitudes
        api.default.headers.common['Authorization'] =
          `Bearer ${response.data.token}`
      }
    } catch (error) {
      console.warn('Sesión no valida:', error.response?.data || error.message)
      logout()
    } finally {
      setChecking(false)
    }
  }, [logout])

  // ==============================
  // Función de login
  // ==============================
  const login = useCallback(
    async (credentials, navigate) => {
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

        await validateStoredSession()

        navigate('/dashboard', { replace: true })
      } catch (error) {
        console.error('Error en login:', error)
      }
    },
    [validateStoredSession]
  )

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

            setUser((prevUser) => ({
              ...prevUser,
              ...response.data, // Aseguramos que los datos sean los correctos
            }))
          } catch (error) {
            console.error('Error al renovar el token:', error)
            logout()
          }
        },
        55 * 60 * 1000
      )

      return () => clearInterval(interval)
    }
  }, [isLoggedIn, logout])

  // ==============================
  // Ejecutar `validateStoredSession` al cargar la página
  // ==============================
  useEffect(() => {
    console.log('Ejecutando validateStoredSession')
    validateStoredSession()
  }, [validateStoredSession])

  // ==============================
  // Renderizar el Contexto
  // ==============================
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        checking,
        user,
        setUser,
        login,
        logout,
        validateStoredSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
