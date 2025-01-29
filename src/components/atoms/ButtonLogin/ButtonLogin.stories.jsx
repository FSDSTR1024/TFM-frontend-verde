import ButtonLogin from './ButtonLogin'

export default {
  title: 'Atoms/ButtonLogin',
  component: ButtonLogin,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Botón especializado para el flujo de autenticación' // Descripción general
      }
    }
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Texto visible del botón'
    },
    ariaLabel: {
      control: 'text',
      description: 'Texto para lectores de pantalla (accesibilidad)'
    },
    isLoading: {
      control: 'boolean',
      description: 'Estado de carga del botón'
    }
  }
}

const Template = args => <ButtonLogin {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Entrar',
  ariaLabel: 'Botón para iniciar sesión en la plataforma', // Mejor texto accesible
  isLoading: false
}

export const LoadingState = Template.bind({}) // Nombre más descriptivo
LoadingState.args = {
  ...Default.args,
  isLoading: true
}
