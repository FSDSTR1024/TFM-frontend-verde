import { useState, useContext, useCallback } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { AuthContext } from './context/AuthContext/AuthContext'
import Navbar from './Components/organisms/Navbar/Navbar'
import Footer from './Components/organisms/Footer/Footer'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import AuthCard from './Components/organisms/AuthCard/AuthCard'
import DashboardPage from './pages/DashboardPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, checking } = useContext(AuthContext)

  if (checking) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="animate-spin border-t-4 border-primary-dark h-10 w-10 rounded-full"></span>
      </div>
    )
  }

  return isLoggedIn ? children : <Navigate to="/" replace={true} />
}

const App = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [activeForm, setActiveForm] = useState('login')
  const [dropdownHeight, setDropdownHeight] = useState(0)

  const openAuthModal = useCallback((formType) => {
    setActiveForm(formType)
    setIsAuthModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsAuthModalOpen(false)
  }, [])

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-primary-light">
        <Navbar
          openAuthModal={openAuthModal}
          setDropdownHeight={setDropdownHeight}
        />

        {/* Asegurar que el contenido empuje al footer */}
        <main
          className={`flex-1 pt-[68px] pb-20 px-4 lg:px-8 bg-primary-light ${
            dropdownHeight > 0 ? 'mt-10' : ''
          }`}
        >
          <Routes>
            <Route path="/" element={<div>Inicio</div>} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardPage />
                </PrivateRoute>
              }
            />
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

      {isAuthModalOpen && (
        <AuthCard
          activeForm={activeForm}
          setActiveForm={setActiveForm}
          onClose={handleCloseModal}
        />
      )}

      {/* Esto permitirá que los toasts se muestren en toda la aplicación */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
      />
    </BrowserRouter>
  )
}

export default App
