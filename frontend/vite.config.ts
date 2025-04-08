import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
  resolve: {
    alias: {
      'svelte-toasts': 'svelte-toasts/src/index.js'
    }
  }
});
