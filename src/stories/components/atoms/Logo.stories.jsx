import Logo from './Logo'

export default {
  title: 'Atoms/Logo',
  component: Logo,
  args: {
    variant: 'primary',
    size: 'predefined',
    className: '',
  },
}

const Template = (args) => <Logo {...args} />

export const Default = Template.bind({})
