import Dropdown from './Dropdown'

export default {
  title: 'Components/Dropdown', // Ruta en Storybook
  component: Dropdown, // Componente principal
  argTypes: {
    username: { control: 'text', description: 'Nombre del usuario' },
    userRole: {
      control: 'text',
      description: 'Rol del usuario (admin para mostrar el panel)'
    },
    onLogout: { action: 'clicked', description: 'Función de logout' }
  }
}

// Plantilla base para las historias
const Template = args => <Dropdown {...args} />

// Historia por defecto
export const Default = Template.bind({})
Default.args = {
  username: 'JohnDoe', // Usuario ejemplo
  userRole: '' // Sin rol específico
}

// Historia para un usuario administrador
export const Admin = Template.bind({})
Admin.args = {
  username: 'JaneAdmin',
  userRole: 'admin' // Usuario administrador
}

// Historia con interacción
export const Interactive = Template.bind({})
Interactive.args = {
  username: 'UserInteractive',
  userRole: '',
  onLogout: () => alert('Cierre de sesión exitoso') // Simula una acción de logout
}
