import { useState } from 'react'
import useAuth from '@/context/AuthContext/useAuth'
import ProfileForm from './ProfileForm'
import Button from '../../atoms/Button'

const UserDropdown = ({ onClose }) => {
  const { user } = useAuth() // Es aquí donde se obtienen los datos de usuario del contexto global

  const [showDropdown, setShowDropdown] = useState(false) // Estado para mostrar/ocultar el menú desplegable
  const [showProfileForm, setShowProfileForm] = useState(false) // Estado para mostrar/ocultar el formulario de edición de perfil

  //----------------------------------
  // Mostrar/Ocultar Dropdown
  //----------------------------------
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev)
  }

  //----------------------------------
  // Abrir Formulario de Perfil
  //----------------------------------
  // Lógica de la función que se activa al hacer click en 'Perfil'
  const handleEditProfile = () => {
    setShowProfileForm(true) // El estado es 'true' para así mostrar el formulario
    setShowDropdown(false) // Cerrar el dropdown al abrir el formulario
  }

  //----------------------------------
  // Envío del Formulario de Perfil
  //----------------------------------
  // Lógica de la función que se activa al enviar el formulario
  const handleSubmitProfileForm = (formData) => {
    console.log('Datos enviados del formulario:', formData)
    setShowProfileForm(false) // Se cierra el formulario tras "guardar los cambios"
  }

  //----------------------------------
  // Cancelar Formulario de Perfil
  //----------------------------------
  // Lógica de la función para cancelar el formulario
  const handleCancelProfileForm = () => {
    setShowProfileForm(false)
  }

  //----------------------------------
  // Renderizado del Componente
  //----------------------------------
  return (
    <div className="relative">
      {/* Botón Usuario SIEMPRE visible */}
      <Button variant="secondary" onClick={toggleDropdown} ariaLabel="Usuario">
        {user?.username || 'Usuario'}
      </Button>

      {/* Dropdown flotante */}
      {showDropdown && (
        <div
          className="
            absolute right-0 mt-2 w-48 bg-primary-dark text-primary-light
            border border-secondary-dark rounded-lg shadow-lg z-20
          "
        >
          <ul className="bg-primary-dark divide-y divide-secondary-dark/60 rounded-lg">
            <li
              className="px-4 py-3 cursor-pointer hover:bg-hover-state hover:text-primary-light transition rounded-t-lg"
              onClick={handleEditProfile}
            >
              Perfil
            </li>
            <li className="px-4 py-3 cursor-pointer hover:bg-hover-state hover:text-primary-light transition">
              Cartera
            </li>
            <li className="px-4 py-3 cursor-pointer hover:bg-hover-state hover:text-primary-light transition rounded-b-lg">
              Órdenes
            </li>
          </ul>
        </div>
      )}

      {/* Modal centrado para ProfileForm */}
      {showProfileForm && (
        <div className="fixed inset-0 bg-primary-dark/70 flex justify-center items-center z-50">
          <div
            className="
              bg-primary-dark text-primary-light border border-secondary-dark rounded-lg shadow-lg p-4 w-full max-w-md
            "
          >
            <ProfileForm
              userProfile={user}
              onSubmit={handleSubmitProfileForm}
              onCancel={handleCancelProfileForm}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default UserDropdown
