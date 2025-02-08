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
    Accept: 'application/json' // Asegura que el servidor responda en JSON
  }
})

// ===================================================
// Interceptor de Solicitudes (Request)
// ===================================================
/**
 * Intercepta todas las solicitudes antes de ser enviadas al servidor
 * - Permite registrar información de depuración en modo desarrollo
 * - Aquí se podría agregar lógica adicional antes de enviar la solicitud
 */
api.interceptors.request.use(
  config => {
    if (process.env.NODE_ENV === 'development') {
      console.info(`[Axios] Enviando solicitud: ${config.method.toUpperCase()} ${config.url}`)
    }
    return config
  },
  error => {
    console.error('[Axios Error] Error en la configuración de la solicitud:', error)
    return Promise.reject(error)
  }
)

// ===================================================
// Interceptor de Respuestas (Response)
// ===================================================
/**
 * Intercepta todas las respuestas del servidor
 * - Maneja errores globales como 401 (no autorizado), 403 (prohibido) y 500 (error interno del servidor)
 * - Realiza redirecciones automáticas si es necesario
 */
api.interceptors.response.use(
  response => {
    if (process.env.NODE_ENV === 'development') {
      console.info(
        `[Axios] Respuesta recibida de: ${response.config.url} (Status: ${response.status})`
      )
    }
    return response
  },
  error => {
    if (error.response) {
      const { status, config, data } = error.response

      console.warn(`[Axios Error] Código de estado ${status} para ${config.url}`)

      // ================================
      // Manejo de Errores de Autenticación
      // ================================
      /**
       * Redirige automáticamente al usuario si la sesión ha expirado (401)
       * o si no tiene permisos para acceder a un recurso (403)
       */
      if ([401, 403].includes(status) && typeof window !== 'undefined') {
        const redirectMap = {
          401: '/login?reason=session_expired', // Redirige al login si la sesión ha expirado
          403: '/acceso-denegado' // Redirige a una página de acceso denegado si no tiene permisos
        }

        // Evitamos redirecciones en bucle si ya estamos en la página de destino
        if (window.location.pathname !== redirectMap[status]) {
          console.warn(`[Axios] Redirigiendo a: ${redirectMap[status]}`)
          window.location.href = redirectMap[status]
        }
      }

      // ================================
      // Manejo de Errores del Servidor (5xx)
      // ================================
      /**
       * Si el error es del servidor (códigos 500 o superiores),
       * mostramos un mensaje de error genérico en la consola
       */
      if (status >= 500) {
        console.error(
          '[Axios Error] Error interno del servidor:',
          data.message || 'Inténtalo de nuevo más tarde.'
        )
      }
    } else {
      console.error('[Axios Error] Error de red o el servidor no responde:', error.message)
    }

    return Promise.reject(error)
  }
)

export default api
