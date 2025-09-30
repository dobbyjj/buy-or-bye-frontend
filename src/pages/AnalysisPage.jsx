import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavbar from "../components/common/BottomNavbar";

const initialFinancialData = {
  gender: '',
  age: '',
  realEstateValue: '',
  loanAmount: '',
  depositAmount: '',
  otherInvestments: '',
  monthlyIncome: '',
  fixedExpenses: '',
};

const AnalysisPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(initialFinancialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'age' || name.includes('Value') || name.includes('Amount') || name.includes('Investments') || name.includes('Income') || name.includes('Expenses')) {
      // 숫자 필드의 경우 콤마를 제거하고 숫자만 추출
      const cleanedValue = value.replace(/[^0-9]/g, '');
      setFormData(prev => ({ ...prev, [name]: cleanedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleGenderChange = (gender) => {
    setFormData(prev => ({ ...prev, gender }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else if (step === 3) {
      navigate('/dashboard');
    }
  };

  const NumberInput = ({ label, name, value, placeholder }) => (
    <div style={{ marginBottom: 16, position: "relative" }}>
      <label style={{ display: "block", color: "#333", fontWeight: 600, marginBottom: 6 }}>{label}</label>
      <input
        type="text"
        name={name}
        value={value ? parseInt(value, 10).toLocaleString('ko-KR') : ''}
        onChange={(e) => {
          // 입력된 값에서 숫자만 추출
          const numericValue = e.target.value.replace(/[^0-9]/g, '');
          // 직접 이벤트 객체를 생성하여 handleChange 호출
          const syntheticEvent = {
            target: {
              name: name,
              value: numericValue
            }
          };
          handleChange(syntheticEvent);
        }}
        onKeyDown={(e) => {
          // Ctrl+A, Ctrl+C, Ctrl+V 등 조합키는 허용
          if (e.ctrlKey || e.metaKey) return;
          
          // 허용되는 키들
          const allowedKeys = [
            'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
            'Home', 'End', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'
          ];
          
          // 숫자 키 (0-9)
          const isNumeric = (e.key >= '0' && e.key <= '9');
          
          // 허용되지 않는 키 입력 방지
          if (!isNumeric && !allowedKeys.includes(e.key)) {
            e.preventDefault();
          }
        }}
        placeholder={placeholder}
        inputMode="numeric"
        autoComplete="off"
        style={{
          boxSizing: "border-box",
          width: "100%",
          padding: "12px 50px 12px 16px",
          borderRadius: 8,
          border: "1px solid #ddd",
          fontSize: 16,
          outline: "none",
          transition: "border-color 0.2s",
          backgroundColor: "#fff",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "#4B4BFF";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#ddd";
        }}
      />
      <span style={{ position: "absolute", right: 16, top: 38, color: "#888", fontWeight: 500, pointerEvents: "none" }}>원</span>
    </div>
  );

  const renderStartHome = () => (
    <div style={{ textAlign: "center", padding: 24, minHeight: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, color: "#4B4BFF", marginBottom: 12 }}>재무 상태 분석하기</h1>
      <p style={{ color: "#666", marginBottom: 32 }}>몇 가지 핵심 질문에 답하여 당신의 재무 상태를 진단하고 맞춤형 솔루션을 받아보세요.</p>
      <button onClick={() => setStep(1)} style={{
        width: "100%",
        maxWidth: 320,
        padding: "14px 0",
        fontSize: 18,
        fontWeight: 700,
        color: "#fff",
        background: "#4B4BFF",
        borderRadius: 12,
        border: "none",
        boxShadow: "0 2px 8px #e0e0ff",
        cursor: "pointer",
      }}>
        분석 시작 버튼
      </button>
    </div>
  );

  const renderUserInfoInput = () => (
    <div style={{ padding: 24 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: "#222", marginBottom: 24 }}>1/3. 나의 정보를 입력해주세요.</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
        <div style={{ marginBottom: 24 }}>
          <label style={{ display: "block", color: "#333", fontWeight: 600, marginBottom: 6 }}>성별</label>
          <div style={{ display: "flex", gap: 12 }}>
            <button type="button" onClick={() => handleGenderChange('male')}
              style={{
                flex: 1,
                padding: "12px 0",
                fontWeight: 600,
                borderRadius: 8,
                border: formData.gender === 'male' ? "2px solid #4B4BFF" : "2px solid #ddd",
                background: formData.gender === 'male' ? "#4B4BFF" : "#fff",
                color: formData.gender === 'male' ? "#fff" : "#222",
                cursor: "pointer"
              }}>남</button>
            <button type="button" onClick={() => handleGenderChange('female')}
              style={{
                flex: 1,
                padding: "12px 0",
                fontWeight: 600,
                borderRadius: 8,
                border: formData.gender === 'female' ? "2px solid #4B4BFF" : "2px solid #ddd",
                background: formData.gender === 'female' ? "#4B4BFF" : "#fff",
                color: formData.gender === 'female' ? "#fff" : "#222",
                cursor: "pointer"
              }}>여</button>
          </div>
        </div>
        <div style={{ marginBottom: 16, position: "relative" }}>
          <label style={{ display: "block", color: "#333", fontWeight: 600, marginBottom: 6 }}>나이</label>
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="나이를 입력하세요"
            inputMode="numeric"
            style={{
              boxSizing: "border-box",
              width: "100%",
              padding: "12px 16px",
              borderRadius: 8,
              border: "1px solid #ddd",
              fontSize: 16,
              outline: "none",
            }}
          />
          <span style={{ position: "absolute", right: 16, top: 38, color: "#888", fontWeight: 500 }}>세</span>
        </div>
        <button type="submit" style={{
          width: "100%",
          marginTop: 24,
          padding: "14px 0",
          fontSize: 18,
          fontWeight: 700,
          color: "#fff",
          background: "#4B4BFF",
          borderRadius: 12,
          border: "none",
          boxShadow: "0 2px 8px #e0e0ff",
          cursor: "pointer",
        }}>
          다음 (나의 자산 현황)
        </button>
      </form>
    </div>
  );

  const renderAssetInput = () => (
    <div style={{ padding: 24 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: "#222", marginBottom: 24 }}>2/3. 나의 자산 현황을 입력해주세요.</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
        <NumberInput label="부동산 가액" name="realEstateValue" value={formData.realEstateValue} placeholder="보유 부동산의 현재 가치를 입력" />
        <NumberInput label="대출 금액" name="loanAmount" value={formData.loanAmount} placeholder="주택 담보, 신용 대출 등 총액을 입력" />
        <NumberInput label="단기 예금/현금" name="depositAmount" value={formData.depositAmount} placeholder="비상금 또는 단기 예금 금액을 입력" />
        <NumberInput label="기타 금융자산(투자, 적금 등)" name="otherInvestments" value={formData.otherInvestments} placeholder="투자, 적금 등 기타 금융자산 금액을 입력" />
        <button type="submit" style={{
          width: "100%",
          marginTop: 24,
          padding: "14px 0",
          fontSize: 18,
          fontWeight: 700,
          color: "#fff",
          background: "#4B4BFF",
          borderRadius: 12,
          border: "none",
          boxShadow: "0 2px 8px #e0e0ff",
          cursor: "pointer",
        }}>
          다음 (수입/비용 입력)
        </button>
      </form>
    </div>
  );

  const renderIncomeExpenseInput = () => (
    <div style={{ padding: 24 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: "#222", marginBottom: 24 }}>3/3. 월 수입과 비용을 입력해주세요.</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleNext(); }}>
        <NumberInput label="월 수입 (세후)" name="monthlyIncome" value={formData.monthlyIncome} placeholder="매월 벌어들이는 총 금액을 입력" />
        <NumberInput label="월 고정비" name="fixedExpenses" value={formData.fixedExpenses} placeholder="월세, 보험료, 통신비 등 고정 지출 금액을 입력" />
        <button type="submit" style={{
          width: "100%",
          marginTop: 24,
          padding: "14px 0",
          fontSize: 18,
          fontWeight: 700,
          color: "#fff",
          background: "#43C463",
          borderRadius: 12,
          border: "none",
          boxShadow: "0 2px 8px #e0e0ff",
          cursor: "pointer",
        }}>
          재무 분석 완료 (대시보드 이동)
        </button>
      </form>
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 0:
        return renderStartHome();
      case 1:
        return renderUserInfoInput();
      case 2:
        return renderAssetInput();
      case 3:
        return renderIncomeExpenseInput();
      default:
        return renderStartHome();
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f9f9f9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: 80,
      }}
    >
      <div style={{ width: "100%", maxWidth: 768, margin: "0 auto" }}>
        {renderStep()}
      </div>
      <BottomNavbar />
    </div>
  );
};

export default AnalysisPage;