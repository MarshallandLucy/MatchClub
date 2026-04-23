import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isProd = process.env.NODE_ENV === 'production';
const base = process.env.VITE_BASE_PATH || '/MatchClub/';

export default defineConfig({
  plugins: [react()],
  base: isProd ? base : '/',
});
