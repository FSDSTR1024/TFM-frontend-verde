// Este componente grafica las proyecciones de la evolucion de los sectores

import { TrendingUp, TrendingDown, Hospital, Building2, Factory, Warehouse, Car, Cpu, Smartphone, Droplet, Zap, Building, Briefcase, Trees } from 'lucide-react';

export default function Tendencias_Sectores() {
  const sectores = [
    { nombre: "", icono: <Hospital size={15} />, alza: Math.random() > 0.5 },
    { nombre: "", icono: <Building2 size={15} />, alza: Math.random() > 0.5 },
    { nombre: "", icono: <Factory size={15} />, alza: Math.random() > 0.5 },
    { nombre: "", icono: <Warehouse size={15} />, alza: Math.random() > 0.5 },
    { nombre: "", icono: <Car size={15} />, alza: Math.random() > 0.5 },
    { nombre: "", icono: <Cpu size={15} />, alza: Math.random() > 0.5 },
    { nombre: "", icono: <Smartphone size={15} />, alza: Math.random() > 0.5 },
    { nombre: "", icono: <Zap size={15} />, alza: Math.random() > 0.5 },
    { nombre: "", icono: <Droplet size={15} />, alza: Math.random() > 0.5 },
    { nombre: "", icono: <Building size={15} />, alza: Math.random() > 0.5 },
    { nombre: "", icono: <Briefcase size={15} />, alza: Math.random() > 0.5 },
    { nombre: "", icono: <Trees size={15} />, alza: Math.random() > 0.5 }
    
  ];

  return (
    <div className="w-full h-full bg-white shadow-md rounded-xl p-4 flex flex-col">
      <h2 className="text-lg font-semibold mb-3">Tendencias Sectoriales</h2>
      
      <div className="flex-grow overflow-y-auto grid grid-cols-2 gap-3 pr-1">
        {sectores.map((sector, index) => (
          <div key={index} className="flex items-center p-2 border rounded-lg bg-gray-50">
            <div className="mr-3 text-gray-700">{sector.icono}</div>
            <div className="flex-grow">
              <div className="font-medium text-sm">{sector.nombre}</div>
              <div className="flex items-center">
                {sector.alza ? (
                  <div className="flex items-center text-green-600">
                    <TrendingUp size={16} className="mr-1" />
                  
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <TrendingDown size={16} className="mr-1" />
               
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-xs text-gray-500 text-right mt-2">
        Tendencias actualizadas: 21/03/2025
      </div>
    </div>
  );
}