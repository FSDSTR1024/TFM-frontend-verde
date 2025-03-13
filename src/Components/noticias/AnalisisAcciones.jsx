//Este componente grafica noticias de analisis de Acciones

import { useState, useEffect } from 'react';

const AnalisisAcciones = () => {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalyses = async () => {
      setLoading(true);
      try {
        // Simulando carga de datos de API externa con análisis de ejemplo
        // En un caso real, harías un fetch a una API como:
        // const response = await fetch('https://api.example.com/stock-analysis');
        // const data = await response.json();
        
        // Datos de ejemplo de análisis de acciones
        const mockData = [
          {
            id: 1,
            ticker: "AAPL",
            companyName: "Apple Inc.",
            recommendation: "Comprar",
            targetPrice: "$240.50",
            summary: "La sólida presentación de resultados y el crecimiento en servicios impulsan perspectivas alcistas para los próximos trimestres.",
            analyst: "Morgan Stanley",
            date: "28 Feb 2025"
          },
          {
            id: 2,
            ticker: "MSFT",
            companyName: "Microsoft Corporation",
            recommendation: "Mantener",
            targetPrice: "$420.75",
            summary: "El negocio de nube sigue fuerte, pero la valoración actual refleja adecuadamente las perspectivas de crecimiento a corto plazo.",
            analyst: "Goldman Sachs",
            date: "27 Feb 2025"
          },
          {
            id: 3,
            ticker: "AMZN",
            companyName: "Amazon.com Inc.",
            recommendation: "Comprar",
            targetPrice: "$185.30",
            summary: "Mejoras significativas en márgenes de AWS y comercio electrónico sugieren potencial de crecimiento no reflejado en la cotización actual.",
            analyst: "JP Morgan",
            date: "26 Feb 2025"
          },
          {
            id: 4,
            ticker: "TSLA",
            companyName: "Tesla Inc.",
            recommendation: "Vender",
            targetPrice: "$160.00",
            summary: "Presión competitiva creciente en mercados clave y márgenes en descenso indican desafíos importantes en la rentabilidad futura.",
            analyst: "Bank of America",
            date: "25 Feb 2025"
          },
          {
            id: 5,
            ticker: "NVDA",
            companyName: "NVIDIA Corporation",
            recommendation: "Comprar",
            targetPrice: "$950.25",
            summary: "Liderazgo continuo en IA y computación acelerada promete impulsar crecimiento sostenido de ingresos durante los próximos años.",
            analyst: "Citi Research",
            date: "24 Feb 2025"
          }
        ];
        
        // Simulamos un pequeño retraso para mostrar el estado de carga
        setTimeout(() => {
          setAnalyses(mockData);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError("No se pudieron cargar los análisis. Por favor, intente más tarde.");
        setLoading(false);
      }
    };

    fetchAnalyses();
  }, []);

  // Función para determinar el color basado en la recomendación
  const getRecommendationColor = (recommendation) => {
    switch (recommendation.toLowerCase()) {
      case 'comprar':
        return 'bg-green-100 text-green-800';
      case 'mantener':
        return 'bg-blue-100 text-blue-800';
      case 'vender':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Análisis de Acciones</h2>
      
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
          {analyses.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-4 mb-3 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center">
                    <span className="font-bold text-gray-900">{item.ticker}</span>
                    <span className="ml-2 text-gray-600">{item.companyName}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <span className="text-gray-700 font-medium">Precio objetivo: {item.targetPrice}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRecommendationColor(item.recommendation)}`}>
                  {item.recommendation}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-2">{item.summary}</p>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{item.analyst}</span>
                <span>{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-4 text-right">
        <button className="text-gray-800 hover:underline text-sm">Ver todos los análisis →</button>
      </div>
    </div>
  );
};

export default AnalisisAcciones;