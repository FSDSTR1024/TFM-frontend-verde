import Header from './Header'

export default {
  title: 'Molecules/Header',
  component: Header,
  args: {
    className: '', // Clase adicional para personalizar el estilo
  },
}

export const Default = (args) => <Header {...args} />
