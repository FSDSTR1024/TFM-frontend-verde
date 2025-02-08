import axios from 'axios'

// ===================================================
// Configuración inicial de la instancia de Axios
// ===================================================
/**
 * Crea una instancia preconfigurada de Axios para comunicarse con el backend
 * - baseURL: Establece la URL base para todas las solicitudes
 * - withCredentials: Habilita el envío automático de cookies (necesario para sesiones)
 * - timeout: Establece un límite de tiempo para las solicitudes (en milisegundos)
 * - headers: Define el tipo de contenido por defecto para las solicitudes
 */
const api = axios.create({
  baseURL: 'http://localhost:3000', // URL base del backend
  withCredentials: true, // Envía cookies automáticamente en cada solicitud (para JWT)
  timeout: 10000, // Tiempo máximo de espera para las solicitudes (10 segundos)
  headers: {
    'Content-Type': 'application/json', // Formato JSON para todas las solicitudes
    Accept: 'application/json', // Asegura que el servidor responda en JSON
  },
})

// ===================================================
// Interceptor de Respuestas (Response)
// ===================================================
/**
 * Intercepta todas las respuestas del servidor
 * - Maneja errores globales como 401 (no autorizado), 403 (prohibido) y 500 (error interno del servidor)
 * - Realiza redirecciones automáticas si es necesario
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, config } = error.response

      console.warn(
        `[Axios Error] Código de estado ${status} para ${config.url}`
      )

      // ================================
      // Manejo de Errores de Autenticación (401, 403)
      // ================================
      /**
       * Redirige automáticamente al usuario si la sesión ha expirado (401)
       * o si no tiene permisos para acceder a un recurso (403)
       */
      if ([401, 403].includes(status) && typeof window !== 'undefined') {
        const currentPath = window.location.pathname

        // Evita redirección en bucle si ya estamos en /login
        if (currentPath !== '/login') {
          console.warn(`[Axios] Redirigiendo a: /login?reason=session_expired`)
          window.location.href = '/login?reason=session_expired'
        }
      }
    }

    return Promise.reject(error)
  }
)

export default api
