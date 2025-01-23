// src/components/atoms/Logo/Logo.jsx
import logo from '@assets/images/logo.svg'
import '@components/atoms/Logo/Logo.css' // ✔️
import React from 'react'

const Logo = () => (
  <div className="logo">
    <img src={logo} alt="Logo" />
  </div>
)

export default Logo
