// ButtonRegister.stories.jsx
import { action } from '@storybook/addon-actions'
import ButtonRegister from './ButtonRegister'

export default {
  title: 'Components/Auth/ButtonRegister',
  component: ButtonRegister,
  parameters: {
    docs: {
      description: {
        component:
          'Botón personalizado para el proceso de registro. Maneja estados de carga y accesibilidad.'
      }
    }
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
      description: 'Tipo de estilo del botón'
    },
    isLoading: {
      control: 'boolean',
      description: 'Indica si está en estado de carga'
    },
    ariaLabel: {
      control: 'text',
      description: 'Texto accesible para lectores de pantalla'
    },
    loading: {
      control: 'text',
      description: 'Texto alternativo durante la carga'
    },
    onClick: {
      action: 'clicked',
      description: 'Manejador del evento click'
    }
  }
}

const Template = args => <ButtonRegister {...args} />

// Story por defecto
export const Default = Template.bind({})
Default.args = {
  children: 'Registrarse',
  ariaLabel: 'Botón para crear una nueva cuenta',
  isLoading: false,
  loading: 'Creando cuenta...'
}

// Story en estado de carga
export const LoadingState = Template.bind({})
LoadingState.args = {
  ...Default.args,
  isLoading: true
}

// Story con acción personalizada
export const WithCustomAction = Template.bind({})
WithCustomAction.args = {
  ...Default.args,
  onClick: action('Custom click handler'),
  children: 'Registro personalizado'
}

// Story con texto largo
export const LongText = Template.bind({})
LongText.args = {
  ...Default.args,
  children: 'Registrarse con correo electrónico',
  ariaLabel: 'Botón para registro con correo electrónico'
}
