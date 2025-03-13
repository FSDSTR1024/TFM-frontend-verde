import { useState, useEffect } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import AddStockModal from "./AddStockModal";

export default function Portfolio({ userId }) {
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  // 🚀 Cargar las carteras del usuario al iniciar
  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await axios.get(`/api/portfolios?userId=${userId}`);
        setPortfolios(response.data);
        console.log('userId en portfolio',userId)
        if (response.data.length > 0) {
          setSelectedPortfolio(response.data[0]); // Mostrar la primera cartera por defecto
          updateStockValues(response.data[0].stocks);
        }
      } catch (error) {
        console.error("Error al cargar carteras:", error);
      }
    };
    fetchPortfolios();
  }, [userId]);

  // 📈 Actualizar valores de las acciones con la API de Finnhub
  const updateStockValues = async (stocks) => {
    const updatedStocks = await Promise.all(
      stocks.map(async (stock) => {
        try {
          const response = await axios.get(`/api/stocks/price?ticker=${stock.ticker}`);
          return { ...stock, currentValue: response.data.price };
        } catch (error) {
          console.error(`Error al actualizar ${stock.ticker}:`, error);
          return stock;
          console.log('');
        }
      })
    );
    setSelectedPortfolio((prev) => ({ ...prev, stocks: updatedStocks }));
  };

  // 📂 Cambiar cartera seleccionada
  const handleSelectPortfolio = (portfolioId) => {
    const selected = portfolios.find((p) => p._id === portfolioId);
    setSelectedPortfolio(selected);
    updateStockValues(selected.stocks);
  };

  // ➕ Crear una nueva cartera
  const createPortfolio = async () => {
    const newPortfolio = { userId, name: `Cartera ${portfolios.length + 1}`, stocks: [] };
    try {
      const response = await axios.post("/api/portfolios", newPortfolio);
      setPortfolios([...portfolios, response.data]);
      setSelectedPortfolio(response.data);
    } catch (error) {
      console.error("Error al crear cartera:", error);
    }
  };

  // 📌 Agregar una acción a la cartera
  const addStock = async (newStock) => {
    if (!selectedPortfolio) return;
    const updatedPortfolio = { ...selectedPortfolio, stocks: [...selectedPortfolio.stocks, newStock] };

    try {
      await axios.put(`/api/portfolios/${selectedPortfolio._id}`, updatedPortfolio);
      setSelectedPortfolio(updatedPortfolio);
    } catch (error) {
      console.error("Error al agregar acción:", error);
    }
  };

  // ❌ Vender una acción
  const sellStock = async (ticker) => {
    if (!selectedPortfolio) return;
    const updatedStocks = selectedPortfolio.stocks.filter((stock) => stock.ticker !== ticker);
    const updatedPortfolio = { ...selectedPortfolio, stocks: updatedStocks };

    try {
      await axios.put(`/api/portfolios/${selectedPortfolio._id}`, updatedPortfolio);
      setSelectedPortfolio(updatedPortfolio);
    } catch (error) {
      console.error("Error al vender acción:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-base-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Mis Carteras</h2>
      <button className="btn btn-primary float-right" onClick={() => navigate("/")} style={{ backgroundColor: 'azul', color: 'blanco' }}  >
        Volver al Dashboard
      </button>

      {/* 🔽 Seleccionar cartera */}
      <div className="mb-4">
        <select className="select select-bordered w-full" onChange={(e) => handleSelectPortfolio(e.target.value)}>
        {Array.isArray(portfolios) && portfolios.map((portfolio) => (
  <div key={portfolio._id}>
    <h2>{portfolio.name}</h2>
  </div>
))}
        </select>
        <button className="btn btn-secondary mt-2" onClick={createPortfolio}>
          Crear Nueva Cartera
        </button>
      </div>

      {selectedPortfolio && (
        <>
          {/* 📊 Gráfico del histórico */}
          <div className="bg-base-100 p-4 rounded-lg shadow">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={selectedPortfolio.history || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 📜 Tabla de acciones */}
          <div className="overflow-x-auto mt-4">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Ticker</th>
                  <th>Nombre</th>
                  <th>Valor</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {selectedPortfolio.stocks.map((stock) => (
                  <tr key={stock.ticker}>
                    <td>{stock.ticker}</td>
                    <td>{stock.name}</td>
                    <td>${stock.currentValue.toFixed(2)}</td>
                    <td>
                      <button className="btn btn-error btn-sm" onClick={() => sellStock(stock.ticker)}>
                        Vender
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 🛠️ Botón para agregar acciones */}
          <button className="btn btn-primary mt-4" onClick={() => setModalOpen(true)}>
            Añadir Valor
          </button>

          {/* 📌 Modal para agregar acción */}
          <AddStockModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onAddStock={addStock} />
        </>
      )}
    </div>
  );
}
