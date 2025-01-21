/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    '../src/stories/**/*.stories.@(js|jsx|ts|tsx)',
    '../src/stories/**/*.mdx',
  ],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-actions',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: true,
  },
}
export default config
