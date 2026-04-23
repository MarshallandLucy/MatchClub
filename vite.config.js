import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages friendly:
// - HashRouter handles route refresh fallback
// - relative base avoids hard-coded deployment paths
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    host: '::',
    port: 8080,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
