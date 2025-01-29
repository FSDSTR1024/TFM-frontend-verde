import Button from '../../atoms/Button'
import styles from './NavLinks.module.css'

const NavLinks = () => {
  return (
    <nav className={styles.navContainer}>
      <ul className={styles.navList}>
        {/* Botón para Registrarse */}
        <li>
          <Button
            type='secondary'
            ariaLabel='Acceder a Registrarse'
            className={styles.navButton}
            onClick={() => {
              // 📌 Aquí se incluirá la lógica para manejar el registro de usuario
            }}
          >
            Registrarse
          </Button>
        </li>

        {/* Botón para Iniciar Sesión */}
        <li>
          <Button
            type='secondary'
            ariaLabel='Acceder a Iniciar sesión'
            className={styles.navButton}
            onClick={() => {
              // 📌 Aquí se incluirá la lógica para manejar el inicio de sesión
            }}
          >
            Iniciar sesión
          </Button>
        </li>
      </ul>
    </nav>
  )
}

export default NavLinks
