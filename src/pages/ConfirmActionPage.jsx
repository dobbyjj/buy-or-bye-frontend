import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BottomNavbar from "../components/common/BottomNavbar";

const actionText = {
  reset: "데이터 초기화",
  withdraw: "서비스 탈퇴하기",
};

const submitAction = (type) => {
  if (type === "reset") {
    // 데이터 초기화 처리
    alert("데이터가 초기화되었습니다.");
  } else if (type === "withdraw") {
    // 서비스 탈퇴 처리
    alert("서비스에서 탈퇴되었습니다.");
  }
};

const ConfirmActionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // 쿼리스트링 또는 state로 type 전달 (예: /confirm-action?type=reset)
  const params = new URLSearchParams(location.search);
  const type = params.get("type") || "reset";
  const title = actionText[type] || "확인";

  const handleConfirm = () => {
    submitAction(type);
    navigate("/mypage");
  };

  const handleCancel = () => {
    navigate("/mypage");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f9f9f9 60%, #e8eaf6 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 80,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 4px 24px #d1d5db",
          padding: "36px 28px 28px 28px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 18, color: "#222" }}>
          {title}
        </h2>
        <div style={{ fontSize: 16, color: "#555", marginBottom: 32, lineHeight: 1.6 }}>
          {title}를 진행하려고 합니다.<br />
          동의하십니까?
        </div>
        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <button
            onClick={handleCancel}
            style={{
              flex: 1,
              background: "#f5f5f5",
              color: "#888",
              fontWeight: 600,
              fontSize: 16,
              border: "none",
              borderRadius: 8,
              padding: "12px 0",
              cursor: "pointer",
              boxShadow: "0 2px 8px #eee",
              transition: "background 0.2s",
            }}
          >
            취소
          </button>
          <button
            onClick={handleConfirm}
            style={{
              flex: 1,
              background: "#4B4BFF",
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
              border: "none",
              borderRadius: 8,
              padding: "12px 0",
              cursor: "pointer",
              boxShadow: "0 2px 8px #d1d5db",
              transition: "background 0.2s",
            }}
          >
            확인
          </button>
        </div>
      </div>
      <BottomNavbar active="mypage" />
    </div>
  );
};

export default ConfirmActionPage;