import PropTypes from 'prop-types'
import styles from './Button.module.css'

const Button = ({ children, type = 'primary', onClick, ariaLabel, disabled, className }) => {
  // Depuración adicional para el componente base
  console.log('[DEBUG] Props en Button:', {
    type,
    ariaLabel,
    disabled,
    className
  })

  return (
    <button
      className={`${styles.button} ${styles[type]} ${className || ''}`}
      onClick={onClick}
      type='button'
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  type: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'nav', 'login']),
  ariaLabel: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func
}

export default Button
