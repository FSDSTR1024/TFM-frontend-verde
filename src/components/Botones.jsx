import "../components/Botones.css"; 

const Botones = () => {
  return (
    <div className="container">
      {/* Sección de botones */}
      <div className="buttons-container">
        {Array.from({ length: 7 }, (_, index) => (
          <button key={index} className="button">
            Botón {index + 1}
          </button>
        ))}
      </div>

      {/* Sección de cajas */}
      <div className="boxes-container">
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="box"></div>
        ))}
      </div>
    </div>
  );
};

export default Botones;
