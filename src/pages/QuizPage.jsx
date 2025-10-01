// src/pages/QuizPage.jsx
import React, { useState } from 'react';
import MobileLayout from '../components/layout/MobileLayout';
import { quizQuestions } from '../data/questions';

const QuizPage = () => {
  // 현재 질문 인덱스와 결과 상태를 관리합니다.
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const totalQuestions = quizQuestions.length;
  
  // 선택지를 눌렀을 때 실행될 핸들러 함수
  const handleAnswer = (selectedType) => {
    // 1. 결과 상태 업데이트 로직 (나중에 추가)
    
    // 2. 다음 질문으로 이동
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert('테스트 완료! 결과를 보러 갑니다.');
      // 결과 페이지로 이동하는 라우팅 로직 (나중에 추가)
    }
  };

  if (!currentQuestion) {
    return <MobileLayout><div>결과 로딩 중...</div></MobileLayout>;
  }

  return (
    <MobileLayout>
      {/* 1. 진행률 표시줄 */}
      <ProgressBar 
        current={currentQuestionIndex + 1} 
        total={totalQuestions} 
      />
      
      {/* 2. 질문 영역 */}
      <QuestionBlock question={currentQuestion.question} />
      
      {/* 3. 선택지 버튼 (모바일 퍼스트: 세로 배치) */}
      <div className="flex flex-col space-y-4 mt-12">
        {currentQuestion.options.map((option, index) => (
          <AnswerButton
            key={index}
            text={option.text}
            onClick={() => handleAnswer(option.type)}
          />
        ))}
      </div>

    </MobileLayout>
  );
};

export default QuizPage;