import axios from 'axios'


// En esta rama mantenemos la URL del entorno de producción puesto que la ruta del entorno de desarrollo supone una interferencia en el login del usuario y este no puede hacer un correcto logout, Si en el entonorno de producción se genera el mismo fallo, entonces se debe actuar sobre el componente authController (logout) y ver exactamente que puede generar el fallo en producción.
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  'https://tfm-backend-verde.onrender.com'

const api = axios.create({
  baseURL: API_BASE_URL, // Utilizamos
  withCredentials: true,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

export default api
