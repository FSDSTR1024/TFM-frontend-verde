import { useEffect, useState } from "react"
import axios from "axios"

const NoticiasEconomicas = () => {
  const [noticias, setNoticias] = useState([])
  const API_KEY = "1765fc6f4b80240e4727ef4f33c8822b"
  const URL = `https://api.mediastack.com/v1/news?access_key=${API_KEY}&languages=es&categories=business&limit=3`

  const fetchNoticias = async () => {
    try {
      const response = await axios.get(URL)
      setNoticias(response.data.data)
    } catch (error) {
      console.error("Error al obtener noticias", error)
    }
  }

  useEffect(() => {
    fetchNoticias()
    const interval = setInterval(fetchNoticias, 20000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-blue-500 p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 md:col-span-2 h-[520px] bg-verde-claro w-full">
      <div className="w-full h-full overflow-hidden flex flex-col justify-center">
        <h2 className="text-primary-dark text-2xl font-bold mb-4 text-center w-full">Noticias Económicas</h2>
        <div className="space-y-4 w-full">
          {noticias.map((noticia, index) => (
            <a
              key={index}
              href={noticia.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white p-4 rounded-lg shadow-md hover:bg-gray-100 transition w-full h-[120px] flex flex-col justify-between"
            >
              <h3 className="text-lg font-semibold text-gray-800 w-full line-clamp-2">{noticia.title}</h3>
              <p className="text-gray-600 text-sm w-full line-clamp-4 flex-grow">{noticia.description}</p>
              <p className="text-gray-500 text-xs w-full">Fuente: {noticia.source}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NoticiasEconomicas
