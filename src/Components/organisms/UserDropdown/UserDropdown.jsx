// =========================================
// Componente UserDropdown (Menú de Usuario)
// =========================================

import { useEffect, useState } from 'react'
import { UserRound } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import useAuth from '@/context/AuthContext/useAuth'
import Button from '../../atoms/Button'

const UserDropdown = ({ onClose }) => {
  const { user } = useAuth() // Obtener información del usuario del contexto global

  const [showDropdown, setShowDropdown] = useState(false) // Estado del menú desplegable
  const navigate = useNavigate() // Hook para la navegación

  // =========================================
  // Cierra el Dropdown si se hace clic fuera
  // =========================================
  const handleClickOutside = (event) => {
    if (!event.target.closest('.dropdown-container')) {
      setShowDropdown(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // =========================================
  // Alternar Visibilidad del Dropdown
  // =========================================
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev)
  }

  // =========================================
  // Redirigir a la Página de Perfil
  // =========================================
  const handleNavigateToProfile = () => {
    navigate('/profile') // Redirigir a ProfilePage
    setShowDropdown(false) // Cerrar dropdown
    onClose?.() // Cerrar otros contenedores si es necesario
  }

  // =========================================
  // Renderizado del Componente
  // =========================================
  return (
    <div className="relative dropdown-container">
      {/* Botón con imagen de usuario */}
      <Button
        variant="secondary"
        onClick={toggleDropdown}
        ariaLabel={`Menú de usuario de ${user?.username || 'Invitado'}`}
        className="w-12 h-12 rounded-full p-0 flex items-center justify-center overflow-hidden border-2 border-secondary-dark"
      >
        {user?.profileImage ? (
          <img
            src={user.profileImage}
            alt="Foto de perfil"
            className="w-full h-full object-cover"
          />
        ) : (
          <UserRound className="text-secondary-dark w-8 h-8" />
        )}
      </Button>

      {/* Dropdown flotante */}
      {showDropdown && (
        <div
          className="absolute right-0 mt-2 w-48 bg-primary-dark text-primary-light
            border border-secondary-dark rounded-lg shadow-lg z-20"
        >
          <ul className="bg-primary-dark divide-y divide-secondary-dark/60 rounded-lg">
            <li
              className="px-4 py-3 cursor-pointer hover:bg-hover-state hover:text-primary-light transition rounded-t-lg"
              onClick={handleNavigateToProfile}
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
    </div>
  )
}

export default UserDropdown
