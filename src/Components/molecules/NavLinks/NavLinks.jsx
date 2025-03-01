import { useState } from 'react'
import useAuth from '@/context/AuthContext/useAuth' // Hook de autenticación para acceder al estado global
import Button from '../../atoms/Button'
import AuthCard from '../../organisms/AuthCard' // Componente del modal de autenticación
import UserDropdown from '../../organisms/UserDropdown/UserDropdown'

const NavLinks = ({ mobile, onClose }) => {
  const { isLoggedIn, user, logout } = useAuth() // Accedemos al estado global de autenticación
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false) // Estado para mostrar/ocultar el modal de autenticación
  const [activeForm, setActiveForm] = useState('login') // Estado para definir si el formulario activo es de login o registro

  //----------------------------------
  // Manejo del modal de autenticación
  //----------------------------------
  const openAuthModal = (formType) => {
    setActiveForm(formType) // Define si el modal es de login o registro
    setIsAuthModalOpen(true) // Muestra el modal
  }

  //----------------------------------
  // Cerrar el Modal de Autenticación
  //----------------------------------
  const handleCloseModal = () => {
    setIsAuthModalOpen(false) // Oculta el modal
    setActiveForm('login') // Reinicia el formulario a 'login' por defecto
    if (onClose) onClose() // Si existe la función 'onClose', la ejecutamos
  }

  return (
    <nav>
      <ul className="flex flex-col lg:flex-row gap-4 lg:gap-6 list-none m-0 items-center">
        {!isLoggedIn ? (
          <>
            {/* Botón de Registrarse */}
            <li>
              <Button
                variant={mobile ? 'primary' : 'secondary'}
                onClick={() => openAuthModal('register')}
                ariaLabel="Registrarse"
              >
                Registrarse
              </Button>
            </li>

            {/* Botón de Iniciar Sesión */}
            <li>
              <Button
                variant={mobile ? 'primary' : 'secondary'}
                onClick={() => openAuthModal('login')}
                ariaLabel="Iniciar sesión"
              >
                Iniciar sesión
              </Button>
            </li>
          </>
        ) : (
          <>
            {/* Botón de Cerrar Sesión */}
            <li>
              <Button
                variant={mobile ? 'primary' : 'secondary'}
                onClick={logout}
                ariaLabel="Cerrar sesión"
              >
                Cerrar sesión
              </Button>
            </li>

            {/* Dropdown de Usuario */}
            <li>
              <UserDropdown />
            </li>
          </>
        )}
      </ul>

      {/* Modal de Autenticación */}
      {isAuthModalOpen && (
        <AuthCard
          activeForm={activeForm} // Define si el formulario es de login o registro
          setActiveForm={setActiveForm} // Permite alternar entre login y registro
          onClose={handleCloseModal} // Maneja el cierre del modal
        />
      )}
    </nav>
  )
}

export default NavLinks
