// src/pages/ResultPage.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import { mbtiResultData } from '../data/resultData';

// ----------------------------------------------------
// 1. 핵심 로직: MBTI 계산 함수
// ----------------------------------------------------
const calculateMbti = (answers) => {
  // E/I, S/N, T/F, J/P 각 지표의 득표수를 계산
  const counts = answers.reduce((acc, type) => {
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  // 질문은 총 20개 (각 지표별 5문항)
  // E vs I (5문항): E와 I 중 득표수가 많은 쪽을 선택
  const char1 = counts['E'] > counts['I'] ? 'E' : 'I';
  
  // S vs N (5문항): S와 N 중 득표수가 많은 쪽을 선택
  const char2 = counts['S'] > counts['N'] ? 'S' : 'N';
  
  // T vs F (5문항): T와 F 중 득표수가 많은 쪽을 선택
  const char3 = counts['T'] > counts['F'] ? 'T' : 'F';
  
  // J vs P (5문항): J와 P 중 득표수가 많은 쪽을 선택
  const char4 = counts['J'] > counts['P'] ? 'J' : 'P';

  return `${char1}${char2}${char3}${char4}`;
};
// ----------------------------------------------------


const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 퀴즈 페이지에서 전달받은 답변 배열
  const finalAnswers = location.state?.finalAnswers;

  // 1. 답변 데이터가 없으면 홈으로 리다이렉트 (무단 접근 방지)
  if (!finalAnswers || finalAnswers.length === 0) {
    navigate('/');
    return null;
  }

  // 2. MBTI 코드 계산
  const mbtiCode = calculateMbti(finalAnswers);
  
  // 3. 결과 데이터 조회
  const result = mbtiResultData[mbtiCode];

  // 계산된 결과가 데이터에 없거나 에러 발생 시 (일반적으로 발생하지 않음)
  if (!result) {
    return (
      <MobileLayout>
        <div className="text-center py-20 text-red-500">
          오류: 결과를 찾을 수 없습니다. (코드: {mbtiCode})
        </div>
        <button 
          onClick={() => navigate('/')} 
          className="w-full py-3 bg-indigo-500 text-white rounded-lg mt-8 text-lg font-bold"
        >
          테스트 다시 시작
        </button>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="flex flex-col items-center p-6 bg-white min-h-screen">
        
        {/* 결과 타이틀 */}
        <h1 className="text-3xl font-extrabold text-indigo-600 mt-4 mb-2">
          나의 소비 성향 MBTI는?
        </h1>
        <p className="text-gray-500 mb-8">당신의 성향을 분석한 결과입니다.</p>

        {/* MBTI 코드 */}
        <div className="bg-indigo-500 text-white text-7xl font-black p-8 rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300 mb-8">
          {result.type}
        </div>

        {/* 결과 상세 내용 */}
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
        
        {/* 재시작 버튼 */}
        <button 
          onClick={() => navigate('/quiz')} 
          className="w-full max-w-sm py-3 bg-indigo-600 text-white rounded-lg mt-12 text-lg font-bold hover:bg-indigo-700 transition"
        >
          테스트 다시 하기
        </button>
      </div>
      
    </MobileLayout>
  );
};

export default ResultPage;