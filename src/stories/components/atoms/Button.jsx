import PropTypes from 'prop-types'
import React from 'react'

import './Button.css'

const getStyle = (...args) => ['button', ...args].filter(Boolean).join(' ')

const Button = ({ children, type }) => {
  return <button className={getStyle(type)}>{children}</button>
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
}

export default Button
