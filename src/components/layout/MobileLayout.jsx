// src/components/layout/MobileLayout.jsx
import React from 'react';

const MobileLayout = ({ children }) => {
  return (
    // 모바일 기본 스타일: p-4, w-full, min-h-screen, bg-white
    // md: (768px 이상) 에서 적용할 스타일: max-w-xl (640px), mx-auto, shadow-xl
    // lg: (1024px 이상) 에서 추가로 적용할 스타일: max-w-3xl (768px) 또는 4xl (1024px)
    <div className="
      p-4 
      w-full 
      min-h-screen 
      bg-white 
      md:max-w-2xl       {/* 태블릿에서 최대 너비 48rem (768px) */}
      md:mx-auto 
      md:shadow-xl
      lg:max-w-3xl       {/* 데스크톱에서 최대 너비 56rem (896px)로 확장 */}
      lg:min-h-0         {/* 웹에서는 뷰포트 높이 제한 해제 */}
      lg:mt-10           {/* 웹에서는 상단 여백 추가 */}
      lg:rounded-xl      {/* 웹에서 둥근 모서리 추가 */}
    ">
      {children}
    </div>
  );
};

export default MobileLayout;