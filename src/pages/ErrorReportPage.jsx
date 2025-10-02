import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoRefreshOutline } from "react-icons/io5";
import BottomNavbar from "../components/common/BottomNavbar"; // 상단에 import 추가

const ErrorReportPage = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  // 내용 300자 제한
  const handleContentChange = (e) => {
    const value = e.target.value.slice(0, 300);
    setContent(value);
  };

  // 이미지 업로드
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // 이전 페이지로 이동
  const handleGoBack = () => {
    navigate(-1);
  };

  // 보내기 버튼 클릭
  const handleSubmit = (e) => {
    e.preventDefault();
    // 실제 전송 로직은 필요에 따라 구현
    alert("오류 신고가 접수되었습니다.");
    setContent("");
    setImage(null);
  };

return (
  <div
    style={{
      minHeight: "100vh",
      background: "#fafafa",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "32px 0",
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: 768,
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 2px 8px #eee",
        padding: "24px 20px",
      }}
    >
      {/* 헤더 영역 */}
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        position: "relative", 
        marginBottom: 24 
      }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0 }}>
          오류 신고
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
        <label style={{ fontWeight: 600, fontSize: 16, marginBottom: 8, display: "block" }}>
          오류 신고 내용
        </label>
        <textarea
          value={content}
          onChange={handleContentChange}
          maxLength={300}
          rows={5}
          placeholder="오류 내용을 입력하세요 (최대 300자)"
          style={{
            width: "100%",
            borderRadius: 8,
            border: "1px solid #ddd",
            padding: "10px",
            fontSize: 15,
            marginBottom: 8,
            resize: "none",
          }}
          required
        />
        <div style={{ textAlign: "right", fontSize: 13, color: "#888", marginBottom: 16 }}>
          {content.length}/300
        </div>
        <label style={{ fontWeight: 600, fontSize: 16, marginBottom: 8, display: "block" }}>
          첨부 이미지
        </label>
        <div style={{ marginBottom: 20 }}>
          <input
            type="file"
            accept="image/*"
            id="image-upload"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <label htmlFor="image-upload" style={{
            display: "inline-block",
            width: 80,
            height: 80,
            border: "2px dashed #ccc",
            borderRadius: 12,
            background: "#fafafa",
            cursor: "pointer",
            textAlign: "center",
            lineHeight: "80px",
            fontSize: 32,
            color: "#bbb",
            position: "relative"
          }}>
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="첨부 이미지"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 12,
                }}
              />
            ) : (
              <span role="img" aria-label="카메라">📷</span>
            )}
          </label>
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            background: "#4B4BFF",
            color: "#fff",
            fontWeight: 700,
            fontSize: 17,
            border: "none",
            borderRadius: 10,
            padding: "12px 0",
            cursor: "pointer",
            marginTop: 8,
          }}
        >
          보내기
        </button>
      </form>
    </div>

    {/* 흰 박스 바깥쪽 회색 원형 돌아가기 버튼 */}
    <button
      onClick={handleGoBack}
      style={{
        position: "fixed",
        bottom: 100,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: "50%",
        backgroundColor: "#9CA3AF",
        border: "none",
        color: "white",
        fontSize: 24,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        zIndex: 1000,
      }}
      aria-label="이전으로 가기"
    >
      <IoRefreshOutline style={{ transform: "scaleX(-1)" }} />
    </button>

    <BottomNavbar active="chatbot" />
  </div>
);
};


export default ErrorReportPage;