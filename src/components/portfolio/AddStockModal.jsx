import { useState, useEffect } from "react";
import axios from "axios";

export default function AddStockModal({ isOpen, onClose, onAddStock }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [stocks, setStocks] = useState([]); // Guarda las acciones filtradas
  const [allStocks, setAllStocks] = useState([]); // Guarda todas las acciones
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetchStocks(); // Cargar todas las acciones al abrir el modal
  }, []);

  // 🔍 Obtener todas las acciones desde la base de datos
  const fetchStocks = async () => {
    try {
      const response = await axios.get("/api/stocks");
      const data = Array.isArray(response.data) ? response.data : []; // Si no es un array, asigna []
      setAllStocks(data);
      setStocks(data.slice(0, 5)); // Mostrar las primeras 5 acciones
    } catch (error) {
      console.error("Error al buscar acciones:", error);
      setAllStocks([]);
      setStocks([]);
    }
  };

  // 📝 Filtrar acciones según la búsqueda
  useEffect(() => {
    if (!searchTerm) {
      setStocks(allStocks.slice(0, 5)); // Si el input está vacío, mostrar las primeras 5
    } else {
      const filtered = allStocks.filter((stock) =>
        stock.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.ticker.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setStocks(filtered.slice(0, 5)); // Mostrar solo 5 resultados
    }
  }, [searchTerm, allStocks]);

  // ✍️ Manejar la selección de una acción
  const handleSelectStock = (stock) => {
    onAddStock(stock);
    setSearchTerm(stock.title); // Colocar el nombre en el input
    setShowDropdown(false); // Cerrar el dropdown
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Añadir Valor</h2>

        {/* 🔎 Input de búsqueda */}
        <div className="relative">
          <input
            type="text"
            placeholder="Introduce el nombre o símbolo de una inversión"
            className="input input-bordered w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowDropdown(true)}
          />

          {/* 📜 Lista desplegable con resultados */}
          {Array.isArray(stocks) && stocks.length > 0 && (
  <ul className="absolute z-10 bg-white border rounded-md w-full mt-1 shadow-md max-h-60 overflow-y-auto">
    {stocks.map((stock) => (
      <li
        key={stock.id}
        className="flex justify-between p-3 cursor-pointer hover:bg-gray-100"
        onClick={() => handleSelectStock(stock)}
      >
        <div>
          <p className="font-semibold">{stock.title}</p>
          <p className="text-sm text-gray-500">{stock.ticker}</p>
        </div>
      </li>
    ))}
  </ul>
)}

        </div>

        {/* 📌 Botones */}
        <div className="flex justify-between mt-4">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button
            className="btn btn-primary"
            onClick={() => searchTerm && onAddStock(searchTerm)}
            disabled={!searchTerm}
          >
            Seleccionar
          </button>
        </div>
      </div>
    </div>
  );
}
