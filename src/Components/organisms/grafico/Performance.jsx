// Este componente grafica las acciones que mejor desempeño tuvieron en el mes
import React from 'react'
import { Apple, Cpu, Car, ShoppingCart, Search, Monitor } from 'lucide-react'

const Performance = () => {
  // Datos de ejemplo para las 6 mejores acciones con iconos apropiados
  const stocks = [
    {
      symbol: 'NVDA',
      name: 'NVIDIA',
      return: 178.5,
      icon: Cpu
    },
    {
      symbol: 'TSLA',
      name: 'Tesla',
      return: 96.7,
      icon: Car
    },
    {
      symbol: 'AAPL',
      name: 'Apple',
      return: 87.3,
      icon: Apple
    },
    {
        symbol: 'MSFT',
        name: 'Microsoft',
        return: 65.2,
        icon: Monitor
    },
    {
        symbol: 'AMZN',
        name: 'Amazon',
        return: 52.8,
        icon: ShoppingCart
    },
  ]

  // Usando la paleta de colores proporcionada
  const colors = {
    background: '#e1e3ac',
    card: '#a8ba86',
    title: '#223536',
    text: '#223536',
    icon: '#638a63',
    highlight: '#46695a'
  }

  return (
    <div className="w-full h-full overflow-y-auto" style={{ backgroundColor: colors.card }}>

      
      <div className="space-y-1 px-1">
        {stocks.map((stock) => (
          <div 
            key={stock.symbol} 
            className="rounded-md shadow-sm overflow-hidden p-0"
            style={{ backgroundColor: colors.card }}
          >
            <div className="flex items-center cursor-pointer">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center mr-2"
                style={{ backgroundColor: colors.icon }}
              >
                {React.createElement(stock.icon, { 
                  size: 16, 
                  color: "#e1e3ac"
                })}
              </div>
              
              <div className="flex-grow min-w-0">
                <div className="font-bold text-sm " style={{ color: colors.text }}>{stock.symbol}</div>
                <div className="text-xs " style={{ color: colors.text, opacity: 0.8 }}>{stock.name}</div>
              </div>
              
              <div className="text-right ml-1 flex-shrink-0">
               <div className="font-bold text-sm" style={{ color: colors.highlight }}>+{stock.return.toFixed(1)}%</div>
              </div>
              
              <div className="ml-1 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill={colors.text}>
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Performance