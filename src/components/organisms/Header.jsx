// Header.jsx
import React from 'react'
import styled from 'styled-components'
import Logo from '../atoms/Logo'
import NavBar from './Navbar'

const StyledHeader = styled.header`
  width: 100%;
  height: 200px;
  background-color: green;
  position: sticky;
  top: 0;
  z-index: 1000;
`

const HeaderContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 80px; // Definimos una altura fija para el header
  display: flex;

  @media (max-width: 768px) {
    height: auto;
    padding: 1rem;
  }
`
const LogoContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`

const Header = () => (
  <StyledHeader>
    <HeaderContainer>
      <LogoContainer>
        <Logo
          href="/"
          width="auto"
          height="60%" // Ahora el logo se ajustará al 60% de la altura del contenedor
          responsiveWidth="auto"
          responsiveHeight="40px"
        />
      </LogoContainer>
      <NavBar />
    </HeaderContainer>
  </StyledHeader>
)

export default Header
