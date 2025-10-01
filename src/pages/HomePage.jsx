// src/pages/HomePage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import buyOrByeImage from '../assets/buy_or_bye.png'; // 이미지 경로

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
        justify-start         
        min-h-screen 
        text-center
        bg-conic-gradient from-indigo-50 via-white to-sky-50 
        p-6 
        -mx-4 -my-6         
        lg:min-h-fit
        lg:py-20 
      ">
        
        {/* 이미지 컨테이너: 여백 조정 */}
        <div className="
            mt-12 md:mt-16 lg:mt-20     
            mb-6                   
            p-0                   
            flex justify-center 
            items-center
        ">
          <img 
            src={buyOrByeImage} 
            alt="Buy or Bye Choice" 
            className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 object-contain" 
          />
        </div>

        {/* 메인 타이틀: 글꼴 두께 강조, 색상은 인디고 유지 */}
        <h1 className="
          text-3xl font-extrabold text-indigo-700 mb-2 /* 기존 인디고 색상 유지, 두께 강조 */
          md:text-4xl 
          lg:text-5xl 
        ">
          소비 성향 MBTI 테스트
        </h1>

        {/* 서브 타이틀/설명: 글꼴 크기 조정, 문구 간결화 */}
        <p className="
          text-lg font-bold text-gray-700 mb-12 max-w-sm  /* 텍스트 크기 약간 줄여 간결하게 */
          lg:text-xl 
          lg:mb-14 
        ">
          내 돈 관리 유형은? 머니톡과 함께! 💸
        </p>

        {/* 시작 버튼: 밝은 하늘색으로 변경, 그림자 강조 */}
        <button
          onClick={handleStartTest}
          className="
            w-full 
            max-w-xs 
            py-4 
            text-lg 
            font-bold 
            text-white 
            bg-sky-400             /* 밝은 하늘색 (sky-400) */
            rounded-xl 
            shadow-lg              /* 그림자 강조 */
            hover:bg-sky-500       
            active:bg-sky-600      
            transition duration-300
            transform hover:scale-105
            lg:py-5 
            lg:text-xl 
          "
        >
          돈BTI 시작하기
        </button>
        
        {/* Made with 문구: 기존 Flex AI 유지 */}
        <div className="mt-8 text-sm text-gray-400">
            made with Flex AI
        </div>
      </div>
    </MobileLayout>
  );
};

export default HomePage;