import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/organisms/Navbar/Navbar'

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      {/* Página principal sin usuarios logados */}
      <Route path="/" element={<div>Inicio de Login y Registro</div>} />

      {/* Página de usuario logado */}
      <Route
        path="/dashboard"
        element={
          <div className="text-center mt-10 text-lg font-medium text-primary-light">
            Panel principal del usuario logueado
          </div>
        }
      />

      {/* Ruta por defecto si no existe */}
      <Route
        path="*"
        element={
          <div className="text-center mt-10 text-lg font-medium text-primary-light">
            Página no encontrada
          </div>
        }
      />
    </Routes>
  </BrowserRouter>
)

export default App

