// Este componente grafica la evolucion de los mercados 
// en funcion de los sectores de la economía

import React from 'react';

export default function Variaciones() {
  const sectores = [
    { nombre: "Todos los Sectores", variacion: "+0.08%", positivo: true },
    { nombre: "Servicios de Comunicación", variacion: "+1.00%", positivo: true },
    { nombre: "Consumo Discrecional", variacion: "+0.63%", positivo: true },
    { nombre: "Tecnología de la Información", variacion: "+0.49%", positivo: true },
    { nombre: "Productos Básicos de Consumo", variacion: "-0.09%", positivo: false },
    { nombre: "Salud", variacion: "-0.30%", positivo: false },
    { nombre: "Financieros", variacion: "-0.39%", positivo: false },
    { nombre: "Industriales", variacion: "-0.54%", positivo: false },
    { nombre: "Energía", variacion: "-0.62%", positivo: false },
    { nombre: "Servicios Públicos", variacion: "-0.66%", positivo: false },
    { nombre: "Materiales", variacion: "-1.00%", positivo: false },
    { nombre: "Bienes Raíces", variacion: "-1.03%", positivo: false }
  ];

  return (
    <div className="w-full h-full bg-white shadow-md rounded-xl p-4 flex flex-col">
      <h2 className="text-lg font-semibold mb-2">Variaciones por Sector</h2>
      
      <div className="flex-grow overflow-y-auto pr-2">
        {sectores.map((sector, index) => (
          <div key={index} className="flex justify-between items-center mb-2 text-base">
            <div className="flex items-center min-w-0 flex-1">
              <div 
                className={`w-1.5 h-6 mr-3 rounded-sm ${sector.positivo ? 'bg-green-500' : 'bg-red-500'}`}
              ></div>
              <span className="truncate font-medium">{sector.nombre}</span>
            </div>
            <div 
              className={`px-3 py-1 rounded-md ml-4 flex-shrink-0 font-medium ${
                sector.positivo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {sector.variacion}
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-xs text-gray-500 text-right mt-2">
        Datos actualizados a las 12:00 AM EDT 21/03/2025
      </div>
    </div>
  );
}