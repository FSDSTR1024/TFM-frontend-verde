import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import Button from '../../atoms/Button'
import { EmailInput } from '../../atoms/Input'
import Logo from '../../atoms/Logo'
import PasswordToggle from '../../atoms/PasswordToggle/PasswordToggle'
import styles from './AuthCard.module.css'

const AuthCard = ({
  activeForm,
  formData = { username: '', email: '', password: '' },
  onInputChange,
  onSubmit,
  onSwitchForm,
  onCancel
}) => {
  const [localFormData, setLocalFormData] = useState(formData)

  // Sincronizar con cambios externos
  useEffect(() => {
    setLocalFormData(formData)
  }, [formData])

  const handleInputChange = e => {
    const { name, value } = e.target
    const newData = {
      ...localFormData,
      [name]: value
    }

    setLocalFormData(newData)

    if (onInputChange) {
      // Propagamos el evento extendido con validación
      onInputChange({
        ...e,
        isValid: e.isValid,
        formData: newData
      })
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (onSubmit) onSubmit(e, localFormData)
  }

  return (
    <div className={styles.overlayContainer} onClick={onCancel}>
      <section
        className={styles.authCard}
        role='dialog'
        aria-labelledby='auth-title'
        onClick={e => e.stopPropagation()}
      >
        <header className={styles.authCardHeader}>
          <div className={styles.authCardLogo}>
            <Logo />
          </div>
          <button className={styles.closeButton} onClick={onCancel} aria-label='Cerrar'>
            <X size={20} />
          </button>
        </header>

        <h2 id='auth-title' className={styles.authTitle}>
          {activeForm === 'login' ? 'Iniciar sesión' : 'Registrarse'}
        </h2>

        <form onSubmit={handleSubmit} className={styles.authForm}>
          {activeForm === 'register' && (
            <div className={styles.inputWrapper}>
              <label htmlFor='username' className={styles.visuallyHidden}>
                Usuario
              </label>
              <input
                id='username'
                placeholder='Usuario'
                type='text'
                name='username'
                value={localFormData.username}
                onChange={handleInputChange}
                required
                className={styles.nativeInput}
              />
            </div>
          )}

          <EmailInput
            label='Correo electrónico'
            name='email'
            value={localFormData.email}
            onChange={handleInputChange}
            required
          />

          <PasswordToggle
            label='Contraseña'
            name='password'
            value={localFormData.password}
            onChange={handleInputChange}
            required
          />

          <div className={styles.authActions}>
            <Button
              variant='primary'
              htmlType='submit'
              ariaLabel='Enviar formulario'
              disabled={Object.values(localFormData).some(v => v === '')} // Ejemplo de validación
            >
              {activeForm === 'login' ? 'Iniciar sesión' : 'Registrarse'}
            </Button>

            <Button
              variant='tertiary'
              htmlType='button'
              className={styles.switchModeButton}
              onClick={onSwitchForm}
              ariaLabel='Cambiar modo de autenticación'
            >
              {activeForm === 'login' ? 'Regístrate' : '¿Ya tienes cuenta? Iniciar sesión'}
            </Button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default AuthCard
