import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import BottomNavbar from "../components/common/BottomNavbar";

// 예시: 로그인 상태 관리 (실제 앱에서는 context나 redux 등으로 관리)
const mockUser = {
  isLoggedIn: false,  // 초기에는 로그아웃 상태
  email: "",
  id: "",
  password: "",
};

function MyPage() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [smsOption, setSmsOption] = useState("direct");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  // 로그인 상태 및 정보
  const [isLoggedIn, setIsLoggedIn] = useState(mockUser.isLoggedIn);
  const [email, setEmail] = useState(mockUser.email);
  const [id, setId] = useState(mockUser.id);
  const [password, setPassword] = useState(mockUser.password);
  const [editPw, setEditPw] = useState(false);
  const [newPw, setNewPw] = useState("");
  const [pwError, setPwError] = useState("");

  // 회원가입 상태
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPw, setSignupPw] = useState("");
  const [signupEmailError, setSignupEmailError] = useState("");
  const [signupPwError, setSignupPwError] = useState("");
  const [emailChecked, setEmailChecked] = useState(false);

  // 로그인 입력 상태
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // PW 유효성 검사: 문자, 숫자, 특수기호 혼합 8~15자
  const validatePw = (pw) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]).{8,15}$/;
    return regex.test(pw);
  };

  // 이메일 형식 검사
  const validateEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  // 중복 이메일 체크 (실제 서비스에서는 서버에서 체크)
  const handleEmailCheck = () => {
    if (!validateEmail(signupEmail)) {
      setSignupEmailError("올바른 이메일 주소를 입력하세요.");
      setEmailChecked(false);
      return;
    }
    if (signupEmail === email) {
      setSignupEmailError("이미 가입된 이메일입니다.");
      setEmailChecked(false);
      return;
    }
    setSignupEmailError("");
    setEmailChecked(true);
    alert("사용 가능한 이메일입니다.");
  };

  const handleSignup = () => {
    if (!validateEmail(signupEmail)) {
      setSignupEmailError("올바른 이메일 주소를 입력하세요.");
      return;
    }
    if (!validatePw(signupPw)) {
      setSignupPwError("문자, 숫자, 특수기호 포함 8~15자로 입력하세요.");
      return;
    }
    if (!emailChecked) {
      setSignupEmailError("이메일 중복 확인을 해주세요.");
      return;
    }
    // 실제 회원가입 처리
    setEmail(signupEmail);
    setId(signupEmail);
    setPassword(signupPw);
    setIsLoggedIn(true);
    setShowSignupModal(false);
    setSignupEmail("");
    setSignupPw("");
    setSignupEmailError("");
    setSignupPwError("");
    setEmailChecked(false);
    alert("회원가입이 완료되었습니다.");
  };

  const handlePwChange = (e) => {
    const value = e.target.value;
    setNewPw(value);
    if (!validatePw(value)) {
      setPwError("문자, 숫자, 특수기호 혼합 8~15자로 입력하세요.");
    } else {
      setPwError("");
    }
  };

  const handlePwSubmit = () => {
    if (validatePw(newPw)) {
      setPassword(newPw);
      setEditPw(false);
      setNewPw("");
      setPwError("");
      alert("비밀번호가 변경되었습니다.");
    } else {
      setPwError("문자, 숫자, 특수기호 혼합 8~15자로 입력하세요.");
    }
  };

  const handleLogout = () => {
    alert("로그아웃 되었습니다.");
    setShowLoginModal(false);
    setIsLoggedIn(false);
    setId("");
    setEmail("");
    setPassword("");
    // 실제 로그아웃 처리 추가
  };

  const handleLogin = () => {
    if (!loginEmail || !loginPassword) {
      setLoginError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    
    // 간단한 로그인 검증 (실제 서비스에서는 서버 API 호출)
    if (loginEmail === 'test@example.com' && loginPassword === 'password123') {
      setLoginError('');
      setEmail(loginEmail);
      setId(loginEmail);
      setPassword(loginPassword);
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setLoginEmail('');
      setLoginPassword('');
      alert('로그인 되었습니다.');
    } else {
      setLoginError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  const handleOpenLoginModal = () => {
    setShowLoginModal(true);
    setLoginError('');
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
    setLoginEmail('');
    setLoginPassword('');
    setLoginError('');
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
      <header
        style={{
          width: "100%",
          maxWidth: 768,
          margin: "0 auto",
          padding: "24px 0 8px 0",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: 24, fontWeight: 700 }}>내 정보</span>
      </header>
      <main
        style={{
          width: "100%",
          maxWidth: 768,
          margin: "0 auto",
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 2px 8px #eee",
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <section style={{ gap: 16, display: "flex", flexDirection: "column" }}>
          {/* 로그인 정보 클릭 시 모달 */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => {
              if (isLoggedIn) {
                setShowLoginModal(true);
              } else {
                handleOpenLoginModal();
              }
            }}
          >
            <span>로그인 정보</span>
            <span style={{ fontWeight: 500 }}>
              {isLoggedIn ? id : "로그인 하기"}
            </span>
          </div>
          {/* 회원 가입 클릭 시 회원가입 모달 */}
          <div
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
            onClick={() => setShowSignupModal(true)}
          >
            <span>회원 가입</span>
            <button style={{ background: "none", border: "none", fontSize: 18 }}>{">"}</button>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              opacity: smsOption === "disable" ? 0.5 : 1,
            }}
            onClick={() => setShowPopup(true)}
          >
            <span>문자 인식 기능 사용하기</span>
            <input
              type="checkbox"
              checked={smsOption !== "disable"}
              onChange={() =>
                setSmsOption(smsOption === "disable" ? "direct" : "disable")
              }
            />
          </div>
          {smsOption === "disable" && (
            <div style={{ color: "#d32f2f", fontSize: 13, marginTop: 6 }}>
              문자 인식 기능이 비활성화되어 있습니다.<br />
              설정에서 다시 활성화할 수 있습니다.
            </div>
          )}
          <div
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
            onClick={() => navigate("/fixed-expense")}
          >
            <span>고정비 지출 관리하기</span>
            <button style={{ background: "none", border: "none", fontSize: 18 }}>{">"}</button>
          </div>
          {/* 오류 신고 줄 클릭 시 오류 신고 페이지로 이동 */}
          <div
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
            onClick={() => navigate("/error-report")}
          >
            <span>오류 신고</span>
            <button style={{ background: "none", border: "none", fontSize: 18 }}>{">"}</button>
          </div>
        </section>
        <section style={{ gap: 16, display: "flex", flexDirection: "column" }}>
          {/* 데이터 초기화 버튼 - 클릭 시 confirm-action 페이지로 이동 */}
          <div
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
            onClick={() => navigate("/confirm-action?type=reset")}
          >
            <span>데이터 초기화</span>
            <button style={{ background: "none", border: "none", fontSize: 18 }}>{">"}</button>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>프로그램 버전</span>
            <span style={{ fontWeight: 500 }}>v1.6.0</span>
          </div>
        </section>
        <section style={{ gap: 16, display: "flex", flexDirection: "column" }}>
          {/* 서비스 탈퇴하기 - 클릭 시 confirm-action 페이지로 이동 */}
          <div
            style={{ color: "#d32f2f", cursor: "pointer", fontWeight: 500, textAlign: "center" }}
            onClick={() => navigate("/confirm-action?type=withdraw")}
          >
            서비스 탈퇴하기
          </div>
        </section>
      </main>
      
      {/* 로그인하기 모달 */}
      {showLoginModal && !isLoggedIn && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={handleCloseLoginModal}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
              padding: "32px 28px 28px 28px",
              minWidth: 320,
              maxWidth: 400,
              width: "90%",
              textAlign: "center",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 닫기 X 아이콘 */}
            <button
              onClick={handleCloseLoginModal}
              style={{
                position: "absolute",
                top: 18,
                right: 18,
                background: "none",
                border: "none",
                fontSize: 26,
                color: "#888",
                cursor: "pointer",
                zIndex: 10,
              }}
              aria-label="닫기"
            >
              <IoClose />
            </button>
            
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>로그인</h3>
            
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 14, color: "#666", marginBottom: 8, textAlign: "left" }}>이메일 주소</div>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="이메일을 입력하세요"
                style={{
                  width: "100%",
                  fontSize: 16,
                  padding: "12px 16px",
                  border: "1px solid #ddd",
                  borderRadius: 8,
                  outline: "none",
                  boxSizing: "border-box"
                }}
              />
            </div>
            
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 14, color: "#666", marginBottom: 8, textAlign: "left" }}>비밀번호</div>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                style={{
                  width: "100%",
                  fontSize: 16,
                  padding: "12px 16px",
                  border: "1px solid #ddd",
                  borderRadius: 8,
                  outline: "none",
                  boxSizing: "border-box"
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleLogin();
                  }
                }}
              />
            </div>
            
            {loginError && (
              <div style={{
                color: "#ef4444",
                fontSize: 14,
                marginBottom: 16,
                textAlign: "left"
              }}>
                {loginError}
              </div>
            )}
            
            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <button
                onClick={handleCloseLoginModal}
                style={{
                  flex: 1,
                  background: "#f5f5f5",
                  color: "#666",
                  border: "none",
                  borderRadius: 8,
                  padding: "12px 0",
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                취소
              </button>
              <button
                onClick={handleLogin}
                style={{
                  flex: 1,
                  background: "#4B4BFF",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "12px 0",
                  fontSize: 16,
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                로그인
              </button>
            </div>
            
            <div style={{ marginTop: 16, fontSize: 14, color: "#888" }}>
              테스트용: test@example.com / password123
            </div>
          </div>
        </div>
      )}
      
      {/* 로그인 정보 모달 */}
      {showLoginModal && isLoggedIn && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.3)",
            zIndex: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setShowLoginModal(false)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 4px 24px #d1d5db",
              padding: "32px 28px 28px 28px",
              minWidth: 300,
              maxWidth: 350,
              textAlign: "center",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 닫기 X 아이콘 */}
            <button
              onClick={() => setShowLoginModal(false)}
              style={{
                position: "absolute",
                top: 18,
                right: 18,
                background: "none",
                border: "none",
                fontSize: 26,
                color: "#888",
                cursor: "pointer",
                zIndex: 10,
              }}
              aria-label="닫기"
            >
              <IoClose />
            </button>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 18 }}>로그인 정보</h3>
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 15, color: "#888", marginBottom: 6, textAlign: "left" }}>이메일 주소</div>
              <div style={{
                fontSize: 16,
                fontWeight: 600,
                background: "#f5f5f5",
                borderRadius: 8,
                padding: "10px 12px",
                marginBottom: 10,
                textAlign: "left"
              }}>
                {email}
              </div>
              <div style={{ fontSize: 15, color: "#888", marginBottom: 6, textAlign: "left" }}>비밀번호</div>
              <div style={{
                display: "flex",
                alignItems: "center",
                background: "#f5f5f5",
                borderRadius: 8,
                padding: "10px 12px",
                marginBottom: 10,
              }}>
                {!editPw ? (
                  <>
                    <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: 2 }}>
                      {"*".repeat(password.length)}
                    </span>
                    <button
                      style={{
                        marginLeft: 12,
                        background: "#4B4BFF",
                        color: "#fff",
                        border: "none",
                        borderRadius: 8,
                        padding: "6px 14px",
                        fontSize: 14,
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                      onClick={() => setEditPw(true)}
                    >
                      수정하기
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      type="password"
                      value={newPw}
                      onChange={handlePwChange}
                      placeholder="새 비밀번호 입력"
                      style={{
                        fontSize: 15,
                        padding: "8px",
                        borderRadius: 8,
                        border: "1px solid #ddd",
                        width: "60%",
                        marginRight: 8,
                      }}
                      maxLength={15}
                    />
                    <button
                      style={{
                        background: "#4B4BFF",
                        color: "#fff",
                        border: "none",
                        borderRadius: 8,
                        padding: "6px 14px",
                        fontSize: 14,
                        cursor: "pointer",
                        fontWeight: 600,
                      }}
                      onClick={handlePwSubmit}
                    >
                      저장
                    </button>
                    <button
                      style={{
                        marginLeft: 6,
                        background: "#eee",
                        color: "#888",
                        border: "none",
                        borderRadius: 8,
                        padding: "6px 10px",
                        fontSize: 14,
                        cursor: "pointer",
                        fontWeight: 500,
                      }}
                      onClick={() => {
                        setEditPw(false);
                        setNewPw("");
                        setPwError("");
                      }}
                    >
                      취소
                    </button>
                  </>
                )}
              </div>
              {pwError && (
                <div style={{ color: "#d32f2f", fontSize: 13, marginBottom: 8 }}>{pwError}</div>
              )}
            </div>
            <button
              style={{
                width: "100%",
                background: "#EF4444",
                color: "#fff",
                fontWeight: 700,
                fontSize: 16,
                border: "none",
                borderRadius: 10,
                padding: "12px 0",
                cursor: "pointer",
                marginTop: 8,
              }}
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </div>
        </div>
      )}
      {/* 회원가입 모달 */}
      {showSignupModal && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.3)",
            zIndex: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setShowSignupModal(false)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 4px 24px #d1d5db",
              padding: "32px 28px 28px 28px",
              minWidth: 300,
              maxWidth: 350,
              textAlign: "center",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 닫기 X 아이콘 */}
            <button
              onClick={() => setShowSignupModal(false)}
              style={{
                position: "absolute",
                top: 18,
                right: 18,
                background: "none",
                border: "none",
                fontSize: 26,
                color: "#888",
                cursor: "pointer",
                zIndex: 10,
              }}
              aria-label="닫기"
            >
              <IoClose />
            </button>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 18 }}>회원 가입</h3>
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 15, color: "#888", marginBottom: 6, textAlign: "left" }}>이메일 주소(ID)</div>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="email"
                  value={signupEmail}
                  onChange={(e) => {
                    setSignupEmail(e.target.value);
                    setSignupEmailError("");
                    setEmailChecked(false);
                  }}
                  placeholder="이메일 주소 입력"
                  style={{
                    fontSize: 15,
                    padding: "8px",
                    borderRadius: 8,
                    border: "1px solid #ddd",
                    flex: 1,
                  }}
                  autoComplete="off"
                />
                <button
                  type="button"
                  style={{
                    background: "#4B4BFF",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    padding: "6px 14px",
                    fontSize: 14,
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                  onClick={handleEmailCheck}
                >
                  중복 확인
                </button>
              </div>
              {signupEmailError && (
                <div style={{ color: "#d32f2f", fontSize: 13, marginTop: 6 }}>{signupEmailError}</div>
              )}
            </div>
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 15, color: "#888", marginBottom: 6, textAlign: "left" }}>비밀번호</div>
              <input
                type="password"
                value={signupPw}
                onChange={(e) => {
                  setSignupPw(e.target.value);
                  setSignupPwError("");
                }}
                placeholder="문자, 숫자, 특수기호 포함 8~15자"
                style={{
                  fontSize: 15,
                  padding: "8px",
                  borderRadius: 8,
                  border: "1px solid #ddd",
                  width: "100%",
                }}
                maxLength={15}
                autoComplete="off"
              />
              {signupPwError && (
                <div style={{ color: "#d32f2f", fontSize: 13, marginTop: 6 }}>{signupPwError}</div>
              )}
            </div>
            <button
              type="button"
              style={{
                width: "100%",
                background: "#4B4BFF",
                color: "#fff",
                fontWeight: 700,
                fontSize: 16,
                border: "none",
                borderRadius: 10,
                padding: "12px 0",
                cursor: "pointer",
                marginTop: 8,
              }}
              onClick={handleSignup}
            >
              입력 완료
            </button>
          </div>
        </div>
      )}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.3)",
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setShowPopup(false)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 2px 8px #aaa",
              padding: 24,
              minWidth: 280,
              maxWidth: 340,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: 18, marginBottom: 16 }}>인식된 문자 내역 등록방법</h3>
            <div style={{ marginBottom: 12 }}>
              <input
                type="radio"
                id="direct"
                name="regtype"
                checked={smsOption === "direct"}
                onChange={() => setSmsOption("direct")}
              />
              <label htmlFor="direct" style={{ marginLeft: 8 }}>
                <b>바로등록</b>
                <br />
                문자 인식과 동시에 가계부에 입력됩니다.
              </label>
            </div>
            <div style={{ marginBottom: 12 }}>
              <input
                type="radio"
                id="select"
                name="regtype"
                checked={smsOption === "select"}
                onChange={() => setSmsOption("select")}
              />
              <label htmlFor="select" style={{ marginLeft: 8 }}>
                <b>확인 후 선택등록</b>
                <br />
                앱이 인식한 문자 목록을 확인하고, 원하는 내역만 선택하여 등록할 수 있습니다.
              </label>
            </div>
            <div style={{ marginBottom: 12 }}>
              <input
                type="radio"
                id="disable"
                name="regtype"
                checked={smsOption === "disable"}
                onChange={() => setSmsOption("disable")}
              />
              <label htmlFor="disable" style={{ marginLeft: 8 }}>
                <b>사용하지 않기</b>
                <br />
                문자 인식 기능을 사용하지 않습니다.
              </label>
            </div>
            <button
              style={{
                marginTop: 16,
                background: "#4B4BFF",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "8px 16px",
                fontSize: 15,
                cursor: "pointer",
                width: "100%",
              }}
              onClick={() => setShowPopup(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
      <BottomNavbar active="mypage" />
    </div>
  );
}

export default MyPage;