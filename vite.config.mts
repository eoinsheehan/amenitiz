import { defineConfig } from 'vite'
import ViteRails from 'vite-plugin-rails'

export default defineConfig({
  build: { sourcemap: false },
  plugins: [
    ViteRails(),
  ],
})