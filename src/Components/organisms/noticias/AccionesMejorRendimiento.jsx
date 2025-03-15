import { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';

const AccionesMejorRendimiento = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopStocks = async () => {
      setLoading(true);
      const mockData = [
        { id: 1, ticker: "NVDA", price: 872.35, change: 8.42, percentChange: 9.68 },
        { id: 2, ticker: "AMD", price: 176.82, change: 12.54, percentChange: 7.64 },
        { id: 3, ticker: "SOFI", price: 9.87, change: 0.62, percentChange: 6.70 },
      ];
      setTimeout(() => {
        setStocks(mockData);
        setLoading(false);
      }, 800);
    };

    fetchTopStocks();
  }, []);

  return (
    <div className="bg-gray-50 rounded-xl shadow-lg p-3 md:p-4 border border-gray-200 w-full h-full flex flex-col">
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <div className="flex items-center min-w-0 flex-shrink overflow-hidden">
          <div className="bg-green-700 p-1 md:p-1.5 rounded-lg mr-2 flex-shrink-0">
            <TrendingUp size={18} className="text-white" />
          </div>
          <h2 className="text-base md:text-lg font-bold text-gray-800 truncate">Acciones en alza</h2>
        </div>
      </div>

      {loading ? (
        <div className="h-32 md:h-40 flex items-center justify-center">
          <div className="w-6 h-6 md:w-8 md:h-8 border-4 border-gray-200 border-t-green-700 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="text-xs font-medium text-green-800 mb-2 flex-grow overflow-y-auto">
            {stocks.map((stock) => (
              <div
                key={stock.id}
                className="bg-white rounded-lg p-2 md:p-3 mb-2 border-l-4 border-green-700 shadow hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold text-gray-800">{stock.ticker}</div>
                    <div className="text-xs text-green-600">Precio: ${stock.price}</div>
                  </div>
                  <div className="text-green-800 text-sm md:text-base">+${stock.change}</div>
                </div>
                <div className="text-xs text-green-700 mt-1">
                  +{stock.percentChange}% cambio
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-right mt-1">
            <button className="text-green-800 hover:text-gray-800 font-medium text-xs md:text-sm hover:underline py-1">
              Ver todas las acciones → 
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AccionesMejorRendimiento;