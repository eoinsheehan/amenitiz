import { defineConfig } from 'vite'
import ViteRails from 'vite-plugin-rails'

export default defineConfig({
  build: { sourcemap: false },
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