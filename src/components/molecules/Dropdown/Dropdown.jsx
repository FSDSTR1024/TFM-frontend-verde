import PropTypes from 'prop-types'
import ButtonOnLogout from '../../atoms/ButtonOnLogout'
import styles from './Dropdown.module.css'

const Dropdown = ({ username, userRole = '', onLogout }) => {
  return (
    <div className={styles.dropdown}>
      {/* Nombre del usuario */}
      <p className={styles.username}>{username}</p>

      {/* Mostrar rol del administrador */}
      {userRole === 'admin' && <p className={styles.role}>Panel de administrador</p>}

      {/* Botón de cerrar sesión */}
      <ButtonOnLogout
        onClick={onLogout} // Lógica del cierre de sesión
        ariaLabel='Cerrar sesión'
      >
        Cerrar sesión
      </ButtonOnLogout>
    </div>
  )
}

// Validación de props
Dropdown.propTypes = {
  username: PropTypes.string.isRequired, // Nombre del usuario
  userRole: PropTypes.string, // Rol del usuario
  onLogout: PropTypes.func.isRequired // Función para manejar el logout
}

export default Dropdown
