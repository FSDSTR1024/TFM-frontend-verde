import { useState } from 'react'
import useAuth from '@/context/AuthContext/useAuth' // Hook de autenticación
import Button from '../../atoms/Button'
import AuthCard from '../../organisms/AuthCard' // Modal de autenticación

const NavLinks = () => {
  const { isLoggedIn, user, logout } = useAuth() // Estado de autenticación
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [activeForm, setActiveForm] = useState('login')
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  // Manejo del modal de autenticación
  const handleAuthModal = (formType) => {
    setActiveForm(formType)
    setShowAuthModal(true)
  }

  // Cerrar modal
  const handleCloseModal = () => {
    setShowAuthModal(false)
    setActiveForm('login')
    setFormData({ username: '', email: '', password: '' })
  }

  // Manejo de cambios en los Inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  return (
    <nav className="flex justify-end">
      <ul className="flex gap-5 list-none m-0 p-4 items-center">
        {/* Botones de autenticación */}
        {!isLoggedIn ? (
          <>
            <li>
              <Button
                variant="secondary"
                onClick={() => handleAuthModal('register')}
                ariaLabel="Registrarse"
              >
                Registrarse
              </Button>
            </li>
            <li>
              <Button
                variant="secondary"
                onClick={() => handleAuthModal('login')}
                ariaLabel="Iniciar sesión"
              >
                Iniciar sesión
              </Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Button
                variant="secondary"
                ariaLabel={`Perfil de ${user?.username || 'Usuario'}`}
              >
                {user?.username || 'Usuario'}
              </Button>
            </li>
            <li>
              <Button
                variant="secondary"
                onClick={logout}
                ariaLabel="Cerrar sesión"
              >
                Cerrar sesión
              </Button>
            </li>
          </>
        )}
      </ul>

      {/* Modal de Autenticación */}
      {showAuthModal && (
        <AuthCard
          activeForm={activeForm}
          formData={formData}
          onInputChange={handleInputChange}
          onCancel={handleCloseModal}
          onSwitchForm={() =>
            setActiveForm((prev) => (prev === 'login' ? 'register' : 'login'))
          }
        />
      )}
    </nav>
  )
}

export default NavLinks
