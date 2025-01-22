import PropTypes from 'prop-types'
import React from 'react'
import Button from '../atoms/Button'

/**
 * Componente NavLinks: Renderiza una lista de enlaces de navegación.
 *
 * @param {Array} links - Lista de enlaces con etiquetas.
 * @param {string} buttonType - Tipo de botón a aplicar a los enlaces.
 */
const NavLinks = ({ links, buttonType }) => {
  return (
    <nav className="nav-links">
      {links.map((link, index) => (
        <Button key={index} type={buttonType}>
          {link.label}
        </Button>
      ))}
    </nav>
  )
}

NavLinks.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  buttonType: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
}

NavLinks.defaultProps = {
  buttonType: 'tertiary',
}

export default NavLinks
