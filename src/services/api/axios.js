import axios from 'axios'

// ===================================================
// Configuración inicial de la instancia de Axios
// ===================================================
/**
 * Crea una instancia preconfigurada de Axios para comunicarse con el backend
 * - BaseURL: Establece la URL base para todas las solicitudes
 * - withCredentials: Habilita el envío automático de cookies (necesario para sesiones)
 * - Headers: Define el tipo de contenido por defecto para las solicitudes
 */
const api = axios.create({
  baseURL: 'http://localhost:3000', // URL base del backend
  withCredentials: true, // Envía cookies automáticamente en cada petición
  headers: {
    'Content-Type': 'application/json' // Formato JSON para todas las solicitudes
  }
})

// ===================================================
// Interceptor de Solicitudes (Request)
// ===================================================
/**
 * Intercepta todas las solicitudes antes de ser enviadas
 * - No requiere agregar token manualmente gracias a withCredentials
 * - Podrías agregar aquí lógica adicional pre-request si fuera necesario
 */
api.interceptors.request.use(
  config => {
    // En desarrollo: Registrar solicitudes usando console.warn permitido
    if (process.env.NODE_ENV === 'development') {
      console.warn(`📤 Enviando solicitud a: ${config.url}`) // Usar warn en lugar de log
    }
    return config
  },
  error => {
    // Manejo centralizado de errores en solicitudes
    console.error('❌ Error en la configuración de la solicitud:', error)
    return Promise.reject(error)
  }
)

// ===================================================
// Interceptor de Respuestas (Response)
// ===================================================
/**
 * Intercepta todas las respuestas del servidor
 * - Maneja errores globales (401, 403, etc.)
 * - Redirecciones automáticas en caso de falta de autenticación
 * - Compatible con SSR (evita uso de window en servidor)
 */
api.interceptors.response.use(
  response => {
    // En desarrollo: Registrar respuestas usando console.warn permitido
    if (process.env.NODE_ENV === 'development') {
      console.warn(`📥 Respuesta recibida de: ${response.config.url}`) // Usar warn en lugar de log
    }
    return response
  },
  error => {
    // Manejo centralizado de errores HTTP
    if (error.response) {
      const { status } = error.response

      // Caso: No autenticado (401)
      if (status === 401) {
        console.warn('🔒 Sesión expirada o no autenticado')
        // Redirección segura (solo en cliente)
        if (typeof window !== 'undefined') {
          window.location.href = '/login?reason=session_expired'
        }
      }

      // Caso: Prohibido (403)
      if (status === 403) {
        console.warn('🚫 Acceso denegado')
        // Redirección solo en cliente
        if (typeof window !== 'undefined') {
          window.location.href = '/acceso-denegado'
        }
      }

      // Caso: Error genérico del servidor (500)
      if (status >= 500) {
        console.error('🔥 Error interno del servidor')
      }
    }

    // Propagamos el error para manejo específico en cada llamada
    return Promise.reject(error)
  }
)

export default api
