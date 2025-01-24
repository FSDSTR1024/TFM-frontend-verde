// src/components/molecules/Header/Header.jsx
import Logo from '@components/atoms/Logo'
import NavLinks from '@components/molecules/NavLinks'
import './Header.css' // ✔️ Ruta relativa

const Header = () => (
  <header className="header">
    <Logo />
    <NavLinks />
  </header>
)

export default Header // ✔️ Exportación estándar
