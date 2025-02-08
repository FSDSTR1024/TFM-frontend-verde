import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/organisms/Navbar/Navbar'

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Routes>
      {/* Aquí se pueden añadir más rutas cuando se creen nuevas páginas */}
      <Route
        path="*"
        element={
          <div className="text-center mt-10 text-lg font-medium">
            Página no encontrada
          </div>
        }
      />
    </Routes>
  </BrowserRouter>
)

export default App

