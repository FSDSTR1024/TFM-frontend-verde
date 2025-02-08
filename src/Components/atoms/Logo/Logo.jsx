import logo from '@assets/images/logo.svg'

const Logo = () => (
  <div className="max-w-[150px] p-0 flex justify-center shrink-0 translate-y-2 md:max-w-[100px] md:py-2 md:mx-auto md:-mb-1 md:translate-y-0">
    <img
      src={logo}
      alt="Plataforma de Seguimiento Financiero"
      className="w-full h-auto transition-transform duration-300 ease-in-out cursor-pointer hover:scale-105"
    />
  </div>
)

export default Logo

