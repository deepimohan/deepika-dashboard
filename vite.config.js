import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/deepika-dashboard/"   // 👈 IMPORTANT (your repo name)
})