import { useEffect, useState } from "react"
import axios from "axios"

const NoticiasEconomicas = () => {
  const [noticias, setNoticias] = useState([])
  const API_KEY = "77978921e358476788d32eea54607d16" // Reemplaza con tu clave de NewsAPI
  const URL = `https://newsapi.org/v2/everything?q=bolsa&language=es&pageSize=3&sortBy=publishedAt&apiKey=${API_KEY}`

  // Contador para limitar las solicitudes a 10 por hora
  let requestCount = 0
  const MAX_REQUESTS_PER_HOUR = 10

  const fetchNoticias = async () => {
    if (requestCount >= MAX_REQUESTS_PER_HOUR) {
      console.log("Límite de solicitudes alcanzado. Esperando una hora...")
      return
    }

    try {
      const response = await axios.get(URL)
      setNoticias(response.data.articles) // NewsAPI devuelve las noticias en `articles`
      requestCount++ // Incrementa el contador de solicitudes
    } catch (error) {
      console.error("Error al obtener noticias", error)
    } finally {
      // Programa la próxima solicitud después de 6 minutos (360,000 ms)
      // Esto asegura que no se superen las 10 solicitudes por hora
      setTimeout(fetchNoticias, 360000)
    }
  }

  useEffect(() => {
    fetchNoticias() // Realiza la primera solicitud al montar el componente
  }, [])

  return (
    <div className="bg-blue-500 p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 md:col-span-2 h-[520px] bg-verde-claro w-full">
      <div className="w-full h-full overflow-hidden flex flex-col justify-center">
        <h2 className="text-primary-dark text-2xl font-bold mb-4 text-center w-full">
          Noticias Económicas
        </h2>
        <div className="space-y-4 w-full">
          {noticias.map((noticia, index) => (
            <a
              key={index}
              href={noticia.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white p-4 rounded-lg shadow-md hover:bg-gray-100 transition w-full h-[120px] flex flex-col justify-between"
            >
              <h3 className="text-lg font-semibold text-gray-800 w-full line-clamp-2">
                {noticia.title}
              </h3>
              <p className="text-gray-600 text-sm w-full line-clamp-4 flex-grow">
                {noticia.description}
              </p>
              <p className="text-gray-500 text-xs w-full">
                Fuente: {noticia.source?.name || "Desconocida"}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NoticiasEconomicas