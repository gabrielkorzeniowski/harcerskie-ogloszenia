import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // jeśli będziesz hostować w repozytorium z nazwą np. username.github.io -> usuń base
  // jeśli host na GitHub Pages jako repozytorium project (np. /harcerskie-ogloszenia/), ustaw base: '/harcerskie-ogloszenia/'
  base: '/'
})
