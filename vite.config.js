// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // 💥 이 부분을 추가합니다. 💥
  server: {
    // ngrok를 포함한 모든 외부 호스트 접근을 허용합니다.
      allowedHosts: ['https://20014c79adfe.ngrok-free.app'], // 👈 이 부분을 사용자가 보낸 에러 주소로 변경, 
  }
  // -------------------------
});