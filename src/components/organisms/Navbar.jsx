import React from 'react'
import styled from 'styled-components'
import ButtonNav from '../molecules/ButtonsNav'

const StyledNavBar = styled.nav`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

const NavButtons = styled.div`
  display: flex;

  @media (max-width: 768px) {
    justify-content: center;
  }
`

const NavBar = () => (
  <StyledNavBar>
    <div /> {/* Espaciador */}
    <NavButtons>
      <ButtonNav label="Home" theme="darkGreen" to="/" />
      <ButtonNav label="About" theme="lightGreen" to="/about" />
      <ButtonNav label="Contact" theme="darkGreen" to="/contact" />
    </NavButtons>
  </StyledNavBar>
)

export default NavBar
