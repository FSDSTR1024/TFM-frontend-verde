// src/components/molecules/ButtonNav.jsx
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import Button from '../atoms/Button'

// Extendemos el estilo del Button con `styled-components`
const StyledButtonNav = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px; /* Ajusta el padding */
`

const ButtonNav = ({ icon, label, theme, onClick, disabled }) => {
  return (
    <StyledButtonNav theme={theme} onClick={onClick} disabled={disabled}>
      <span>{label}</span> {/* Texto del botón */}
    </StyledButtonNav>
  )
}

// Definimos las validaciones para las props
ButtonNav.propTypes = {
  icon: PropTypes.node, // Ícono opcional (puede ser un componente SVG o un emoji)
  label: PropTypes.string.isRequired, // Texto descriptivo del botón
  theme: PropTypes.oneOf(['darkGreen', 'lightGreen']), // Tema del botón (del átomo Button)
  onClick: PropTypes.func, // Callback al hacer clic
  disabled: PropTypes.bool, // Si el botón está deshabilitado
}

// Valores predeterminados
ButtonNav.defaultProps = {
  theme: 'lightGreen', // Tema predeterminado
  disabled: false, // El botón no está deshabilitado por defecto
}

export default ButtonNav
