import React from 'react'

import PropTypes from 'prop-types'
import './Logo.css'

const Logo = ({ size, className, variant }) => {
  // Combinación de estilos dinámicos
  const styles = ['logo', variant, size, className].filter(Boolean).join(' ')

  return <div className={styles}></div>
}

Logo.prototypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
}
