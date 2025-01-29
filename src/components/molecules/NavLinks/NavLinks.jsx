import ButtonRegister from '@/components/atoms/ButtonRegister'
import ButtonLogin from '@components/atoms/ButtonLogin/ButtonLogin'
import { useState } from 'react'
import styles from './NavLinks.module.css'

// Define el array con los tipos de botones
const NAV_ITEMS = [
  { label: 'Registrarse', type: 'nav' },
  { label: 'Iniciar sesión', type: 'login' } // Tipo especial para el botón de login
]

const NavLinks = () => {
  const [showDropdown, setShowDropdown] = useState(false) // Estado para controlar la visibilidad del dropdown
  const [isAuthenticated, setIsAuthenticated] = useState(false) // Estado para manejar si el usuario está autenticado
  const [username, setUsername] = useState('') // Nombre del usuario autenticado
  const [userRole, setUserRole] = useState('') // Rol del usuario autenticado

  return (
    <nav className={styles.navContainer}>
      <ul className={styles.navList}>
        {NAV_ITEMS.map(item => (
          <li key={item.label}>
            {item.type === 'login' ? (
              <>
                {/* Botón para iniciar sesión */}
                <ButtonLogin
                  ariaLabel={`Acceder a ${item.label}`}
                  className={styles.navButton}
                  onClick={() => {
                  }}
                >
                  {item.label}
                </ButtonLogin>
                {/* Dropdown para login */}
                {showDropdown && !isAuthenticated && (
                  <Dropdown
                    onLogin={handleLogin}
                    username={username}
                    userRole={userRole}
                    onLogout={handleLogout}
                  />
                )}
              </>
            ) : (
              // Botón para registrarse
              <ButtonRegister
                ariaLabel='Registrarse'
                className={styles.navButton}
                onClick={() => {
                  console.log(`[DEBUG] Se hizo clic en ${item.label}`)
                  console.log('Redirigiendo al flujo de registro...')
                }}
              >
                {item.label}
              </ButtonRegister>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavLinks
