import { useState, useRef, useEffect } from 'react'
import { User, CreditCard, ChartCandlestick, LogOut } from 'lucide-react'
import useAuth from '@/context/AuthContext/useAuth'
import Button from '@/components/atoms/Button'

const UserDropdown = () => {
  const { user, logout } = useAuth() // Accedemos a la info del usuario y función de logout
  const [isOpen, setIsOpen] = useState(false) // Estado para controlar la visibilidad del dropdown
  const dropdownRef = useRef(null) // Referencia para manejar eventos fuera del dropdown

  // ----------------------------------
  // Cierra el dropdown si se hace clic fuera
  // ----------------------------------
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botón de usuario que activa el dropdown */}
      <Button
        variant="secondary"
        onClick={() => setIsOpen(!isOpen)}
        ariaLabel={`Perfil de ${user?.username || 'Usuario'}`}
      >
        {user?.username || 'Usuario'}
      </Button>

      {/* Contenido del dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-secondary-dark rounded-md shadow-lg z-50">
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-primary-light flex items-center gap-2 cursor-pointer">
              <User size={16} />
              <span>Perfil</span>
            </li>
            <li className="px-4 py-2 hover:bg-primary-light flex items-center gap-2 cursor-pointer">
              <CreditCard size={16} />
              <span>Cartera</span>
            </li>
            <li className="px-4 py-2 hover:bg-primary-light flex items-center gap-2 cursor-pointer">
              <ChartCandlestick size={16} />
              <span>Órdenes</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default UserDropdown
