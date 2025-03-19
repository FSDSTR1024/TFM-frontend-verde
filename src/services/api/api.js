import axios from 'axios'


// Primero obtenemos la URL de la variable de entorno para producción y después la URL predeterminada para trabajar en local
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  'https://tfm-backend-verde.onrender.com' ||
  'http://localhost:3000'

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
