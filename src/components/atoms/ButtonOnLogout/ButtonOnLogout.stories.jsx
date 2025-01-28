import ButtonOnLogout from './ButtonOnLogout'
export default {
  title: 'Components/ButtonOnLogout', // Ruta en Storybook
  component: ButtonOnLogout, // Componente principal
  argTypes: {
    onClick: { action: 'clicked' }, // Registra la acción de clic
    children: { control: 'text' }, // Permite editar el texto del botón
    ariaLabel: { control: 'text' } // Permite editar el aria-label
  }
}

// Plantilla para las historias
const Template = args => <ButtonOnLogout {...args} />

// Historia por defecto
export const Default = Template.bind({})
Default.args = {
  children: 'Cerrar sesión', // Texto del botón
  ariaLabel: 'Cerrar sesión' // aria-label
}

// Historia con un ícono o contenido personalizado
export const WithIcon = Template.bind({})
WithIcon.args = {
  children: (
    <>
      <span role='img' aria-label='logout icon'>
        🚪
      </span>{' '}
      Cerrar sesión
    </>
  ),
  ariaLabel: 'Cerrar sesión con ícono'
}

// Historia con el botón deshabilitado
export const Disabled = Template.bind({})
Disabled.args = {
  children: 'Cerrar sesión',
  ariaLabel: 'Cerrar sesión (deshabilitado)',
  onClick: null // Simula que no hay función onClick
}
