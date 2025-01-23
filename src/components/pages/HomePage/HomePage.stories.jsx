import HomePage from '@components/pages/HomePage'
import React from 'react'

export default {
  title: 'Pages/HomePage',
  component: HomePage,
  parameters: {
    layout: 'fullscreen',
  },
}

const Template = (args) => <HomePage {...args} />

export const Default = Template.bind({})
