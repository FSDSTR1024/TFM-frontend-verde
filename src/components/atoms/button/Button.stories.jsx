import Button from './Button'

export default {
  title: 'Components/Atoms/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Estilo visual del botón'
    },
    htmlType: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Tipo HTML nativo del botón'
    },
    ariaLabel: {
      control: 'text',
      description: 'Etiqueta ARIA obligatoria para accesibilidad',
      type: { required: true }
    },
    disabled: {
      control: 'boolean',
      description: 'Estado deshabilitado del botón'
    },
    children: {
      control: 'text',
      description: 'Contenido del botón'
    }
  },
  parameters: {
    docs: {
      description: {
        component:
          'Componente de botón personalizable con múltiples variantes y soporte completo de accesibilidad'
      }
    }
  }
}

// Template base reutilizable
const Template = args => <Button {...args} />

// Story Primaria
export const Primary = Template.bind({})
Primary.args = {
  variant: 'primary',
  htmlType: 'button',
  ariaLabel: 'Botón principal de ejemplo',
  children: 'Botón Primario'
}
Primary.parameters = {
  docs: {
    description: {
      story:
        'Variante principal para acciones primarias. Usar en casos donde se necesita destacar la acción más importante.'
    }
  }
}

// Story Secundaria
export const Secondary = Template.bind({})
Secondary.args = {
  ...Primary.args,
  variant: 'secondary',
  children: 'Botón Secundario',
  ariaLabel: 'Botón secundario de ejemplo'
}
Secondary.parameters = {
  docs: {
    description: {
      story:
        'Variante secundaria para acciones de menor prioridad. Ideal para acciones complementarias.'
    }
  }
}

// Story Terciaria
export const Tertiary = Template.bind({})
Tertiary.args = {
  ...Primary.args,
  variant: 'tertiary',
  children: 'Botón Terciario',
  ariaLabel: 'Botón terciario de ejemplo'
}
Tertiary.parameters = {
  docs: {
    description: {
      story: 'Variante minimalista para acciones menos relevantes o en interfaces densas.'
    }
  }
}

// Story como Submit
export const AsSubmit = Template.bind({})
AsSubmit.args = {
  ...Primary.args,
  htmlType: 'submit',
  children: 'Enviar Formulario',
  ariaLabel: 'Enviar formulario de contacto'
}
AsSubmit.parameters = {
  docs: {
    description: {
      story: 'Ejemplo de uso como botón de submit para formularios. Cambia el tipo HTML a "submit".'
    }
  }
}

// Story Deshabilitado
export const Disabled = Template.bind({})
Disabled.args = {
  ...Primary.args,
  disabled: true,
  children: 'Botón Deshabilitado',
  ariaLabel: 'Botón deshabilitado de ejemplo'
}
Disabled.parameters = {
  docs: {
    description: {
      story:
        'Estado deshabilitado para acciones no disponibles temporalmente. Incluye estilos visuales diferenciados.'
    }
  }
}

// Story como Reset
export const AsReset = Template.bind({})
AsReset.args = {
  ...Primary.args,
  htmlType: 'reset',
  children: 'Restablecer',
  ariaLabel: 'Restablecer formulario'
}
AsReset.parameters = {
  docs: {
    description: {
      story: 'Ejemplo de uso como botón de reset para formularios. Cambia el tipo HTML a "reset".'
    }
  }
}
