// src/components/organisms/NavBar.jsx
import React from 'react'
import Button from '../atoms/Button'
import Logo from '../atoms/Logo'
const NavBar = () => (
  <nav
    style={{
      display: 'grid',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0px',
      backgroundColor: '#f8f9fa',
      boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
    }}
  >
    {/* Logo del NavBar */}
    <Logo href="/" width="120px" height="120px" />

    {/* Botón Home */}
    <Button onClick={() => (window.location.href = '/')}>Home</Button>
  </nav>
)

export default NavBar
