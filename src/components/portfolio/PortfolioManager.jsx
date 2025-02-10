import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Plus, Minus, Search } from 'lucide-react';

const PortfolioManager = () => {
  const [portfolio, setPortfolio] = useState({
    name: "Mi Cartera",
    totalValue: 0,
    dailyChange: 0,
    dailyChangePercent: 0,
    stocks: []
  });
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [amount, setAmount] = useState('');
  
  // Datos de ejemplo para el gráfico
  const historicalData = [
    { date: '2024-01', value: 10000 },
    { date: '2024-02', value: 12000 },
    { date: '2024-03', value: 11500 }
  ];

  const fetchPortfolioData = async () => {
    // Aquí iría la lógica para obtener datos actualizados del portfolio
    // Llamada a la API de Finnhub para cada valor
  };

  useEffect(() => {
    fetchPortfolioData();
    const interval = setInterval(fetchPortfolioData, 60000); // Actualizar cada minuto
    return () => clearInterval(interval);
  }, []);

  const handleSearch = async (term) => {
    // Aquí iría la lógica para buscar en MongoDB
    // Por ahora usamos datos de ejemplo
    setSearchResults([
      { ticker: 'AAPL', name: 'Apple Inc.' },
      { ticker: 'MSFT', name: 'Microsoft Corporation' }
    ]);
  };

  const handleAddStock = async (stock) => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert('Por favor ingrese una cantidad válida');
      return;
    }
    // Aquí iría la lógica para añadir el valor al portfolio
    setShowAddModal(false);
  };

  const handleSellStock = (stockId) => {
    // Aquí iría la lógica para vender el valor
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header del Portfolio */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-2xl font-bold mb-4">{portfolio.name}</h1>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-gray-600">Valor Total</p>
            <p className="text-2xl font-bold">${portfolio.totalValue.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-600">Cambio Diario</p>
            <p className={`text-2xl font-bold ${portfolio.dailyChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${portfolio.dailyChange.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-gray-600">Cambio %</p>
            <p className={`text-2xl font-bold ${portfolio.dailyChangePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {portfolio.dailyChangePercent.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>

      {/* Gráfico */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <LineChart width={800} height={300} data={historicalData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </div>

      {/* Lista de Valores */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Valores en Cartera</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <Plus className="mr-2" size={20} />
            Añadir Valor
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">Ticker</th>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Valor Actual</th>
                <th className="px-4 py-2">Cambio</th>
                <th className="px-4 py-2">Cambio %</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.stocks.map((stock) => (
                <tr key={stock.ticker} className="border-b">
                  <td className="px-4 py-2">{stock.ticker}</td>
                  <td className="px-4 py-2">{stock.name}</td>
                  <td className="px-4 py-2">${stock.currentValue.toLocaleString()}</td>
                  <td className={`px-4 py-2 ${stock.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${stock.change.toLocaleString()}
                  </td>
                  <td className={`px-4 py-2 ${stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stock.changePercent.toFixed(2)}%
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleSellStock(stock.ticker)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded flex items-center"
                    >
                      <Minus size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para añadir valor */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Añadir Valor</h2>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Buscar por ticker o nombre..."
                className="w-full p-2 border rounded"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  handleSearch(e.target.value);
                }}
              />
            </div>
            
            {searchResults.length > 0 && (
              <div className="mb-4 max-h-40 overflow-y-auto">
                {searchResults.map((result) => (
                  <div
                    key={result.ticker}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSearchTerm(`${result.ticker} - ${result.name}`)}
                  >
                    {result.ticker} - {result.name}
                  </div>
                ))}
              </div>
            )}

            <div className="mb-4">
              <input
                type="number"
                placeholder="Cantidad a invertir"
                className="w-full p-2 border rounded"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleAddStock(searchTerm)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Añadir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioManager;