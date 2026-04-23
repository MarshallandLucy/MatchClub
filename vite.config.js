import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isProd = process.env.NODE_ENV === 'production';
const repoBase = process.env.VITE_BASE_PATH || '/MatchClub/';

// GitHub Pages friendly:
// - production uses /<repo>/ base path
// - local dev keeps root path
export default defineConfig({
  plugins: [react()],
  base: isProd ? repoBase : '/',
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
