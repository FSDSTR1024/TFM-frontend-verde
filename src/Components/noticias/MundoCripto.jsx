// Este componente grafica criptomonedas flotando en el aire
//Tiene un boton para dirgirse a noticias relacionadas con Criptomonedas

import{ useEffect, useState } from "react"

export default function MundoCripto() {
  return (
    <div className="relative w-full max-w-lg h-64 bg-verde-claro text-[#fafafa] rounded-lg flex flex-col items-center justify-center overflow-hidden">

      {/* Botón sin funcionalidad */}
      <button className="px-5 py-2 bg-verde-medio text-[#223536] font-medium rounded-lg  hover:bg-[#a8ba86] transition">
        Mundo Cripto
      </button>

      {/* Animación de criptomonedas flotando */}
      <FloatingCrypto />
    </div>
  )
}

function FloatingCrypto() {
  const cryptos = ["◎", "₿", "💎", "💰", "🚀", "Ξ","ⓥ"]
  const [positions, setPositions] = useState([])

  useEffect(() => {
    const newPositions = Array.from({ length: 10 }).map(() => ({
      id: Math.random(),
      icon: cryptos[Math.floor(Math.random() * cryptos.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 4 + Math.random() * 3, // Duración aleatoria entre 4s y 7s
    }))
    setPositions(newPositions)
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none">
      {positions.map(({ id, icon, x, y, delay, duration }) => (
        <span
          key={id}
          className="absolute text-2xl opacity-80 animate-float"
          style={{
            top: `${y}%`,
            left: `${x}%`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          }}
        >
          {icon}
        </span>
      ))}
    </div>
  )
}
