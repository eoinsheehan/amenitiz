import { defineConfig } from 'vite'
import ViteRails from 'vite-plugin-rails'
import * as path from 'path'

export default defineConfig({
  build: { sourcemap: false },
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
    }
  },
  plugins: [
    ViteRails(),
  ],
  test: {
    include: ['**/*.{test,spec}.{js,ts,jsx,tsx}'],
    environment: 'jsdom',
    globals: true,
    setupFiles: './javascript/setupTests.js',
  },
})