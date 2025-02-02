import axios from 'axios'

// ===================================================
// Configuración inicial de la instancia de Axios
// ===================================================
/**
 * Crea una instancia preconfigurada de Axios para comunicarse con el backend
 * - BaseURL: Establece la URL base para todas las solicitudes
 * - withCredentials: Habilita el envío automático de cookies (necesario para sesiones)
 * - Timeout: Establece un límite de tiempo para las solicitudes (en milisegundos)
 * - Headers: Define el tipo de contenido por defecto para las solicitudes
 */
const api = axios.create({
  baseURL: 'http://localhost:3000', //  URL base del backend
  withCredentials: true, //  Envía cookies automáticamente en cada petición (para JWT)
  timeout: 10000, //  Tiempo máximo de espera para las solicitudes (10 segundos)
  headers: {
    'Content-Type': 'application/json' //  Formato JSON para todas las solicitudes
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
      console.warn(` Enviando solicitud a: ${config.url}`) //  Registro de solicitudes en modo desarrollo
    }
    return config // Retornamos la configuración sin modificar
  },
  error => {
    console.error('❌ Error en la configuración de la solicitud:', error) //  Manejamos errores de configuración de solicitud
    return Promise.reject(error) //  Propagamos el error para que pueda ser capturado más adelante
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
      console.warn(` Respuesta recibida de: ${response.config.url}`) //  Registro de respuestas en modo desarrollo
    }
    return response //  Retornamos la respuesta sin modificar si todo está correcto
  },
  error => {
    if (error.response) {
      const { status } = error.response

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

        // ✅ Evitamos redirecciones en bucle si ya estamos en la página de destino
        if (window.location.pathname !== redirectMap[status]) {
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
        console.error(' Error interno del servidor') // Error interno del servidor
      }
    }

    return Promise.reject(error) // Propagamos el error para manejo específico en cada llamada
  }
)

export default api
