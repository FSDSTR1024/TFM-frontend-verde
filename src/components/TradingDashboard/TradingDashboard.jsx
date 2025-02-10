import Indices from "../indices/indices";
import Portfolio from "../portfolio/portfolio";
import { useNavigate } from "react-router-dom";
import './TradingDashboard.css'


const TradingDashboard = () => {
  const navigate = useNavigate(); // Hook para navegación
    return (
      <div className="min-h-screen flex flex-col">
        {/* Navbar 
        <div className="navbar bg-base-100 shadow-lg">
          <div className="flex-1">
            <span className="text-xl font-bold">Mi App</span>
          </div>
          <div className="flex-none">
            <button className="btn btn-primary">Acción</button>
          </div>
        </div>*/}
  
        {/* Contenido Principal */}
        <main className="container mx-auto px-4 py-8">
          {/* Diseño Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-5 gap-4">
            {/* Primera fila */}
            <div  style={{ backgroundColor: "#e1e3ac" }} className=" p-8 rounded-lg shadow-lg flex items-start justify-start col-span-1 w-full h-64 md:h-80 lg:h-96">

            <div className="w-full max-w-7xl mx-auto p-4">
      {/* Contenedor con scroll si el contenido excede */}
      <div className="relative overflow-auto max-h-[90vh]">
        {/* Contenedor flex que maneja el layout responsivo */}
        <div className="flex flex-col md:flex-row flex-wrap gap-4">
          {/* El componente Usuario ahora será responsivo */}
          <div className="w-full md:w-auto min-w-0 flex-1">
            <Indices />
          </div>
        </div>
      </div>
    </div>



            </div>
            <div className="bg-blue-500 p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-2">
              <span className="text-white text-lg font-bold">Caja 2 y 3 (Fusionada con Caja 4)</span>
            </div>
            <div className="bg-yellow-500 p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1">
              <span className="text-white text-lg font-bold">Caja 4</span>
            </div>
            <div className="bg-green-500 p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1">
              <span className="text-white text-lg font-bold">Caja 5</span>
            </div>
  
            {/* Segunda fila */}
            <div style={{ backgroundColor: "#e1e3ac" }} className="bg-purple-500 p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1">
                <div  className="Portfolio">
               
                  <figure>
                   <svg width="200" height="200" viewBox="0 0 200 200">
                   <circle cx="100" cy="100" r="80" fill="#ff0000" />
                   <path d="M 100 20 A 80 80 0 0 1 180 100 L 100 100 Z" fill="#ff0000" stroke="#000000" strokeWidth="2"/>
                   <path d="M 180 100 A 80 80 0 0 1 100 180 L 100 100 Z" fill="#00ff00" stroke="#000000" strokeWidth="2"/>
                   <path d="M 100 180 A 80 80 0 0 1 20 100 L 100 100 Z" fill="#0000ff" stroke="#000000" strokeWidth="2"/>
                   <path d="M 20 100 A 80 80 0 0 1 100 20 L 100 100 Z" fill="#ffff00" stroke="#000000" strokeWidth="2"/>
                  </svg>
                 </figure>


           
 
                  <button className="btn btn-active btn-accent" onClick={() => navigate("/portfolio")}>Portfolio</button>
 
          
           
                </div> 


            
            </div>
            <div className="bg-pink-500 p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1">
              <span className="text-white text-lg font-bold">Caja 7</span>
            </div>
            <div className="bg-indigo-500 p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1">
              <span className="text-white text-lg font-bold">Caja 8</span>
            </div>
            <div className="bg-teal-500 p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1">
              <span className="text-white text-lg font-bold">Caja 9</span>
            </div>
            <div className="bg-orange-500 p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1">
              <span className="text-white text-lg font-bold">Caja 10</span>
            </div>
  
            {/* Tercera fila */}
            <div className="bg-cyan-500 p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1">
              <span className="text-white text-lg font-bold">Caja 11</span>
            </div>
            <div className="bg-lime-500 p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1">
              <span className="text-white text-lg font-bold">Caja 12</span>
            </div>
            <div className="bg-emerald-500 p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1">
              <span className="text-white text-lg font-bold">Caja 13</span>
            </div>
            <div className="bg-gray-500 p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1">
              <span className="text-white text-lg font-bold">Caja 14</span>
            </div>
            <div className="bg-blue-800 p-8 rounded-lg shadow-lg flex items-center justify-center col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1">
              <span className="text-white text-lg font-bold">Caja 15</span>
            </div>
          </div>
        </main>
  
        {/* Footer */}
        <footer className="footer footer-center p-4 bg-base-300 text-base-content">
          <div>
            <p>Copyright © 2024 - Todos los derechos reservados</p>
          </div>
        </footer>
      </div>
    );
  };
  
  export default TradingDashboard;
  
  <style>{`

    
  `}</style>