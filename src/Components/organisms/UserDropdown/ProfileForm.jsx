import { useState } from 'react'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'

const ProfileForm = ({ userProfile, onSubmit, onCancel }) => {
  const [formData, setFromData] = useState({
    username: userProfile.username || '',
    email: userProfile.email || '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  })

  const [changePassword, setChangePassword] = useState(false)

  // Función para manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target
    setFromData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const toggleChangePassword = () => {
    setChangePassword(!changePassword)

    // Reiniciamos los campos de contraseña si se desactiva la opción de cambiar la contraseña
    if (!changePassword) {
      setFromData((prev) => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }))
    }
  }

  return (
    <form
      className="flex flex-col space-y-7 p-6 rounded-lg border border-secondary-dark bg-hover-state"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(formData)
      }}
    >
      <h2 className="text-xl font-semibold text-primary-dark text-center mb-4">
        {' '}
        Editar Perfil
      </h2>

      {/* Input del nombre */}
      <Input
        label="Nombre de usuario"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />

      {/* Input de email */}
      <Input
        label="Correo Electrónico"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      {/* Checkbox para aceptar el cambio de contraseña */}
      <div className="flex items-center-gap-2 mb-4">
        <input
          type="checkbox"
          id="changePassword"
          checked={changePassword}
          onChange={toggleChangePassword}
        />
        <label htmlFor="changePassword" className="text-primary-dark">
          ¿Cambiar contraseña?
        </label>
      </div>

      {/* Si el usuario activa la casilla de changePassword, entonces aparecen los inputs correspondientes */}

      {changePassword && (
        <>
          <Input
            label="Contraseña actual"
            name="currentPassword"
            type="password"
            value={formData.currentPassword}
            onChange={handleChange}
            required={changePassword}
          />

          <Input
            label="Nueva contraseña"
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
            required={changePassword}
          />

          <Input
            label="Confirmar nueva contraseña"
            name="ConfirmPassword"
            type="password"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            required={changePassword}
          />
        </>
      )}

      {/* Botones para el formulario */}
      <div className="flex justify-end gap-2 mt-4">
        <Button
          variant="secundary"
          type="button"
          onClick={onCancel}
          ariaLabel="Cancelar"
        >
          Cancelar
        </Button>

        <Button variant="primary" type="submit" ariaLabel="Guardar cambios">
          Guardar
        </Button>
      </div>
    </form>
  )
}

export default ProfileForm
