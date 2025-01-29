import PropTypes from 'prop-types'
import Button from '../Button/Button'
import styles from './ButtonCancel.module.css'

const ButtonCancel = ({ children, onClick, ariaLabel }) => {
  return (
    <Button
      type='primary'
      onClick={onClick}
      className={styles.cancel}
      ariaLabel={ariaLabel} // Pasamos ariaLabel a Button
    >
      {children} {/* Usamos la prop correcta "children" */}
    </Button>
  )
}

// Definimos las propiedades del componente
ButtonCancel.propTypes = {
  children: PropTypes.node.isRequired, // Arreglamos typo "popTypes" -> "propTypes"
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string.isRequired // Añadimos ariaLabel como requerido
}

export default ButtonCancel
