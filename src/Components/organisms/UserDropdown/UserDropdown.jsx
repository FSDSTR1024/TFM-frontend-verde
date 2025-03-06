import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'
import { UserRound } from 'lucide-react'

import useAuth from '@/context/AuthContext/useAuth'
import Button from '@/components/atoms/Button'

const UserDropdown = ({ onDropdownToggle }) => {
  const { user, isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)
  const isAnimating = useRef(false) // 🔹 Evita la activación doble por clics rápidos

  // ============================
  // Alternar Visibilidad del Dropdown
  // ============================
  const toggleDropdown = (e) => {
    e.stopPropagation() //  Evita que el evento burbujee y cierre el menú inmediatamente

    if (isAnimating.current) return // Evita que la animación interfiera con clics rápidos, algo muy común en la interación con la UI
    isAnimating.current = true

    setShowDropdown((prev) => !prev)

    setTimeout(() => {
      isAnimating.current = false // Permite clics nuevamente después de la animación
    }, 200) // Duración de la animación en ms, con esto conseguimos que no se rompa la animación

    if (onDropdownToggle) {
      const dropdownHeight = showDropdown
        ? 0
        : dropdownRef.current?.offsetHeight || 0
      if (window.innerWidth < 1024) {
        onDropdownToggle(dropdownHeight)
      }
    }
  }

  // ============================
  // Cerrar el Dropdown al hacer clic fuera
  // ============================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
        if (onDropdownToggle && window.innerWidth < 1024) {
          onDropdownToggle(0)
        }
      }
    }

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showDropdown, onDropdownToggle])

  return (
    <Menu as="div" className="relative dropdown-container">
      {/* Botón del menú */}
      <Menu.Button
        onClick={toggleDropdown}
        className="w-12 h-12 rounded-full p-0 flex items-center justify-center overflow-hidden border-2 border-secondary-dark bg-white shadow"
      >
        {/*  Mostrar imagen del usuario si existe, de lo contrario mostrar un ícono */}
        {user?.profileImage ? (
          <img
            src={user.profileImage}
            alt="Foto de perfil"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <UserRound className="text-secondary-dark w-8 h-8" />
        )}
      </Menu.Button>

      <Transition
        as="div"
        show={showDropdown}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div
          ref={dropdownRef}
          className="absolute top-full right-0 mt-2 w-48 bg-primary-dark text-primary-light border border-secondary-dark rounded-lg shadow-lg z-50"
        >
          <ul className="bg-primary-dark divide-y divide-secondary-dark/60 rounded-lg">
            {isLoggedIn ? (
              <>
                <li
                  className="px-4 py-3 cursor-pointer hover:bg-hover-state transition"
                  onClick={() => navigate('/profile')}
                >
                  Perfil
                </li>
                <li
                  className="px-4 py-3 cursor-pointer hover:bg-hover-state transition"
                  onClick={() => navigate('/wallet')}
                >
                  Cartera
                </li>
                <li
                  className="px-4 py-3 cursor-pointer hover:bg-hover-state transition"
                  onClick={() => navigate('/orders')}
                >
                  Órdenes
                </li>
              </>
            ) : (
              <>
                <li
                  className="px-4 py-3 cursor-pointer hover:bg-hover-state transition"
                  onClick={() => navigate('/login')}
                >
                  Iniciar Sesión
                </li>
                <li
                  className="px-4 py-3 cursor-pointer hover:bg-hover-state transition"
                  onClick={() => navigate('/register')}
                >
                  Registrarse
                </li>
              </>
            )}
          </ul>
        </div>
      </Transition>
    </Menu>
  )
}

export default UserDropdown
