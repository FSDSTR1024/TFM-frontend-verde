import { useState } from 'react'
import useAuth from '@/context/AuthContext/useAuth' // Hook de autenticación para acceder al estado global
import Button from '../../atoms/Button'
import AuthCard from '../../organisms/AuthCard' // Componente del modal de autenticación
import UserDropdown from '../UserDropdown'

const NavLinks = ({ mobile, onClose }) => {
  const { isLoggedIn, user, logout } = useAuth() // Accedemos al estado global de autenticación
  const [showAuthModal, setShowAuthModal] = useState(false) // Estado para mostrar/ocultar el modal de autenticación
  const [activeForm, setActiveForm] = useState('login') // Estado para definir si el formulario activo es de login o registro
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  }) // Estado para manejar los datos del formulario

  //----------------------------------
  // Manejo del modal de autenticación
  //----------------------------------
  const handleAuthModal = (formType) => {
    setActiveForm(formType) // Define si el modal es de login o registro
    setShowAuthModal(true) // Muestra el modal
  }

  //----------------------------------
  // Cerrar el Modal de Autenticación
  //----------------------------------
  const handleCloseModal = () => {
    setShowAuthModal(false) // Oculta el modal
    setActiveForm('login') // Reinicia el formulario a 'login' por defecto
    setFormData({ username: '', email: '', password: '' }) // Limpia los datos del formulario
    if (onClose) onClose() // Si existe la función 'onClose', la ejecutamos
  }

  //----------------------------------
  // Manejo de cambios en los Inputs
  //----------------------------------
  const handleInputChange = (e) => {
    const { name, value } = e.target // Extraemos el nombre y valor del input
    setFormData((prevData) => ({
      ...prevData, // Mantenemos los valores anteriores
      [name]: value, // Actualizamos solo el campo que cambió
    }))
  }

  return (
    <nav>
      <ul className="flex flex-col lg:flex-row gap-4 lg:gap-6 list-none m-0 items-center">
        {/* Renderiza los botones de autenticación según el estado de login */}
        {!isLoggedIn ? (
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
                onClick={logout}
                ariaLabel="Cerrar sesión"
              >
                Cerrar sesión
              </Button>
            </li>
            {/* Se cambia el botón de usuario por el dropdown */}
            <li>
              <UserDropdown />
            </li>
          </>
        )}
      </ul>

      {/* Modal de Autenticación */}
      {showAuthModal && (
        <AuthCard
          activeForm={activeForm} // Define si el formulario es de login o registro
          formData={formData} // Pasa los datos del formulario
          onInputChange={handleInputChange} // Maneja cambios en los inputs
          onCancel={handleCloseModal} // Maneja el cierre del modal
          onSwitchForm={() =>
            setActiveForm((prev) => (prev === 'login' ? 'register' : 'login'))
          } // Alterna entre login y registro
        />
      )}
    </nav>
  )
}

export default NavLinks
