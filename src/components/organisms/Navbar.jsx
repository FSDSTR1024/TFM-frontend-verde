import React from 'react'
import styled from 'styled-components'
import ButtonNav from '../molecules/ButtonsNav'

const StyledNavBar = styled.nav`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: start;
  gap: 2rem;
  height: 75%;
  position: relative;
  left: 2.7rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

const NavButtons = styled.div`
  display: flex;
  width: 65%;
  height: 65%;
  @media (max-width: 768px) {
    justify-content: center;
  }
`

const NavBar = () => (
  <StyledNavBar>
    <div />
    <div /> {/* Espaciador */}
    <NavButtons>
      <ButtonNav label="Home" theme="darkGreen" to="/" />
      <ButtonNav label="About" theme="lightGreen" to="/about" />
      <ButtonNav label="Contact" theme="darkGreen" to="/contact" />
    </NavButtons>
  </StyledNavBar>
)

export default NavBar
