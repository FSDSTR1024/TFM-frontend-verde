import Logo from './Logo'

export default {
  title: 'Atoms/Logo',
  component: Logo,
  args: {
    variant: 'primary',
    size: 'small',
    className: '',
  },
}

const Template = (args) => <Logo {...args} />

export const Default = Template.bind({})

export const Primary = Template.bind({})
Primary.args = {
  variant: 'primary',
  size: 'small',
  className: 'logo-small',
}

export const Secondary = Template.bind({})
Secondary.args = {
  variant: 'secondary',
  size: 'small',
  className: 'logo-medium',
}

export const Tertiary = Template.bind({})
Tertiary.args = {
  variant: 'tertiary',
  size: 'small',
  className: 'logo-large',
}
