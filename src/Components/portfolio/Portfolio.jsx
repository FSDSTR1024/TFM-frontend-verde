// Este componente muestra el Portfolio de un usuario logueado
// Permite agregar y borrar carteras. También permite buscar acciones para agregar a alguna de las carteras

import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useLocation } from "react-router-dom"
import AddStockModal from "./AddStockModal_borrar"

export default function Portfolio() {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const userId = localStorage.getItem("userId")
  const [portfolios, setPortfolios] = useState([])
  const [selectedPortfolio, setSelectedPortfolio] = useState(null)
  const [isModalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isCreateModalOpen, setCreateModalOpen] = useState(false)
  const [newPortfolioName, setNewPortfolioName] = useState("")

  // Paleta de colores
  const colors = {
    bgLight: "#fafafa",
    yellowLight: "#e1e3ac",
    greenMedium: "#638a63",
    greenDark: "#46695a",
    darkBlue: "#223536",
    greenLight: "#a8ba86"
  }

  useEffect(() => {
    const fetchPortfolios = async () => {
      if (!userId) {
        setError("UserId no proporcionado")
        setLoading(false)
        return
      }

      try {
        console.log(`Intentando cargar portfolios para userId: ${userId}`)
        // Usa la URL completa para evitar problemas con las rutas relativas
        const response = await axios.get(`https://tfm-backend-kalx.onrender.com/portfolios?userId=${userId}`)
        
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          setPortfolios(response.data)
          setSelectedPortfolio(response.data[0])
          console.log("Portfolios cargados correctamente:", response.data)
        } else {
          console.log("No se encontraron portfolios o formato incorrecto")
          setError("No se encontraron carteras para este usuario")
        }
      } catch (error) {
        console.error("Error al cargar carteras:", error)
        setError(`Error al cargar carteras: ${error.message}`)
      } finally {
        setLoading(false)
      }
    }
    
    fetchPortfolios()
  }, [userId]) // Se ejecuta cuando cambia el userId

  // Calcular el valor total de todos los portfolios
  const calculateTotalPortfoliosValue = () => {
    if (!portfolios || portfolios.length === 0) return 0
    
    return portfolios.reduce((total, portfolio) => {
      const portfolioTotal = portfolio.stocks.reduce((sum, stock) => {
        return sum + (stock.price * stock.cantidad)
      }, 0)
      return total + portfolioTotal
    }, 0).toFixed(2)
  }

  // Calcular el valor total de un portfolio específico
  const calculatePortfolioValue = (portfolio) => {
    if (!portfolio || !portfolio.stocks) return 0
    
    return portfolio.stocks.reduce((total, stock) => {
      return total + (stock.price * stock.cantidad)
    }, 0).toFixed(2)
  }

  // Contar acciones en cartera
  const countStocks = (portfolio) => {
    if (!portfolio || !portfolio.stocks) return 0
    return portfolio.stocks.length
  }

  // Cambiar el portfolio seleccionado
  const handlePortfolioChange = (e) => {
    const selectedName = e.target.value
    const found = portfolios.find(p => p.name === selectedName)
    if (found) {
      setSelectedPortfolio(found)
    }
  }

  // Abrir modal para añadir stock
  const handleAddStock = () => {
    setModalOpen(true)
  }

  // Cerrar modal
  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const createPortfolio = async () => {
    if (!newPortfolioName.trim()) {
      alert("El nombre de la cartera no puede estar vacío")
      return
    }
    try {
      const response = await axios.post("https://tfm-backend-kalx.onrender.com/portfolios", {
        userId,
        name: newPortfolioName,
        stocks: []
      })
      setPortfolios([...portfolios, response.data])
      setCreateModalOpen(false)
      setNewPortfolioName("")
    } catch (error) {
      alert("Error al crear la cartera")
    }
  }

  // Borrar una cartera
  const deletePortfolio = async () => {
    if (!selectedPortfolio) {
      alert("No hay ninguna cartera seleccionada para borrar")
      return
    }
  
    const confirmDelete = window.confirm(`¿Estás seguro de que deseas borrar la cartera "${selectedPortfolio.name}"?`)
    if (!confirmDelete) {
      return
    }
  
    try {
      // Enviar userId y portfolioName en la solicitud DELETE
      await axios.delete(`https://tfm-backend-kalx.onrender.com/portfolios/${userId}/${selectedPortfolio.name}`)
      
      // Actualizar el estado de las carteras
      const updatedPortfolios = portfolios.filter(p => p.name !== selectedPortfolio.name)
      setPortfolios(updatedPortfolios)
  
      // Actualizar la cartera seleccionada
      if (updatedPortfolios.length > 0) {
        setSelectedPortfolio(updatedPortfolios[0])
      } else {
        setSelectedPortfolio(null)
      }
  
      alert("Cartera borrada exitosamente")
    } catch (error) {
      console.error("Error al borrar la cartera:", error)
      alert("Error al borrar la cartera")
    }
  }

  // Mostrar estados de carga y error
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen" style={{ backgroundColor: colors.bgLight }}>
        <div className="text-xl font-semibold" style={{ color: colors.darkBlue }}>Cargando portfolios...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen" style={{ backgroundColor: colors.bgLight }}>
        <div className="text-xl font-semibold text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4" style={{ backgroundColor: colors.yellowLight }}>
      {/* Header con botón Volver */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold" style={{ color: colors.darkBlue }}>Gestión de Carteras</h1>
        <button 
          className="px-4 py-1 rounded text-white"
          style={{ backgroundColor: colors.greenDark }}
          onClick={() => navigate('/')}
        >
          Volver
        </button>
      </div>
      
      {/* Valor Total de Todas las Carteras */}
      <div className="p-3 mb-6 rounded" style={{ backgroundColor: colors.yellowLight }}>
        <div className="font-bold text-lg" style={{ color: colors.darkBlue }}>
          Valor Total de Todas las Carteras: ${calculateTotalPortfoliosValue()}
        </div>
      </div>
      
      {/* Resumen de Carteras */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-2" style={{ color: colors.darkBlue }}>Resumen de Carteras</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {portfolios.map((portfolio, index) => (
            <div key={index} className="border rounded p-4 relative" style={{ borderColor: colors.greenLight }}>
              <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">×</button>
              <div className="font-semibold mb-1" style={{ color: colors.greenDark }}>{portfolio.name}</div>
              <div className="mb-1">Valor Total: ${calculatePortfolioValue(portfolio)}</div>
              <div className="text-sm text-gray-600">{countStocks(portfolio)} acciones en cartera</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Selector de Cartera y botones */}
      <div className="flex flex-col md:flex-row gap-2 mb-4 p-4 border rounded" style={{ borderColor: colors.greenLight }}>
        <div className="flex-1 flex items-center gap-2">
          <label className="whitespace-nowrap">Seleccionar cartera:</label>
          <select 
            className="border rounded px-2 py-1 flex-1"
            style={{ borderColor: colors.greenMedium }}
            value={selectedPortfolio?.name || ''}
            onChange={handlePortfolioChange}
          >
            {portfolios.map((portfolio, index) => (
              <option key={index} value={portfolio.name}>{portfolio.name}</option>
            ))}
          </select>
        </div>
        <button 
          className="px-4 py-1 text-white rounded bg-verde-medio" 
          onClick={() => setCreateModalOpen(true)}
        >
          Nueva Cartera
        </button>
        <button className="px-4 py-1 text-white rounded bg-verde-claro" onClick={deletePortfolio}>
          Borrar Cartera
        </button>
      </div>
      
      {/* Detalles de la cartera seleccionada */}
      {selectedPortfolio && (
        <>
          <div className="p-3 mb-4 rounded" style={{ backgroundColor: colors.yellowLight }}>
            <div className="font-bold" style={{ color: colors.darkBlue }}>
              Cartera: {selectedPortfolio.name} - Valor Total: ${calculatePortfolioValue(selectedPortfolio)}
            </div>
          </div>
          
          {/* Tabla de Valores en cartera */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold" style={{ color: colors.darkBlue }}>Valores en cartera</h3>
              <button 
                className="px-3 py-1 text-white rounded text-sm"
                style={{ backgroundColor: colors.greenMedium }}
                onClick={handleAddStock}
              >
                Añadir Nueva Acción
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: colors.greenLight, color: colors.darkBlue }}>
                    <th className="py-2 px-4 text-left">TICKER</th>
                    <th className="py-2 px-4 text-left">NOMBRE</th>
                    <th className="py-2 px-4 text-right">PRECIO UNITARIO</th>
                    <th className="py-2 px-4 text-right">CANTIDAD</th>
                    <th className="py-2 px-4 text-right">VALOR TOTAL</th>
                    <th className="py-2 px-4 text-center">ACCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedPortfolio.stocks && selectedPortfolio.stocks.map((stock, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} style={{ borderBottom: '1px solid #e1e3ac' }}>
                      <td className="py-2 px-4 font-medium">{stock.ticker}</td>
                      <td className="py-2 px-4">{stock.title}</td>
                      <td className="py-2 px-4 text-right">${stock.price.toFixed(2)}</td>
                      <td className="py-2 px-4 text-right">{stock.cantidad.toFixed(2)}</td>
                      <td className="py-2 px-4 text-right">${(stock.price * stock.cantidad).toFixed(2)}</td>
                      <td className="py-2 px-4 text-center">
                        <button 
                          className="px-3 py-1 text-white rounded text-xs"
                          style={{ backgroundColor: colors.greenDark }}
                        >
                          Vender
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      {console.log('Portfolio name',selectedPortfolio.name)}
      {console.log('Portfolio id',selectedPortfolio.id)}
      {console.log('Portfolio _id',selectedPortfolio._id)}
      {/* Modal para añadir stock */}
      {isModalOpen && (
        <AddStockModal 
          isOpen={isModalOpen}
          onClose={handleCloseModal} 
          portfolioId={selectedPortfolio ? selectedPortfolio._id : null} 
        />
      )}

      {/* Modal para crear nueva cartera */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Crear Nueva Cartera</h2>
            <input
              type="text"
              placeholder="Nombre de la cartera"
              value={newPortfolioName}
              onChange={(e) => setNewPortfolioName(e.target.value)}
              className="border rounded px-2 py-1 mb-4 w-full"
            />
            <div className="flex justify-end">
              <button
                className="px-4 py-1 text-white rounded bg-verde-medio mr-2"
                onClick={() => setCreateModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-1 text-white rounded bg-verde-medio"
                onClick={createPortfolio}
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}