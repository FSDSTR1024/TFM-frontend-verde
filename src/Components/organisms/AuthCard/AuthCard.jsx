import { useState } from 'react'
import { X } from 'lucide-react'
import api from '@/services/api/axios'
import useAuth from '@/context/AuthContext/useAuth'
import Button from '../../atoms/Button'
import { EmailInput } from '../../atoms/Input'
import Input from '../../atoms/Input'
import Logo from '../../atoms/Logo'
import PasswordToggle from '../../atoms/PasswordToggle/PasswordToggle'

const AuthCard = ({
  activeForm,
  formData = { username: '', email: '', password: '' },
  onInputChange,
  onSwitchForm,
  onCancel,
}) => {
  const { login } = useAuth()
  const [error, setError] = useState(null)

  // ===================================
  // Captura de cambios en los inputs
  // ===================================

  const handleInputChange = (e) => {
    const { name, value } = e.target
    const newData = {
      ...formData,
      [name]: value,
    }

    onInputChange?.({
      target: e.target,
      formData: newData,
      isValid: e.isValid,
    })
  }

  // ===================================
  // Enviar el formulario al backend
  // ===================================

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

  // ==================================
  // Validación del formulario
  // ==================================

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
        <button
          className="absolute top-2 right-2 text-primary-dark hover:text-hover-state transition"
          onClick={onCancel}
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>

        <header className="flex justify-center mb-4">
          <Logo />
        </header>

        <h2
          id="auth-title"
          className="text-xl font-semibold text-primary-dark text-center mb-3"
        >
          {activeForm === 'login' ? 'Iniciar sesión' : 'Registrarse'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-grow">
          {activeForm === 'register' && (
            <Input
              label="Usuario"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleInputChange}
              required
              placeholder="Usuario"
            />
          )}

          <EmailInput
            label="Correo electrónico"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <PasswordToggle
            label="Contraseña"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />

          {error && (
            <p className="text-error-color text-sm text-center">{error}</p>
          )}

          {/* ===================== */}
          {/* Botones de Acción */}
          {/* ===================== */}
          <div className="flex flex-col gap-3 mt-auto">
            <Button
              variant="primary"
              htmlType="submit"
              ariaLabel="Enviar formulario"
              disabled={!isFormValid}
            >
              {activeForm === 'login' ? 'Iniciar sesión' : 'Registrarse'}
            </Button>

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
