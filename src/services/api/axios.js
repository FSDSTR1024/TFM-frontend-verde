import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

let isRefreshing = false;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if ([401, 403].includes(error.response?.status)) {
      console.warn('Error 401/403: Token inválido o expirado.');

      if (isRefreshing) {
        console.warn('Renovación en curso. No se reintenta.');
        return Promise.reject(error);
      }

      isRefreshing = true;

      try {
        const refreshResponse = await axios.post(
          `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        console.log('Token renovado correctamente.');

        // Actualizar headers con el nuevo token y reintentar la solicitud original
        originalRequest.headers['Authorization'] = `Bearer ${refreshResponse.data.accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error('Error al renovar el token:', refreshError);

        // Si el usuario ya está en /login, no redirigir nuevamente
        const currentPath = window.location.pathname;
        if (!currentPath.includes('/login')) {
          console.warn('Redirigiendo al login debido a sesión expirada.');
          window.location.href = `/login?reason=session_expired`;
        }
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
