// src/components/organisms/NavBar.jsx
import React from 'react'
import Button from '../atoms/Button'
import Logo from '../atoms/Logo'
const NavBar = () => (
  <nav
    style={{
      display: 'grid',
      justifyContent: 'space-between', // Espacio entre logo y botón
      justifyItems: 'center',
      alignItems: 'stretch',
      padding: '10px 20px',
      width: '100%',
      backgroundColor: '#f2f2f2',
      boxShadow: '0px 2px 5px rgba(1, 0, 0, 0.1)',
      margin: '0px',
      gridTemplateColumns: 'repeat(6, 1fr)',
      gridTemplateRows: '1fr',
    }}
  >
    {/* Logo del NavBar */}
    <div style={{ gridColumn: '1 / 2' }}>
      <Logo href="/" width="120px" height="120px" />
    </div>
    {/* Botones del NavBar */}
    <div
      style={{
        gridColumn: '6 / 6',
        display: 'flex', // Usamos flexbox para organizar botones
        justifyContent: 'space-evenly', // Distribuye los botones con espacio uniforme
      }}
    >
      <Button onClick={() => (window.location.href = '/')}>Home</Button>
      <Button onClick={() => (window.location.href = '/about')}>About</Button>
      <Button onClick={() => (window.location.href = '/contact')}>
        Contact
      </Button>
    </div>
  </nav>
)

export default NavBar
