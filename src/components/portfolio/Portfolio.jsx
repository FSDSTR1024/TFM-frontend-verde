import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import AddStockModal from "../portfolio/AddStockModal";

export default function Portfolio() {
const [isModalOpen, setModalOpen] = useState(false);


  // Datos iniciales de la cartera
  const [portfolio, setPortfolio] = useState({
    name: "Mi Cartera",
    currentValue: 50000,
    dailyChangeAbs: 500,
    dailyChangePct: 1.02,
    history: [
      { date: "Lun", value: 48000 },
      { date: "Mar", value: 49000 },
      { date: "Mié", value: 49500 },
      { date: "Jue", value: 49800 },
      { date: "Vie", value: 50000 },
    ],
    stocks: [
      { ticker: "AAPL", name: "Apple Inc.", currentValue: 180, changeAbs: 2, changePct: 1.12 },
      { ticker: "TSLA", name: "Tesla Inc.", currentValue: 250, changeAbs: -5, changePct: -2.00 },
    ],
  });

  // Función para añadir un valor ficticio a la cartera
  const addStock = () => {
    const newStock = { ticker: "MSFT", name: "Microsoft Corp.", currentValue: 320, changeAbs: 3, changePct: 0.94 };
    setPortfolio({
      ...portfolio,
      stocks: [...portfolio.stocks, newStock],
    });
  };

  // Función para vender (eliminar) un valor de la cartera
  const sellStock = (ticker) => {
    setPortfolio({
      ...portfolio,
      stocks: portfolio.stocks.filter((stock) => stock.ticker !== ticker),
    });
  };

  return (
    <div className="container mx-auto p-6 bg-base-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">{portfolio.name}</h2>

      {/* 📊 Gráfico del histórico de la cartera */}
      <div className="bg-base-100 p-4 rounded-lg shadow">
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={portfolio.history}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 📈 Información de la cartera */}
      <div className="flex justify-between mt-4">
        <p className="text-lg">
          <strong>Valor actual:</strong> ${portfolio.currentValue.toLocaleString()}
        </p>
        <p className={`text-lg ${portfolio.dailyChangeAbs >= 0 ? "text-green-500" : "text-red-500"}`}>
          <strong>Variación:</strong> {portfolio.dailyChangeAbs} ({portfolio.dailyChangePct}%)
        </p>
      </div>

      {/* 📜 Tabla de valores */}
      <div className="overflow-x-auto mt-4">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Nombre</th>
              <th>Valor</th>
              <th>Variación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {portfolio.stocks.map((stock) => (
              <tr key={stock.ticker}>
                <td>{stock.ticker}</td>
                <td>{stock.name}</td>
                <td>${stock.currentValue}</td>
                <td className={stock.changeAbs >= 0 ? "text-green-500" : "text-red-500"}>
                  {stock.changeAbs} ({stock.changePct}%)
                </td>
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

      {/* 🛠️ Botones de acciones */}
      <div className="flex justify-center gap-4 mt-6">
      <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
          Añadir Valor
        </button>
      </div>
      {/* 📌 Modal para buscar y agregar valores */}
      <AddStockModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        onAddStock={addStock} 
      />


    </div>
  );
}
