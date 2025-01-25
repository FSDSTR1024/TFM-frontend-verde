// Input.stories.jsx
import React from 'react'
import { EmailInput } from './Input'

export default {
  title: 'Atoms/Inputs',
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'label', enabled: false }],
      },
    },
  },
}

const Template = (args) => <EmailInput {...args} />

export const Email = Template.bind({})
Email.args = {
  label: 'Correo electrónico',
  name: 'email',
}

export const Password = Template.bind({})
Password.args = {
  label: 'Contraseña',
  name: 'password',
}

export const ErrorState = () => (
  <EmailInput
    label="Email con error"
    name="email-error"
    value="invalid-email"
  />
)
