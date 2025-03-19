import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '@/services/api/api'
import useAuth from '@/context/AuthContext/useAuth'
import { getUserSession } from '@/services/api/authController'
import { toast } from 'react-toastify'
import { X } from 'lucide-react'
import Button from '@/Components/atoms/Button'
import { EmailInput } from '@/Components/atoms/Input'
import Input from '@/Components/atoms/Input'
import Logo from '@/Components/atoms/Logo'
import PasswordToggle from '@/Components/atoms/PasswordToggle/PasswordToggle'

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

  // Validar los datos ingresados y hacer visible el formulario
  const isFormValid =
    formData.email.trim() !== '' &&
    formData.password.trim() !== '' &&
    (activeForm !== 'register' || formData.username.trim() !== '')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    const formDatatoSend = { ...formData }
    if (activeForm === 'login') delete formDatatoSend.username

    if (!formDatatoSend.email || !formDatatoSend.password) {
      setError('Todos los campos son obligatorios')
      return
    }

    try {
      const endpoint = activeForm === 'login' ? '/auth/login' : '/auth/register'
      const response = await api.post(endpoint, formDatatoSend, {
        withCredentials: true,
      })

      if (activeForm === 'register') {
        toast.info(
          'Registro exitoso. Hemos enviado un correo de bienvenida a tu bandeja de entrada. Si usas Gmail, pulsa sobre los tres puntos ("...") en la parte inferior izquierda del mensaje y selecciona "Mostrar contenido".',
          {
            autoClose: 10000, // El usuario tiene 10 secs para leer el mensaje
            position: 'top-center',
          }
        )
      }

      // ✔️ Guardar token en cookie y localStorage
      document.cookie = `token=${response.data.token}; path=/;`
      localStorage.setItem('token', response.data.token)

      // ✔️  Llamar al login() para actualizar el estado de autenticación inmediatamente
      login(response.data)

      // ✔️  Mostrar mensaje de éxito
      toast.success('Inicio de sesión exitoso.')

      // ✔️ Redirigir y cerrar modal
      navigate('/dashboard')
      onClose()
    } catch (error) {
      console.error(
        'Error en autenticación:',
        error.response?.data || error.message
      )
      setError(error.response?.data?.message || 'Error en la autenticación')
      toast.error(error.response?.data?.message || 'Error en la autenticación')
    }
  }
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
