import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/** GitHub project Pages use a subpath; set `VITE_BASE_URL` in CI (e.g. `/repo-name/`). */
function appBase(): string {
  const raw = process.env.VITE_BASE_URL?.trim()
  if (raw && raw !== '') {
    return raw.endsWith('/') ? raw : `${raw}/`
  }
  return '/'
}

export default defineConfig({
  base: appBase(),
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
