import Button from './Button'

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    type: {
      control: { type: 'select', options: ['primary', 'secondary', 'tertiary'] }
    },
    ariaLabel: { control: 'text' },
    disabled: { control: 'boolean' },
    className: { control: 'text' },
    children: { control: 'text' },
    onClick: { action: 'clicked' }
  }
}

const Template = args => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  type: 'primary',
  children: 'Primary Button',
  ariaLabel: 'Primary button',
  disabled: false
}

export const Secondary = Template.bind({})
Secondary.args = {
  type: 'secondary',
  children: 'Secondary Button',
  ariaLabel: 'Secondary button',
  disabled: false
}

export const Tertiary = Template.bind({})
Tertiary.args = {
  type: 'tertiary',
  children: 'Tertiary Button',
  ariaLabel: 'Tertiary button',
  disabled: false
}

export const Nav = Template.bind({})
Nav.args = {
  type: 'nav',
  children: 'Nav Button',
  ariaLabel: 'Navigation button',
  disabled: false
}

export const Login = Template.bind({})
Login.args = {
  type: 'login',
  children: 'Login Button',
  ariaLabel: 'Login button',
  disabled: false
}

export const Disabled = Template.bind({})
Disabled.args = {
  type: 'primary',
  children: 'Disabled Button',
  ariaLabel: 'Disabled button',
  disabled: true
}
