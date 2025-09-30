import React from "react";
import { FiRotateCw, FiBarChart2, FiShare } from "react-icons/fi";
import BottomNavbar from "../components/common/BottomNavbar";

function ResultPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: 80,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          margin: "0 auto",
          padding: "32px 0 0 0",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#4B4BFF", fontWeight: 700, fontSize: 24, marginBottom: 8 }}>
          나의 소비 성향 MBTI는?
        </h2>
        <div style={{ color: "#888", fontSize: 16, marginBottom: 32 }}>
          당신의 성향을 분석한 결과입니다.
        </div>
        <div
          style={{
            background: "#4B4BFF",
            color: "#fff",
            fontWeight: 700,
            fontSize: 40,
            borderRadius: 20,
            padding: "32px 0",
            margin: "0 auto 24px auto",
            boxShadow: "0 4px 16px #e0e0ff",
            width: "80%",
            maxWidth: 260,
          }}
        >
          INFP
        </div>
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
          <span role="img" aria-label="money">💸</span> 개인 만족형 낭만 소비
        </div>
        <div
          style={{
            background: "#F6F8FF",
            color: "#4B4BFF",
            borderRadius: 12,
            padding: "16px 12px",
            margin: "0 auto 32px auto",
            fontSize: 16,
            maxWidth: 320,
            boxShadow: "0 2px 8px #e0e0ff",
          }}
        >
          개인 만족, 브랜드 스토리·경험에 즉흥적·감성적 소비
        </div>
        {/* 버튼 영역 */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <button
            style={{
              width: "100%",
              maxWidth: 320,
              background: "#4B4BFF",
              color: "#fff",
              border: "none",
              borderRadius: 12,
              padding: "14px 0",
              fontSize: 18,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              cursor: "pointer",
              boxShadow: "0 2px 8px #e0e0ff",
            }}
            onClick={() => window.location.href = "/"}
          >
            <FiRotateCw size={22} />
            테스트 다시 하기
          </button>
          <button
            style={{
              width: "100%",
              maxWidth: 320,
              background: "#fff",
              color: "#4B4BFF",
              border: "2px solid #4B4BFF",
              borderRadius: 12,
              padding: "14px 0",
              fontSize: 18,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              cursor: "pointer",
              boxShadow: "0 2px 8px #e0e0ff",
            }}
            onClick={() => window.location.href = "/analysis"}
          >
            <FiBarChart2 size={22} />
            재무 분석 이어 하기
          </button>
          <button
            style={{
              width: "100%",
              maxWidth: 320,
              background: "#fff",
              color: "#4B4BFF",
              border: "2px solid #4B4BFF",
              borderRadius: 12,
              padding: "14px 0",
              fontSize: 18,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              cursor: "pointer",
              boxShadow: "0 2px 8px #e0e0ff",
            }}
            onClick={() => window.navigator.share
              ? window.navigator.share({ title: "소비 성향 MBTI", url: window.location.href })
              : alert("공유 기능을 지원하지 않는 브라우저입니다.")
            }
          >
            <FiShare size={22} />
            공유하기
          </button>
        </div>
      </div>
      <BottomNavbar />
    </div>
  );
}

export default ResultPage;