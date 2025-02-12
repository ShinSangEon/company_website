import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // 원하는 포트 번호 설정 가능
    open: true, // 서버 실행 시 브라우저 자동 열기
  },
  css: {
    postcss: './postcss.config.js', // PostCSS 설정
  },
})
