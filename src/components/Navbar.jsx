import "./Navbar.css"; // Importamos los estilos
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="icon-container">
        {/* Ícono de Navbar */}
        <button className="icon-button">
          <Menu size={24} color="white" />
        </button>
      </div>
      {/* Imagen a continuación */}
      <img 
        src="https://via.placeholder.com/100" 
        alt="Logo" 
        className="logo" 
      />
       <span className="navbar-text">GFINANCE</span>
    </nav>
  );
};

export default Navbar;
