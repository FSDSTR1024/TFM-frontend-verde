import NavLinks from './NavLinks'

export default {
  title: 'Molecules/NavLinks',
  component: NavLinks,
  args: {
    links: [{ label: 'Home' }, { label: 'About' }, { label: 'Contact' }],
    buttonType: 'tertiary', // Por defecto, estilo de botón
  },
}

const Template = (args) => <NavLinks {...args} />
