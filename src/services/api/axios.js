// =======================================
// axios.js - Configuración de API
// =======================================

import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

let isRefreshing = false // variable para evitar multiples llamadas simultaneas

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if ([401, 403].includes(error.response?.status)) {
      console.warn(' Error 401/403: intentando renovar el token...')

      if (isRefreshing) {
        console.warn(
          'Ya se está renovando el token. Se cancela la solicitud duplicada'
        )
        return Promise.reject(error)
      }

      isRefreshing = true // De esta manera se bloquean las nuevas solicitudes de refresh mientras se ejecuta una

      try {
        // Intentar renovar el token antes de forzar el logout
        const refreshResponse = await axios.post(
          `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/auth/refresh-token`,
          {},
          { withCredentials: true }
        )

        // Si la renovación es exitosa, actualizar el Access Token y reintentar la solicitud original
        document.cookie = `token=${refreshResponse.data.accessToken}; path=/; secure; httpOnly;`
        error.config.headers['Authorization'] =
          `Bearer ${refreshResponse.data.accessToken}`

        return api.request(error.config)
      } catch (refreshError) {
        console.error('❌ Error al renovar el token:', refreshError)

        isRefreshing = false // Aseguramos que el flag se reinicie en caso de error

        // Si la renovación falla, redirigir al login
        const currentPath = window.location.pathname
        if (!currentPath.includes('/login')) {
          console.warn('Redirigiendo al login debido a sesión expirada.')
          window.location.href = `/login?reason=session_expired`
        }
      }
    }
    return Promise.reject(error)
  }
)

export default api
