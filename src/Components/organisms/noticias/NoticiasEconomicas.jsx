//Este componente muestra noticias económicas obtenidas de la API de gnews

import { useEffect, useState } from "react"
import axios from "axios"

const NoticiasEconomicas = () => {
  const [noticias, setNoticias] = useState([])
  const API_KEY = "e711189a67be61c25d96c889b7028d1a"  //Este es el codigo necesario para acceder a la API
  
  //Limito a 6 las noticias a mostrar 
  const URL = `https://gnews.io/api/v4/search?q=bolsa+empresas&lang=es&token=${API_KEY}&max=6`
  

  const fetchNoticias = async () => {
    try {
      const response = await axios.get(URL)
      setNoticias(response.data.articles)
    } catch (error) {
      console.error("Error al obtener noticias", error)
    }
  }
{/* 
    useEffect(() => {
    fetchNoticias()
    const interval = setInterval(fetchNoticias, 12000)
    return () => clearInterval(interval)
  }, [])  
    
    
    */}


  return (
    
      <div className="w-full h-full overflow-hidden flex flex-col justify-center">
        <h2 className="text-primary-dark text-2xl font-bold mb-4 text-center w-full">
          Noticias de Empresarias
        </h2>
        <div className="space-y-4 w-full h-full overflow-y-auto">
          {noticias.map((noticia, index) => (
            <a
              key={index}
              href={noticia.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white p-6 rounded-lg shadow-md hover:bg-gray-100 transition w-full"
            >
              <h3 className="text-lg font-semibold text-gray-800 w-full truncate">
                {noticia.title}
              </h3>
              <p className="text-gray-600 text-sm w-full line-clamp-2">
                {noticia.description}
              </p>
              
 
            </a>
          ))}
        </div>
      </div>
  
  )
}

export default NoticiasEconomicas