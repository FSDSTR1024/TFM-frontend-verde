import { useState } from 'react'
import { X } from 'lucide-react'
import api from '@/services/api/axios' // ⚠️ Asegúrate de que este servicio esté definido
import useAuth from '@/context/AuthContext/useAuth'
import Button from '../../atoms/Button'
import { EmailInput } from '../../atoms/Input'
import Logo from '../../atoms/Logo'
import PasswordToggle from '../../atoms/PasswordToggle/PasswordToggle'

const AuthCard = ({
  activeForm,
  formData,
  onInputChange,
  onSwitchForm,
  onCancel,
}) => {
  const { login } = useAuth()
  const [error, setError] = useState(null)

  // Captura de cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target
    onInputChange?.({
      target: e.target,
      formData: { ...formData, [name]: value },
      isValid: e.isValid,
    })
  }

  // Enviar el formulario al backend
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      const API_PREFIX = '/auth'
      const endpoint =
        activeForm === 'login'
          ? `${API_PREFIX}/login`
          : `${API_PREFIX}/register`

      const response = await api.post(endpoint, formData)
      localStorage.setItem('token', response.data.token)
      login(response.data)
      onCancel()
    } catch (error) {
      console.error(
        'Error en la autenticación:',
        error.response?.data || error.message
      )
      setError(error.response?.data?.message || 'Error en la autenticación')
    }
  }

  const isFormValid =
    activeForm === 'login'
      ? formData.email.trim() && formData.password.trim()
      : Object.values(formData).every((field) => field.trim())

  return (
    <div
      className="fixed inset-0 bg-primary-dark/50 flex justify-center items-center z-50"
      onClick={onCancel}
    >
      <section
        className="relative bg-primary-light border-2 border-primary-dark rounded-lg p-6 w-full max-w-md min-h-[540px] shadow-lg flex flex-col"
        role="dialog"
        aria-labelledby="auth-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón para cerrar el modal */}
        <button
          className="absolute top-2 right-2 text-primary-dark hover:text-hover-state transition"
          onClick={onCancel}
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>

        {/* Logo de la aplicación */}
        <header className="flex justify-center mb-4">
          <Logo />
        </header>

        {/* Título dinámico dependiendo del formulario activo */}
        <h2
          id="auth-title"
          className="text-xl font-semibold text-primary-dark text-center mb-3"
        >
          {activeForm === 'login' ? 'Iniciar sesión' : 'Registrarse'}
        </h2>

        {/* Formulario de autenticación */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-grow">
          {/* Campo de usuario (solo en el registro) */}
          {activeForm === 'register' && (
            <div>
              <label htmlFor="username" className="sr-only">
                Usuario
              </label>
              <input
                id="username"
                placeholder="Usuario"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="w-full p-3 border-2 border-secondary-dark rounded-md text-primary-dark bg-primary-light focus:outline-none focus:border-hover-state focus:shadow-md transition"
              />
            </div>
          )}

          {/* Campo de correo electrónico */}
          <EmailInput
            label="Correo electrónico"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          {/* Campo de contraseña con opción de mostrar/ocultar */}
          <PasswordToggle
            label="Contraseña"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />

          {/* Mostrar errores si la autenticación falla */}
          {error && (
            <p className="text-error-color text-sm text-center">{error}</p>
          )}

          {/* Botones de acción */}
          <div className="flex flex-col gap-3 mt-auto">
            {/* Botón para enviar el formulario */}
            <Button
              variant="primary"
              htmlType="submit"
              ariaLabel="Enviar formulario"
              disabled={!isFormValid}
            >
              {activeForm === 'login' ? 'Iniciar sesión' : 'Registrarse'}
            </Button>

            {/* Botón para cambiar entre Login y Registro */}
            <Button
              variant="tertiary"
              htmlType="button"
              onClick={onSwitchForm}
              ariaLabel="Cambiar modo de autenticación"
            >
              {activeForm === 'login'
                ? 'Regístrate'
                : '¿Ya tienes cuenta? Iniciar sesión'}
            </Button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default AuthCard
