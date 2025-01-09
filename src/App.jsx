//------------------
//App.jsx - Enrutamiento
//------------------

import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/molecules/Navbar'

//------------------
//BrowserRouter
//------------------

// Recuerda qué:
// <BrowserRouter> envuelve toda nuestra aplicación, este es el enrutador que conecta nuestra UI con el URL del navegador. (Siempre debe de escribirse de esta forma), cuando decidais escribir las rutas de las moleculas que creemos, lo hareís dentro de <Routes> <Route> primero con path="/" y luego con el elemento que hayamos creado element={<Home />}</Route></Routes>, Recordad que al llamar a nuestro elemento, se debe de importar aútomáticamente en la cabecera de nuestro archivo App.jsx.
const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navbar />} />
    </Routes>
  </BrowserRouter>
)

export default App
