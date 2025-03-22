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
  // Función de logout
  // ==============================

  const deleteAllCookies = () => {
    const cookies = document.cookie.split(';'); // Obtener todas las cookies
  
    cookies.forEach(cookie => {
      const [name] = cookie.split('='); // Obtener el nombre de la cookie
      document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`; // Borrar la cookie
    });
  };

  
  const logout = useCallback(async (navigate) => {
    try {
      await api.post('/auth/logout', {}, { withCredentials: true })
    } catch (error) {
      console.error('Error en logout:', error)
    } finally {
      document.cookie = 'Token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;'
      document.cookie = 'refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;'
      
      setUser(null)
      setIsLoggedIn(false)
      localStorage.removeItem('userId'); //Aqui borro el userId
      localStorage.removeItem('token'); //Aqui borro el token
      deleteAllCookies();

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
        // Identifica el ID - prioriza userId, luego _id, luego id
        const userId = response.data.userId || response.data._id || response.data.id;
        
        console.log('Respuesta completa:', response);
        console.log('Datos de la respuesta:', response.data);
        console.log('ID del usuario encontrado:', userId);
        
        if (userId) {
          localStorage.setItem('userId', userId);
          console.log('ID guardado en localStorage:', userId);
        } else {
          console.warn('No se pudo identificar un ID de usuario en la respuesta');
        }
  
        setUser({
          // Estandarizar el formato del usuario con todas las propiedades posibles
          userId: userId,
          id: userId,
          _id: userId,
          username: response.data.username,
          email: response.data.email,
          role: response.data.role,
          profileImage: response.data.profileImage
        });
        
        setIsLoggedIn(true);
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
  
        console.log('Respuesta de login completa:', response.data);
        
        // Identifica el ID - prioriza userId, luego _id, luego id
        const userId = response.data.userId || response.data._id || response.data.id;
        
        if (userId) {
          localStorage.setItem('userId', userId);
          console.log('ID guardado en localStorage:', userId);
        } else {
          console.error('Error: No se pudo identificar un ID de usuario en la respuesta');
        }
        
        // Actualiza el estado con los datos correctos y estandarizados
        setUser({
          userId: userId,
          id: userId,
          _id: userId,
          username: response.data.username,
          email: response.data.email,
          role: response.data.role,
          profileImage: response.data.profileImage
        });
        
        setIsLoggedIn(true);
        
        navigate('/dashboard', { replace: true });
      } catch (error) {
        console.error('Error en login:', error);
      }
    },
    []
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

            // Identifica el ID - prioriza userId, luego _id, luego id
            const userId = response.data.userId || response.data._id || response.data.id;
            
            if (userId) {
              localStorage.setItem('userId', userId);
            }

            setUser((prevUser) => ({
              ...prevUser,
              userId: userId,
              id: userId,
              _id: userId,
              ...response.data, 
            }));
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