import { useState } from "react";
import AddStockModal from "./AddStockModal";

export default function Portfolio() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [portfolio, setPortfolio] = useState([]);

  // 📌 Agregar acción al portafolio
  const addStock = (newStock) => {
    setPortfolio([...portfolio, newStock]);
    setModalOpen(false); // Cerrar el modal después de agregar
  };

  return (
    <div>
      {/* 📌 Botón para abrir el modal */}
      <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
        Añadir Valor
      </button>

      {/* 📌 Modal para buscar y agregar valores */}
      <AddStockModal 
        isOpen={isModalOpen} 
        onClose={() => setModalOpen(false)} 
        onAddStock={addStock} 
      />
    </div>
  );
}
