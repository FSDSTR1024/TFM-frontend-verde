//Este componente muestra un Calendario relacionado con eventos que afectan a los mercados

import { useState } from "react"

export default function Calendario() {
  const [earnings] = useState([
    { date: "18 Mar", company: "Tesla", symbol: "TSLA", time: "After Market", logo: "🚗" },
    { date: "19 Mar", company: "Apple", symbol: "AAPL", time: "Before Market", logo: "🍏" },
    { date: "20 Mar", company: "Microsoft", symbol: "MSFT", time: "After Market", logo: "💻" },
    { date: "21 Mar", company: "Amazon", symbol: "AMZN", time: "Before Market", logo: "📦" },
  ])

  return (
    <div className="w-full max-w-2xl bg-white shadow-md rounded-xl p-4 h-full overflow-auto">
      <h2 className="text-lg font-semibold mb-3 text-center">Calendario de Resultados</h2>
      <div className="flex flex-col gap-3">
        {earnings.map((item, index) => (
          <EarningsItem key={index} {...item} />
        ))}
      </div>
    </div>
  )
}

function EarningsItem({ date, company, symbol, time, logo }) {
  return (
    <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition">
      <div className="flex items-center gap-3">
        <span className="text-xl">{logo}</span>
        <div>
          <p className="font-medium">{company} ({symbol})</p>
          <p className="text-sm text-gray-500">{time}</p>
        </div>
      </div>
      <span className="text-sm font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
        {date}
      </span>
    </div>
  )
}