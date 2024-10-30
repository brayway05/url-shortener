import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    proxy: {
      // regular expression to route the requests to the express server
      '^/[a-zA-Z0-9]+$': 'http://localhost:3000',
    },
  },
})
