import PropTypes from 'prop-types'
import React from 'react'
import './Button.css'
const Button = ({ children }) => {
  return <button>{children}</button>
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
}

export default Button
