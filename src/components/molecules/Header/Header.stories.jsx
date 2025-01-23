import Header from '@components/molecules/Header'
import React from 'react'

export default {
  title: 'Molecules/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'light',
      values: [{ name: 'light', value: '#ffffff' }],
    },
  },
}

const Template = (args) => <Header {...args} />

export const Default = Template.bind({})
