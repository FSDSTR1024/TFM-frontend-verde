//Este componente grafica los principales indices bursátiles de el mundo
//Lee de una API llamada Finnhub
//Como los datos de los indices son de pago, se muestran valores de acciones
import { useState, useEffect } from "react"
import axios from "axios"

// Configuro el token de autenticación para las solicitudes de axios
const API_KEY = "cuhqno9r01qk32qa2ce0cuhqno9r01qk32qa2ceg"


// El token de autenticación se guarda en localStorage después de iniciar sesión
const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

const indices = {
  europe: [
    { symbol: "MSFT", name: "DAX" },
    { symbol: "QQQ", name: "IBEX 35" },
    { symbol: "IBM", name: "Euro Stoxx" },
    { symbol: "TSLA", name: "CAC 40" },
    { symbol: "SAN", name: "FTSE 100" },
  ],
  us: [
    { symbol: "MTS", name: "S&P 500" },
    { symbol: "BKT", name: "NASDAQ" },
    { symbol: "IAG", name: "Dow Jones" },
    { symbol: "TEF", name: "VIC" },
    { symbol: "V", name: "IR 2000" },
  ],
  asia: [
    { symbol: "FAE", name: "Nikkei 225" },
    { symbol: "FDR", name: "Hang Seng" },
    { symbol: "NVDA", name: "Shanghai C" },
    { symbol: "UNI", name: "SSE C" },
    { symbol: "BAC", name: "BSE" },
  ],
}

const VITE_API_URL =
  import.meta.env.VITE_API_URL ||
  'https://tfm-backend-verde.onrender.com'

const Indices = () => {
  const [activeRegion, setActiveRegion] = useState("europe") //Por defecto, muestra los indices Europeos
  const [indexData, setIndexData] = useState({ europe: [], us: [], asia: [] })

  const fetchRegionIndices = async (region) => {
    try {
   // Verifica que indices[region] sea un array válido
   if (!indices[region] || !Array.isArray(indices[region])) {
    throw new Error(`No se encontraron índices para la región: ${region}`)
  }

  const responses = await Promise.all(
    indices[region].map((index) =>
      axios.get(`${VITE_API_URL}/api/quote`, {
        params: {
          symbol: index.symbol, // Solo envía el símbolo
        },

      })
    )
  )

      return responses.map((response, i) => ({
        name: indices[region][i].name,
        price: response.data?.c ?? "N/A",
        change: response.data?.d ?? 0,
        percentChange: response.data?.dp ?? 0,
      }))
    } catch (err) {
      console.error("Error fetching region indices:", err)
      return []
    }
  }

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [europeData, usData, asiaData] = await Promise.all([
          fetchRegionIndices("europe"),
          fetchRegionIndices("us"),
          fetchRegionIndices("asia"),
        ])
        setIndexData({ europe: europeData, us: usData, asia: asiaData })
      } catch (err) {
        console.error("Error fetching all data:", err)
      }
    }

    fetchAllData()
    const interval = setInterval(fetchAllData, 100000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-center space-x-2 mb-2">
        {["europe", "us", "asia"].map((region) => (
          <button
            key={region}
            onClick={() => setActiveRegion(region)}
            className={`btn btn-xs text-black border-none ${
              activeRegion === region 
                ? "bg-[#46695a] hover:bg-[#46695a]" 
                : "bg-transparent hover:bg-[#46695a]/20"
            }`}
          >
            {region === "europe" ? "Europa" : region === "us" ? "EE.UU." : "Asia"}
          </button>
        ))}
      </div>
         
      <div className="flex-1 overflow-auto">
        <div className="flex flex-col space-y-2">
          {indexData[activeRegion]?.map((index, i) => (
            <div 
              key={i} 
              className="rounded-lg shadow-sm p-2 flex items-center justify-between h-14"
              style={{ backgroundColor: "##638a63" }}
            >
              <div className="w-8">
                {index.change > 0 ? (
                  <svg className="w-6 h-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                ) : index.change < 0 ? (
                  <svg className="w-6 h-6 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-neutral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M20 12H4" />
                  </svg>
                )}
              </div>

              <div className="flex-1 text-center">
                <div className="text-sm font-semibold text-black">{index.name}</div>
                <div className="text-base font-bold text-black">
                  {index.price !== "N/A" ? index.price.toFixed(2) : "N/A"}
                </div>
              </div>

              <div className="text-right w-20">
                <div className={`text-sm font-semibold ${
                  index.change >= 0 ? "text-success" : "text-error"
                }`}>
                  {index.change.toFixed(2)}
                </div>
                <div className={`text-xs ${
                  index.percentChange >= 0 ? "text-success" : "text-error"
                }`}>
                  {index.percentChange.toFixed(2)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Indices