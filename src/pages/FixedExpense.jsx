import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavbar from "../components/common/BottomNavbar";

function FixedExpense() {
  const navigate = useNavigate();

  // 예시 상태값 (실제 구현에 맞게 수정)
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [account, setAccount] = useState("card");
  const [category, setCategory] = useState("식비");
  const [cycle, setCycle] = useState("월간");
  const [startYear, setStartYear] = useState("2025");
  const [startMonth, setStartMonth] = useState("09");
  const [startDay, setStartDay] = useState("01");
  const [endYear, setEndYear] = useState("2025");
  const [endMonth, setEndMonth] = useState("09");
  const [endDay, setEndDay] = useState("01");

  // 금액 입력 시 숫자만 허용
  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setAmount(value);
  };

  const handleSave = () => {
    // 실제 저장 로직 구현
    alert("저장되었습니다.");
    // navigate("/mypage"); // 필요시 저장 후 이동
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fafafa",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: 80,
      }}
    >
      <header
        style={{
          width: "100%",
          maxWidth: 768,
          margin: "0 auto",
          padding: "24px 0 8px 0",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* 이전으로 가기 버튼 */}
        <button
          onClick={() => navigate(-1)}
          style={{
            position: "absolute",
            left: 0,
            top: 24,
            background: "none",
            border: "none",
            fontSize: 28,
            color: "#444",
            cursor: "pointer",
            paddingLeft: 18,
            zIndex: 10,
          }}
          aria-label="이전"
        >
          {/* ← 아이콘 (유니코드) */}
          <span style={{ fontWeight: 700 }}>&larr;</span>
        </button>
        <span style={{ fontSize: 24, fontWeight: 700 }}>고정 비용 추가</span>
      </header>
      <main
        style={{
          width: "100%",
          maxWidth: 768,
          margin: "0 auto",
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 2px 8px #eee",
          padding: 32,
          marginTop: 24,
        }}
      >
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>지출 내용</div>
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="ex) 장보기"
            style={{
              width: "100%",
              fontSize: 16,
              padding: "10px",
              borderRadius: 8,
              border: "1px solid #ddd",
              marginBottom: 12,
            }}
          />
          <div style={{ fontWeight: 600, marginBottom: 8 }}>금액</div>
          <input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            placeholder="금액 입력 (숫자만)"
            style={{
              width: "100%",
              fontSize: 16,
              padding: "10px",
              borderRadius: 8,
              border: "1px solid #ddd",
              marginBottom: 12,
            }}
          />
          <div style={{ fontWeight: 600, marginBottom: 8 }}>결제 수단</div>
          <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
            <button
              type="button"
              onClick={() => setAccount("card")}
              style={{
                flex: 1,
                background: account === "card" ? "#4B4BFF" : "#f5f5f5",
                color: account === "card" ? "#fff" : "#222",
                border: "none",
                borderRadius: 8,
                padding: "10px 0",
                fontWeight: 600,
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              <span role="img" aria-label="신용 카드">💳 신용 카드</span>
            </button>
            <button
              type="button"
              onClick={() => setAccount("cash")}
              style={{
                flex: 1,
                background: account === "cash" ? "#4B4BFF" : "#f5f5f5",
                color: account === "cash" ? "#fff" : "#222",
                border: "none",
                borderRadius: 8,
                padding: "10px 0",
                fontWeight: 600,
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              <span role="img" aria-label="현금(체크카드, 예금 등)">💵 현금(체크카드, 예금 등)</span>
            </button>
          </div>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>분류</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
            {[
              { label: "식비", icon: "🍽️" },
              { label: "쇼핑", icon: "🛍️" },
              { label: "교통", icon: "🚌" },
              { label: "주거,관리비", icon: "🏡" },
              { label: "문화/여가", icon: "🎬" },
              { label: "생활용품", icon: "🧴" },
              { label: "대출", icon: "🏦" },
              { label: "기타", icon: "⚙️" },

            ].map((cat) => (
              <button
                key={cat.label}
                type="button"
                onClick={() => setCategory(cat.label)}
                style={{
                  background: category === cat.label ? "#4B4BFF" : "#f5f5f5",
                  color: category === cat.label ? "#fff" : "#222",
                  border: "none",
                  borderRadius: 8,
                  padding: "8px 18px",
                  fontWeight: 600,
                  fontSize: 15,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>지출 주기</div>
          <select
            value={cycle}
            onChange={(e) => setCycle(e.target.value)}
            style={{
              width: "100%",
              fontSize: 16,
              padding: "10px",
              borderRadius: 8,
              border: "1px solid #ddd",
              marginBottom: 12,
            }}
          >
            <option value="월간">월간</option>
            <option value="주간">주간</option>
            <option value="연간">연간</option>
          </select>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>시작 일자</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
            <input
              type="text"
              value={startYear}
              onChange={(e) => setStartYear(e.target.value)}
              placeholder="2025"
              maxLength={4}
              style={{
                width: 80,
                fontSize: 16,
                padding: "12px 8px",
                borderRadius: 8,
                border: "1px solid #ddd",
                textAlign: "center",
                fontWeight: 500,
              }}
            />
            <span style={{ fontSize: 14, color: "#666", margin: "0 4px" }}>년</span>
            <input
              type="text"
              value={startMonth}
              onChange={(e) => setStartMonth(e.target.value)}
              placeholder="09"
              maxLength={2}
              style={{
                width: 60,
                fontSize: 16,
                padding: "12px 8px",
                borderRadius: 8,
                border: "1px solid #ddd",
                textAlign: "center",
                fontWeight: 500,
              }}
            />
            <span style={{ fontSize: 14, color: "#666", margin: "0 4px" }}>월</span>
            <input
              type="text"
              value={startDay}
              onChange={(e) => setStartDay(e.target.value)}
              placeholder="01"
              maxLength={2}
              style={{
                width: 60,
                fontSize: 16,
                padding: "12px 8px",
                borderRadius: 8,
                border: "1px solid #ddd",
                textAlign: "center",
                fontWeight: 500,
              }}
            />
            <span style={{ fontSize: 14, color: "#666", margin: "0 4px" }}>일</span>
          </div>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>종료 일자</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
            <input
              type="text"
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
              placeholder="2025"
              maxLength={4}
              style={{
                width: 80,
                fontSize: 16,
                padding: "12px 8px",
                borderRadius: 8,
                border: "1px solid #ddd",
                textAlign: "center",
                fontWeight: 500,
              }}
            />
            <span style={{ fontSize: 14, color: "#666", margin: "0 4px" }}>년</span>
            <input
              type="text"
              value={endMonth}
              onChange={(e) => setEndMonth(e.target.value)}
              placeholder="09"
              maxLength={2}
              style={{
                width: 60,
                fontSize: 16,
                padding: "12px 8px",
                borderRadius: 8,
                border: "1px solid #ddd",
                textAlign: "center",
                fontWeight: 500,
              }}
            />
            <span style={{ fontSize: 14, color: "#666", margin: "0 4px" }}>월</span>
            <input
              type="text"
              value={endDay}
              onChange={(e) => setEndDay(e.target.value)}
              placeholder="01"
              maxLength={2}
              style={{
                width: 60,
                fontSize: 16,
                padding: "12px 8px",
                borderRadius: 8,
                border: "1px solid #ddd",
                textAlign: "center",
                fontWeight: 500,
              }}
            />
            <span style={{ fontSize: 14, color: "#666", margin: "0 4px" }}>일</span>
          </div>
          <button
            type="button"
            onClick={handleSave}
            style={{
              width: "100%",
              background: "#4B4BFF",
              color: "#fff",
              fontWeight: 700,
              fontSize: 18,
              border: "none",
              borderRadius: 10,
              padding: "14px 0",
              cursor: "pointer",
              marginTop: 8,
            }}
          >
            저장
          </button>
        </div>
      </main>
      <BottomNavbar active="mypage" />
    </div>
  );
}

export default FixedExpense;