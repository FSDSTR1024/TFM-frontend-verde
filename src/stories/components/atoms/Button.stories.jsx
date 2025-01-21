import React from 'react'
import Button from './Button'

export default {
  title: 'Atoms/Button',
  component: Button,
  args: {
    children: 'Button',
  },
}

const Template = (args) => <Button {...args} />

export const Default = Template.bind({})

export const Primary = Template.bind({})
Primary.args = {
  children: 'Cartera Fría',
  className: 'button--primary',
}

export const Secondary = Template.bind({})
Secondary.args = {
  children: 'Cartera Caliente',
  className: 'button--secondary',
}

export const tertiary = Template.bind({})
tertiary.args = {
  children: 'Mercados',
  className: 'button--tertiary',
}
