import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/organisms/Navbar/Navbar'
import HomePage from './components/pages/HomePage/HomePage' // Asegúrate de que este componente existe

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<HomePage />} /> {/* Ruta principal */}
    </Routes>
  </BrowserRouter>
)

export default App
