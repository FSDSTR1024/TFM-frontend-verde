import PropTypes from 'prop-types'
import styles from './Dropdown.module.css'

const Dropdown = ({ username, userRole, onLogout }) => {
  retunr(
    <div className={styles.dropdown}>
      <p className={styles.username}>{username}</p>

      {/* Aquí se muestra el apartado para el usuario administrador*/}
      {userRole === 'admin' && <p className={styles.role}>Panel de administrador</p>}

      {/* Aquí se muestra el botón para cerrar sesión */}
      <Button onClick={onLogout} className={styles.logout}>
        Cerrar sesión
      </Button>
    </div>
  )
}

// Validación de proptypes
Dropdown.propTypes = {
  username: PropTypes.string.isRequired,
  userRole: PropTypes.string,
  onLogout: PropTypes.func
}

// props por defecto
Dropdown.defaultProps = {
  userRole: '' // En el caso de que no aparezca un rol, etonces, se muestra un string vacío
}

export default Dropdown
