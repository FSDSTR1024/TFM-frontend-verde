import Button from '@components/atoms/Button'
import PropTypes from 'prop-types'
import styles from './ButtonLogin.module.css'

const ButtonLogin = ({ children, onClick, ariaLabel, isLoading = false }) => {
  console.log('[DEBUG] Props en ButtonLogin:', {
    children,
    onClick: typeof onClick,
    ariaLabel,
    isLoading
  })

  return (
    <Button
      type='secondary' // Prioriza la variante secondary
      onClick={e => {
        console.log('[DEBUG] Evento click:', e)
        if (onClick) {
          console.log('[DEBUG] Ejecutando onClick...')
          onClick(e)
        }
      }}
      ariaLabel={ariaLabel}
      disabled={isLoading}
      className={styles.login} // Asocia la clase login al botón
    >
      {isLoading ? 'Cargando...' : children}
    </Button>
  )
}

ButtonLogin.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string.isRequired,
  isLoading: PropTypes.bool
}

export default ButtonLogin
