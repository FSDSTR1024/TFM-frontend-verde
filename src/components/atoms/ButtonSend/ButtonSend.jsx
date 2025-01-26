import PropTypes from 'prop-types'
import styles from './ButtonSend.module.css'

const ButtonSend = ({
  type = 'button',
  variant = 'primary', // Asegurar nombres coincidentes
  isLoading = false,
  disabled = false,
  children = 'Enviar',
  onClick,
  ariaLabel
}) => {
  const handleClick = e => {
    if (!disabled && !isLoading && onClick) {
      onClick(e)
    }
  }

  return (
    <button
      type={type}
      className={`${styles.button} ${styles[variant]}`}
      disabled={disabled || isLoading}
      onClick={handleClick}
      aria-label={ariaLabel || (isLoading ? 'Enviando datos' : children)}
      aria-disabled={disabled || isLoading}
    >
      {isLoading ? (
        <span className={styles.loading__container}>
          <span className={styles.loading__spinner} aria-hidden='true' />
          <span className={styles['visually-hidden']}>Procesando...</span>
        </span>
      ) : (
        children
      )}
    </button>
  )
}

ButtonSend.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'nav']), // Nombres iguales
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string
}

export default ButtonSend
