import { useState, useEffect } from "react";
import axios from "axios";

// Clave de la API de Finnhub
const API_KEY = "cuhqno9r01qk32qa2ce0cuhqno9r01qk32qa2ceg";
//Esto lo voy a poner en una variable de entorno

// Definición de los índices bursátiles por región
// Se usan valores de acciones, dado que los indices son pagos
const indices = {
  europe: [
    { symbol: "MSFT", name: "DAX" },
    { symbol: "QQQ", name: "IBEX 35" },
    { symbol: "IBM", name: "Euro Stoxx 50" },
  ],
  us: [
    { symbol: "MTS", name: "S&P 500" },
    { symbol: "BKT", name: "NASDAQ" },
    { symbol: "IAG", name: "Dow Jones" },
  ],
  asia: [
    { symbol: "FAE", name: "Nikkei 225" },
    { symbol: "FDR", name: "Hang Seng" },
    { symbol: "NVDA", name: "Shanghai C" },
  ],
};

const MarketIndicesSelector = () => {
  // Estado para la región activa
  const [activeRegion, setActiveRegion] = useState("europe");
  // Estado para almacenar los datos de los índices
  const [indexData, setIndexData] = useState({ europe: [], us: [], asia: [] });
  // Estado para manejar la carga de datos
  const [loading, setLoading] = useState(true);
  // Estado para manejar errores
  const [error, setError] = useState(null);

  // Función para obtener los datos de una región específica
  const fetchRegionIndices = async (region) => {
    try {
      const responses = await Promise.all(
        indices[region].map((index) =>
          axios.get(`https://finnhub.io/api/v1/quote?symbol=${index.symbol}&token=${API_KEY}`)
        )
      );

      // Procesar los datos obtenidos
      return responses.map((response, i) => ({
        name: indices[region][i].name, // Nombre del índice
        price: response.data?.c ?? "N/A", // Precio actual del índice (cierre más reciente)
        change: response.data?.d ?? 0, // Cambio en el valor del índice respecto al cierre anterior
        percentChange: response.data?.dp ?? 0, // Cambio porcentual respecto al cierre anterior
      }));
    } catch (err) {
      console.error(`Error al obtener datos de ${region}:`, err);
      return [];
    }
  };

  // useEffect para cargar datos iniciales y actualizar periódicamente
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      try {
         // Realiza múltiples solicitudes en paralelo para obtener datos de cada índice de la región
        const [europeData, usData, asiaData] = await Promise.all([
          fetchRegionIndices("europe"),
          fetchRegionIndices("us"),
          fetchRegionIndices("asia"),
        ]);
        setIndexData({ europe: europeData, us: usData, asia: asiaData });
      } catch (err) {
        setError("Error al cargar los datos");
      }
      setLoading(false);
    };

    fetchAllData();  // Llamar a la función de carga de datos 
    const interval = setInterval(fetchAllData, 10000); // Actualizar datos cada 10 segundos
    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
  }, []);

  return (
    <div className="p-5">
      {/* Botones para seleccionar la región a mostrar */}
      <div className="button-group">
        {["europe", "us", "asia"].map((region) => (
          <button
            key={region}
            className={`button ${activeRegion === region ? "active" : ""}`}
            onClick={() => setActiveRegion(region)}
          >
            {region === "europe" ? "Europa" : region === "us" ? "EE.UU." : "Asia"}
          </button>
        ))}
      </div>
      {/* Mostrar mensaje de carga o error si corresponde */}
      {loading && <p>Cargando datos...</p>}
      {error && <p>{error}</p>}

      {/* Contenedor de datos de los índices */}
      {!loading && !error && (
        <div className="boxes-container">
          {indexData[activeRegion]?.map((index, i) => (
            <div key={i} className="box">
              {/* Columna de icono según la tendencia */}
              <div className="icon">
                 {/* Aqui se grafican las flechas, de acuerdo a la evolucion del indice */}
                <img src={index.change > 0 ? "/images/flecha_arriba.svg" : index.change < 0 ? "/images/flecha_abajo.svg" : "/images/sin_cambio.svg"} alt="trend" />
              </div>
              {/* Columna con el nombre y valor del índice */}
              <div className="index-info">
                <div className="index-name">{index.name}</div>
                <div className="value">{index.price !== "N/A" ? index.price.toFixed(2) : "N/A"}</div>
              </div>
              {/* Columna con cambios en valor y porcentaje */}
              <div className="index-changes">
                <div className={`change ${index.change >= 0 ? "positive" : "negative"}`}>
                  {index.change.toFixed(2)}
                </div>
                <div className={`change-percent ${index.percentChange >= 0 ? "positive" : "negative"}`}>
                  {index.percentChange.toFixed(2)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
     
      <style>{`
        .boxes-container {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
        }
        .box {
          display: flex;
          align-items: center;
          width: 300px;
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .icon {
          flex: 1;
          display: flex;
          justify-content: center;
        }
        .icon img {
          width: 30px;
          height: 30px;
        }
        .index-info {
          flex: 2;
          text-align: center;
        }
        .index-name {
          font-weight: bold;
        }
        .index-changes {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .change, .change-percent {
          font-weight: bold;
        }
        .change.positive, .change-percent.positive {
          color: #28a745;
        }
        .change.negative, .change-percent.negative {
          color: #dc3545;
        }
      `}</style>
    </div>
  );
};

export default MarketIndicesSelector;