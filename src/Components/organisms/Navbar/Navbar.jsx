import { useState } from 'react'
import Logo from '@/components/atoms/Logo'
import NavLinks from '@/components/molecules/NavLinks'
import { Link } from 'react-router-dom'

const Navbar = ({ openAuthModal, setDropdownHeight }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 w-full h-[70px] lg:h-[68px] bg-special-class px-4 lg:px-8 shadow-md flex items-center justify-between z-50">
      {/* Asegurar que el logo esté bien alineado */}
      <div className="lg:flex-1 h-full flex items-center">
        <Link to="/dashboard" className="hover:opacity-80 transition-opacity">
          <Logo />
        </Link>
      </div>

      {/* Menú Desktop */}
      <div className="hidden lg:flex items-center gap-6 mr-4">
        <NavLinks setDropdownHeight={setDropdownHeight} />
      </div>

      {/* Botón Mobile */}
      <button
        className="lg:hidden absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-lg border border-primary-dark hover:bg-primary-light transition"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        ☰
      </button>

      {/* Menú Mobile */}
      {isMobileOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-special-class border-t  border-secondary-dark shadow-lg py-4 z-50">
          <NavLinks mobile onClose={() => setIsMobileOpen(false)} />
        </div>
      )}
    </header>
  )
}

export default Navbar
