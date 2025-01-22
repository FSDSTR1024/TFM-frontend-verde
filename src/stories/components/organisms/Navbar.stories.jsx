import Navbar from './Navbar'

export default {
  title: 'Organisms/Navbar',
  component: Navbar,
  args: {
    links: [{ label: 'Home' }, { label: 'Blog' }, { label: 'Contact' }],
    className: '',
  },
}

const Template = (args) => <Navbar {...args} />

// Exporta una historia por defecto
export const Default = Template.bind({})
Default.args = {
  links: [{ label: 'Inicio' }, { label: 'Acerca de' }, { label: 'Contacto' }],
}
