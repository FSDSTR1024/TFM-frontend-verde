import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import logo from '../../assets/logo.svg'

// Estilos del Logo
const StyledLogo = styled.a`
  display: inline-block;
  text-decoration: none;

  img {
    height: 100%; /* Ocupará el 100% de la altura del contenedor del Header */
    width: auto; /* Ajustará el ancho proporcionalmente */
    max-width: 105px; /* Límite máximo para evitar que el logo sea demasiado grande */
  }

  /* Estilo responsivo para dispositivos móviles */
  @media (max-width: 768px) {
    img {
      height: auto; /* Cambia el comportamiento en dispositivos pequeños */
      width: ${(props) => props.$responsiveWidth || '40px'};
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
 * @param {string} [altText='Logo'] - Texto alternativo para accesibilidad.
 */
const Logo = ({
  href = '/',
  width = 'auto',
  height = 'auto',
  responsiveWidth = 'auto',
  responsiveHeight = 'auto',
  altText = 'Logo',
}) => (
  <StyledLogo
    href={href}
    $width={width}
    $height={height}
    $responsiveWidth={responsiveWidth}
    $responsiveHeight={responsiveHeight}
  >
    <img src={logo} alt={altText} />
  </StyledLogo>
)

// Validación de las propiedades
Logo.propTypes = {
  href: PropTypes.string, // Ruta del enlace del logo
  width: PropTypes.string, // Ancho del logo
  height: PropTypes.string, // Alto del logo
  responsiveWidth: PropTypes.string, // Ancho responsivo del logo
  responsiveHeight: PropTypes.string, // Alto responsivo del logo
  altText: PropTypes.string, // Texto alternativo para accesibilidad
}

export default Logo
