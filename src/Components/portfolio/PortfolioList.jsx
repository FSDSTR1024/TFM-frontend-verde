import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchModal from './SearchModal';
import axios from "axios";

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

// Base URL for the backend API
const API_BASE_URL = 'https://tfm-backend-kalx.onrender.com';

const PortfolioList = () => {
  const [portfolioData, setPortfolioData] = useState(null);  // Almacena los datos de las carteras del usuario
  const [selectedPortfolio, setSelectedPortfolio] = useState(null); // Guarda la cartera seleccionada actualmente.
  const [loading, setLoading] = useState(true); // Indica si los datos están cargando.
  const [error, setError] = useState(null); // Almacena mensajes de error.
  const [availableStocks, setAvailableStocks] = useState([]); // Lista de acciones disponibles para agregar a una cartera.
  const [acciones, setAcciones] = useState([]); // Lista de acciones obtenidas del servidor.
  const [isModalOpen, setIsModalOpen] = useState(false); // Controla la visibilidad del modal para agregar acciones.
  const [isAddPortfolioModalOpen, setIsAddPortfolioModalOpen] = useState(false); // Controla la visibilidad del modal para agregar una nueva cartera.
  const [newPortfolioName, setNewPortfolioName] = useState(""); // Almacena el nombre de la nueva cartera.
  const userId = localStorage.getItem('userId'); // ID del usuario obtenido del localStorage.
  const navigate = useNavigate();

  const formatNumber = (number) => { // Formatea un número para mostrarlo con dos decimales y separadores de miles.
    if (number === undefined || number === null) return '0.00';
    return number.toLocaleString('es-ES', { minimumFractionDigits: 2 });
  };

  // Axios instance with common configuration
  const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 seconds timeout
  });

  const fetchPortfolioData = async () => { // Obtiene los datos de las carteras y acciones del servidor.
    try {
      if (!userId) {
        throw new Error('Usuario no encontrado. Por favor, inicie sesión nuevamente.');
      }

      setLoading(true);

      const [portfoliosResponse, stocksResponse] = await Promise.all([
        apiClient.get(`/portfolios`, {
          params: { userId: userId }
        }),
        apiClient.get(`/accions`)
      ]);

      if (portfoliosResponse.data && portfoliosResponse.data.length > 0) {
        const portfoliosWithPrices = portfoliosResponse.data.map(portfolio => {
          const portfolioTotalValue = portfolio.stocks.reduce((total, stock) => {
            const stockData = (stocksResponse.data.data || []).find(s => s.ticker === stock.ticker);
            const stockPrice = stockData?.price !== undefined ? stockData.price : stock.price;
            return total + (stockPrice * stock.cantidad);
          }, 0);

          return {
            ...portfolio,
            totalValue: portfolioTotalValue,
            stocks: portfolio.stocks.map(stock => {
              const stockData = (stocksResponse.data.data || []).find(s => s.ticker === stock.ticker);
              
              return {
                ...stock,
                price: stockData?.price !== undefined ? stockData.price : stock.price,
                currentValue: stockData?.price !== undefined ? stockData.price * stock.cantidad : (stock.price * stock.cantidad)
              };
            })
          };
        });

        setPortfolioData({ portfolios: portfoliosWithPrices });
        setSelectedPortfolio(portfoliosWithPrices[0]);
        setAcciones(stocksResponse.data);
        setAvailableStocks(Array.isArray(stocksResponse.data.data) ? stocksResponse.data.data : []);
      } else {
        throw new Error('No se encontraron datos de cartera');
      }
    } catch (err) {
      console.error('Error fetching portfolio:', err);
      setError(err.response?.data?.message || err.message || 'Error al cargar los datos de la cartera');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const handleSellStock = async (ticker) => { // Vende una acción de la cartera seleccionada.
    try {
      await apiClient.delete(`/portfolios/${userId}/${selectedPortfolio.name}/stock/${ticker}`);
      await fetchPortfolioData();
      console.log('Ticker vendido', ticker);
    } catch (err) {
      console.error('Error selling stock:', err);
      alert('Error al vender la acción: ' + (err.response?.data?.message || err.message));
    }
  };

  // Agrega una acción a la cartera seleccionada.
  const handleAddStock = async (userId, ticker, quantity, selectedPortfolio) => {
    if (ticker && quantity > 0) {
      try {
        await apiClient.post(`/users/${userId}/portfolios/${selectedPortfolio}/stock`, {
          stockId: ticker,
          title: availableStocks.find(stock => stock.ticker === ticker)?.title || ticker,
          price: availableStocks.find(stock => stock.ticker === ticker)?.price || 0,
          quantity: quantity,
          portfolioName: selectedPortfolio,
        });
        await fetchPortfolioData();
        setIsModalOpen(false);
      } catch (err) {
        console.error('Error adding stock:', err);
        alert('Error al añadir la acción: ' + (err.response?.data?.message || err.message));
      }
    }
  };

  // Agrega una Cartera nueva
  const handleAddPortfolio = async () => {
    if (!newPortfolioName.trim()) {
      alert('Por favor, ingrese un nombre para la cartera');
      return;
    }

    try {
      await apiClient.post(`/portfolios`, {
        userId: userId,
        name: newPortfolioName,
        stocks: []
      });
      
      setNewPortfolioName("");
      setIsAddPortfolioModalOpen(false);
      await fetchPortfolioData();
    } catch (err) {
      console.error('Error creating portfolio:', err);
      alert('Error al crear la cartera: ' + (err.response?.data?.message || err.message));
    }
  };

  // Borra una Cartera
  const handleDeletePortfolio = async (portfolioName) => {
    if (!confirm(`¿Está seguro que desea eliminar la cartera "${portfolioName}"?`)) {
      return;
    }

    try {
      await apiClient.delete(`/portfolios/${userId}/${portfolioName}`);
      await fetchPortfolioData();
      if (selectedPortfolio?.name === portfolioName) {
        setSelectedPortfolio(portfolioData?.portfolios[0] || null);
      }
    } catch (err) {
      console.error('Error deleting portfolio:', err);
      alert('Error al eliminar la cartera: ' + (err.response?.data?.message || err.message));
    }
  };

  if (error) return (
    <div style={{ minHeight: "100vh", backgroundColor: customColors.secondary, padding: "1.5rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", backgroundColor: customColors.white, borderRadius: "0.5rem", boxShadow: "0 4px 6px rgba(34, 53, 54, 0.1)", padding: "2rem" }}>
        <p style={{ color: "#223536", fontSize: "1.125rem", fontWeight: 500 }}>Error: {error}</p>
        <button 
          onClick={fetchPortfolioData}
          style={{ 
            backgroundColor: customColors.primary,
            color: customColors.white,
            padding: "0.5rem 1.25rem",
            marginTop: "1rem",
            borderRadius: "0.375rem",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.2s"
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#46695a"}
          onMouseOut={(e) => e.target.style.backgroundColor = customColors.primary}
        >
          Reintentar
        </button>
      </div>
    </div>
  );
  
  if (loading) return (
    <div style={{ minHeight: "100vh", backgroundColor: customColors.secondary, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ backgroundColor: customColors.white, padding: "2rem", borderRadius: "0.5rem", boxShadow: "0 4px 6px rgba(34, 53, 54, 0.1)" }}>
        <p style={{ fontSize: "1.125rem", fontWeight: 500, color: customColors.text }}>Cargando carteras...</p>
      </div>
    </div>
  );
  
  if (!portfolioData) return (
    <div style={{ minHeight: "100vh", backgroundColor: customColors.secondary, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ backgroundColor: customColors.white, padding: "2rem", borderRadius: "0.5rem", boxShadow: "0 4px 6px rgba(34, 53, 54, 0.1)" }}>
        <p style={{ fontSize: "1.125rem", fontWeight: 500, color: customColors.text }}>No se encontraron carteras.</p>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", backgroundColor: customColors.secondary }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "2rem 1rem" }}>
        {/* Header con título y botones */}
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          marginBottom: "2rem",
          flexWrap: "wrap",
          gap: "1rem"
        }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", color: customColors.text }}>
            Gestión de Carteras
          </h2>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button 
              onClick={() => navigate(-1)}
              style={{ 
                backgroundColor: customColors.red,
                color: customColors.white,
                padding: "0.5rem 1.25rem",
                borderRadius: "0.375rem",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.2s"
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = customColors.redHover}
              onMouseOut={(e) => e.target.style.backgroundColor = customColors.red}
            >
              Volver
            </button>
          </div>
        </div>

        {/* Modal para agregar nueva cartera */}
        {isAddPortfolioModalOpen && (
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: customColors.white,
              padding: "2rem",
              borderRadius: "0.5rem",
              width: "90%",
              maxWidth: "400px"
            }}>
              <h3 style={{ 
                fontSize: "1.25rem", 
                fontWeight: "bold", 
                marginBottom: "1.5rem",
                color: customColors.text 
              }}>
                Crear Nueva Cartera
              </h3>
              <input
  type="text"
  value={newPortfolioName}
  onChange={(e) => setNewPortfolioName(e.target.value)}
  placeholder="Nombre de la cartera"
  style={{
    width: "100%",
    padding: "0.5rem",
    marginBottom: "1rem",
    border: `1px solid ${customColors.border}`, // Change from customColors.white to customColors.border
    borderRadius: "0.375rem",
    backgroundColor: customColors.white // Add this line to explicitly set the background color
  }}
/>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
                <button
                  onClick={() => setIsAddPortfolioModalOpen(false)}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "0.375rem",
                    border: `1px solid ${customColors.border}`,
                    backgroundColor: customColors.white,
                    cursor: "pointer"
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddPortfolio}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "0.375rem",
                    border: "none",
                    backgroundColor: customColors.primary,
                    color: customColors.white,
                    cursor: "pointer"
                  }}
                >
                  Crear
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Panel principal con las carteras */}
        <div style={{ 
          backgroundColor: customColors.white, 
          borderRadius: "0.75rem", 
          boxShadow: "0 4px 6px rgba(34, 53, 54, 0.05)", 
          overflow: "hidden",
          marginBottom: "2rem" 
        }}>
          <div style={{ 
            padding: "1.25rem 1.5rem", 
            backgroundColor: customColors.primaryLight,
            borderBottom: `1px solid ${customColors.border}`
          }}>
            <h3 style={{ fontSize: "1.25rem", fontWeight: "bold", color: customColors.text }}>
              Valor Total de Todas las Carteras: 
              <span style={{ color: customColors.primary, marginLeft: "0.5rem" }}>
                ${formatNumber(portfolioData.portfolios.reduce((acc, portfolio) => acc + portfolio.totalValue, 0))}
              </span>
            </h3>
          </div>

          <div style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", marginBottom: "1.25rem", color: customColors.text }}>
              Resumen de Carteras
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
              {portfolioData.portfolios.map(portfolio => (
                <div 
                  key={portfolio.name}
                  style={{ 
                    padding: "1rem", 
                    borderRadius: "0.5rem", 
                    cursor: "pointer",
                    transition: "all 0.2s",
                    backgroundColor: selectedPortfolio?.name === portfolio.name ? customColors.primaryLight : customColors.white,
                    border: `1px solid ${selectedPortfolio?.name === portfolio.name ? customColors.primary : customColors.border}`,
                    boxShadow: selectedPortfolio?.name === portfolio.name ? "0 2px 4px rgba(99, 138, 99, 0.15)" : "none"
                  }}
                >
                  <div style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "flex-start"
                  }}>
                    <div
                      onClick={() => setSelectedPortfolio(portfolio)}
                      style={{ flex: 1 }}
                    >
                      <h4 style={{ fontWeight: "bold", fontSize: "1.125rem", color: customColors.text }}>
                        {portfolio.name}
                      </h4>
                      <p style={{ fontSize: "1.125rem", marginTop: "0.5rem" }}>
                        Valor Total: <span style={{ fontWeight: "600", color: customColors.primary }}>
                          ${formatNumber(portfolio.totalValue)}
                        </span>
                      </p>
                      <p style={{ fontSize: "0.875rem", color: customColors.textLight, marginTop: "0.25rem" }}>
                        {portfolio.stocks.length} acciones en cartera
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeletePortfolio(portfolio.name)}
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        color: customColors.red,
                        cursor: "pointer",
                        padding: "0.25rem",
                        borderRadius: "0.25rem",
                        transition: "background-color 0.2s"
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = "rgba(70, 105, 90, 0.1)"}
                      onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Selector de cartera */}

        <div style={{ 
          marginBottom: "1.5rem", 
          backgroundColor: customColors.white, 
          padding: "1rem", 
          borderRadius: "0.5rem", 
          boxShadow: "0 1px 3px rgba(34, 53, 54, 0.05)",
          border: `1px solid ${customColors.border}`,
          display: "flex",
          alignItems: "center",
          gap: "15px"
        }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <label style={{ fontWeight: "500", color: customColors.text }}>Seleccionar cartera: </label>
            <select
              onChange={(e) => {
                const selected = portfolioData.portfolios.find(p => p.name === e.target.value);
                setSelectedPortfolio(selected);
              }}
              style={{ 
                marginLeft: "0.5rem", 
                padding: "0.5rem", 
                border: `1px solid ${customColors.border}`, 
                borderRadius: "0.375rem",
                color: customColors.text,
                backgroundColor: customColors.white
              }}
              value={selectedPortfolio?.name || ''}
            >
              {portfolioData.portfolios.map(p => (
                <option key={p.name} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>

          <button 
            onClick={() => setIsAddPortfolioModalOpen(true)}
            style={{ 
              backgroundColor: customColors.primary,
              color: customColors.white,
              padding: "0.5rem 1.25rem",
              borderRadius: "0.375rem",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.2s"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#46695a"}
            onMouseOut={(e) => e.target.style.backgroundColor = customColors.primary}
          >
            Nueva Cartera
          </button>

          <button
            onClick={() => handleDeletePortfolio(selectedPortfolio?.name)}
            style={{ 
              backgroundColor: customColors.red,
              color: customColors.white,
              padding: "0.5rem 1.25rem",
              borderRadius: "0.375rem",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.2s"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = customColors.redHover}
            onMouseOut={(e) => e.target.style.backgroundColor = customColors.red}
          >
            Borrar Cartera
          </button>
        </div>

        {/* Panel de detalles de la cartera seleccionada */}
        <div style={{ 
          backgroundColor: customColors.white, 
          borderRadius: "0.75rem", 
          boxShadow: "0 4px 6px rgba(34, 53, 54, 0.05)", 
          overflow: "hidden" 
        }}>
          {/* Encabezado con valor de la cartera */}
          <div style={{ 
            padding: "1rem 1.5rem", 
            backgroundColor: customColors.primaryLight, 
            borderBottom: `1px solid ${customColors.border}`
          }}>
            <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", color: customColors.text }}>
              Cartera: <span style={{ color: customColors.primary }}>{selectedPortfolio?.name}</span> - 
              Valor Total: <span style={{ color: customColors.primary }}>${formatNumber(selectedPortfolio?.totalValue)}</span>
            </h3>
          </div>
          
          {/* Tabla de acciones */}
          <div style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1.125rem", fontWeight: "bold", color: customColors.text }}>Valores en cartera</h3>
              <button 
                onClick={() => setIsModalOpen(true)} 
                style={{ 
                  backgroundColor: customColors.primary, 
                  color: customColors.white, 
                  padding: "0.5rem 1rem", 
                  borderRadius: "0.375rem", 
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                  fontWeight: "500"
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#46695a"}
                onMouseOut={(e) => e.target.style.backgroundColor = customColors.primary}
              >
                Añadir Nueva Acción
              </button>
            </div>
            
            <div style={{ overflowX: "auto" }}>
              <table style={{ minWidth: "100%", borderCollapse: "separate", borderSpacing: "0" }}>
                <thead>
                  <tr>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: "600", color: customColors.textLight, textTransform: "uppercase", backgroundColor: "rgba(225, 227, 172, 0.5)", borderBottom: `1px solid ${customColors.border}` }}>Ticker</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.75rem", fontWeight: "600", color: customColors.textLight, textTransform: "uppercase", backgroundColor: "rgba(225, 227, 172, 0.5)", borderBottom: `1px solid ${customColors.border}` }}>Nombre</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "right", fontSize: "0.75rem", fontWeight: "600", color: customColors.textLight, textTransform: "uppercase", backgroundColor: "rgba(225, 227, 172, 0.5)", borderBottom: `1px solid ${customColors.border}` }}>Precio Unitario</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "right", fontSize: "0.75rem", fontWeight: "600", color: customColors.textLight, textTransform: "uppercase", backgroundColor: "rgba(225, 227, 172, 0.5)", borderBottom: `1px solid ${customColors.border}` }}>Cantidad</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "right", fontSize: "0.75rem", fontWeight: "600", color: customColors.textLight, textTransform: "uppercase", backgroundColor: "rgba(225, 227, 172, 0.5)", borderBottom: `1px solid ${customColors.border}` }}>Valor Total</th>
                    <th style={{ padding: "0.75rem 1rem", textAlign: "center", fontSize: "0.75rem", fontWeight: "600", color: customColors.textLight, textTransform: "uppercase", backgroundColor: "rgba(225, 227, 172, 0.5)", borderBottom: `1px solid ${customColors.border}` }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedPortfolio?.stocks?.length > 0 ? (
                    selectedPortfolio.stocks.map((stock, index) => {
                      const stockValue = stock.price * stock.cantidad;
                      return (
                        <tr 
                          key={stock.ticker}
                          style={{ 
                            backgroundColor: index % 2 === 0 ? customColors.white : "rgba(225, 227, 172, 0.2)",
                            transition: "background-color 0.2s"
                          }}
                          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "rgba(168, 186, 134, 0.2)"}
                          onMouseOut={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? customColors.white : "rgba(225, 227, 172, 0.2)"}
                        >
                          <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem", fontWeight: "500", color: customColors.text, borderBottom: `1px solid ${customColors.border}` }}>{stock.ticker}</td>
                          <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem", color: customColors.text, borderBottom: `1px solid ${customColors.border}` }}>{stock.title}</td>
                          <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem", color: customColors.text, textAlign: "right", borderBottom: `1px solid ${customColors.border}` }}>${formatNumber(stock.price)}</td>
                          <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem", color: customColors.text, textAlign: "right", borderBottom: `1px solid ${customColors.border}` }}>{formatNumber(stock.cantidad)}</td>
                          <td style={{ padding: "0.75rem 1rem", fontSize: "0.875rem", fontWeight: "500", color: customColors.primary, textAlign: "right", borderBottom: `1px solid ${customColors.border}` }}>${formatNumber(stockValue)}</td>
                          <td style={{ padding: "0.75rem 1rem", textAlign: "center", borderBottom: `1px solid ${customColors.border}` }}>
                            <button 
                              onClick={() => handleSellStock(stock.ticker)}
                              style={{ 
                                backgroundColor: customColors.red, 
                                color: customColors.white, 
                                padding: "0.25rem 0.75rem", 
                                borderRadius: "0.375rem", 
                                border: "none",
                                cursor: "pointer",
                                transition: "background-color 0.2s",
                                fontSize: "0.875rem"
                              }}
                              onMouseOver={(e) => e.target.style.backgroundColor = customColors.redHover}
                              onMouseOut={(e) => e.target.style.backgroundColor = customColors.red}
                            >
                              Vender
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" style={{ padding: "1.5rem", textAlign: "center", color: customColors.textLight }}>
                        No hay acciones en esta cartera. ¡Añada algunas!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <SearchModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedPortfolio={selectedPortfolio}
        onAddStock={handleAddStock}
        availableStocks={acciones}
        portfolioId={selectedPortfolio?._id}
        onStockUpdate={fetchPortfolioData}
      />
    </div>
  );
};

export default PortfolioList;