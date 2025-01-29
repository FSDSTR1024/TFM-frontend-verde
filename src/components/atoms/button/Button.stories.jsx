import Button from "./Button"

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    type: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'nav', 'login']
    }
  }
}