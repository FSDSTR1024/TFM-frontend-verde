// NavLinks.jsx (Versión corregida)
import Button from '@components/atoms/Button'
import '@components/molecules/NavLinks/NavLinks.css' // ✔️ CSS estándar
import React from 'react'

const NAV_ITEMS = ['SHARE', 'ABOUT', 'THE FILMS', 'PRESS', 'EDUCATION']

const NavLinks = () => (
  <nav className="nav-container">
    {' '}
    {/* Clase normal */}
    <ul className="nav-list">
      {' '}
      {/* Clase normal */}
      {NAV_ITEMS.map((item) => (
        <li key={item}>
          <Button type="nav">{item}</Button>
        </li>
      ))}
    </ul>
  </nav>
)

export default NavLinks
