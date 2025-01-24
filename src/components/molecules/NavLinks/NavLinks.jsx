// NavLinks.jsx (Versión corregida)
import Button from '@components/atoms/Button' // ✔️ Importa tus botones
import '@components/molecules/NavLinks/NavLinks.css'
import React from 'react'

// NavLinks.jsx
const NavLinks = () => (
  <ul className="nav-links">
    <li>
      <Button variant="nav">SHARE</Button>
    </li>
    <li>
      <Button variant="nav">ABOUT</Button>
    </li>
    <li>
      <Button variant="nav">THE FILMS</Button>
    </li>
  </ul>
)

export default NavLinks
