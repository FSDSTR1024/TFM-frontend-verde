// components/atoms/ButtonSend/ButtonSend.jsx
import PropTypes from 'prop-types'
import React from 'react'
import styles from './ButtonSend.module.css'

const ButtonSend = ({
  type = 'button',
  variant = 'primary',
  isLoading = false,
  disabled = false,
  children = 'Enviar',
  onClick,
  ariaLabel,
}) => {
  const handleClick = (e) => {
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
      role="button"
    >
      {isLoading ? (
        <span className={styles.loading__container}>
          <span className={styles.loading__spinner} aria-hidden="true" />
          <span className="visually-hidden">Procesando...</span>
        </span>
      ) : (
        children
      )}
    </button>
  )
}

ButtonSend.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'text']),
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string,
}

export default ButtonSend
