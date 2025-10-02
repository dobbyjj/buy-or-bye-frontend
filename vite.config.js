// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    allowedHosts: ['https://20014c79adfe.ngrok-free.app'],
  },
  build: {
    outDir: 'dist', // 👈 'build'에서 다시 'dist'로 변경합니다.
    assetsDir: 'assets',
  }
});