// src/stories/QuickGuide.stories.jsx
import Button from '@components/atoms/Button'
import Logo from '@components/atoms/Logo'
import Header from '@components/molecules/Header'
import Navbar from '@components/organisms/Navbar'
import React from 'react'

export default {
  title: 'Guía Rápida',
  parameters: {
    layout: 'centered',
    // ======= EXTRAS PROFESIONALES ======= //
    viewport: {
      // Addon para probar responsive
      defaultViewport: 'responsive',
    },
    backgrounds: {
      // Addon para fondos
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#213435' },
      ],
    },
  },
}

// ========= COMPONENTES BASE ========= //
export const Botones = (args) => (
  <div
    style={{
      display: 'flex',
      gap: '1rem',
      padding: '2rem',
      borderBottom: '1px solid #eee',
    }}
  >
    <Button {...args} />
    <Button type="secondary">Secundario</Button>
    <Button disabled>Deshabilitado</Button>
  </div>
)

// Configuración interactiva para botones
Botones.args = {
  children: 'Primario Personalizable',
  type: 'primary',
}

Botones.argTypes = {
  type: {
    control: { type: 'select' },
    options: ['primary', 'secondary', 'nav'],
  },
  children: {
    control: 'text',
  },
}

Botones.parameters = {
  docs: {
    description: {
      // Nota técnica
      component:
        '**Componente atómico reutilizable**\n\n- Usar `type="primary"` para acciones principales\n- `disabled=true` para estados inactivos\n- Requiere `aria-label` para accesibilidad',
    },
  },
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
      '**Elemento de marca principal**\n\n- Animación suave al hacer hover\n- Tamaño responsive automático\n- Ratio fijo 3.87:1 (118x30.5px)',
  },
  backgrounds: {
    // Prueba en diferentes fondos
    values: [
      { name: 'light', value: '#ffffff' },
      { name: 'dark', value: '#213435' },
    ],
  },
}

// ========= COMPONENTES COMPUESTOS ========= //
export const HeaderCompleto = () => (
  <div style={{ width: '100%', maxWidth: '1200px', padding: '2rem' }}>
    <Header />
  </div>
)

HeaderCompleto.parameters = {
  viewport: {
    // Prueba responsive avanzada
    defaultViewport: 'iphone12',
    viewports: {
      iphone12: {
        name: 'iPhone 12',
        styles: { width: '390px', height: '844px' },
      },
    },
  },
  docs: {
    source: {
      // Muestra código de implementación
      code: '<Header />',
      language: 'jsx',
    },
  },
}

export const NavbarEnContexto = () => (
  <div style={{ width: '100%', background: '#f5f5f5', padding: '2rem' }}>
    <Navbar />
  </div>
)

// ========= EXTRAS AVANZADOS ========= //
NavbarEnContexto.play = async ({ canvasElement }) => {
  // Simulación de interacción
  const canvas = within(canvasElement)
  await userEvent.click(canvas.getByRole('button', { name: /menú/i }))
}

NavbarEnContexto.parameters = {
  chromatic: { disable: false }, // Habilita test visual
  controls: {
    expanded: true, // Muestra todos los controles
  },
}
