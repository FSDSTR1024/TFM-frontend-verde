import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'
import { UserRound, Wallet, Newspaper, LogIn, UserPlus } from 'lucide-react'
import useAuth from '@/context/AuthContext/useAuth'

const UserDropdown = () => {
  const { user, isLoggedIn } = useAuth()
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const dropdownRef = useRef(null)
  const isAnimating = useRef(false)
  const [profileImage, setProfileImage] = useState(user?.profileImage || '')

  // ============================
  // Alternar Visibilidad del Dropdown
  // ============================
  const toggleDropdown = (e) => {
    e.stopPropagation()
    if (isClosing || isAnimating.current) return
    isAnimating.current = true

    setShowDropdown((prev) => !prev)

    setTimeout(() => {
      isAnimating.current = false
    }, 200)
  }

  // ============================
  // Cerrar el Dropdown al hacer clic fuera con animación controlada
  // ============================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsClosing(true)
        setTimeout(() => {
          setShowDropdown(false)
          setIsClosing(false)
        }, 300)
      }
    }

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    // Actualizamos la imagen cuando 'user.profileImage' cambie
    setProfileImage(user?.profileImage)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showDropdown, user?.profileImage])

  return (
    <Menu as="div" className="relative dropdown-container">
      {/* Botón de usuario con efecto Glassmorphism */}
      <Menu.Button
        onClick={toggleDropdown}
        className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-secondary-dark bg-special-class shadow-xl
                  hover:scale-105 transition-all duration-200 ease-out hover:shadow-2xl backdrop-blur-lg"
      >
        {user?.profileImage ? (
          <img
            src={user.profileImage}
            alt="Foto de perfil"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <UserRound className="text-secondary-dark w-9 h-9" />
        )}
      </Menu.Button>

      <Transition
        as="div"
        show={showDropdown}
        enter="transition ease-out-expo duration-300"
        enterFrom="transform opacity-0 scale-95 blur-md -translate-y-6"
        enterTo="transform opacity-100 scale-100 blur-none translate-y-0"
        leave="transition ease-in-out duration-300"
        leaveFrom="transform opacity-100 scale-100 translate-y-0"
        leaveTo="transform opacity-0 scale-95 blur-md -translate-y-4"
      >
        <div
          ref={dropdownRef}
          className="absolute top-full right-0 md:right-0 md:left-auto left-1/2 -translate-x-1/2 mt-3 w-56 bg-primary-dark/80
                  text-primary-light border border-secondary-dark rounded-xl shadow-2xl z-50 backdrop-blur-lg
                    p-5 flex flex-col items-start space-y-3"
        >
          <ul className="w-full space-y-3">
            {isLoggedIn ? (
              <>
                <Transition.Child
                  enter="transition ease-out duration-500 delay-100"
                  enterFrom="opacity-0 -translate-x-2"
                  enterTo="opacity-100 translate-x-0"
                >
                  <li
                    className="w-full flex items-center gap-3 px-4 py-3 cursor-pointer rounded-lg border-l-4 border-transparent
                      hover:bg-hover-state hover:border-secondary-dark transition-all duration-300 hover:scale-105"
                    onClick={() => navigate('/profile')}
                  >
                    <UserRound className="w-5 h-5 text-primary-light" />
                    Perfil
                  </li>
                </Transition.Child>

                <Transition.Child
                  enter="transition ease-out duration-500 delay-200"
                  enterFrom="opacity-0 -translate-x-2"
                  enterTo="opacity-100 translate-x-0"
                >
                  <li
                    className="w-full flex items-center gap-3 px-4 py-3 cursor-pointer rounded-lg border-l-4 border-transparent
                              hover:bg-hover-state hover:border-secondary-dark transition-all duration-300 hover:scale-105"
                    onClick={() => navigate('/wallet')}
                  >
                    <Wallet className="w-5 h-5 text-primary-light" />
                    Cartera
                  </li>
                </Transition.Child>

                <Transition.Child
                  enter="transition ease-out duration-500 delay-300"
                  enterFrom="opacity-0 -translate-x-2"
                  enterTo="opacity-100 translate-x-0"
                >
                  <li
                    className="w-full flex items-center gap-3 px-4 py-3 cursor-pointer rounded-lg border-l-4 border-transparent
                            hover:bg-hover-state hover:border-secondary-dark transition-all duration-300 hover:scale-105"
                    onClick={() => navigate('/news')}
                  >
                    <Newspaper className="w-5 h-5 text-primary-light" />
                    Noticias
                  </li>
                </Transition.Child>
              </>
            ) : (
              <>
                <Transition.Child
                  enter="transition ease-out duration-500 delay-100"
                  enterFrom="opacity-0 -translate-x-2"
                  enterTo="opacity-100 translate-x-0"
                >
                  <li
                    className="w-full flex items-center gap-3 px-4 py-3 cursor-pointer rounded-lg border-l-4 border-transparent
                            hover:bg-hover-state hover:border-secondary-dark transition-all duration-300 hover:scale-105"
                    onClick={() => navigate('/login')}
                  >
                    <LogIn className="w-5 h-5 text-primary-light" />
                    Iniciar Sesión
                  </li>
                </Transition.Child>

                <Transition.Child
                  enter="transition ease-out duration-500 delay-200"
                  enterFrom="opacity-0 -translate-x-2"
                  enterTo="opacity-100 translate-x-0"
                >
                  <li
                    className="w-full flex items-center gap-3 px-4 py-3 cursor-pointer rounded-lg border-l-4 border-transparent
                              hover:bg-hover-state hover:border-secondary-dark transition-all duration-300 hover:scale-105"
                    onClick={() => navigate('/register')}
                  >
                    <UserPlus className="w-5 h-5 text-primary-light" />
                    Registrarse
                  </li>
                </Transition.Child>
              </>
            )}
          </ul>
        </div>
      </Transition>
    </Menu>
  )
}

export default UserDropdown
