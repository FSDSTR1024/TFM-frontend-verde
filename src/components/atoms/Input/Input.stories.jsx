import Input, { EmailInput, PasswordInput } from '@components/atoms/Input'

export default {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#213435' }
      ]
    }
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password'],
      description: 'Tipo de campo de entrada'
    },
    label: {
      control: 'text',
      description: 'Etiqueta del campo'
    },
    name: {
      control: 'text',
      description: 'Nombre del campo'
    },
    validation: {
      control: false,
      description: 'Función de validación personalizada'
    },
    onChange: {
      action: 'onChange',
      description: 'Callback para manejar cambios en el valor'
    }
  }
}

export const DefaultInput = args => (
  <div style={{ padding: '2rem', maxWidth: '400px' }}>
    <Input {...args} />
  </div>
)

DefaultInput.args = {
  type: 'text',
  label: 'Campo de texto',
  name: 'text-input'
}

DefaultInput.parameters = {
  docs: {
    description: {
      component:
        '**Componente de entrada de texto genérico**\n\n- Tipo: `text`\n- Campo estándar sin validación'
    }
  }
}

export const EmailField = args => (
  <div style={{ padding: '2rem', maxWidth: '400px' }}>
    <EmailInput {...args} />
  </div>
)

EmailField.args = {
  label: 'Correo electrónico',
  name: 'email-input'
}

EmailField.parameters = {
  docs: {
    description: {
      component:
        '**Componente de entrada para correos electrónicos**\n\n- Incluye validación para formato de email'
    }
  }
}

export const PasswordField = args => (
  <div style={{ padding: '2rem', maxWidth: '400px' }}>
    <PasswordInput {...args} />
  </div>
)

PasswordField.args = {
  label: 'Contraseña',
  name: 'password-input'
}

PasswordField.parameters = {
  docs: {
    description: {
      component:
        '**Componente de entrada para contraseñas**\n\n- Incluye validación para contraseñas seguras (mayúscula, número, y mínimo 8 caracteres)'
    }
  }
}

export const ValidationExample = args => {
  const customValidation = value => ({
    isValid: value.length >= 5,
    message: 'El valor debe tener al menos 5 caracteres'
  })

  return (
    <div style={{ padding: '2rem', maxWidth: '400px' }}>
      <Input {...args} validation={customValidation} />
    </div>
  )
}

ValidationExample.args = {
  type: 'text',
  label: 'Campo con validación',
  name: 'validation-input'
}

ValidationExample.parameters = {
  docs: {
    description: {
      component:
        '**Ejemplo de campo con validación personalizada**\n\n- Valida que el valor tenga al menos 5 caracteres'
    }
  }
}
