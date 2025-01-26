import Button from '@components/atoms/Button'
import PropTypes from 'prop-types'
import styles from './ButtonLogin.module.css'

// Parámetros por defecto en la función (no más defaultProps)
const ButtonLogin = ({ children, onClick, ariaLabel, isLoading = false }) => (
  <Button
    type='login'
    onClick={onClick}
    ariaLabel={ariaLabel}
    disabled={isLoading}
    className={styles.login}
  >
    {isLoading ? 'Cargando...' : children}
  </Button>
)

ButtonLogin.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string.isRequired, // ✅ Nombre correcto
  isLoading: PropTypes.bool
}

export default ButtonLogin
