import Button from '@components/atoms/Button'
import PropTypes from 'prop-types'
import styles from './ButtonOnLogout.module.css'

const ButtonOnLogout = ({ children, onClick = () => {}, ariaLabel }) => {
  return (
    <Button
      type='primary'
      onClick={e => onClick && onClick(e)}
      ariaLabel={ariaLabel}
      className={styles.logout}
    >
      {children}
    </Button>
  )
}

ButtonOnLogout.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string.isRequired
}

export default ButtonOnLogout
