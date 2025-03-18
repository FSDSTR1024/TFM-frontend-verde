import api from './axios'

/**
 * Inicia sesión enviando credenciales al backend.
 * @param {string} email - Correo del usuario.
 * @param {string} password - Contraseña del usuario.
 * @returns {Promise<object>} - Respuesta con los datos del usuario autenticado.
 */
export const login = async (email, password) => {
  try {
    console.log('Enviando login con:', { email, password })
    const response = await api.post(
      '/auth/login',
      { email, password },
      { withCredentials: true }
    )
    return response.data
  } catch (error) {
    console.error('Error en login:', error.response?.data || error.message)
    throw error
  }
}

/**
 * Cierra la sesión del usuario.
 * Llama a `/auth/logout` en el backend y elimina la sesión en el frontend.
 */
export const logout = async () => {
  try {
    const response = await api.post(
      '/auth/logout',
      {},
      { withCredentials: true }
    )
    console.log('Logout exitoso:', response.data)
    return true
  } catch (error) {
    console.error('Error en logout:', error.response?.data || error.message)
    return false
  }
}

/**
 * Obtiene la sesión del usuario autenticado desde el backend.
 * @returns {Promise<object|null>} - Datos del usuario o null si no está autenticado.
 */
export const getUserSession = async () => {
  try {
    const response = await api.get('/auth/validate-token', {
      withCredentials: true,
    })
    return {
      id: response.data.id,
      username: response.data.username,
      email: response.data.email,
      role: response.data.role,
      profileImage: response.data.profileImage,
    }
  } catch (error) {
    console.error(
      'Error validando token:',
      error.response?.data || error.message
    )
    return null
  }
}
