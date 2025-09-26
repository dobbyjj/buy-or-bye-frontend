import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyPage.css";

function MyPage() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [smsEnabled, setSmsEnabled] = useState(true);

  return (
    <div className="mypage-container">
      {/* 상단 헤더 */}
      <header className="mypage-header">
        <span className="mypage-title">My Page</span>
      </header>

      {/* 내용 */}
      <main className="mypage-main">
        <section className="mypage-section">
          <div className="mypage-item">
            <span>로그인 정보</span>
            <span className="mypage-id">annayoo</span>
          </div>
          <div className="mypage-item">
            <span>회원 가입</span>
            <button className="mypage-arrow">{">"}</button>
          </div>
          <div
            className={`mypage-item ${!smsEnabled ? "mypage-disabled" : ""}`}
            onClick={() => smsEnabled && setShowPopup(true)}
          >
            <span>결제문자 인식기능 사용하기</span>
            <input
              type="checkbox"
              checked={smsEnabled}
              onChange={() => setSmsEnabled((v) => !v)}
            />
          </div>
          {!smsEnabled && (
            <div className="mypage-disabled-desc">
              결제문자 인식기능을 사용하지 않아 비활성화되었습니다.
            </div>
          )}
          <div
            className="mypage-item"
            onClick={() => navigate("/fixed-expense")}
          >
            <span>고정비 지출 관리하기</span>
            <button className="mypage-arrow">{">"}</button>
          </div>
          <div className="mypage-item">
            <span>오류 신고</span>
            <button className="mypage-arrow">{">"}</button>
          </div>
        </section>

        <section className="mypage-section">
          <div className="mypage-item">
            <span>데이터 초기화</span>
            <button className="mypage-arrow">{">"}</button>
          </div>
          <div className="mypage-item">
            <span>프로그램 버전</span>
            <span className="mypage-version">v1.6.0</span>
          </div>
        </section>

        {/* 탈퇴하기 */}
        <section className="mypage-section">
          <div
            className="mypage-item mypage-danger"
            onClick={() => alert("탈퇴 안내 페이지로 이동")}
          >
            <span>서비스 탈퇴하기</span>
          </div>
        </section>
      </main>

      {/* 팝업 */}
      {showPopup && (
        <div
          className="mypage-popup-backdrop"
          onClick={() => setShowPopup(false)}
        >
          <div className="mypage-popup" onClick={(e) => e.stopPropagation()}>
            <h3>인식된 문자 내역 등록방법</h3>
            <div className="mypage-popup-option">
              <input
                type="radio"
                id="direct"
                name="regtype"
                checked
                readOnly
              />
              <label htmlFor="direct">
                <b>바로등록</b>
                <br />
                문자 인식과 동시에 가계부에 입력됩니다.
              </label>
            </div>
            <div className="mypage-popup-option">
              <input type="radio" id="select" name="regtype" readOnly />
              <label htmlFor="select">
                <b>확인 후 선택등록</b>
                <br />
                앱이 인식한 문자 목록을 확인하고, 원하는 내역만 선택하여 등록할 수 있습니다.
              </label>
            </div>
            <button
              className="mypage-popup-close"
              onClick={() => setShowPopup(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* 하단 네비게이션 */}
      <nav className="mypage-bottom-nav">
        <button onClick={() => navigate("/mypage")}>
          <span role="img" aria-label="mypage">
            👤
          </span>
          <div>My Page</div>
        </button>
        <button onClick={() => navigate("/ledger")}>
          <span role="img" aria-label="ledger">
            📝
          </span>
          <div>가계부</div>
        </button>
        <button onClick={() => navigate("/dashboard")}>
          <span role="img" aria-label="dashboard">
            🟢
          </span>
          <div>그래프</div>
        </button>
        <button onClick={() => navigate("/chatbot")}>
          <span role="img" aria-label="chatbot">
            🤖
          </span>
          <div>챗봇</div>
        </button>
      </nav>
    </div>
  );
}

export default MyPage;
