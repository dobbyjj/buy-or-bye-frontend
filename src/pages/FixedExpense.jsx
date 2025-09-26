import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FixedExpense.css";

const categories = [
  "식비", "주거비", "통신비", "건강", "문화", "교육", "교통", "회비", "이자", "보험", "기타"
];

function FixedExpense() {
  const navigate = useNavigate();
  const [cycle, setCycle] = useState("월간");
  const [endYear, setEndYear] = useState("2025");
  const [endMonth, setEndMonth] = useState("09");
  const [endDay, setEndDay] = useState("01");
  const [date, setDate] = useState("01");
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [account, setAccount] = useState("카드");
  const [category, setCategory] = useState("식비");

  return (
    <div className="fixedexpense-container">
      <header className="fixedexpense-header">
        <span className="fixedexpense-title">고정 비용 추가</span>
      </header>
      <main className="fixedexpense-main">
        <form className="fixedexpense-form" onSubmit={e => e.preventDefault()}>
          <label>
            <span>발생일</span>
            <select value={date} onChange={e => setDate(e.target.value)}>
              {[...Array(31)].map((_, i) => (
                <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                  {i + 1}일
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>금액</span>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="금액 입력"
              required
            />
          </label>
          <label>
            <span>사용내역</span>
            <input
              type="text"
              value={desc}
              onChange={e => setDesc(e.target.value)}
              placeholder="ex) 장보기"
              required
            />
          </label>
          <label>
            <span>출금계좌</span>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                type="button"
                className={account === "카드" ? "selected" : ""}
                onClick={() => setAccount("카드")}
                style={{ fontSize: "1.2em" }}
              >
                <span role="img" aria-label="card">💳</span> 카드
              </button>
              <button
                type="button"
                className={account === "현금" ? "selected" : ""}
                onClick={() => setAccount("현금")}
                style={{ fontSize: "1.2em" }}
              >
                <span role="img" aria-label="cash">💵</span> 현금
              </button>
            </div>
          </label>
          <label>
            <span>분류</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  className={category === cat ? "selected" : ""}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </label>
          <label>
            <span>지출 주기</span>
            <select value={cycle} onChange={e => setCycle(e.target.value)}>
              <option value="월간">월간</option>
              <option value="주간">주간</option>
              <option value="연간">연간</option>
            </select>
          </label>
          <label>
            <span>종료 일자</span>
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="number"
                min="2020"
                max="2100"
                value={endYear}
                onChange={e => setEndYear(e.target.value)}
                style={{ width: "70px" }}
                placeholder="연"
              />
              <input
                type="number"
                min="1"
                max="12"
                value={endMonth}
                onChange={e => setEndMonth(e.target.value)}
                style={{ width: "50px" }}
                placeholder="월"
              />
              <input
                type="number"
                min="1"
                max="31"
                value={endDay}
                onChange={e => setEndDay(e.target.value)}
                style={{ width: "50px" }}
                placeholder="일"
              />
            </div>
          </label>
          <button type="submit" style={{ marginTop: "16px" }}>
            저장
          </button>
        </form>
      </main>
      <nav className="fixedexpense-bottom-nav">
        <button onClick={() => navigate("/mypage")}>
          <span role="img" aria-label="mypage">👤</span>
          <div>My Page</div>
        </button>
        <button onClick={() => navigate("/ledger")}>
          <span role="img" aria-label="ledger">📝</span>
          <div>가계부</div>
        </button>
        <button onClick={() => navigate("/dashboard")}>
          <span role="img" aria-label="dashboard">🟢</span>
          <div>그래프</div>
        </button>
        <button onClick={() => navigate("/chatbot")}>
          <span role="img" aria-label="chatbot">🤖</span>
          <div>챗봇</div>
        </button>
      </nav>
    </div>
  );
}

export default FixedExpense;