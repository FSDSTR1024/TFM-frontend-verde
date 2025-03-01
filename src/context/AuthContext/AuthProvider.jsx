// =========================================
// Contexto de Autenticación (AuthProvider)
// =========================================

import { useEffect, useState } from 'react'
import api from '@/services/api/axios'
import { AuthContext } from './AuthContext'

const AuthProvider = ({ children }) => {
  // =========================================
  // Estados de autenticación
  // =========================================
  const [isLoggedIn, setIsLoggedIn] = useState(false) // Estado de usuario autenticado
  const [user, setUser] = useState(null) // Datos del usuario autenticado
  const [checking, setChecking] = useState(true) // Estado de carga mientras se valida la sesión

  // =========================================
  // Validación de sesión al montar el componente
  // =========================================
  useEffect(() => {
    let isMounted = true

    const validateSession = async () => {
      try {
        const response = await api.get('/auth/validate-token', {
          withCredentials: true,
        })

        if (isMounted) {
          setUser(response.data)
          setIsLoggedIn(true)
        }
      } catch (error) {
        if (isMounted) {
          setIsLoggedIn(false)
        }
      } finally {
        if (isMounted) {
          setChecking(false) // Finaliza la validación de sesión
        }
      }
    }

    validateSession()

    return () => {
      isMounted = false // Previene actualizaciones en estado desmontado
    }
  }, [])

  // =========================================
  // Función para iniciar sesión
  // =========================================
  const login = async (credentials, navigate) => {
    try {
      const response = await api.post('/auth/login', credentials, {
        withCredentials: true,
      })

      setUser(response.data)
      setIsLoggedIn(true)
      navigate('/profile', { replace: true }) // Redirigir tras el login
    } catch (error) {
      throw new Error('Credenciales incorrectas o error en el servidor')
    }
  }

  // =========================================
  // Función para cerrar sesión
  // =========================================
  const logout = async (navigate) => {
    try {
      await api.post('/auth/sign-out', {}, { withCredentials: true })

      setUser(null)
      setIsLoggedIn(false)
      navigate('/login', { replace: true }) // Redirigir tras el logout
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  // =========================================
  // Proveedor de contexto
  // =========================================
  return (
    <AuthContext.Provider value={{ isLoggedIn, user, checking, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
