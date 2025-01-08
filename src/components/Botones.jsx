import "../components/Botones.css"; 

const Botones = () => {
  return (
    
    <div className="container">
      {/* Sección de botones */}
      <div className="buttons-container">
       
          <button   className="button">
            Comparar Merados 
          </button>
          <button   className="button">
            Europa 
          </button>
          <button   className="button">
            EEUU 
          </button>
          <button   className="button">
            Asia 
          </button>
          <button   className="button">
            Divisas 
          </button>          
          <button   className="button">
            Criptomonedas 
          </button>
          <button   className="button">
            Futuros 
          </button>
         
      </div>

      {/* Sección de cajas */}
      <div className="boxes-container">
       <div className="box"></div>
       <div className="box"></div>
       <div className="box"></div>
       <div className="box"></div>
       <div className="box"></div>
       <div className="box"></div>
      </div>


    </div>
  );
};

export default Botones;
