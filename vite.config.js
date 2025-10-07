// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// 👇 중괄호 {} 없이 이름을 설정하여 가져옵니다. (default import)
import vitePluginSitemap from 'vite-plugin-sitemap'; 

export default defineConfig({
  plugins: [
    react(),
    // 👇 플러그인을 실행할 때도 이름을 변경하여 사용합니다.
    vitePluginSitemap({
      hostname: 'https://buyorbye.co.kr/', 
      routes: [ 
        '/',
        '/quiz',
        '/dashboard',
        '/ledger',
        '/chatbot',
        '/mypage',
      ],
    }),
  ],
  // ... (나머지 설정 유지)
  base: '/',
  server: {
    allowedHosts: ['https://20014c79adfe.ngrok-free.app'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});