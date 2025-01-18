import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import logo from '../../assets/logo.svg'

// Estilos del Logo
const StyledLogo = styled.a`
  display: inline-block;
  text-decoration: none;

  img {
    width: ${(props) =>
      props.$width}; /* Usamos $ para definir transient props */
    height: ${(props) => props.$height};
    max-width: 100%;
  }

  /* Estilo responsivo para dispositivos móviles */
  @media (max-width: 768px) {
    img {
      width: ${(props) => props.$responsiveWidth};
      height: ${(props) => props.$responsiveHeight};
    }
  }
`

/**
 * Componente funcional del Logo
 * @param {Object} props - Propiedades del componente
 * @param {string} [href='/'] - Enlace al que redirige el logo.
 * @param {string} [width='50px'] - Ancho del logo.
 * @param {string} [height='50px'] - Alto del logo.
 * @param {string} [responsiveWidth='40px'] - Ancho responsivo del logo.
 * @param {string} [responsiveHeight='40px'] - Alto responsivo del logo.
 */
const Logo = ({
  href = '/',
  width = '50px',
  height = '50px',
  responsiveWidth = '40px',
  responsiveHeight = '40px',
}) => (
  <StyledLogo
    href={href}
    $width={width} /* Pasamos las transient props con $ */
    $height={height}
    $responsiveWidth={responsiveWidth}
    $responsiveHeight={responsiveHeight}
  >
    <img src={logo} alt="Logo de la empresa" />
  </StyledLogo>
)

// Validación de las propiedades
Logo.propTypes = {
  href: PropTypes.string, // Ruta del enlace del logo
  width: PropTypes.string, // Ancho del logo
  height: PropTypes.string, // Alto del logo
  responsiveWidth: PropTypes.string, // Ancho responsivo del logo
  responsiveHeight: PropTypes.string, // Alto responsivo del logo
}

export default Logo
