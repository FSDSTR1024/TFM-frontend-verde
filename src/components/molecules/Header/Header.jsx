// src/components/molecules/Header/Header.jsx
import Logo from '@components/atoms/Logo'
import '@components/molecules/Header/Header.css' // ✔️
import NavLinks from '@components/molecules/NavLinks'
import React from 'react'

const Header = () => (
  <header className="header">
    <Logo />
    <NavLinks />
  </header>
)

export default Header
