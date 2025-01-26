import ButtonLogin from './ButtonLogin'

export default {
  title: 'Atoms/ButtonLogin',
  component: ButtonLogin,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Texto del botón'
    },
    onClick: {
      action: 'clicked',
      description: 'Callback para manejar el clic'
    },
    ariaLabel: {
      // CORRECCIÓN: Nombre de prop correcto (camelCase)
      control: 'text',
      description: 'Texto accesible para el botón'
    },
    isLoading: {
      control: 'boolean',
      description: 'Indica si el botón está en estado de carga'
    }
  }
}

const Template = args => <ButtonLogin {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Iniciar sesión',
  ariaLabel: 'Iniciar sesión', // CORRECCIÓN: Propiedad correcta
  isLoading: false
}

export const Loading = Template.bind({})
Loading.args = {
  children: 'Iniciar sesión',
  ariaLabel: 'Iniciar sesión', // CORRECCIÓN: Propiedad correcta
  isLoading: true
}
