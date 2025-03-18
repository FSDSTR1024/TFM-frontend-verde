import api from './axios'

/**
 * Inicia sesión enviando credenciales al backend.
 * @param {string} email - Correo del usuario.
 * @param {string} password - Contraseña del usuario.
 * @returns {Promise<object>} - Respuesta con los datos del usuario autenticado.
 */
export const logout = async () => {
  try {
    console.log('Enviando solicitud de logout...')
    const response = await api.post(
      '/auth/logout',
      {},
      { withCredentials: true }
    )
    console.log('Respuesta del logout:', response.data)
    return true
  } catch (error) {
    console.error('Error en logout:', error.response?.data || error.message)
    return false
  }
}

export const login = async (email, password) => {
  try {
    console.log('Enviando login con:', { email, password })
    const response = await api.post(
      '/auth/login',
      { email, password },
      { withCredentials: true }
    )
    console.log('Respuesta del servidor:', response.data)
    return response.data
  } catch (error) {
    console.error('Error en login:', error.response?.data || error.message)
    throw error
  }
}

/**
 * Obtiene la sesión del usuario autenticado desde el backend.
 * @returns {Promise<object|null>} - Datos del usuario o null si no está autenticado.
 */
export const getUserSession = async () => {
  try {
    console.log('Verificando sesión...') // 🔥 Depuración
    const response = await api.get('/auth/validate-token', {
      withCredentials: true, // Asegurar que se envíe la cookie
    })

    console.log('Sesión validada:', response.data) // 🔍 Verificar respuesta del backend

    return response.data
  } catch (error) {
    console.error(
      'Error validando token:',
      error.response?.data || error.message
    )
    return null
  }
}
