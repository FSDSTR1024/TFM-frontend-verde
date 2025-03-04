import Logo from '@components/atoms/Logo'
import NavLinks from '@components/molecules/NavLinks'

const Header = () => (
  <header className="w-full bg-white shadow-md px-4 lg:px-8 h-[60px] lg:h-[68px] flex items-center justify-between">
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
