import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import ProgressBar from '../components/quiz/ProgressBar';
import QuestionBlock from '../components/quiz/QuestionBlock';
import AnswerButton from '../components/quiz/AnswerButton';
import { quizQuestions } from '../data/questions';

// MBTI 유형을 계산하는 함수
const calculateMBTI = (answers) => {
  if (!answers || answers.length === 0) {
    return 'UNKNOWN';
  }

  const counts = { E: 0, I: 0, N: 0, S: 0, T: 0, F: 0, J: 0, P: 0 };
  answers.forEach(type => {
    if (counts.hasOwnProperty(type)) {
      counts[type]++;
    }
  });

  const personality = [];
  personality.push(counts.E >= counts.I ? 'E' : 'I');
  personality.push(counts.N >= counts.S ? 'N' : 'S');
  personality.push(counts.T >= counts.F ? 'T' : 'F');
  personality.push(counts.J >= counts.P ? 'J' : 'P');

  return personality.join('');
};

const QuizPage = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const totalQuestions = quizQuestions.length;
  
  const handleAnswer = (selectedType) => {
    const newAnswers = [...answers, selectedType];
    setAnswers(newAnswers);
    
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // 테스트 완료: MBTI를 계산하고 결과 페이지로 이동
      const mbtiType = calculateMBTI(newAnswers);
      navigate(`/result?mbti=${mbtiType}`);
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