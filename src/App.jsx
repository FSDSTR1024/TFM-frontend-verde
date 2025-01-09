//------------------
//App.jsx - Enrutamiento
//------------------

import React from 'react'
import { BrowserRouter, Routes } from 'react-router-dom'

//------------------
//BrowserRouter
//------------------

// Recuerda qué:
// <BrowserRouter> envuelve toda nuestra aplicación, este es el enrutaador que conecta nuestra UI con el URL del navegador. (Siempre debe de escribirse de esta forma), cuando decidais escribir las rutas de las moleculas que creemos, lo hareís dentro de <Routes> primero con path="/" y luego con el elemento que hayamos creado element={<Home />}</Routes>, Recordad que al llamar a nuestro elemento, se debe de importar aútomáticamente en la cabecera de nuestro archivo App.jsx.
const App = () => (
  <BrowserRouter>
    <Routes></Routes>
  </BrowserRouter>
)

export default App
