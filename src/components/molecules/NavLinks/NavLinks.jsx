// NavLinks.jsx (Versión corregida)
import Button from '@components/atoms/Button' // ✔️ Importa tus botones
import '@components/molecules/NavLinks/NavLinks.css'
import React from 'react'

const NavLinks = () => (
  <nav className="nav-links">
    <Button
      to="/productos"
      className="nav-link" // ✔️ Clase para estilos específicos
    >
      Productos
    </Button>
    <Button to="/contacto" className="nav-link">
      Contacto
    </Button>
  </nav>
)

export default NavLinks
