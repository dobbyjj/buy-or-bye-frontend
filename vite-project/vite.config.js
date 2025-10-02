import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // 이 부분을 추가합니다.
  server: {
    allowedHosts: ['https://20014c79adfe.ngrok-free.app'],
  }
});