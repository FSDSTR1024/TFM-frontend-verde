import Navbar from '@components/organisms/Navbar'
import React from 'react'

export default {
  title: 'Organisms/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
}

const Template = (args) => <Navbar {...args} />

export const Default = Template.bind({})
Default.args = {
  className: 'shadow-sm',
}
