/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    '../src/**/*.stories.@(js|jsx|ts|tsx)' // Ruta correcta para tus stories
  ],
  addons: [
    '@storybook/addon-links', // Enlaces entre stories
    '@storybook/addon-essentials', // Addons esenciales (docs, controls, etc.)
    '@storybook/addon-actions', // Registro de acciones (opcional)
    '@storybook/addon-interactions', // Pruebas interactivas
    '@chromatic-com/storybook' // Integración con Chromatic
  ],
  framework: {
    name: '@storybook/react-vite', // Usa Vite como bundler
    options: {}
  },
  docs: {
    autodocs: 'tag' // Genera documentación automática
  },
  core: {
    disableTelemetry: true // Desactiva la telemetría (opcional)
  }
}

export default config
