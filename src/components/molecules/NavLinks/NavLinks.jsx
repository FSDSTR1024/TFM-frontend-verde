import Button from '@components/atoms/Button'
import ButtonLogin from '@components/atoms/ButtonLogin/ButtonLogin'
import styles from './NavLinks.module.css'

// 2️⃣ Define el tipo de cada botón en el array
const NAV_ITEMS = [
  { label: 'Registrarse', type: 'nav' },
  { label: 'Iniciar sesión', type: 'login' } // Identificador para el botón especial
]

const NavLinks = () => (
  <nav className={styles.navContainer}>
    <ul className={styles.navList}>
      {NAV_ITEMS.map(item => (
        <li key={item.label}>
          {/* 3️⃣ Lógica condicional para renderizar ButtonLogin */}
          {item.type === 'login' ? (
            <ButtonLogin
              ariaLabel={`Acceder a ${item.label}`}
              className={styles.navButton}
              onClick={() => console.log('Lógica de login')} // Es en este apartado donde debo añadir la lçogica del botón
            >
              {item.label}
            </ButtonLogin>
          ) : (
            <Button
              type={item.type}
              ariaLabel={`Navegar a ${item.label}`}
              className={styles.navButton}
            >
              {item.label}
            </Button>
          )}
        </li>
      ))}
    </ul>
  </nav>
)

export default NavLinks
