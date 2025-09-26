// src/pages/AnalysisPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';
import BottomNavbar from '../components/common/BottomNavbar';

// 확장된 재무 정보 상태
const initialFinancialData = {
  gender: '', // 성별
  age: '', // 나이
  realEstateValue: '',
  loanAmount: '',
  totalInvestments: '',
  depositAmount: '',
  monthlyIncome: '',
  fixedExpenses: '',
};

const AnalysisPage = () => {
  const navigate = useNavigate();
  
  // 단계 상태: 0: 홈, 1: 사용자 정보, 2: 자산, 3: 수입/비용
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(initialFinancialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // 숫자 필드는 숫자만, 다른 필드는 그대로
    const cleanedValue = name === 'age' || name.includes('Value') || name.includes('Amount') || name.includes('Investments') || name.includes('Income') || name.includes('Expenses')
      ? value.replace(/[^0-9]/g, '') 
      : value;
    setFormData(prev => ({ ...prev, [name]: cleanedValue }));
  };

  // 성별 선택 핸들러
  const handleGenderChange = (gender) => {
    setFormData(prev => ({ ...prev, gender }));
  };

  const handleNext = () => {
    if (step < 3) { // 3단계로 확장
      setStep(step + 1);
    } else if (step === 3) {
      console.log('최종 재무 데이터:', formData);
      navigate('/dashboard');
    }
  };

  const NumberInput = ({ label, name, value, placeholder }) => (
    <div className="mb-4 relative">
      <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
      <input
        type="text"
        name={name}
        value={value ? parseInt(value, 10).toLocaleString('ko-KR') : ''}
        onChange={handleChange}
        placeholder={placeholder}
        inputMode="numeric"
        className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-12"
      />
      <span className="absolute right-3 top-[37px] text-gray-500 text-lg font-semibold">원</span>
    </div>
  );

  const renderStartHome = () => (
    <div className="text-center p-6 flex flex-col items-center min-h-[70vh] justify-center">
      <h1 className="text-2xl font-bold text-indigo-600 mb-4">재무 상태 분석하기</h1>
      <p className="text-gray-600 mb-8">몇 가지 핵심 질문에 답하여 당신의 재무 상태를 진단하고 맞춤형 솔루션을 받아보세요.</p>
      <button onClick={() => setStep(1)} className="w-full max-w-xs py-3 text-lg font-bold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 transition">
        분석 시작 버튼
      </button>
    </div>
  );

  // 1단계: 사용자 정보 입력
  const renderUserInfoInput = () => (
    <div className="p-4">
      <h2 className="text-xl font-bold text-gray-800 mb-6">1/3. 나의 정보를 입력해주세요.</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">성별</label>
          <div className="flex space-x-4">
            <button type="button" onClick={() => handleGenderChange('male')} className={`flex-1 py-3 font-semibold rounded-lg border-2 ${formData.gender === 'male' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300'}`}>남</button>
            <button type="button" onClick={() => handleGenderChange('female')} className={`flex-1 py-3 font-semibold rounded-lg border-2 ${formData.gender === 'female' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300'}`}>여</button>
          </div>
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-700 text-sm font-bold mb-2">나이</label>
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="나이를 입력하세요"
            inputMode="numeric"
            className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-12"
          />
          <span className="absolute right-3 top-[37px] text-gray-500 text-lg font-semibold">세</span>
        </div>
        <button type="submit" className="w-full mt-6 py-3 text-lg font-bold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 transition">
          다음 (나의 자산 현황)
        </button>
      </form>
    </div>
  );

  // 2단계: 자산 입력
  const renderAssetInput = () => (
    <div className="p-4">
      <h2 className="text-xl font-bold text-gray-800 mb-6">2/3. 나의 자산 현황을 입력해주세요.</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
        <NumberInput label="부동산 가액" name="realEstateValue" value={formData.realEstateValue} placeholder="보유 부동산의 현재 가치를 입력" />
        <NumberInput label="대출 금액" name="loanAmount" value={formData.loanAmount} placeholder="주택 담보, 신용 대출 등 총액을 입력" />
        <NumberInput label="총 금융 자산 (투자+적금+예금)" name="totalInvestments" value={formData.totalInvestments} placeholder="모든 금융 자산의 총액을 입력" />
        <NumberInput label="단기 예금/현금" name="depositAmount" value={formData.depositAmount} placeholder="비상금 또는 단기 예금 금액을 입력" />
        <button type="submit" className="w-full mt-6 py-3 text-lg font-bold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 transition">
          다음 (수입/비용 입력)
        </button>
      </form>
    </div>
  );

  // 3단계: 수입/비용 입력
  const renderIncomeExpenseInput = () => (
    <div className="p-4">
      <h2 className="text-xl font-bold text-gray-800 mb-6">3/3. 월 수입과 비용을 입력해주세요.</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
        <NumberInput label="월 수입 (세후)" name="monthlyIncome" value={formData.monthlyIncome} placeholder="매월 벌어들이는 총 금액을 입력" />
        <NumberInput label="월 고정비" name="fixedExpenses" value={formData.fixedExpenses} placeholder="월세, 보험료, 통신비 등 고정 지출 금액을 입력" />
        <button type="submit" className="w-full mt-6 py-3 text-lg font-bold text-white bg-green-600 rounded-lg shadow-lg hover:bg-green-700 transition">
          재무 분석 완료 (대시보드 이동)
        </button>
      </form>
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 0:
        return renderStartHome();
      case 1: // 신규 추가
        return renderUserInfoInput();
      case 2: // 기존 1단계
        return renderAssetInput();
      case 3: // 기존 2단계
        return renderIncomeExpenseInput();
      default:
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