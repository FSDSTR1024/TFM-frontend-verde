import logo from '@assets/images/logo.svg'
import React from 'react'
import './Logo.css'

const Logo = () => (
  <div className="logo">
    <img
      src={logo}
      alt="Plataforma de Seguimiento Financiero"
      style={{ width: '118px', height: 'auto' }}
    />
  </div>
)

export default Logo
