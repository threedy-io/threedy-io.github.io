import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/threedy-io.github.io/', // Replace with repo name
  plugins: [svelte()],
})
