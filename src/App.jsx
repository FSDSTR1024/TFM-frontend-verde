import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from './context/AuthContext/AuthContext'
import Navbar from './components/organisms/Navbar/Navbar'
import ProfilePage from './pages/ProfilePage/ProfilePage'

// Componente para manejar rutas protegidas
const PrivateRoute = ({ element }) => {
  const { isLoggedIn, checking } = useContext(AuthContext)

  if (checking) return <div>Cargando...</div> // Muestra un loader mientras valida sesión

  return isLoggedIn ? element : <Navigate to="/login" />
}

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<div>Inicio</div>} />
      <Route path="/login" element={<div>Login</div>} />

      {/* Rutas protegidas */}
      <Route
        path="/profile"
        element={<PrivateRoute element={<ProfilePage />} />}
      />

      {/* Manejo de 404 */}
      <Route
        path="*"
        element={
          <div className="text-center mt-10 text-lg font-medium">
            Página no encontrada
          </div>
        }
      />
    </Routes>
  </BrowserRouter>
)

export default App
