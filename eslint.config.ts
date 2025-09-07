import { defineConfig } from '@nelsonlaidev/eslint-config'

export default defineConfig({
  tailwindEntryPoint: './src/styles/globals.css',
  overrides: {
    react: {
      '@eslint-react/dom/no-unknown-property': ['error', { ignore: ['tw'] }]
    },
    tailwindcss: {
      'better-tailwindcss/no-unregistered-classes': ['error', { ignore: ['toaster'] }]
    }
  }
})
