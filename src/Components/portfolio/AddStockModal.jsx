import { useState, useEffect } from "react";
import axios from "axios";

// Configurar axios para incluir el token en todas las peticiones
const setupAuthInterceptor = () => {
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default function AddStockModal({ isOpen, onClose, onAddStock }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [investmentType, setInvestmentType] = useState("shares"); // "shares" o "money"
  const [investmentValue, setInvestmentValue] = useState("");
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(null);

  // Configurar el interceptor de autenticación cuando se monta el componente
  useEffect(() => {
    setupAuthInterceptor();
  }, []);

  useEffect(() => {
    if (searchTerm.length > 1) {
      fetchStocks();
    } else {
      setStocks([]);
    }
  }, [searchTerm]);

  // 🔍 Buscar acciones en la base de datos (MongoDB)
  const fetchStocks = async () => {
    try {
      const response = await axios.get(`/api/stocks?search=${searchTerm}`);
      setStocks(response.data);
      setError(null);
    } catch (error) {
      console.error("Error al buscar acciones:", error);
      if (error.response && error.response.status === 401) {
        setError("Sesión expirada. Por favor, vuelve a iniciar sesión.");
        // Opcional: redirigir al usuario a la página de login
        // window.location.href = '/login';
      } else {
        setError("Error al buscar acciones. Inténtalo de nuevo.");
      }
    }
  };

  // 📈 Obtener la cotización de la acción seleccionada
  const fetchStockPrice = async (ticker) => {
    try {
      const response = await axios.get(`/api/stocks/price?ticker=${ticker}`);
      setPrice(response.data.price);
      setError(null);
    } catch (error) {
      console.error("Error al obtener la cotización:", error);
      if (error.response && error.response.status === 401) {
        setError("Sesión expirada. Por favor, vuelve a iniciar sesión.");
      } else {
        setError("Error al obtener la cotización. Inténtalo de nuevo.");
      }
    }
  };

  // ✍️ Manejar la selección de una acción
  const handleSelectStock = (stock) => {
    setSelectedStock(stock);
    fetchStockPrice(stock.ticker);
    setStocks([]);
    setSearchTerm(stock.title);
  };

  // 💾 Guardar la inversión en la base de datos
  const handleSaveInvestment = async () => {
    if (!selectedStock || !investmentValue || !price) return;

    const amountInvested =
      investmentType === "shares" ? Number(investmentValue) * price : Number(investmentValue);

    const investmentData = {
      ticker: selectedStock.ticker,
      name: selectedStock.title,
      price,
      amountInvested,
      shares:
        investmentType === "shares"
          ? Number(investmentValue)
          : Number(investmentValue) / price,
    };

    try {
      await axios.post("/api/portfolio/add", investmentData);
      onAddStock(investmentData);
      onClose();
      setError(null);
    } catch (error) {
      console.error("Error al guardar la inversión:", error);
      if (error.response && error.response.status === 401) {
        setError("Sesión expirada. Por favor, vuelve a iniciar sesión.");
      } else {
        setError("Error al guardar la inversión. Inténtalo de nuevo.");
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Añadir Valor</h2>
        
        {/* Mostrar mensajes de error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        {/* 🔎 Búsqueda de acción */}
        <input
          type="text"
          placeholder="Buscar acción..."
          className="input input-bordered w-full mb-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* 📜 Lista de resultados de búsqueda */}
        {stocks.length > 0 && (
          <ul className="bg-base-100 border rounded-md max-h-40 overflow-y-auto mb-2">
            {stocks.map((stock) => (
              <li
                key={stock.id}
                className="p-2 cursor-pointer hover:bg-base-200"
                onClick={() => handleSelectStock(stock)}
              >
                {stock.ticker} - {stock.title}
              </li>
            ))}
          </ul>
        )}

        {/* 📈 Mostrar información de la acción seleccionada */}
        {selectedStock && price && (
          <div className="bg-base-200 p-3 rounded-md">
            <p>
              <strong>{selectedStock.ticker}</strong> - {selectedStock.title}
            </p>
            <p>Precio actual: <strong>${price.toFixed(2)}</strong></p>
          </div>
        )}

        {/* 💰 Inversión */}
        <div className="mt-4">
          <label className="flex gap-2">
            <input
              type="radio"
              name="investmentType"
              value="shares"
              checked={investmentType === "shares"}
              onChange={() => setInvestmentType("shares")}
            />
            Comprar por cantidad de acciones
          </label>
          <label className="flex gap-2 mt-1">
            <input
              type="radio"
              name="investmentType"
              value="money"
              checked={investmentType === "money"}
              onChange={() => setInvestmentType("money")}
            />
            Comprar por monto de inversión
          </label>

          <input
            type="number"
            className="input input-bordered w-full mt-2"
            placeholder={investmentType === "shares" ? "Cantidad de acciones" : "Monto a invertir"}
            value={investmentValue}
            onChange={(e) => setInvestmentValue(e.target.value)}
          />
        </div>

        {/* 📌 Botones */}
        <div className="flex justify-between mt-4">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn btn-primary" onClick={handleSaveInvestment}>
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}