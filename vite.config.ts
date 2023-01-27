/// <reference types="vitest" />
import {visualizer} from 'rollup-plugin-visualizer'
import {defineConfig} from 'vite'

export default defineConfig({
  plugins: [visualizer()],
  build: {
    lib: {
      name: 'orchy-menu-plugin',
      entry: {
        'orchy-menu-plugin': 'src/orchy-menu-plugin.ts',
      },
      formats: ['es']
    },
  },
  test: {
    environment: 'happy-dom',
    mockReset: true,
    coverage: {
      enabled: true
    }
  }
})