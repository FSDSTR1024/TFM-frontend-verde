// src/stories/QuickGuide.stories.jsx
import Header from '@/components/organisms/Header'
import Button from '@components/atoms/Button'
import ButtonSend from '@components/atoms/ButtonSend/ButtonSend'
import Logo from '@components/atoms/Logo'
import Navbar from '@components/organisms/Navbar'
import { userEvent, within } from '@storybook/testing-library'
// Importa el componente Input
import Input from '@components/atoms/Input'

export default {
  title: 'Guía Rápida',
  parameters: {
    layout: 'centered',
    viewport: {
      defaultViewport: 'responsive'
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#213435' }
      ]
    }
  }
}

// ========= COMPONENTES BASE ========= //
export const Botones = args => (
  <div
    style={{
      display: 'flex',
      gap: '1rem',
      padding: '2rem',
      borderBottom: '1px solid #eee'
    }}
  >
    <Button {...args} />
    <Button type='secondary'>Secundario</Button>
    <Button disabled>Deshabilitado</Button>
  </div>
)

Botones.args = {
  children: 'Primario Personalizable',
  type: 'primary'
}

Botones.argTypes = {
  type: {
    control: { type: 'select' },
    options: ['primary', 'secondary', 'nav']
  },
  children: {
    control: 'text'
  }
}

Botones.parameters = {
  docs: {
    description: {
      component:
        '**Componente atómico reutilizable**\n\n- Usar `type="primary"` para acciones principales\n- `disabled=true` para estados inactivos\n- Requiere `aria-label` para accesibilidad'
    }
  }
}

// ========= LOGOTIPO CON CONTEXTOS ========= //
export const Logotipo = () => (
  <div style={{ padding: '2rem' }}>
    <Logo />
  </div>
)

Logotipo.parameters = {
  docs: {
    description:
      '**Elemento de marca principal**\n\n- Animación suave al hacer hover\n- Tamaño responsive automático\n- Ratio fijo 3.87:1 (118x30.5px)'
  },
  backgrounds: {
    values: [
      { name: 'light', value: '#ffffff' },
      { name: 'dark', value: '#213435' }
    ]
  }
}

// ========= COMPONENTES COMPUESTOS ========= //
export const HeaderCompleto = () => (
  <div style={{ width: '100%', maxWidth: '1200px', padding: '2rem' }}>
    <Header />
  </div>
)

HeaderCompleto.parameters = {
  viewport: {
    defaultViewport: 'iphone12',
    viewports: {
      iphone12: {
        name: 'iPhone 12',
        styles: { width: '390px', height: '844px' }
      }
    }
  },
  docs: {
    source: {
      code: '<Header />',
      language: 'jsx'
    }
  }
}

export const NavbarEnContexto = () => (
  <div style={{ width: '100%', background: '#f5f5f5', padding: '2rem' }}>
    <Navbar />
  </div>
)

NavbarEnContexto.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  await userEvent.click(canvas.getByRole('button', { name: /menú/i }))
}

NavbarEnContexto.parameters = {
  chromatic: { disable: false },
  controls: {
    expanded: true
  }
}

// ========= HISTORIA ACTUALIZADA PARA BUTTONSEND ========= //
export const BotonesSend = args => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      padding: '2rem',
      borderBottom: '1px solid #eee'
    }}
  >
    <ButtonSend {...args} />
    <ButtonSend variant='secondary'>Secundario</ButtonSend>
    <ButtonSend variant='tertiary'>Terciario</ButtonSend> {/* Cambiado text -> tertiary */}
    <ButtonSend variant='nav'>Navegación</ButtonSend> {/* Nueva variante */}
    <ButtonSend isLoading>Cargando...</ButtonSend>
    <ButtonSend disabled>Deshabilitado</ButtonSend>
    <ButtonSend ariaLabel='Acción secreta' onClick={() => console.log('Acción ejecutada')}>
      Con Click Handler
    </ButtonSend>
  </div>
)

BotonesSend.args = {
  children: 'Enviar Formulario',
  variant: 'primary'
}

BotonesSend.argTypes = {
  variant: {
    control: { type: 'select' },
    options: ['primary', 'secondary', 'tertiary', 'nav'], // Opciones actualizadas
    description: 'Variante visual del botón (primary/secondary/tertiary/nav)'
  },
  isLoading: {
    control: 'boolean',
    description: 'Estado de carga'
  },
  disabled: {
    control: 'boolean',
    description: 'Estado deshabilitado'
  },
  ariaLabel: {
    control: 'text',
    description: 'Etiqueta ARIA para accesibilidad'
  }
}

BotonesSend.parameters = {
  docs: {
    description: {
      component:
        '**Componente de acción avanzado**\n\n- Variantes: primary/secondary/tertiary/nav\n- Estados: loading/disabled\n- Accesibilidad AAA (WCAG 2.1)\n- Integración con sistema de diseño mediante CSS Modules' // Variantes actualizadas
    }
  }
}

// ========= NUEVA HISTORIA PARA INPUT ========= //
export const InputComponent = args => (
  <div style={{ padding: '2rem', width: '300px' }}>
    <Input {...args} />
  </div>
)

InputComponent.args = {
  label: 'Correo electrónico',
  name: 'email',
  type: 'email'
}

InputComponent.argTypes = {
  label: {
    control: 'text',
    description: 'Etiqueta del campo de entrada'
  },
  name: {
    control: 'text',
    description: 'Nombre del campo de entrada'
  },
  type: {
    control: { type: 'select' },
    options: ['text', 'email', 'password'],
    description: 'Tipo de campo de entrada'
  }
}

InputComponent.parameters = {
  docs: {
    description: {
      component:
        '**Componente de entrada de texto**\n\n- Soporta tipos: text, email, password\n- Validación integrada\n- Etiqueta flotante'
    }
  }
}
