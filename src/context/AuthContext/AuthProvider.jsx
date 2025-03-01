import { useEffect, useState } from 'react'
import api from '@/services/api/axios'
import { AuthContext } from './AuthContext'

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [checking, setChecking] = useState(true)

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
          setChecking(false)
        }
      }
    }

    validateSession()

    return () => {
      isMounted = false
    }
  }, [])

  const login = async (credentials, navigate) => {
    try {
      const response = await api.post('/auth/login', credentials, {
        withCredentials: true,
      })

      setUser(response.data)
      setIsLoggedIn(true)
      navigate('/profile', { replace: true }) // ✅ Redirigir tras el login
    } catch (error) {
      throw new Error('Credenciales incorrectas o error en el servidor')
    }
  }

  const logout = async (navigate) => {
    try {
      await api.post('/auth/sign-out', {}, { withCredentials: true })

      setUser(null)
      setIsLoggedIn(false)
      navigate('/login', { replace: true }) // ✅ Redirigir tras el logout
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, checking, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
