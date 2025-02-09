import { useState } from 'react'
import Logo from '@/components/atoms/Logo'
import NavLinks from '@/components/molecules/NavLinks'

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <header className="relative w-full h-[60px] lg:h-[68px] bg-white px-4 lg:px-8 shadow-md flex items-center justify-between">
      {/* Logo con ajuste de posición vertical */}
      <div className="lg:flex-1 h-full flex items-center lg:pt-1">
        {' '}
        <Logo />
      </div>

      {/* Menú Desktop - Espaciado ajustado */}
      <div className="hidden lg:flex items-center gap-6 mr-4">
        {' '}
        <NavLinks />
      </div>

      {/* Botón Mobile */}
      <button
        className="lg:hidden absolute right-6 top-1/2 -translate-y-1/2 p-2 rounded-lg border border-primary-dark hover:bg-primary-light transition"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        ☰
      </button>

      {/* Menú Mobile */}
      {isMobileOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t shadow-lg py-4">
          <NavLinks mobile onClose={() => setIsMobileOpen(false)} />
        </div>
      )}
    </header>
  )
}

export default Navbar
