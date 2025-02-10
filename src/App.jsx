import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/organisms/Navbar/Navbar'
import TradingDashboard from './components/TradingDashboard/TradingDashboard'
import Indices from './components/indices/indices'
import HomePage from './components/pages/HomePage/HomePage' // Asegúrate de que este componente existe
import Portfolio from "./components/portfolio/portfolio";
import PortfolioManager from "./components/portfolio/PortfolioManager";

const App = () => (
  <BrowserRouter>
  
  <Navbar />
    <Routes>
      <Route path='/' element={<HomePage />} /> {/* Ruta principal */}
      <Route path="/portfolio" element={<Portfolio />} />
    </Routes>
  </BrowserRouter>
)

export default App
