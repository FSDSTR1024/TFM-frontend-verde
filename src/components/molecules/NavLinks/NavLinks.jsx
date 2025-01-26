import Button from '@components/atoms/Button'
import styles from './NavLinks.module.css'

const NAV_ITEMS = ['SHARE', 'ABOUT', 'FILMS', 'PRESS', 'EDUCATION']

const NavLinks = () => (
  <nav className={styles.navContainer}>
    <ul className={styles.navList}>
      {NAV_ITEMS.map(item => (
        <li key={item}>
          <Button
            type='nav'
            arialabel={`Navegar a ${item}`}
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
