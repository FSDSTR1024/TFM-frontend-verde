import { useState } from 'react'
import useAuth from '@/context/AuthContext/useAuth'
import Button from '../../atoms/Button'
import AuthCard from '../../organisms/AuthCard'
import UserDropdown from '../../organisms/UserDropdown'

const NavLinks = ({ mobile, onClose }) => {
  const { isLoggedIn, handleLogout } = useAuth() // Estado GLOBAL directo
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [activeForm, setActiveForm] = useState('login')
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })

  //----------------------------------
  // Manejo del modal de autenticación
  //----------------------------------
  const handleAuthModal = (formType) => {
    setActiveForm(formType)
    setIsAuthModalOpen(true)
  }

  //----------------------------------
  // Cerrar el Modal de Autenticación
  //----------------------------------
  const handleCloseModal = () => {
    setIsAuthModalOpen(false)
    setActiveForm('login')
    setFormData({ username: '', email: '', password: '' })
    if (onClose) onClose()
  }

  return (
    <nav>
      <ul className="flex flex-col lg:flex-row gap-4 lg:gap-6 list-none m-0 items-center">
        {!isLoggedIn ? ( // Usar isLoggedIn SIN estado local
          <>
            <li>
              <Button
                variant={mobile ? 'primary' : 'secondary'}
                onClick={() => handleAuthModal('register')}
                ariaLabel="Registrarse"
              >
                Registrarse
              </Button>
            </li>
            <li>
              <Button
                variant={mobile ? 'primary' : 'secondary'}
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
                variant={mobile ? 'primary' : 'secondary'}
                onClick={() => {
                  console.log("botón de cerrarsesión presionado")
                  handleLogout()
                }}
                ariaLabel="Cerrar sesión"
              >
                Cerrar sesión
              </Button>
            </li>
            <li>
              <UserDropdown />
            </li>
          </>
        )}
      </ul>

      {/* Modal de Autenticación */}
      {isAuthModalOpen && (
        <AuthCard
          activeForm={activeForm}
          setActiveForm={setActiveForm}
          onClose={handleCloseModal}
          formData={formData}
          onInputChange={(e) => {
            const { name, value } = e.target
            setFormData((prev) => ({ ...prev, [name]: value }))
          }}
        />
      )}
    </nav>
  )
}

export default NavLinks
