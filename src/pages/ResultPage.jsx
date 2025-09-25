// src/pages/ResultPage.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import { mbtiResultData } from '../data/resultData'; 

// ----------------------------------------------------
// 핵심 로직: MBTI 계산 함수 (유지)
// ----------------------------------------------------
const calculateMbti = (answers) => {
  const counts = answers.reduce((acc, type) => {
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const char1 = counts['E'] > counts['I'] ? 'E' : 'I';
  const char2 = counts['S'] > counts['N'] ? 'S' : 'N';
  const char3 = counts['T'] > counts['F'] ? 'T' : 'F';
  const char4 = counts['J'] > counts['P'] ? 'J' : 'P';

  return `${char1}${char2}${char3}${char4}`;
};
// ----------------------------------------------------


const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const finalAnswers = location.state?.finalAnswers;

  // 답변 데이터가 없으면 홈으로 리다이렉트
  if (!finalAnswers || finalAnswers.length === 0) {
    navigate('/');
    return null;
  }

  // MBTI 코드 계산 및 결과 데이터 조회
  const mbtiCode = calculateMbti(finalAnswers);
  const result = mbtiResultData[mbtiCode];

  // 재무 분석 페이지로 이동하는 핸들러
  const handleProceedToAnalysis = () => {
    // '/analysis' 경로로 이동
    navigate('/analysis'); 
  };
  
  // 데이터 오류 처리 
  if (!result) {
    return (
      <MobileLayout>
        <div className="text-center py-20 text-red-500">
          오류: 결과를 찾을 수 없습니다. (코드: {mbtiCode})
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      {/* 컨텐츠 영역: 하단 고정 버튼 공간 확보를 위해 pb-24 패딩 적용 */}
      <div className="flex flex-col items-center p-6 bg-white min-h-screen pb-24"> 
        
        {/* 결과 타이틀 및 MBTI 코드 */}
        <h1 className="text-3xl font-extrabold text-indigo-600 mt-4 mb-2">
          나의 소비 성향 MBTI는?
        </h1>
        <p className="text-gray-500 mb-8">당신의 성향을 분석한 결과입니다.</p>

        {/* MBTI 코드 박스 */}
        <div className="bg-indigo-500 text-white text-7xl font-black p-8 rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300 mb-8">
          {result.type}
        </div>

        {/* 결과 상세 내용 박스 */}
        <div className="w-full max-w-sm text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            💸 {result.title}
          </h2>
          <div className="p-6 bg-indigo-50 border-2 border-indigo-200 rounded-xl shadow-md">
            <p className="text-gray-700 text-lg leading-relaxed">
              {result.description}
            </p>
          </div>
        </div>
        
        {/* 테스트 다시 하기 버튼 (보조 버튼) */}
        <button 
          onClick={() => navigate('/quiz')} 
          className="mt-6 text-sm text-gray-500 hover:text-indigo-600 transition"
        >
          테스트 다시 하기
        </button>

      </div>
      
      {/* 💥💥 하단 고정 액션 버튼: 재무 분석 이어하기 💥💥 */}
      <div className="fixed bottom-0 left-0 right-0 z-20 p-4 bg-white border-t border-gray-200 
                    md:max-w-2xl md:mx-auto md:shadow-2xl">
          <button
              onClick={handleProceedToAnalysis} // /analysis 경로로 이동
              className="w-full py-4 text-xl font-bold text-white bg-indigo-600 rounded-xl 
                         shadow-lg hover:bg-indigo-700 transition duration-300"
          >
              재무 분석 이어하기
          </button>
      </div>
    </MobileLayout>
  );
};

export default ResultPage;