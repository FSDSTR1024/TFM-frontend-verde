import Logo from '@components/atoms/Logo'
import React from 'react'

export default {
  title: 'Atoms/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
}

const Template = (args) => <Logo {...args} />

export const Default = Template.bind({})
Default.args = {
  variant: 'primary',
  size: 'medium',
}
