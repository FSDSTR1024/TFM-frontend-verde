import PropTypes from 'prop-types'
import React from 'react'
import styles from './Button.module.css' // ✔️ CSS Modules

const Button = ({ children, type = 'primary', onClick }) => (
  <button
    className={`${styles.button} ${styles[type]}`}
    onClick={onClick}
    type="button"
  >
    {children}
  </button>
)

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  onClick: PropTypes.func,
}

export default Button
