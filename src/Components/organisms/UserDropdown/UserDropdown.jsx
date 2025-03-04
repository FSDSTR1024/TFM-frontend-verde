import { useEffect, useState, useRef } from 'react'
import { UserRound } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import useAuth from '@/context/AuthContext/useAuth'
import Button from '../../atoms/Button'

const UserDropdown = ({ onDropdownToggle }) => {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)

  // ============================
  // Alternar Visibilidad del Dropdown
  // ============================
  const toggleDropdown = () => {
    setShowDropdown((prev) => {
      const newState = !prev
      if (onDropdownToggle) {
        // 🔹 Solo ajustar el margen si es vista móvil
        const dropdownHeight = newState
          ? dropdownRef.current?.offsetHeight || 0
          : 0
        if (window.innerWidth < 1024) {
          onDropdownToggle(dropdownHeight)
        }
      }
      return newState
    })
  }

  // ============================
  // Cerrar el Dropdown al hacer clic fuera
  // ============================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setShowDropdown(false)
        if (onDropdownToggle && window.innerWidth < 1024) {
          onDropdownToggle(0) // 🔹 Resetear margen en móviles al cerrar
        }
      }
    }

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showDropdown, onDropdownToggle])

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
          ref={dropdownRef}
          className="absolute top-full right-0 mt-2 w-48 bg-primary-dark text-primary-light
            border border-secondary-dark rounded-lg shadow-lg z-50"
        >
          <ul className="bg-primary-dark divide-y divide-secondary-dark/60 rounded-lg">
            {isLoggedIn ? (
              <>
                <li
                  className="px-4 py-3 cursor-pointer hover:bg-hover-state hover:text-primary-light transition rounded-t-lg"
                  onClick={() => navigate('/profile')}
                >
                  Perfil
                </li>
                <li
                  className="px-4 py-3 cursor-pointer hover:bg-hover-state hover:text-primary-light transition"
                  onClick={() => navigate('/wallet')}
                >
                  Cartera
                </li>
                <li
                  className="px-4 py-3 cursor-pointer hover:bg-hover-state hover:text-primary-light transition rounded-b-lg"
                  onClick={() => navigate('/orders')}
                >
                  Órdenes
                </li>
              </>
            ) : (
              <>
                <li
                  className="px-4 py-3 cursor-pointer hover:bg-hover-state hover:text-primary-light transition rounded-t-lg"
                  onClick={() => navigate('/login')}
                >
                  Iniciar Sesión
                </li>
                <li
                  className="px-4 py-3 cursor-pointer hover:bg-hover-state hover:text-primary-light transition rounded-b-lg"
                  onClick={() => navigate('/register')}
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
