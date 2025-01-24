// src/components/molecules/Header/Header.jsx
import Logo from '@components/atoms/Logo'
import NavLinks from '../NavLinks/NavLinks'
import './Header.css'

const Header = () => (
  <header className="header">
    <Logo />
    <NavLinks />
  </header>
)

export default Header
