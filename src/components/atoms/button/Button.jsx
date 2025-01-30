import PropTypes from 'prop-types'
import styles from './Button.module.css'

const Button = ({
  children,
  variant = 'primary', // Asegurar nombres coincidentes
  htmlType = 'button', // Utiliza el type nativo de html para el botón
  onClick,
  ariaLabel,
  disabled,
  className
}) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${className || ''}`}
      onClick={onClick}
      type={htmlType}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  htmlType: PropTypes.oneOf(['button', 'submit', 'reset']),
  ariaLabel: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func
}

export default Button
