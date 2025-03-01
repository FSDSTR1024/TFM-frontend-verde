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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if ([401, 403].includes(error.response?.status)) {
      // Evitar redirección si ya está en login
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login?reason=session_expired'
      }
    }
    return Promise.reject(error)
  }
)

export default api
