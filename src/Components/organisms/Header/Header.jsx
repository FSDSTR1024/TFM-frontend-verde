import Logo from '@components/atoms/Logo'
import NavLinks from '@components/molecules/NavLinks'

const Header = () => (
  <header className="relative w-full min-h-[60px] max-h-[80px] flex justify-between items-center gap-5 bg-white box-border px-8 md:px-6 lg:px-10">
    <Logo />
    <NavLinks />
    {/* Línea de borde inferior */}
    <div className="absolute bottom-0 left-1/2 w-[calc(100%-4rem)] h-[1px] bg-primary-dark/15 opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
  </header>
)

export default Header
