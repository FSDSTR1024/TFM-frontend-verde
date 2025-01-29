import { X } from 'lucide-react'
import ButtonRegister from '../../atoms/ButtonRegister'
import ButtonSend from '../../atoms/ButtonSend'
import { EmailInput } from '../../atoms/Input'
import Logo from '../../atoms/Logo'
import PasswordToggle from '../../atoms/PasswordToggle/PasswordToggle'
import styles from './AuthCard.module.css'

const AuthCard = ({ activeForm, formData, onInputChange, onSubmit, onSwitchForm, onCancel }) => (
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

      <form onSubmit={onSubmit} className={styles.authForm}>
        {activeForm === 'register' && (
          <input
            placeholder='Usuario'
            type='text'
            name='username'
            value={formData.username}
            onChange={onInputChange}
            required
          />
        )}

        <EmailInput
          label='Correo electrónico'
          name='email'
          id={`email-${Math.random().toString(36).substr(2, 9)}`}
          value={formData.email}
          onChange={onInputChange}
          required
        />

        <PasswordToggle
          label='Contraseña'
          name='password'
          value={formData.password}
          onChange={onInputChange}
          required
        />

        <div className={styles.authActions}>
          <ButtonSend activeForm={activeForm} ariaLabel='Enviar formulario' />
          <ButtonRegister
            type='button'
            className={styles.switchModeButton}
            onClick={onSwitchForm}
            ariaLabel='Cambiar modo de autenticación'
          >
            {activeForm === 'login' ? 'Regístrate' : '¿Ya tienes cuenta? Iniciar sesión'}
          </ButtonRegister>
        </div>
      </form>
    </section>
  </div>
)

export default AuthCard
