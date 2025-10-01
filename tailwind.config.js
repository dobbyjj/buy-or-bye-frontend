// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <--- 이 경로를 꼭 추가해야 합니다.
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}