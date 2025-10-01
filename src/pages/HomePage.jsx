// src/pages/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';

const HomePage = () => {
  const navigate = useNavigate(); 
  const handleStartTest = () => {
    navigate('/quiz'); 
  };

  return (
    <MobileLayout>
      <div className="
        flex 
        flex-col 
        items-center 
        justify-center 
        min-h-[80vh] 
        text-center
        lg:min-h-fit        {/* 웹에서는 높이 제한 해제 */}
        lg:py-20           {/* 웹에서 상하 여백 추가 */}
      ">
        
        {/* 타이틀: 모바일 3xl -> md: 4xl -> lg: 5xl로 확장 */}
        <h1 className="
          text-3xl font-bold text-gray-800 mb-4 
          md:text-4xl 
          lg:text-5xl 
          lg:mb-6
        ">
          나만의 모바일 테스트
        </h1>

        {/* 설명: 폰트 크기 및 여백 조정 */}
        <p className="
          text-base text-gray-600 mb-8 max-w-sm 
          lg:text-lg 
          lg:mb-10 
          lg:max-w-md
        ">
          모바일 환경에 최적화된 화면입니다. 지금 바로 시작해 보세요!
        </p>

        {/* 시작 버튼: 너비와 패딩 조정 */}
        <button
          onClick={handleStartTest}
          className="
            w-full 
            max-w-xs 
            py-4 
            text-lg 
            font-semibold 
            text-white 
            bg-indigo-600 
            rounded-lg 
            shadow-md 
            hover:bg-indigo-700 
            transition duration-300
            lg:py-5             {/* 웹에서 버튼 높이 키우기 */}
            lg:text-xl           {/* 웹에서 버튼 폰트 키우기 */}
          "
        >
          테스트 시작하기
        </button>
      </div>
    </MobileLayout>
  );
};

export default HomePage;