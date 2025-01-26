import HomePage from '@components/pages/HomePage'

export default {
  title: 'Pages/HomePage',
  component: HomePage,
  parameters: {
    layout: 'fullscreen'
  }
}

const Template = args => <HomePage {...args} />

export const Default = Template.bind({})
