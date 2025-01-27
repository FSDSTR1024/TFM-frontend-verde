// Header.jsx
import Logo from '@components/atoms/Logo'
import NavLinks from '@components/molecules/NavLinks'
import styles from './Header.module.css'

const Header = () => (
  <header className={styles.header}>
    <Logo />
    <NavLinks />
  </header>
)

export default Header
