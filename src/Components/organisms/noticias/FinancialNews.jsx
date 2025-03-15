//Este componente genera las acciones que se van a insertar en la base de datos
// y van a ser enviadas al frontend por Websockets cuando la noticia afecte a un ticker que el
//usuario tenga en su Portfolio

import { useEffect, useState } from "react"
import { socket } from "../../../socket"

const FinancialNews = () => {
  console.log("Componente FinancialNews montado")
  const [news, setNews] = useState(null) // Inicialmente no hay noticias

  useEffect(() => {
    // Escuchar el evento 'FinancialNews'
    socket.on("FinancialNews", (newNews) => {
      console.log("Nueva noticia recibida:", newNews) // Esto funciona

      // Reemplazar la noticia anterior con la nueva
      setNews(newNews)
    })

    // Limpiar el listener cuando el componente se desmonte
    return () => {
      socket.off("FinancialNews")
    }
  }, [])

  return (
    <div>
      {/* Renderizado condicional */}
      {news ? (
        <div>
          <h2>{news.title}</h2>
          <p>Tickers: {news.tickers.join(", ")}</p>
          <p>Importancia: {news.importance}</p>
          <a className="bg-[#638a63] text-white px-3 py-1 rounded text-sm font-medium no-underline hover:bg-[#4a6b4a] transition-colors"
             href={news.url} 
             target="_blank" 
             rel="noopener noreferrer">
            Leer más
          </a>
        </div>
      ) : (
        <p>No hay noticias disponibles.</p>
      )}
    </div>
  )
}

export default FinancialNews