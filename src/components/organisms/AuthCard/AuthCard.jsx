import { useState } from 'react'
import { X } from 'lucide-react'
import api from '@/services/api/axios' // Importamos la instancia de Axios pero esta dará fallos porque aún no está definida
import useAuth from '@/context/AuthContext/useAuth'
import Button from '../../atoms/Button'
import { EmailInput } from '../../atoms/Input'
import Logo from '../../atoms/Logo'
import PasswordToggle from '../../atoms/PasswordToggle/PasswordToggle'
import styles from './AuthCard.module.css'

const AuthCard = ({
  activeForm,
  formData = { username: '', email: '', password: '' }, // Corregido el error de tipografía (fomrDAta -> formData)
  onInputChange,
  onSwitchForm,
  onCancel
}) => {
  const { login } = useAuth() // Con esta línea estoy accediendo al contexto global de autenticación
  const [error, setError] = useState(null) // Este const maneja los errores, y este inicia en 'null' (sin error)

  //----------------------------------
  //----------------------------------
  // Captura de cambios en los inputs
  //----------------------------------
  //----------------------------------

  const handleInputChange = e => {
    // Primero extraigo el 'name' (el nombre del campo) y 'value' (el valor del campo)
    const { name, value } = e.target
    // Después creo un nuevo objeto basado en 'formData' y actualizo el campo modificado
    const newData = {
      ...formData, // Copia el estado actual del 'formData' (mantiene los datos anteriores)
      [name]: value // Actualiza el campo modificado con el nuevo valor
    }

    onInputChange?.({
      target: e.target,
      formData: newData,
      isValid: e.isValid
    })
  }

  //----------------------------------
  //----------------------------------
  // Enviar el formulario al backend
  //----------------------------------
  //----------------------------------

  // Con esta función manejamos el envío del formulario de inicio de sesión o registro
  const handleSubmit = async e => {
    e.preventDefault()
    // Evita que la página se recargue al enviar el formulario
    setError(null)
    // Limpia cualquier mensaje de error anterior antes de intentar un nuevo envío

    try {
      const API_PREFIX = '/auth' // Definimos el prefijo para la API
      // Determina si el usuario está en modo "login" o "register" para definir la URL del endpoint
      const endpoint = activeForm === 'login' ? `${API_PREFIX}/login` : `${API_PREFIX}/register`
      // Si 'activeForm' es 'login', se enviará a '/auth/login', de lo contrario lo hará a '/auth/register'

      const response = await api.post(endpoint, formData)
      // 'formData' contiene los datos del formulario, mientras que 'await' espera la respuesta del servidor antes de continuar

      // Guardamos el token de autenticación en localStorage para mantener la sesión iniciada
      // De esta forma el usuario permanece autenticado incluso después de recargar la página
      localStorage.setItem('token', response.data.token)

      login(response.data) // Con esto permitimos que otros componentes del frontend sepan que el usuario ha iniciado sesión.
      onCancel()
    } catch (error) {
      // Debemos capturar cualquier error que ocurra durante la solicitud al backend
      // Por lo tanto añadimos console.log, esto solo se hará en la fase de desarrollo, después podremos suprimirlo
      console.error('Error en la autenticación:', error.response?.data || error.message)

      setError(error.response?.data?.message || 'Error en la autenticación')
    }
  }

  //----------------------------------
  //----------------------------------
  // Validación del formulario
  //----------------------------------
  //----------------------------------

  const isFormValid =
    activeForm === 'login'
      ? formData.email.trim() && formData.password.trim()
      : // Cuando estamos dentro del formulario de 'login'
        // 1. Se verifica que el campo de email y contraseña NO estén vacíos
        // 2. 'trim()' elimina los espacios en blanco innecesarios
        Object.values(formData).every(field => field.trim())
        // Cuando estamos dentro del formulario de 'register'
        // 1. Se verifica que todos los campos NO estén vacíos
        // 2. 'trim()' elimina los espacios en blanco innecesarios

  return (
    <div className={styles.overlayContainer} onClick={onCancel}>
      <section
        className={styles.authCard}
        role='dialog'
        aria-labelledby='auth-title'
        onClick={e => e.stopPropagation()}
      >
        {/* Botón para cerrar el modal */}
        <button className={styles.closeButton} onClick={onCancel} aria-label='Cerrar'>
          <X size={20} />
        </button>

        {/* Logo de la aplicación */}
        <header className={styles.authCardHeader}>
          <div className={styles.authCardLogo}>
            <Logo />
          </div>
        </header>

        {/* Título dinámico dependiendo del formulario activo */}
        <h2 id='auth-title' className={styles.authTitle}>
          {activeForm === 'login' ? 'Iniciar sesión' : 'Registrarse'}
        </h2>

        {/* Formulario de autenticación */}
        <form onSubmit={handleSubmit} className={styles.authForm}>
          {/* Campo de usuario (solo en el registro) */}
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
                value={formData.username}
                onChange={handleInputChange}
                required
                className={styles.nativeInput}
              />
            </div>
          )}

          {/* Campo de correo electrónico */}
          <EmailInput
            label='Correo electrónico'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          {/* Campo de contraseña con opción de mostrar/ocultar */}
          <PasswordToggle
            label='Contraseña'
            name='password'
            value={formData.password}
            onChange={handleInputChange}
            required
          />

          {/* Mostrar errores si la autenticación falla */}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          {/* Botones de acción */}
          <div className={styles.authActions}>
            {/* Botón para enviar el formulario */}
            <Button
              variant='primary'
              htmlType='submit'
              ariaLabel='Enviar formulario'
              disabled={!isFormValid}
            >
              {activeForm === 'login' ? 'Iniciar sesión' : 'Registrarse'}
            </Button>

            {/* Botón para cambiar entre Login y Registro */}
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
