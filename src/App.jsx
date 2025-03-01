import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from './context/AuthContext/AuthContext'
import Navbar from './components/organisms/Navbar/Navbar'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import AuthCard from './components/organisms/AuthCard/AuthCard'

// Componente para manejar rutas protegidas
const PrivateRoute = ({ element }) => {
  const { isLoggedIn, checking } = useContext(AuthContext)

  if (checking) return <div>Cargando...</div>

  return isLoggedIn ? element : <Navigate to="/" />
}

const App = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [activeForm, setActiveForm] = useState('login')

  // Abrir modal desde cualquier lugar de la app
  const openAuthModal = (formType) => {
    setActiveForm(formType)
    setIsAuthModalOpen(true)
  }

  // Cerrar modal cuando el usuario se autentique o lo cierre manualmente
  const handleCloseModal = () => {
    setIsAuthModalOpen(false)
  }

  return (
    <BrowserRouter>
      {/* Navbar recibe la función para abrir el modal */}
      <Navbar openAuthModal={openAuthModal} />

      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<div>Inicio</div>} />

        {/* Rutas protegidas */}
        <Route
          path="/profile"
          element={<PrivateRoute element={<ProfilePage />} />}
        />

        {/* Página 404 */}
        <Route
          path="*"
          element={
            <div className="text-center mt-10 text-lg font-medium">
              Página no encontrada
            </div>
          }
        />
      </Routes>

      {/* Modal de autenticación global */}
      {isAuthModalOpen && (
        <AuthCard
          activeForm={activeForm}
          setActiveForm={setActiveForm}
          onClose={handleCloseModal}
        />
      )}
    </BrowserRouter>
  )
}

export default App
