import Button from '@components/atoms/Button'
import React from 'react'

export default {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
    },
    onClick: { action: 'clicked' },
  },
  args: {
    children: 'Texto del botón',
  },
}

const Template = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  type: 'primary',
}

export const Secondary = Template.bind({})
Secondary.args = {
  type: 'secondary',
}

export const Tertiary = Template.bind({})
Tertiary.args = {
  type: 'tertiary',
}
