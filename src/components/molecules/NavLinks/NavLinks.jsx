import { useState } from 'react'
import Button from '../../atoms/Button'
import AuthCard from '../../organisms/AuthCard'
import styles from './NavLinks.module.css'

const NavLinks = () => {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [activeForm, setActiveForm] = useState('login')
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

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
        <li>
          <Button
            variant='secondary'
            ariaLabel='Acceder a Registrarse'
            className={styles.secondaryButton}
            onClick={() => handleAuthModal('register')}
          >
            Registrarse
          </Button>
        </li>

        <li>
          <Button
            variant='secondary'
            ariaLabel='Acceder a Iniciar sesión'
            className={styles.secondaryButton}
            onClick={() => handleAuthModal('login')}
          >
            Iniciar sesión
          </Button>
        </li>
      </ul>

      {showAuthModal && (
        <AuthCard
          activeForm={activeForm}
          formData={formData}
          onInputChange={e => setFormData(e.formData)}
          onCancel={handleCloseModal}
          onSwitchForm={() => setActiveForm(prev => (prev === 'login' ? 'register' : 'login'))}
          onSubmit={(e, formData) => {
            e.preventDefault()
            console.log('Datos enviados:', formData)
            handleCloseModal()
          }}
          key={activeForm}
        />
      )}
    </nav>
  )
}

export default NavLinks
