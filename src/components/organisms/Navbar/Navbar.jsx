import Header from '@components/molecules/Header'
import '@components/organisms/Navbar/Navbar.css'
import React from 'react'

const Navbar = ({ className }) => (
  <nav className={`navbar ${className}`}>
    <Header />
  </nav>
)

Navbar.propTypes = {
  className: PropTypes.string,
}

export default Navbar
