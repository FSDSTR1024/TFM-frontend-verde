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
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: 'white',
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
