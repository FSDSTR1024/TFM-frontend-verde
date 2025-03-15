import { useEffect, useState } from "react"

export default function MarketTrendsComponent() {
    return (
      <div className="w-full max-w-lg bg-white shadow-md rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-3">Tendencias de mercado</h2>
        <div className="flex flex-wrap gap-2">
          <Tag icon="📈" text="Índices de mercado" />
          <Tag icon="📊" text="Mayor actividad" />
          <Tag icon="📈" text="Mayores subidas" />
          <Tag icon="📉" text="Mayores bajadas" />
          <Tag icon="🌿" text="Líderes en sostenibilidad" />
          <CryptoTag icon="🪙" text="Criptomoneda" />
          <Tag icon="💱" text="Divisas" />
        </div>
      </div>
    );
  }
  
  function Tag({ icon, text }) {
    return (
      <button className="flex items-center gap-1 text-sm font-medium bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full hover:bg-gray-200 transition">
        <span>{icon}</span>
        <span>{text}</span>
      </button>
    );
  }
  

  // Botón especial con animación para Criptomoneda
function CryptoTag({ icon, text }) {
    const [animate, setAnimate] = useState(false);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setAnimate((prev) => !prev);
      }, 1000); // Cambia cada segundo
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <button className="flex items-center gap-1 text-sm font-medium bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full hover:bg-gray-200 transition">
        <span className={`transition-transform ${animate ? "scale-125 text-yellow-500" : "scale-100 text-gray-700"}`}>
          {icon}
        </span>
        <span>{text}</span>
      </button>
    );
  }