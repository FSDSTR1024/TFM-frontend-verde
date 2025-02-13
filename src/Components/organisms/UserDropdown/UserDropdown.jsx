import { useState } from 'react'
import useAuth from '@/context/AuthContext/useAuth'
import ProfileForm from './ProfileForm'

const UserDropdown = ({ onClose }) => {
  const { user } = useAuth() // Es aquí donde se obtienen los datos de usuario del contexto global

  const [showProfileForm, setShowProfileForm] = useState(false)

  // Lógica de la función que se activa al hacer click en 'Perfil'
  const handleEditProfile = () => {
    setShowProfileForm(true) // El estado es 'true' para así mostrar el formulario
  }

  // Lógica de la función que se activa al enviar el formulario
  const handleSubmitProfileForm = (formData) => {
    console.log('Datos enviados del formulario:', formData)
    setShowProfileForm(false) // Se cierra el formulario tras "guardar los cambios"
  }

  // Lógica de la función para cancelar el formulario
  const handleCancelProfileForm = () => {
    setShowProfileForm(false)
  }

  return (
    <div className="absolute right-0 mt-2 w-48 bg-primary-light border border-secondary-dark rounded-lg shadow-lg z-10">
      {showProfileForm ? (
        <ProfileForm
          userProfile={user}
          onSubmit={handleSubmitProfileForm}
          onCancel={handleCancelProfileForm}
        />
      ) : (
        <ul className="py-2">
          <li
            className="px-4 py-2 hover:bg-hover-state cursor-pointer text-primary-dark"
            onClick={handleEditProfile}
            role="button"
            tabIndex="0"
          >
            Perfil
          </li>
          <li
            className="px-4 py-2 hover:bg-hover-state cursor-pointer text-primary-dark"
            onClick={onClose} // Cierra el menú al hacer clic (opcional)
            role="button"
            tabIndex="0"
          >
            Cartera
          </li>
          <li
            className="px-4 py-2 hover:bg-hover-state cursor-pointer text-primary-dark"
            onClick={onClose} // Cierra el menú al hacer clic
            role="button"
            tabIndex="0"
          >
            Órdenes
          </li>
        </ul>
      )}
    </div>
  )
}

export default UserDropdown
