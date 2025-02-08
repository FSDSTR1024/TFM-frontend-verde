import { useState } from 'react'
import Button from './Components/atoms/Button/Button'
import Input, { EmailInput } from './Components/atoms/Input/Input'
import PasswordToggle from './Components/atoms/PasswordToggle/PasswordToggle'
import Logo from './Components/atoms/Logo/Logo'

const App = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Todos los campos son obligatorios')
    } else {
      setError('')
      alert(`Correo: ${email}\nContraseña: ${password}`)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-primary-light p-6 gap-6">
      {/* Logo */}
      <Logo />

      {/* Título */}
      <h1 className="text-2xl font-bold text-primary-dark">
        Componentes con Tailwind y DaisyUI
      </h1>

      {/* Formulario de prueba */}
      <form
        className="flex flex-col gap-4 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <EmailInput
          label="Correo Electrónico"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <PasswordToggle
          label="Contraseña"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          error={error}
        />

        {error && <span className="text-error-color">{error}</span>}

        <Button type="submit" variant="primary" ariaLabel="Enviar formulario">
          Enviar
        </Button>
      </form>
    </div>
  )
}

export default App

