import AuthCard from './AuthCard'

export default {
  title: 'Components/AuthCard',
  component: AuthCard,
  argTypes: {
    activeForm: {
      control: 'radio',
      options: ['login', 'register'],
      description: 'Determina si el formulario está en modo "Iniciar sesión" o "Registro".',
      defaultValue: 'login' // Valor por defecto
    },
    formData: {
      control: 'object',
      description: 'Objeto que contiene los datos del formulario (email, password, username).',
      defaultValue: { email: '', password: '' } // Valor por defecto
    },
    onInputChange: {
      action: 'onInputChange',
      description: 'Función que se ejecuta cuando cambia el valor de un input.'
    },
    onSubmit: {
      action: 'onSubmit',
      description: 'Función que se ejecuta al enviar el formulario.'
    },
    onSwitchForm: {
      action: 'onSwitchForm',
      description: 'Función que cambia entre los modos "Iniciar sesión" y "Registro".'
    },
    onCancel: {
      action: 'onCancel',
      description: 'Función que cierra el modal de autenticación.'
    }
  }
}

// Template para renderizar el componente con args
const Template = args => <AuthCard {...args} />

// Historia para el modo "Iniciar sesión"
export const Login = Template.bind({})
Login.args = {
  activeForm: 'login',
  formData: { email: '', password: '' }
}

// Historia para el modo "Registro"
export const Register = Template.bind({})
Register.args = {
  activeForm: 'register',
  formData: { username: '', email: '', password: '' }
}

// Opcional: Configuración de valores por defecto para todas las historias
Login.parameters = {
  docs: {
    description: {
      story: 'Muestra el componente `AuthCard` en modo "Iniciar sesión".'
    }
  }
}

Register.parameters = {
  docs: {
    description: {
      story: 'Muestra el componente `AuthCard` en modo "Registro".'
    }
  }
}
