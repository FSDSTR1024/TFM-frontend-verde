// Button.jsx
import PropTypes from 'prop-types'
import React from 'react'
import styles from './Button.module.css'

const Button = ({ children, type = 'primary', onClick, ariaLabel }) => (
  <button
    className={`${styles.button} ${styles[type]}`}
    onClick={onClick}
    type="button"
    aria-label={ariaLabel}
  >
    {children}
  </button>
)

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary', 'tertiary', 'nav']),
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string.isRequired,
}

export default Button
