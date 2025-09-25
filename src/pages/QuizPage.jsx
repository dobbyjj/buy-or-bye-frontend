// src/pages/QuizPage.jsx
import React, { useState } from 'react'; // 👈 React 및 State Hooks 임포트
import { useNavigate } from 'react-router-dom'; // 👈 라우팅 훅 임포트
import MobileLayout from '../components/layout/MobileLayout';
import ProgressBar from '../components/quiz/ProgressBar'; 
import QuestionBlock from '../components/quiz/QuestionBlock'; 
import AnswerButton from '../components/quiz/AnswerButton'; 
import { quizQuestions } from '../data/questions';

const QuizPage = () => {
  const navigate = useNavigate(); // 라우팅을 위한 useNavigate 훅 사용
  
  // 💥 State 선언 부분 💥
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 현재 질문 번호
  const [answers, setAnswers] = useState([]); // 👈 사용자의 답변을 기록하는 State
  
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const totalQuestions = quizQuestions.length;
  
  // 답변 선택 핸들러
  const handleAnswer = (selectedType) => {
    // 1. 선택된 답변 타입을 answers 배열에 기록
    setAnswers((prevAnswers) => [...prevAnswers, selectedType]); 
    
    // 2. 다음 질문으로 이동
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // 3. 테스트 완료: 최종 답변 데이터를 준비하고 결과 페이지로 이동
      const finalAnswers = [...answers, selectedType]; // 현재 답변까지 포함한 최종 배열
      
      // alert('테스트 완료! 결과를 보러 갑니다.'); // 알림은 이제 주석 처리 또는 삭제
      
      // /result 경로로 이동하며, 답변 데이터를 state로 전달
      navigate('/result', { state: { finalAnswers } }); 
    }
  };

  // 질문이 없거나 로딩 중일 때 표시
  if (!currentQuestion) {
    return (
      <MobileLayout>
        <div className="text-center py-20 text-gray-600">
          잠시만 기다려 주세요. 결과를 분석 중입니다...
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      {/* 1. 진행률 표시줄 */}
      <ProgressBar 
        current={currentQuestionIndex + 1} 
        total={totalQuestions} 
      />
      
      {/* 2. 질문 블록 */}
      <QuestionBlock question={currentQuestion.question} />
      
      {/* 3. 선택지 버튼 */}
      <div className="flex flex-col space-y-4 mt-12">
        {currentQuestion.options.map((option, index) => (
          <AnswerButton
            key={index}
            text={option.text}
            onClick={() => handleAnswer(option.type)} 
          />
        ))}
      </div>
      
      {/* (선택 사항) 뒤로 가기 버튼 */}
      {currentQuestionIndex > 0 && (
        <button
          onClick={() => {
            // 답변 기록도 하나 삭제하고 인덱스를 뒤로 돌립니다.
            setAnswers(answers.slice(0, answers.length - 1));
            setCurrentQuestionIndex(currentQuestionIndex - 1);
          }}
          className="mt-6 text-sm text-gray-500 hover:text-indigo-600 transition"
        >
          이전 질문으로 돌아가기
        </button>
      )}
    </MobileLayout>
  );
};

export default QuizPage;