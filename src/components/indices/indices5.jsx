import React from 'react';

const IndexList = ({ indexData = {}, activeRegion = 'AMÉRICA', setActiveRegion }) => {
  const regions = ['AMÉRICA', 'EUROPA', 'ASIA'];

  // Validación de seguridad para los datos
  const currentData = indexData[activeRegion] || [];

  return (
    <div className="p-4">
      {/* Botones de región */}
      <div className="flex gap-2 mb-6">
        {regions.map((region) => (
          <button
            key={region}
            onClick={() => setActiveRegion(region)}
            className={`btn btn-sm ${
              activeRegion === region ? 'btn-primary' : 'btn-ghost'
            } hover:btn-primary-focus transition-colors duration-200 rounded-none`}
          >
            {region}
          </button>
        ))}
      </div>

      {/* Lista de índices */}
      <div className="flex flex-col gap-4">
        {currentData.length > 0 ? (
          currentData.map((index, i) => (
            <div
              key={i}
              className="bg-base-200 shadow-xl p-4 min-h-[100px] bg-green-50 rounded-none"
              style={{ minWidth: '350px', maxWidth: '600px' }}
            >
              {/* Contenedor de 3 columnas */}
              <div className="flex items-center gap-4">
                {/* Columna 1: Icono */}
                <div className="flex-none w-16 flex justify-center">
                  <img
                    src={
                      index.change > 0
                        ? "/images/flecha_arriba.svg"
                        : index.change < 0
                        ? "/images/flecha_abajo.svg"
                        : "/images/sin_cambio.svg"
                    }
                    alt="trend"
                    className="w-8 h-8"
                  />
                </div>

                {/* Columna 2: Nombre y precio */}
                <div className="flex-1 flex flex-col items-start min-w-[150px]">
                  <div className="text-xl font-semibold truncate w-full">
                    {index.name || 'Sin nombre'}
                  </div>
                  <div className="text-lg font-medium">
                    {index.price !== "N/A" ? Number(index.price).toFixed(2) : "N/A"}
                  </div>
                </div>

                {/* Columna 3: Cambios */}
                <div className="flex-none w-28 flex flex-col items-end">
                  <div
                    className={`badge ${
                      Number(index.change) >= 0 ? "badge-success" : "badge-error"
                    } font-bold mb-1 rounded-none`}
                  >
                    {Number(index.change).toFixed(2)}
                  </div>
                  <div
                    className={`badge ${
                      Number(index.percentChange) >= 0 ? "badge-success" : "badge-error"
                    } font-bold rounded-none`}
                  >
                    {Number(index.percentChange).toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">
            No hay datos disponibles para esta región
          </div>
        )}
      </div>
    </div>
  );
};

export default IndexList;