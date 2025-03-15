//Este componente grafica noticias financieras

import { useState, useEffect } from 'react';

const Noticias = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        // Simulando carga de datos de API externa con noticias de ejemplo
        // En un caso real, harías un fetch a una API como:
        // const response = await fetch('https://api.example.com/financial-news');
        // const data = await response.json();
        
        // Datos de ejemplo
        const mockData = [
          {
            id: 1,
            title: "Los mercados europeos cierran a la baja tras anuncio del BCE",
            summary: "Los principales índices europeos cerraron con pérdidas después de que el Banco Central Europeo mantuviera las tasas de interés sin cambios.",
            source: "Financial Times",
            date: "28 Feb 2025"
          },
          {
            id: 2,
            title: "Nuevas regulaciones para criptomonedas entrarán en vigor en junio",
            summary: "El marco regulatorio anunciado por la Comisión Europea establecerá nuevos requisitos para exchanges y proveedores de servicios de activos digitales.",
            source: "Bloomberg",
            date: "27 Feb 2025"
          },
          {
            id: 3,
            title: "Tesla anuncia nuevo plan de expansión en mercados emergentes",
            summary: "La compañía de vehículos eléctricos planea invertir 5 mil millones de dólares en nuevas plantas de fabricación en Asia y Latinoamérica.",
            source: "Reuters",
            date: "26 Feb 2025"
          },
          {
            id: 4,
            title: "Inflación en la eurozona se mantiene estable en febrero",
            summary: "El índice de precios al consumidor registró un 2.3% interanual, en línea con las expectativas del mercado y las previsiones del BCE.",
            source: "CNBC",
            date: "25 Feb 2025"
          },
          {
            id: 5,
            title: "Fusión entre gigantes farmacéuticos aprobada por reguladores",
            summary: "La operación valorada en 80 mil millones de dólares creará la tercera empresa farmacéutica más grande del mundo por capitalización de mercado.",
            source: "Wall Street Journal",
            date: "24 Feb 2025"
          }
        ];
        
        // Simulamos un pequeño retraso para mostrar el estado de carga
        setTimeout(() => {
          setNews(mockData);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("No se pudieron cargar las noticias. Por favor, intente más tarde.");
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="flex flex-col h-full w-full">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Noticias Financieras</h2>
      
      {loading ? (
        <div className="flex-grow flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="flex-grow flex items-center justify-center bg-red-100 p-4 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      ) : (
        <div className="flex-grow overflow-y-auto pr-2">
          {news.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-4 mb-3 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg text-gray-800 mb-1">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{item.summary}</p>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{item.source}</span>
                <span>{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-4 text-right">
        <button className="text-gray-800 hover:underline text-sm">Ver todas las noticias →</button>
      </div>
    </div>
  );
};

export default Noticias;