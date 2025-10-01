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
  foodExpense: '',
  shoppingExpense: '',
  transportExpense: '',
  housingExpense: '',
  cultureExpense: '',
  dailyGoodsExpense: '',
  otherExpense: '',
};

const NumberInput = ({ label, name, value, placeholder, handleChange }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleChangeLocal = (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, '');
    handleChange({ target: { name, value: numericValue } });
  };

  const handleFocus = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const displayValue = isEditing ? value : (value ? parseInt(value, 10).toLocaleString('ko-KR') : '');

  return (
    <div style={{ marginBottom: 16, position: "relative" }}>
      <label style={{ display: "block", color: "#333", fontWeight: 600, marginBottom: 6 }}>{label}</label>
      <input
        type={'text'}
        name={name}
        value={displayValue}
        onChange={handleChangeLocal}
        onFocus={handleFocus}
        onBlur={handleBlur}
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
      />
      <span style={{ position: "absolute", right: 16, top: 38, color: "#888", fontWeight: 500, pointerEvents: "none" }}>원</span>
    </div>
  );
};

const AnalysisPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(initialFinancialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
        <NumberInput label="부동산 가액" name="realEstateValue" value={formData.realEstateValue} placeholder="보유 부동산의 현재 가치를 입력" handleChange={handleChange} />
        <NumberInput label="대출 금액" name="loanAmount" value={formData.loanAmount} placeholder="주택 담보, 신용 대출 등 총액을 입력" handleChange={handleChange} />
        <NumberInput label="단기 예금/현금" name="depositAmount" value={formData.depositAmount} placeholder="비상금 또는 단기 예금 금액을 입력" handleChange={handleChange} />
        <NumberInput label="기타 금융자산(투자, 적금 등)" name="otherInvestments" value={formData.otherInvestments} placeholder="투자, 적금 등 기타 금융자산 금액을 입력" handleChange={handleChange} />
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
        <NumberInput label="월 수입" name="monthlyIncome" value={formData.monthlyIncome} placeholder="매월 벌어들이는 총 금액을 입력" handleChange={handleChange} />
        <NumberInput label="식비" name="foodExpense" value={formData.foodExpense} placeholder="식비 관련 지출 금액을 입력" handleChange={handleChange} />
        <NumberInput label="쇼핑" name="shoppingExpense" value={formData.shoppingExpense} placeholder="쇼핑 관련 지출 금액을 입력" handleChange={handleChange} />
        <NumberInput label="교통" name="transportExpense" value={formData.transportExpense} placeholder="교통비 관련 지출 금액을 입력" handleChange={handleChange} />
        <NumberInput label="주거/관리비" name="housingExpense" value={formData.housingExpense} placeholder="주거 및 관리비 관련 지출 금액을 입력" handleChange={handleChange} />
        <NumberInput label="문화/여가" name="cultureExpense" value={formData.cultureExpense} placeholder="문화/여가 관련 지출 금액을 입력" handleChange={handleChange} />
        <NumberInput label="생활용품" name="dailyGoodsExpense" value={formData.dailyGoodsExpense} placeholder="생활용품 관련 지출 금액을 입력" handleChange={handleChange} />
        <NumberInput label="기타" name="otherExpense" value={formData.otherExpense} placeholder="기타 지출 금액을 입력" handleChange={handleChange} />
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
