// src/components/organisms/NavBar.jsx
import React from 'react'
import styled from 'styled-components'
import Logo from '../atoms/Logo'
import ButtonNav from '../molecules/ButtonsNav'

const StyledNavBar = styled.nav`
  display: grid;
  justify-content: space-between;
  justify-items: center;
  align-items: center;
  background-color: white;
  margin: 0px;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 1fr;
`

const NavBar = () => (
  <StyledNavBar>
    {/* Logo del NavBar */}
    <div style={{ gridColumn: '1 / 2' }}>
      <Logo href="/" width="120px" height="120px" />
    </div>
    {/* Botones Nav con íconos */}
    <div
      style={{
        gridColumn: '6 / 7',
        display: 'flex',
        justifyContent: 'space-evenly',
        gap: '10px',
      }}
    >
      <ButtonNav
        label="Home"
        theme="darkGreen"
        onClick={() => (window.location.href = '/')}
      />
      <ButtonNav
        label="About"
        theme="lightGreen"
        onClick={() => (window.location.href = '/about')}
      />
      <ButtonNav
        label="Contact"
        theme="darkGreen"
        onClick={() => (window.location.href = '/contact')}
      />
    </div>
  </StyledNavBar>
)

export default NavBar
