// src/components/layout/MobileLayout.jsx
import React from 'react';

const MobileLayout = ({ children }) => {
  return (
    // p-4 (모든 화면에서 패딩 4)
    // w-full (너비 100%), min-h-screen (최소 높이 화면 전체)
    // md:max-w-xl (768px 이상에서 최대 너비 제한)
    // md:mx-auto (768px 이상에서 중앙 정렬)
    // md:shadow-xl (768px 이상에서 그림자 추가)
    <div className="
      p-4 
      w-full 
      min-h-screen 
      bg-white 
      md:max-w-xl 
      md:mx-auto 
      md:shadow-xl
    ">
      {children}
    </div>
  );
};

export default MobileLayout;