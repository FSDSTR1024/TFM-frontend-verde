import NavLinks from '@components/molecules/NavLinks'
import React from 'react'

export default {
  title: 'Molecules/NavLinks',
  component: NavLinks,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    buttonType: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary'],
    },
  },
  args: {
    links: [
      { id: '1', label: 'Inicio' },
      { id: '2', label: 'Blog' },
      { id: '3', label: 'Contacto' },
    ],
  },
}

const Template = (args) => <NavLinks {...args} />

export const Default = Template.bind({})
