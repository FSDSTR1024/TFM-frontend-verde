import React, { useState, useEffect } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import axios from 'axios';

// Este componente implementa un modal de búsqueda y selección de acciones 
// para añadir a un portafolio
// Las acciones estan guardadas en una coleccion llamada accions en MongoDb
// isOpen es una variable con la que se verifica si la ventana esta abienta o no
// onClose sirve cerrar la ventana
// selectedPortfolio: : Un objeto que representa el portafolio que el usuario ha seleccionado.
// Este objeto contendrá información sobre el portafolio, como su nombre o ID. 
// Se utiliza para mostrar el nombre del portafolio en el modal y para asociar 
// la acción añadida al portafolio correcto.
// portfolioId : El identificador único del portafolio seleccionado


const SearchModal = ({ isOpen, onClose, selectedPortfolio, portfolioId, onStockUpdate }) => {
  const [searchTerm, setSearchTerm] = useState(''); // Término de búsqueda
  const [selectedStock, setSelectedStock] = useState(null); //Aqui se guarda la acción seleccionada
  const [quantity, setQuantity] = useState(1); // Aqui se almacena el numero de acciones que se van a agregar
  const [isLoading, setIsLoading] = useState(false);
  const [stocks, setStocks] = useState([]);  // Aqui se almacenan las acciones leidas de la BD
  const [filteredStocks, setFilteredStocks] = useState([]); //Aqui se almacenan las accions filtradas por el usuario
  const [loadingStocks, setLoadingStocks] = useState(true); // Indica si se están cargando las acciones
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId'); // Obtiene el ID del usuario del localStorage

  const customColors = {
    primary: "#638a63",      // Verde principal (de tu paleta)
    primaryLight: "#e1e3ac", // Verde claro para fondos
    secondary: "#fafafa",    // Fondo muy claro
    text: "#223536",         // Color de texto principal (oscuro)
    textLight: "#46695a",    // Color de texto secundario
    accent: "#a8ba86",       // Color acento
    accentLight: "#e1e3ac",  // Acento claro
    border: "#638a63",       // Color para bordes
    white: "#fafafa",        // Blanco (usando el tono más claro de tu paleta)
    red: "#46695a",          // Reemplazado por verde oscuro para "vender"
    redHover: "#223536",     // Hover del botón "vender"
  };
  

    // Efecto para cargar las acciones al abrir el modal
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        setLoadingStocks(true);
        const response = await axios.get("https://tfm-backend-kalx.onrender.com/accions");

        if (Array.isArray(response.data.accions)) { // Verifica si la respuesta es un array
          setStocks(response.data.accions);
          setFilteredStocks(response.data.accions.slice(0, 5)); // Muestra las primeras 5 acciones
          setError(null);
        } else {
          throw new Error('La respuesta de la API no es un array');
        }
      } catch (err) {
        console.error('Error getting accions:', err);
        setError('Error al obtener las acciones');
        setStocks([]);
        setFilteredStocks([]);
      } finally {
        setLoadingStocks(false);
      }
    };

    if (isOpen) { // Solo carga las acciones si el modal está abiert
      fetchStocks();
      // Resetear selección al abrir el modal
      setSelectedStock(null);
      setQuantity(1);
    }
  }, [isOpen]); // El efecto se ejecuta cuando cambia isOpen

  useEffect(() => {   // Efecto para filtrar las acciones según el término de búsqueda
    if (stocks.length > 0) {
      const filtered = stocks.filter(stock =>
        (stock.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.ticker?.toLowerCase().includes(searchTerm.toLowerCase()))
      ).slice(0, 5); // Filtra y muestra las primeras 5 coincidencias
      setFilteredStocks(filtered);
    }
  }, [searchTerm, stocks]);

   // Funciones para manejar la selección de acciones, la cantidad y la adición al portafolio
  const handleStockSelection = (stock) => {
    setSelectedStock(stock);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const handleQuantityChange = (value) => {
    setQuantity(Math.max(1, Number(value)));
  };

  const handleAddToPortfolio = async () => {
    if (!selectedStock) {
      alert('Por favor selecciona una acción');
      return;
    }

    if (!portfolioId || portfolioId === userId) {
      console.error('Portfolio ID inválido:', portfolioId);
      alert('Error: Portfolio ID no válido');
      return;
    }

    setIsLoading(true);
    try {
      const stockData = {
        ticker: selectedStock.ticker,
        title: selectedStock.title,
        price: selectedStock.price,
        cantidad: quantity,
        userId: userId
      };

      // Primero verificamos si la acción ya existe
      const checkResponse = await axios.get(
        `https://tfm-backend-kalx.onrender.com/portfolios/${portfolioId}/stock/${selectedStock.ticker}`
      );

      let response;
      if (checkResponse.data.exists) {
        // Si existe, actualizamos la cantidad
        response = await axios.put(
          `https://tfm-backend-kalx.onrender.com/portfolios/${portfolioId}/stock/${selectedStock.ticker}`,
          stockData
        );
      } else {
        // Si no existe, la añadimos
        response = await axios.post(
          `https://tfm-backend-kalx.onrender.com/portfolios/${portfolioId}/stock`,
          stockData
        );
      }
      
      if (response.status === 200 || response.status === 201) {
        alert('Acción ' + (checkResponse.data.exists ? 'actualizada' : 'agregada') + 
              ' exitosamente a la cartera ' + selectedPortfolio.name);
        onClose();
        // Llamar a la función de actualización del padre
        if (typeof onStockUpdate === 'function') {
          onStockUpdate();
        }
      } else {
        throw new Error('Error al guardar la acción');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar la acción: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
};



  // Renderizado del componente
  if (!isOpen) return null; // No renderiza nada si el modal está cerrado

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-16">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Añadir a cartera - {selectedPortfolio.name}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar por nombre o símbolo"
              className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {loadingStocks ? (
              <div className="text-center py-4">Cargando acciones...</div>
            ) : error ? (
              <div className="text-center py-4 text-red-600">{error}</div>
            ) : filteredStocks.length === 0 ? (
              <div className="text-center py-4">No se encontraron acciones</div>
            ) : (
              filteredStocks.map((item) => {
                if (!item.title || !item.ticker || !item.price || !item.change) {
                  return null;
                }

                const isSelected = selectedStock?.id === item.id;

                return (
                  <div
                    key={item.id}
                    className={`flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer ${
                      isSelected ? 'bg-blue-50 border border-blue-300' : ''
                    }`}
                    onClick={() => handleStockSelection(item)}
                  >
                    <div className="flex-1">
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-gray-600">{item.ticker}</div>
                      <div className="text-sm text-gray-800">Precio: ${item.price}</div>
                      <div className={`text-sm ${
                        parseFloat(item.change) >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {parseFloat(item.change) >= 0 ? '+' : ''}{item.change}%
                      </div>
                    </div>
                    {isSelected && (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            decrementQuantity();
                          }}
                          className="p-1 bg-gray-200 rounded-full"
                        >
                          <Minus size={16} />
                        </button>
                        <input
                          type="number"
                          value={quantity}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleQuantityChange(e.target.value);
                          }}
                          onClick={(e) => e.stopPropagation()}
                          className="w-16 text-center border border-gray-300 rounded-lg bg-white text-gray-800"
                          min="1"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            incrementQuantity();
                          }}
                          className="p-1 bg-gray-200 rounded-full"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {selectedStock && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <h3 className="font-medium">Acción seleccionada</h3>
              <div className="flex justify-between mt-2">
                <div>
                  <span className="font-medium">{selectedStock.title}</span> ({selectedStock.ticker})
                </div>
                <div>
                  Cantidad: <span className="font-medium">{quantity}</span>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                Se añadirá a: <span className="font-medium">{selectedPortfolio.name}</span>
              </div>
            </div>
          )}

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleAddToPortfolio}
              disabled={isLoading || !selectedStock}
              className="px-4 py-2 bg-[#46695a] text-white rounded-lg hover:bg-[#223536] disabled:opacity-50 disabled:bg-[#46695a]"
            >
              {isLoading ? 'Agregando...' : 'Agregar a cartera'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;