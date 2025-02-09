import Logo from '@components/atoms/Logo'
import NavLinks from '@components/molecules/NavLinks'

const Header = () => (
  <header className="relative w-full min-h-[120px] lg:min-h-[140px] flex items-center bg-white px-4 lg:px-8 border-b border-gray-100">
    {' '}
    {/* Contenedor logo con padding integrado */}
    <div className="h-full flex items-center lg:flex-1">
      <Logo />
    </div>
    {/* Botones de navegación */}
    <div className="h-full flex items-center gap-6 lg:gap-8 pr-4 lg:pr-6">
      <NavLinks />
    </div>
  </header>
)

export default Header
