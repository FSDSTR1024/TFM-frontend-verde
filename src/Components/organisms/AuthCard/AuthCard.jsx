import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '@/services/api/axios'
import useAuth from '@/context/AuthContext/useAuth'
import { getUserSession } from '@/services/api/authController' // ✅ Importar correctamente
import { toast } from 'react-toastify'
import { X } from 'lucide-react'
import Button from '@/components/atoms/Button'
import { EmailInput } from '@/components/atoms/Input'
import Input from '@/components/atoms/Input'
import Logo from '@/components/atoms/Logo'
import PasswordToggle from '@/components/atoms/PasswordToggle/PasswordToggle'

const AuthCard = ({ activeForm, setActiveForm, onClose }) => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    const formDatatoSend = { ...formData }
    console.log('formDatatoSend antes de envío:', formDatatoSend)

    // Eliminar username si estamos en login
    if (activeForm === 'login') delete formDatatoSend.username

    if (!formDatatoSend.email || !formDatatoSend.password) {
      setError('Todos los campos son obligatorios')
      return
    }

    console.log('Enviando datos de login:', formDatatoSend)

    try {
      const endpoint = activeForm === 'login' ? '/auth/login' : '/auth/register'
      const response = await api.post(endpoint, formDatatoSend, {
        withCredentials: true,
      })

      console.log('Respuesta del servidor:', response.data)

      if (activeForm === 'register') {
        // Guarda el mensaje solo después de una respuesta exitosa
        localStorage.setItem(
          'registrationSuccess',
          'Registro exitoso, revisa tu correo para confirmarlo.'
        )
      }

      await getUserSession() // ✅ Confirmar sesión activa tras login

      navigate('/dashboard')
      onClose()
    } catch (error) {
      console.error(
        'Error en autenticación:',
        error.response?.data || error.message
      )
      setError(error.response?.data?.message || 'Error en la autenticación')
    }
  }

  // ✅ Definir `isFormValid` correctamente ANTES del `return`
  const isFormValid =
    activeForm === 'login'
      ? formData.email?.trim() && formData.password?.trim()
      : Object.values(formData).every((field) => field.trim() !== '')

  console.log('isFormValid:', isFormValid) // 🔥 Depuración

  return (
    <div
      id="authModalBackground"
      className="fixed inset-0 bg-primary-dark/50 flex justify-center items-center z-50"
      onClick={(e) => e.target.id === 'authModalBackground' && onClose()} // ierra modal al hacer clic fuera
    >
      <section
        className="relative bg-primary-light border-2 border-primary-dark rounded-lg p-6 w-full max-w-md min-h-[540px] shadow-lg flex flex-col"
        role="dialog"
        aria-labelledby="auth-title"
        onClick={(e) => e.stopPropagation()} // Evita cerrar al hacer clic dentro
      >
        <button
          className="absolute top-2 right-2 text-primary-dark hover:text-hover-state transition"
          onClick={onClose}
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

        <p className="text-center text-sm text-primary-dark">
          {isFormValid ? 'Formulario válido' : 'Formulario incompleto'}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-grow">
          {activeForm === 'register' && (
            <Input
              label="Usuario"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleInputChange}
              required
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

          <div className="flex flex-col gap-3 mt-auto">
            <Button
              variant="primary"
              htmlType="submit"
              ariaLabel="Enviar formulario"
              disabled={!isFormValid}
            >
              {activeForm === 'login' ? 'Iniciar sesión' : 'Registrarse'}
            </Button>

            {/* Botón de cambio de formulario */}
            {activeForm === 'login' ? (
              <Button
                variant="tertiary"
                htmlType="button"
                onClick={() => setActiveForm('register')}
                ariaLabel="Cambiar a formulario de registro"
              >
                ¿Aún no tienes cuenta? Regístrate
              </Button>
            ) : (
              <Button
                variant="tertiary"
                htmlType="button"
                onClick={() => setActiveForm('login')}
                ariaLabel="Cambiar a formulario de inicio de sesión"
              >
                ¿Ya tienes cuenta? Inicia sesión
              </Button>
            )}
          </div>
        </form>
      </section>
    </div>
  )
}

export default AuthCard
