import ButtonCancel from './ButtonCancel'

export default {
  title: 'atoms/ButtonCancel',
  component: ButtonCancel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Botón especializado para la cancelación de acciones' // Descripción general
      }
    }
  },
  argTypes: {
    children: {
      control: 'text',
      descripció: 'Texto visible del botón'
    }
  }
}

const Template = args => <ButtonCancel {...args} />
export const Default = Template.bind({})
Default.args = {
  children: 'Cancelar',
  ariaLabel: 'Cancelar'
}
