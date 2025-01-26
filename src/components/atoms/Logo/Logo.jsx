import logo from '@assets/images/logo.svg'
import styles from './Logo.module.css'

const Logo = () => (
  <div className={styles.logo}>
    {' '}
    <img
      src={logo}
      alt='Plataforma de Seguimiento Financiero'
      style={{ width: '118px', height: 'auto' }}
    />
  </div>
)

export default Logo
