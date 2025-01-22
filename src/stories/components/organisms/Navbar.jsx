import PropTypes from 'prop-types'
import React from 'react'
import Header from '../molecules/Header'
import NavLinks from '../molecules/NavLinks'
import './Navbar.css'

const Navbar = ({ links, className }) => {
  return (
    <div className={`navbar ${className}`}>
      <Header className="navbar-header" />
      <NavLinks links={links} buttonType="tertiary" />
    </div>
  )
}

Navbar.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  className: PropTypes.string,
}

Navbar.defaultProps = {
  className: '',
}

export default Navbar
