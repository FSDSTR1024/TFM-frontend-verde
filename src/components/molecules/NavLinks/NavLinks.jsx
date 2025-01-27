import Button from '@components/atoms/Button'
import ButtonLogin from '@components/atoms/ButtonLogin/ButtonLogin'
import styles from './NavLinks.module.css'

// Define el array con los tipos de botones
const NAV_ITEMS = [
  { label: 'Registrarse', type: 'nav' },
  { label: 'Iniciar sesión', type: 'login' } // Tipo especial para el botón de login
]

const NavLinks = () => (
  <nav className={styles.navContainer}>
    <ul className={styles.navList}>
      {NAV_ITEMS.map(item => (
        <li key={item.label}>
          {/* Lógica condicional para renderizar el tipo de botón */}
          {item.type === 'login' ? (
            <ButtonLogin
              ariaLabel={`Acceder a ${item.label}`}
              className={styles.navButton} // Hereda estilos comunes de NavLinks
              onClick={() => {
                console.log(`[DEBUG] Se hizo clic en ${item.label}`)
                // Aquí va la lógica específica de login
                console.log('Redirigiendo al flujo de login...')
                // Simula redirección o llama a una función
              }}
            >
              {item.label}
            </ButtonLogin>
          ) : (
            <Button
              type={item.type}
              ariaLabel={`Navegar a ${item.label}`}
              className={styles.navButton} // Hereda estilos comunes de NavLinks
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
