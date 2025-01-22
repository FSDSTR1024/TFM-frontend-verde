import PropTypes from 'prop-types'
import React from 'react'

import Logo from '../atoms/Logo'
import './Header.css'

const Header = ({ className }) => {
  return (
    <header className={`header ${className}`}>
      <Logo variant="primary" size="predefined" className="header-logo" />
    </header>
  )
}

Header.propTypes = {
  className: PropTypes.string,
}

Header.defaultProps = {
  className: '',
}

export default Header
