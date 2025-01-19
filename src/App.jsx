import React from 'react'
import { BrowserRouter, Routes } from 'react-router-dom'
import Header from './components/organisms/Header'

const App = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Routes></Routes>
    </main>
  </BrowserRouter>
)

export default App
