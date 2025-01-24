// NavLinks.jsx (Actualizado)
import Button from '@components/atoms/Button'
import React from 'react'
import styles from './NavLinks.module.css' // CSS Module

const NAV_ITEMS = ['SHARE', 'ABOUT', 'THE FILMS', 'PRESS', 'EDUCATION']

const NavLinks = () => (
  <nav className={styles.navContainer}>
    <ul className={styles.navList}>
      {NAV_ITEMS.map((item) => (
        <li key={item}>
          <Button
            type="nav"
            aria-current={item === 'SHARE' ? 'page' : undefined}
          >
            {item}
          </Button>
        </li>
      ))}
    </ul>
  </nav>
)

export default NavLinks
