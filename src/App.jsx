import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useState, useContext, useCallback } from 'react'
import { AuthContext } from './context/AuthContext/AuthContext'
import Navbar from './components/organisms/Navbar/Navbar'
import Footer from './components/organisms/Footer/Footer'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import AuthCard from './components/organisms/AuthCard/AuthCard'

// =========================================
// Componente para manejar rutas protegidas
// =========================================
const PrivateRoute = ({ children }) => {
  const { isLoggedIn, checking } = useContext(AuthContext)

  if (checking) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="animate-spin border-t-4 border-primary-dark h-10 w-10 rounded-full"></span>
      </div>
    )
  }

  return isLoggedIn ? (
    children
  ) : (
    <div className="text-center mt-10">
      <p className="text-lg font-medium">Redirigiendo al inicio...</p>
      <Navigate to="/" replace={true} />
    </div>
  )
}

const App = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [activeForm, setActiveForm] = useState('login')
  const [dropdownHeight, setDropdownHeight] = useState(0) // 🔹 ESTADO PARA CONTROLAR EL MARGEN

  // ==============================================
  // Abrir modal desde cualquier lugar de la app
  // ==============================================
  const openAuthModal = useCallback((formType) => {
    setActiveForm(formType)
    setIsAuthModalOpen(true)
  }, [])

  // ======================================================================
  // Cerrar modal cuando el usuario se autentique o lo cierre manualmente
  // ======================================================================
  const handleCloseModal = useCallback(() => {
    setIsAuthModalOpen(false)
  }, [])

  return (
    <BrowserRouter>
      {/* Estructura correcta con Header, Main y Footer */}
      <div className="flex flex-col min-h-screen">
        <Navbar
          openAuthModal={openAuthModal}
          setDropdownHeight={setDropdownHeight}
        />

        <main
          className="flex-grow transition-all duration-200"
          style={{ marginTop: dropdownHeight }}
        >
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<div>Inicio</div>} />

            {/* Rutas protegidas */}
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
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
        </main>

        <Footer />
      </div>

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
