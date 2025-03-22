//Este componente muestra las acciones que peor rendimiento han tenido

import { useState, useEffect } from 'react'
import { TrendingDown } from 'lucide-react'

const AccionesPeorRendimiento = () => {
  const [stocks, setStocks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTopStocks = async () => {
      setLoading(true);
      const mockData = [
        { id: 1, ticker: "INTC", price: 30.85, change: 5.42, percentChange: 14.95 },
        { id: 2, ticker: "GME", price: 14.25, change: 2.35, percentChange: 14.16 },
        { id: 3, ticker: "PLTR", price: 19.87, change: 2.62, percentChange: 11.65 },
      ];
      setTimeout(() => {
        setStocks(mockData)
        setLoading(false)
      }, 800);
    };

    fetchTopStocks()
  }, [])

  return (
    <div className="bg-verde-claro rounded-xl p-3 md:p-4 w-full h-full flex flex-col">
      {/* Encabezado */}
      <div className="flex items-center mb-3 md:mb-4 min-w-0">
        <div className="flex items-center min-w-0 flex-shrink overflow-hidden">
          <div className="bg-green-700 p-1 md:p-1.5 rounded-lg mr-2 flex-shrink-0">
            <TrendingDown size={18} className="text-red-600" />
          </div>
          <h2 className="text-base md:text-lg font-bold text-gray-800 truncate">En baja</h2>
        </div>
      </div>

      {/* Contenido */}
      {loading ? (
        <div className="flex-grow flex items-center justify-center">
          <div className="w-6 h-6 md:w-8 md:h-8 border-4 border-gray-200 border-t-green-700 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="flex-grow overflow-y-auto">
            <div className="text-xs font-medium text-green-800">
              {stocks.map((stock) => (
                <div
                  key={stock.id}
                  className="bg-white rounded-lg p-2 md:p-3 mb-2 border-l-4 border-red-600 shadow hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold text-gray-800">{stock.ticker}</div>
                      <div className="text-xs text-green-600">Precio: ${stock.price}</div>
                    </div>
                    <div className="text-red-600 text-sm md:text-base">-${stock.change}</div>
                  </div>
                  <div className="text-xs text-red-600 mt-1">
                    -{stock.percentChange}% cambio
                  </div>
                </div>
              ))}
            </div>
          </div>

        </>
      )}
    </div>
  )
}

export default AccionesPeorRendimiento