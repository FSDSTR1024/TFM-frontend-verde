import useAuth from '@/context/AuthContext/useAuth' // Hook de autenticación
import { useState } from 'react'
import Button from '../../atoms/Button'
import AuthCard from '../../organisms/AuthCard' // Componente del modal de autenticación
import styles from './NavLinks.module.css'

const NavLinks = () => {
  const { isLoggedIn, user, login, logout } = useAuth() // De esta forma puedo acceder al contexto de useAuth
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [activeForm, setActiveForm] = useState('login')
  const [formData, setFormData] = useState({ username: '', email: '', password: '' })

  const handleAuthModal = formType => {
    setActiveForm(formType)
    setShowAuthModal(true)
  }

  const handleCloseModal = () => {
    setShowAuthModal(false)
    setActiveForm('login')
    setFormData({ username: '', email: '', password: '' }) // Reset completo
  }

  return (
    <nav className={styles.navContainer}>
      <ul className={styles.navList}>
        {!isLoggedIn ? (
          <>
            <li>
              <Button variant='secondary' onClick={() => handleAuthModal('register')}>
                Registrarse
              </Button>
            </li>
            <li>
              <Button variant='secondary' onClick={() => handleAuthModal('login')}>
                Inicia sesión
              </Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Button variant='secondary'>{user?.username || 'Usuario'}</Button>
            </li>
            <li>
              <Button variant='secondary' onClick={logout}>
                Cierra tu sesión
              </Button>
            </li>
          </>
        )}
      </ul>

      {showAuthModal && (
        <AuthCard
          activeForm={activeForm}
          formData={formData}
          onInputChange={e => setFormData(e.formData)}
          onCancel={handleCloseModal}
          onSwitchForm={() => setActiveForm(prev => (prev === 'login' ? 'register' : 'login'))}
          key={activeForm}
        />
      )}
    </nav>
  )
}

export default NavLinks
