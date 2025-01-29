import AuthCard from './AuthCard'

export default {
  title: 'Components/AuthCard',
  component: AuthCard,
  argTypes: {
    activeForm: {
      control: 'radio',
      options: ['login', 'register'],
      description: 'Determina si el formulario está en modo iniciar sesión o registro'
    },
    formData: { control: 'object', description: 'Datos del formulario' },
    onInputChange: { action: 'onInputChange', description: 'Manejador del cambio de inputs' },
    onSubmit: { action: 'onSubmit', description: 'Manejador del envío del formulario' },
    onSwitchForm: { action: 'onSwitchForm', description: 'Cambia entre login y registro' },
    onCancel: { action: 'onCancel', description: 'Cierra el modal' }
  }
}

const Template = args => <AuthCard {...args} />

export const Login = Template.bind({})
Login.args = {
  activeForm: 'login',
  formData: { email: '', password: '' }
}

export const Register = Template.bind({})
Register.args = {
  activeForm: 'register',
  formData: { username: '', email: '', password: '' }
}
