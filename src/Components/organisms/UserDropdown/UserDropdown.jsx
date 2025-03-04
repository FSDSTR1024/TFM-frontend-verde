import { useEffect, useState } from 'react'
import { UserRound } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import useAuth from '@/context/AuthContext/useAuth'
import Button from '../../atoms/Button'

const UserDropdown = () => {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false)

  // ============================
  // Alternar Visibilidad del Dropdown
  // ============================
  const toggleDropdown = () => {
    console.log('🟢 Clic en el botón del dropdown.')
    setShowDropdown((prev) => !prev)
  }

  // ============================
  // Cerrar el Dropdown al hacer clic fuera
  // ============================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        console.log('🔴 Clic fuera del dropdown. Cerrando menú.')
        setShowDropdown(false)
      }
    }

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showDropdown])

  // ============================
  // Navegar y cerrar el menú
  // ============================
  const handleNavigate = (path) => {
    navigate(path)
    setShowDropdown(false)
  }

  // ============================
  // Renderizado del Componente
  // ============================
  console.log('Estado de showDropdown:', showDropdown)

  return (
    <div className="relative dropdown-container">
      {/* Botón de menú para móviles */}
      <Button
        variant="secondary"
        onClick={toggleDropdown}
        ariaLabel="Menú de usuario"
        className="w-12 h-12 rounded-full p-0 flex items-center justify-center overflow-hidden border-2 border-secondary-dark"
      >
        <UserRound className="text-secondary-dark w-8 h-8" />
      </Button>

      {/* Dropdown flotante */}
      {showDropdown && (
        <div
          className="absolute top-full right-0 mt-2 w-48 bg-primary-dark text-primary-light
            border border-secondary-dark rounded-lg shadow-lg z-50"
        >
          <ul className="bg-primary-dark divide-y divide-secondary-dark/60 rounded-lg">
            {isLoggedIn ? (
              <>
                <li
                  className="px-4 py-3 cursor-pointer hover:bg-hover-state hover:text-primary-light transition rounded-t-lg"
                  onClick={() => handleNavigate('/profile')}
                >
                  Perfil
                </li>
                <li
                  className="px-4 py-3 cursor-pointer hover:bg-hover-state hover:text-primary-light transition"
                  onClick={() => handleNavigate('/wallet')}
                >
                  Cartera
                </li>
                <li
                  className="px-4 py-3 cursor-pointer hover:bg-hover-state hover:text-primary-light transition rounded-b-lg"
                  onClick={() => handleNavigate('/orders')}
                >
                  Órdenes
                </li>
              </>
            ) : (
              <>
                <li
                  className="px-4 py-3 cursor-pointer hover:bg-hover-state hover:text-primary-light transition rounded-t-lg"
                  onClick={() => handleNavigate('/login')}
                >
                  Iniciar Sesión
                </li>
                <li
                  className="px-4 py-3 cursor-pointer hover:bg-hover-state hover:text-primary-light transition rounded-b-lg"
                  onClick={() => handleNavigate('/register')}
                >
                  Registrarse
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default UserDropdown
