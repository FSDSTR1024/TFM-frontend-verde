const Button = ({
  children,
  variant = 'primary',
  htmlType = 'button',
  onClick,
  ariaLabel = 'Botón sin etiqueta',
  disabled,
  className = '',
}) => {
  const baseStyles = `
  px-4 py-2 text-center inline-block relative overflow-hidden
  transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
  rounded-md font-primary text-sm min-w-[70px]
  hover:-translate-y-0.5
  focus-visible:outline focus-visible:outline-2 focus-visible:outline-hover-state focus-visible:outline-offset-2
  active:scale-95 active:translate-y-0.5
`

  const variantStyles = {
    primary: `bg-secondary-dark text-primary-light hover:bg-hover-state shadow-md hover:shadow-lg`,
    secondary: `border-2 border-secondary-dark text-secondary-dark hover:bg-hover-state hover:text-primary-light`,
    tertiary: `text-secondary-dark underline hover:no-underline hover:bg-primary-light`,
    nav: `bg-transparent border-2 border-primary-dark text-primary-dark px-5 py-[0.4rem] font-medium tracking-wide hover:bg-hover-state hover:text-primary-light`,
  }

  const disabledStyles = `bg-secondary-dark/30 text-primary-light/50 cursor-not-allowed opacity-70 pointer-events-none`

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${disabled ? disabledStyles : ''} ${className}`}
      onClick={onClick}
      type={htmlType}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
