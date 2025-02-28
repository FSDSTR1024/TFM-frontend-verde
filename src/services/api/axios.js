import axios from 'axios'

// ===================================================
// Configuración inicial de la instancia de Axios
// ===================================================
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000', // ✅ Variable de entorno para producción
  withCredentials: true, // ✅ Permite el envío automático de cookies en cada solicitud (necesario para autenticación)
  timeout: 10000, // ✅ Límite de espera de 10 segundos por solicitud
  headers: {
    'Content-Type': 'application/json', // ✅ Especifica JSON como formato de solicitud
    Accept: 'application/json', // ✅ Asegura que el backend responda en formato JSON
  },
})

// ===================================================
// Interceptor de Respuestas (Response)
// ===================================================
api.interceptors.response.use(
  (response) => response, // Si la respuesta es exitosa, simplemente la devuelve
  (error) => {
    if (error.response) {
      const { status, config } = error.response

      console.warn(
        `[Axios Error] Código de estado ${status} para ${config.url}`
      )

      // ================================
      // Manejo de Errores de Autenticación (401, 403)
      // ================================
      if ([401, 403].includes(status) && typeof window !== 'undefined') {
        const currentPath = window.location.pathname
        if (currentPath !== '/login') {
          console.warn(`[Axios] Redirigiendo a: /login?reason=session_expired`)
          window.location.href = '/login?reason=session_expired'
        }
      }

      // Manejo de otros errores comunes
      if (status === 500) {
        console.error('Error interno del servidor. Inténtelo más tarde.')
      } else if (status === 404) {
        console.warn('Recurso no encontrado.')
      } else if (status === 429) {
        console.warn('Demasiadas solicitudes. Inténtalo más tarde.')
      }
    }

    return Promise.reject(error) // Rechaza la promesa para que los errores sean manejados donde se llame la API
  }
)

export default api
