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
      document.cookie = 'Token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;'
      document.cookie =
        'refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;'

       
      
      setUser(null)
      setIsLoggedIn(false)
      localStorage.removeItem('userId'); // <--- Borra el userId

      if (navigate) navigate('/login', { replace: true })
    }
  }, [])

  // ==============================
  // Validar sesión almacenada
  // ==============================
  const validateStoredSession = useCallback(async () => {
    try {
      const response = await api.get('/auth/validate-token', {
        withCredentials: true,
      })
  
      console.log('Validación de sesión - Respuesta completa:', response.data)
  
      if (response.data) {
        // Identifica el ID correctamente, sea cual sea el formato
        const userId = response.data._id || response.data.id
        console.log('Respuesta completa:', response); // Imprime toda la respuesta
        console.log('Datos de la respuesta:', response.data); // Imprime solo el cuerpo de la respue

  
        console.log('ID del usuario encontrado:', response.data.userId)
       
        
        if (userId) {
          localStorage.setItem('userId', userId)
          console.log('ID guardado en localStorage:', userId)
        }
  
        setUser({
          id: userId,
          _id: userId, // Guardar en ambos formatos
          username: response.data.username,
          email: response.data.email,
          role: response.data.role,
          profileImage: response.data.profileImage
        })
        
        setIsLoggedIn(true)
      }
    } catch (error) {
      console.warn('Sesión no válida:', error.response?.data || error.message)
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
  
        console.log('Usuario logueado (DATOS COMPLETOS):', response.data)
        console.log('ID del usuario:', response.userId)
        
        // Guarda el ID en localStorage explícitamente
        if (response.data._id) {
          localStorage.setItem('userId', response.data.userId)
          console.log('ID guardado en localStorage:', response.data.userId)
        } else {
          console.error('Error: No se recibió _id del servidor')
        }
        
        // Actualiza el estado con los datos correctos
        setUser({
          id: response.data.userId, // Asignar el _id a la propiedad id
          _id: response.data.userId, // Mantener también el formato original
          username: response.data.username,
          email: response.data.email,
          role: response.data.role
        })
        
        setIsLoggedIn(true)
        
        navigate('/dashboard', { replace: true })
      } catch (error) {
        console.error('Error en login:', error)
      }
    },
    []  // Sin dependencia a validateStoredSession para evitar ciclos
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
