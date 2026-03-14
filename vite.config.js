import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Janery/', // nombre del repo para GitHub Pages
  plugins: [react()],
})
