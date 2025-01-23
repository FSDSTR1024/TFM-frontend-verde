import HomePage from '@components/pages/HomePage'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  </BrowserRouter>
)

export default App
