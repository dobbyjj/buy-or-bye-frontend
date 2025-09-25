// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 💥💥 이 부분을 추가합니다. 💥💥
      // 인라인 스타일 대신 Tailwind 유틸리티를 사용하기 위해 backgroundImage 확장
      backgroundImage: {
        'conic-gradient': 'conic-gradient(var(--tw-gradient-stops))',
      },
      // -------------------------
    },
  },
  // plugins 배열은 비워둡니다.
  plugins: [],
}