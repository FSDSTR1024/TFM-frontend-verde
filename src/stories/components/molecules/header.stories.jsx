import Header from './Header'

export default {
  title: 'Molecules/Header',
  component: Header,
  args: {
    className: '',
  },
}

export const Default = (args) => <Header {...args} />
