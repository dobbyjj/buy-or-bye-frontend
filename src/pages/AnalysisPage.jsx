// src/pages/AnalysisPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 useNavigate 임포트 추가
import MobileLayout from '../components/layout/MobileLayout';
import BottomNavbar from '../components/common/BottomNavbar';

// 사용자가 입력한 재무 정보를 저장할 초기 상태
const initialFinancialData = {
  realEstateValue: '',
  loanAmount: '',
  totalInvestments: '',
  depositAmount: '',
  monthlyIncome: '',
  fixedExpenses: '',
};

const AnalysisPage = () => {
  const navigate = useNavigate(); // 👈 useNavigate 훅 사용
  
  // 단계 상태: 0: 홈, 1: 자산 입력, 2: 수입/비용 입력
  const [step, setStep] = useState(0); 
  const [formData, setFormData] = useState(initialFinancialData);

  // 입력 값 변경 핸들러 (유지)
  const handleChange = (e) => {
    const { name, value } = e.target;
    const cleanedValue = value.replace(/[^0-9]/g, ''); 
    setFormData(prev => ({ ...prev, [name]: cleanedValue }));
  };

  // 다음 단계로 이동 핸들러
  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else if (step === 2) {
      // 💥💥 최종 수정: 대시보드로 바로 이동 💥💥
      console.log('최종 재무 데이터:', formData);
      navigate('/dashboard'); 
    }
  };

  // 숫자 입력 필드 컴포넌트 (유지)
  const NumberInput = ({ label, name, value, placeholder }) => (
    <div className="mb-4 relative">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        type="text" 
        name={name}
        // value를 문자열로 전달하지 않으면 오류가 날 수 있어 .toString() 안전 장치를 추가합니다.
        value={value ? value.toLocaleString('ko-KR') : ''}
        onChange={handleChange}
        placeholder={placeholder}
        inputMode="numeric"
        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-12"
      />
      <span className="absolute right-3 top-[37px] text-gray-500 text-lg font-semibold">원</span>
    </div>
  );

  // --- 단계별 컴포넌트 렌더링 함수 (유지) ---

  const renderStartHome = () => (
    <div className="text-center p-6 flex flex-col items-center min-h-[70vh] justify-center">
      <h1 className="text-2xl font-bold text-indigo-600 mb-4">
        재무 상태 분석하기
      </h1>
      <p className="text-gray-600 mb-8">
        몇 가지 핵심 질문에 답하여 당신의 재무 상태를 진단하고 맞춤형 솔루션을 받아보세요.
      </p>
      <button 
        onClick={() => setStep(1)} 
        className="w-full max-w-xs py-3 text-lg font-bold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 transition"
      >
        분석 시작 버튼
      </button>
    </div>
  );

  // 2단계: 재무 정보 설문 문항 (자산)
  const renderAssetInput = () => (
    <div className="p-4">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        2/3. 나의 자산 현황을 입력해주세요.
      </h2>
      <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
        
        <NumberInput 
          label="부동산 가액"
          name="realEstateValue"
          value={formData.realEstateValue}
          placeholder="보유 부동산의 현재 가치를 입력"
        />

        <NumberInput 
          label="대출 금액"
          name="loanAmount"
          value={formData.loanAmount}
          placeholder="주택 담보, 신용 대출 등 총액을 입력"
        />

        <NumberInput 
          label="총 금융 자산 (투자+적금+예금)"
          name="totalInvestments"
          value={formData.totalInvestments}
          placeholder="모든 금융 자산의 총액을 입력"
        />

        <NumberInput 
          label="단기 예금/현금"
          name="depositAmount"
          value={formData.depositAmount}
          placeholder="비상금 또는 단기 예금 금액을 입력"
        />
        
        <button
          type="submit"
          className="w-full mt-6 py-3 text-lg font-bold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 transition"
        >
          다음 (수입/비용 입력)
        </button>
      </form>
    </div>
  );

  // 3단계: 재무 정보 설문 문항 (수입&비용)
  const renderIncomeExpenseInput = () => (
    <div className="p-4">
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        3/3. 월 수입과 비용을 입력해주세요.
      </h2>
      <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
        
        <NumberInput 
          label="월 수입 (세후)"
          name="monthlyIncome"
          value={formData.monthlyIncome}
          placeholder="매월 벌어들이는 총 금액을 입력"
        />

        <NumberInput 
          label="월 고정비"
          name="fixedExpenses"
          value={formData.fixedExpenses}
          placeholder="월세, 보험료, 통신비 등 고정 지출 금액을 입력"
        />
        
        <button
          type="submit"
          className="w-full mt-6 py-3 text-lg font-bold text-white bg-green-600 rounded-lg shadow-lg hover:bg-green-700 transition"
        >
          재무 분석 완료 (대시보드 이동)
        </button>
      </form>
    </div>
  );

  // 분석 결과 대기 화면 (사용하지 않으므로 임시로 렌더링하지 않음)
  const renderAnalysisResult = () => null; 


  const renderStep = () => {
    switch (step) {
      case 0:
        return renderStartHome();
      case 1:
        return renderAssetInput();
      case 2:
        return renderIncomeExpenseInput();
      default:
        // 3단계 이후는 대시보드로 이동하므로, 이 코드는 실행되지 않음
        return renderStartHome(); 
    }
  };

  return (
    <MobileLayout>
      <div className="pb-20 pt-4 px-2 min-h-screen"> 
        {renderStep()}
      </div>
      <BottomNavbar /> 
    </MobileLayout>
  );
};

export default AnalysisPage;