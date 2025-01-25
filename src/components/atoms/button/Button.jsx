import PropTypes from 'prop-types'
import React from 'react'
import styles from './Button.module.css'

const Button = (
  { children, type = 'primary', onClick, arialabel } // ✅ "arialabel" con l minúscula
) => (
  <button
    className={`${styles.button} ${styles[type]}`}
    onClick={onClick}
    type="button"
    aria-label={arialabel} // ✅ Coincide con el nombre de la prop
  >
    {children}
  </button>
)

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'nav']),
  onClick: PropTypes.func,
  arialabel: PropTypes.string.isRequired, // ✅ Nombre corregido (¡minúscula en "l"!)
}

export default Button
