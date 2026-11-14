// Vite build/dev-server settings.
// The React plugin lets Vite understand JSX files.
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
})
