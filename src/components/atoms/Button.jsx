import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

// Definimos los temas con colores dinámicos.
const theme = {
  darkGreen: {
    default: '#648a64',
    hover: '#213435',
  },
  lightGreen: {
    default: '#a6b985',
    hover: '#648a64',
  },
}

// Estilizamos el botón con styled-components.
// Usamos `attrs` para controlar que `theme` no se pase al DOM.
const StyledButton = styled.button.attrs((props) => ({
  themeStyle: theme[props.theme], // Pasamos el tema como una prop interna llamada `themeStyle`.
}))`
  background-color: ${(props) => props.themeStyle.default};
  color: white;
  padding: 8px 16px;
  border-radius: 5px;
  outline: 0; // Elimina el contorno cuando el botón es seleccionado.
  border: none;
  text-transform: uppercase;
  margin: 10px 9px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms; // Anima el cambio de color en 250ms.

  &:hover {
    background-color: ${(props) => props.themeStyle.hover};
  }

  &:disabled {
    cursor: default; // El cursor vuelve a predeterminado.
    opacity: 0.7; // Reducimos la opacidad para indicar que el botón está inactivo.
  }
`

/**
 * Componente reutilizable tipo Botón.
 * @param {string} theme - Tema del botón. Puede ser "darkGreen" o "lightGreen".
 * @param {React.ReactNode} children - Contenido dinámico dentro del botón.
 * @param {function} onClick - Función que se ejecuta al hacer clic en el botón.
 * @param {boolean} disabled - Indica si el botón está deshabilitado. Valor predeterminado: false.
 * @returns {JSX.Element} - Devuelve un botón estilizado basado en el tema proporcionado.
 */
const Button = ({
  theme = 'darkGreen', // Tema predeterminado.
  children,
  onClick,
  disabled = false,
}) => {
  return (
    <StyledButton theme={theme} onClick={onClick} disabled={disabled}>
      {children}
    </StyledButton>
  )
}

// Validación de props.
Button.propTypes = {
  theme: PropTypes.oneOf(['darkGreen', 'lightGreen']),
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
}

// Valores predeterminados del botón.
Button.defaultProps = {
  theme: 'lightGreen',
  disabled: false,
}

export default Button
