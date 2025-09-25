// src/pages/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 1. 라우팅을 위한 useNavigate 임포트
import MobileLayout from '../components/layout/MobileLayout';

const HomePage = () => {
  const navigate = useNavigate(); // 👈 2. useNavigate 훅 사용

  // '테스트 시작하기' 버튼 클릭 시 실행될 함수
  const handleStartTest = () => {
    // 3. /quiz 경로로 페이지 이동
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
      ">
        
        {/* 타이틀 */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:text-4xl">
          나만의 모바일 테스트
        </h1>

        {/* 설명 */}
        <p className="text-base text-gray-600 mb-8 max-w-sm">
          모바일 환경에 최적화된 화면입니다. 지금 바로 시작해 보세요!
        </p>

        {/* 시작 버튼: onClick 핸들러 연결 */}
        <button
          onClick={handleStartTest} // 👈 4. 함수 연결
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
          "
        >
          테스트 시작하기
        </button>
      </div>
    </MobileLayout>
  );
};

export default HomePage;