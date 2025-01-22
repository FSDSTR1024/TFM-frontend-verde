import PropTypes from 'prop-types'
import React from 'react'

import logo from '../../../assets/logo.svg'
import './Logo.css'

const Logo = ({ variant, size, className }) => {
  // Combinación de estilos dinámicos
  const styles = ['logo', variant, size, className].filter(Boolean).join(' ')

  return (
    <div className={styles}>
      <img src={logo} alt="Logo" />
    </div>
  )
}

Logo.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  className: PropTypes.string,
}

export default Logo
