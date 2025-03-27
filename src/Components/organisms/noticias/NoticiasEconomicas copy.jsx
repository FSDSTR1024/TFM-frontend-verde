import { useState, useEffect } from "react"
import axios from "axios"

// Configuración de la API de GNews
const API_KEY = "e711189a67be61c25d96c889b7028d1a" // Reemplaza con tu API key de GNews
const API_URL = "https://gnews.io/api/v4/top-headlines"

// El token de autenticación se guarda en localStorage después de iniciar sesión
const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

const NoticiasEconomicas = () => {
  const [noticias, setNoticias] = useState([]) // Estado para almacenar las noticias
  const [cargando, setCargando] = useState(true) // Estado para manejar la carga
  const [error, setError] = useState(null) // Estado para manejar errores

  // Función para obtener noticias económicas
  const obtenerNoticias = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          category: "business", // Categoría de noticias económicas
          lang: "es", // Idioma español
          country: "es", // País (puedes cambiarlo según tu necesidad)
          max: 3, // Número máximo de noticias
          apikey: API_KEY, // API key de GNews
        },
      })

      // Guardar las noticias en el estado
      setNoticias(response.data.articles)
      setCargando(false)
      console.log('Noticias de la API',response.data)
    } catch (err) {
      console.error("Error obteniendo noticias:", err)
      setError("Error al cargar las noticias. Intenta de nuevo más tarde.")
      setCargando(false)
    }
  }

  // Obtener noticias al cargar el componente
  useEffect(() => {
    obtenerNoticias()
  }, [])

  // Renderizar el componente
  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-center space-x-2 mb-2">
        <h2 className="text-lg font-bold text-black">Noticias Económicas</h2>
      </div>

      {cargando ? (
        <div className="flex justify-center items-center h-full">
          <p>Cargando noticias...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <div className="flex-1 overflow-auto">
          <div className="flex flex-col space-y-2">
            {noticias.map((noticia, i) => (
              <div
                key={i}
                className="rounded-lg shadow-sm p-2 flex items-center justify-between h-24"
                style={{ backgroundColor: "#e1e3ac" }}
              >
                <div className="flex-1">
                  <a
                    href={noticia.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-black hover:underline"
                  >
                    {noticia.title}
                  </a>
                  <p className="text-xs text-gray-600">{noticia.description}</p>
                </div>
                <div className="w-20 text-right">
                  <p className="text-xs text-gray-500">
                    {new Date(noticia.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default NoticiasEconomicas