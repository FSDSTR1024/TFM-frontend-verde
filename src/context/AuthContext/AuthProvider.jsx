import { useEffect, useState, useCallback } from 'react'
import api from '@/services/api/axios'
import { AuthContext } from './AuthContext'

/**
 * Proveedor de Autenticación que gestiona el estado global de la sesión del usuario.
 * Incluye manejo de login, logout y validación de sesión.
 */

const AuthProvider = ({ children }) => {
  // Estado global de autenticación
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [checking, setChecking] = useState(true)
  const [user, setUser] = useState(null)

  /**
   * Función para cerrar sesión.
   * Llama al backend para eliminar la sesión y limpia el estado global.
   */
  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout', {}, { withCredentials: true })
    } catch (error) {
      console.error('Error en logout:', error)
    } finally {
      setUser(null)
      setIsLoggedIn(false)
      setChecking(false)

      // Si el usuario estaba en otra página, redirigir al login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
  }, [])

  /**
   * Función para validar si hay una sesión almacenada.
   * Verifica con el backend si el usuario está autenticado y actualiza el estado.
   */
  const validateStoredSession = useCallback(async () => {
    console.log('Validando sesión almacenada...')
    try {
      const response = await api.get('/auth/validate-token', {
        withCredentials: true,
      })

      console.log('Respuesta de /auth/validate-token:', response)

      if (response.data) {
        setUser(response.data)
        setIsLoggedIn(true)
        api.defaults.headers.common['Authorization'] =
          `Bearer ${response.data.token}`
      }
    } catch (error) {
      console.warn('Sesión no válida:', error.response?.data || error.message)
      logout()
    } finally {
      setChecking(false)
    }
  }, [logout])

  /**
   * Efecto para validar la sesión al cargar la aplicación.
   * Se asegura de ejecutar la validación solo si el componente sigue montado.
   */
  useEffect(() => {
    let isMounted = true
    console.log('Ejecutando validateStoredSession')

    validateStoredSession().finally(() => {
      if (isMounted) {
        setChecking(false)
      }
    })

    return () => {
      isMounted = false
    }
  }, [])

  /**
   * Efecto para manejar la renovación del token de autenticación.
   * Se ejecuta periódicamente si el usuario está autenticado.
   */
  useEffect(() => {
    if (!isLoggedIn) return

    const interval = setInterval(
      async () => {
        try {
          const response = await api.post(
            '/auth/refresh-token',
            {},
            { withCredentials: true }
          )

          if (response.data) {
            setUser((prevUser) => ({
              ...prevUser,
              ...response.data,
            }))
          }
        } catch (error) {
          console.error('Error al renovar el token:', error)
          logout()
        }
      },
      55 * 60 * 1000
    ) // Se ejecuta cada 55 minutos

    return () => clearInterval(interval)
  }, [isLoggedIn, logout])

  /**
   * Proveedor de contexto que permite el acceso global al estado de autenticación.
   */
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        checking,
        user,
        setUser,
        logout,
        validateStoredSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
