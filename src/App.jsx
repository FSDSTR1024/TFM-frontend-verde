import { useState, useContext, useCallback } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { AuthContext } from './context/AuthContext/AuthContext'

// Organismos
import Navbar from '@/Components/organisms/Navbar/Navbar'
import Footer from '@/Components/organisms/Footer/Footer'
import AuthCard from '@/Components/organisms/AuthCard/AuthCard'

// Páginas
import ProfilePage from './pages/ProfilePage/ProfilePage'
import DashboardPage from './pages/DashboardPage'
import LandingPage from './pages/LandingPage/LandingPage'
import PortfolioList from '@/Components/organisms/portfolio/PortfolioList'

// Toastify
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// =======================================
// RUTA PRIVADA
// =======================================
const PrivateRoute = ({ children }) => {
  const { isLoggedIn, checking } = useContext(AuthContext)

  if (checking) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="animate-spin border-t-4 border-primary-dark h-10 w-10 rounded-full"></span>
      </div>
    )
  }

  return isLoggedIn ? children : <Navigate to="/" replace />
}

// =======================================
// COMPONENTE PRINCIPAL
// =======================================
const App = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [activeForm, setActiveForm] = useState('login')
  const [dropdownHeight, setDropdownHeight] = useState(0)

  const { isLoggedIn } = useContext(AuthContext)

  const openAuthModal = useCallback((formType) => {
    setActiveForm(formType)
    setIsAuthModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsAuthModalOpen(false)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-primary-light">
      <Navbar
        openAuthModal={openAuthModal}
        setDropdownHeight={setDropdownHeight}
      />

      <main
        className={`flex-1 pt-[68px] pb-20 px-4 lg:px-8 bg-primary-light ${
          dropdownHeight > 0 ? 'mt-10' : ''
        }`}
      >
        <Routes>
          {/* Página de inicio: si logueado → dashboard, si no → landing */}
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LandingPage />
              )
            }
          />

          {/* Página protegida: dashboard */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />

          {/* Página protegida: perfil */}
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />

          {/* Página protegida: portfolios */}
          <Route
            path="/portfolios"
            element={
              <PrivateRoute>
                <PortfolioList />
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

      {/* Modal de login/register */}
      {isAuthModalOpen && (
        <AuthCard
          activeForm={activeForm}
          setActiveForm={setActiveForm}
          onClose={handleCloseModal}
        />
      )}

      {/* Toast global */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
      />
    </div>
  )
}

export default App
