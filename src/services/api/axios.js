// =======================================
// axios.js - Configuración de API
// =======================================
import axios from 'axios' // Verifica que esté al inicio del archivo
import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext/AuthContext' // Importamos correctamente desde AuthContext.js

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

let isRefreshing = false // Flag para evitar múltiples llamadas simultáneas

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if ([401, 403].includes(error.response?.status)) {
      console.warn('Error 401/403: intentando renovar el token...')

      if (isRefreshing) {
        console.warn(
          'Ya se está renovando el token. Se cancela la solicitud duplicada.'
        )
        return Promise.reject(error)
      }

      isRefreshing = true

      try {
        // Intentar renovar el token antes de forzar el logout
        const refreshResponse = await axios.post(
          `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/auth/refresh-token`,
          {},
          { withCredentials: true }
        )

        console.log('Token renovado correctamente.')

        // Acceder al contexto global para actualizar el usuario
        const { validateStoredSession } = useContext(AuthContext)
        if (validateStoredSession) {
          await validateStoredSession()
        }

        // Reintentar la solicitud original con el nuevo token
        error.config.headers['Authorization'] =
          `Bearer ${refreshResponse.data.accessToken}`
        return api.request(error.config)
      } catch (refreshError) {
        console.error('Error al renovar el token:', refreshError)

        isRefreshing = false

        // Verificar si la sesión realmente expiró antes de redirigir
        const currentPath = window.location.pathname
        if (
          error.response?.status === 401 &&
          error.response?.data?.message === 'Token expirado'
        ) {
          if (!currentPath.includes('/login')) {
            console.warn('Redirigiendo al login debido a sesión expirada.')
            window.location.href = `/login?reason=session_expired`
          }
        }
      }
    }
    return Promise.reject(error)
  }
)

export default api
