import Button from '@components/atoms/Button'
import PropTypes from 'prop-types'
import styles from './ButtonRegister.module.css'

const ButtonRegister = ({
  children,
  onClick = () => {},
  ariaLabel,
  isLoading = false,
  loading = 'Cargando...'
}) => {
  return (
    <Button
      type='primary' // Prioriza la variante secondary
      onClick={e => {
        if (isLoading) return
        onClick(e)
      }}
      ariaLabel={isLoading ? '${ariaLabel} - (${loadingText})' : ariaLabel}
      disabled={isLoading}
      className={styles.register}
    >
      {isLoading ? loadingText : children}
    </Button>
  )
}

ButtonRegister.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  loading: PropTypes.string
}

export default ButtonRegister
