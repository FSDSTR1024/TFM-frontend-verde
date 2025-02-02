import { useState } from 'react'
import useAuth from '@/context/AuthContext/useAuth' // Hook de autenticación para acceder al estado global
import Button from '../../atoms/Button'
import AuthCard from '../../organisms/AuthCard' // Componente del modal de autenticación
import styles from './NavLinks.module.css'

const NavLinks = () => {
  const { isLoggedIn, user, logout } = useAuth() // Accedemos al estado global de autenticación
  const [showAuthModal, setShowAuthModal] = useState(false) // Estado para mostrar/ocultar el modal de autenticación
  const [activeForm, setActiveForm] = useState('login') // Estado para definir si el formulario activo es de login o registro
  const [formData, setFormData] = useState({ username: '', email: '', password: '' }) // Estado para manejar los datos del formulario

  //----------------------------------
  // Manejo de la apertura del Modal
  //----------------------------------
  const handleAuthModal = formType => {
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
  }

  //----------------------------------
  // Manejo de cambios en los Inputs
  //----------------------------------
  const handleInputChange = e => {
    const { name, value } = e.target // Extraemos el nombre y valor del input
    setFormData(prevData => ({
      ...prevData, // Mantenemos los valores anteriores
      [name]: value // Actualizamos solo el campo que cambió
    }))
  }

  return (
    <nav className={styles.navContainer}>
      <ul className={styles.navList}>
        {/* Renderiza los botones de autenticación según el estado de login */}
        {!isLoggedIn ? (
          <>
            <li>
              <Button
                variant='secondary'
                onClick={() => handleAuthModal('register')}
                ariaLabel='Registrarse' // ✅ Añadido
              >
                Registrarse
              </Button>
            </li>
            <li>
              <Button
                variant='secondary'
                onClick={() => handleAuthModal('login')}
                ariaLabel='Iniciar sesión' // ✅ Añadido
              >
                Iniciar sesión
              </Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Button
                variant='secondary'
                ariaLabel={`Perfil de ${user?.username || 'Usuario'}`} // ✅ Añadido
              >
                {user?.username || 'Usuario'}
              </Button>
            </li>
            <li>
              <Button
                variant='secondary'
                onClick={logout}
                ariaLabel='Cerrar sesión' // ✅ Añadido
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
          activeForm={activeForm} // Define si el formulario es de login o registro
          formData={formData} // Pasa los datos del formulario
          onInputChange={handleInputChange} // Maneja cambios en los inputs
          onCancel={handleCloseModal} // Maneja el cierre del modal
          onSwitchForm={() => setActiveForm(prev => (prev === 'login' ? 'register' : 'login'))} // Alterna entre login y registro
        />
      )}
    </nav>
  )
}

export default NavLinks
