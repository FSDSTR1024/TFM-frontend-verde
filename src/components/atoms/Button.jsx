import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

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

const StyledButton = styled.button.attrs((props) => ({
  $themeStyle: theme[props.theme], // Cambiamos `themeStyle` a `$themeStyle`.
}))`
  background-color: 'none';
  color: black;
  padding: 8px 16px;
  outline: 0;
  border: 1.4px black solid;
  text-transform: uppercase;
  margin: 10px 9px;
  cursor: pointer;
  box-shadow: 0px 2px 2px lightgray;
  transition: ease background-color 250ms;

  &:hover {
    background-color: ${(props) => props.$themeStyle.hover};
  }

  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`

const Button = ({
  theme = 'lightGreen',
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

Button.propTypes = {
  theme: PropTypes.oneOf(['darkGreen', 'lightGreen']),
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
}

export default Button
