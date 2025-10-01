import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiRotateCw, FiBarChart2, FiShare } from "react-icons/fi";
import BottomNavbar from "../components/common/BottomNavbar";
import { mbtiResultData } from "../data/resultData";

const calculateMBTI = (answers) => {
  if (!answers || answers.length === 0) {
    return 'UNKNOWN';
  }

  const counts = { E: 0, I: 0, N: 0, S: 0, T: 0, F: 0, J: 0, P: 0 };
  answers.forEach(type => {
    if (counts.hasOwnProperty(type)) {
      counts[type]++;
    }
  });

  const personality = [];
  personality.push(counts.E >= counts.I ? 'E' : 'I');
  personality.push(counts.N >= counts.S ? 'N' : 'S');
  personality.push(counts.T >= counts.F ? 'T' : 'F');
  personality.push(counts.J >= counts.P ? 'J' : 'P');

  return personality.join('');
};

function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const finalAnswers = location.state?.finalAnswers;

  const { mbtiType, resultData } = useMemo(() => {
    const calculatedMBTI = calculateMBTI(finalAnswers);
    const data = mbtiResultData[calculatedMBTI] || {
        type: "알 수 없음",
        title: "테스트를 다시 진행해주세요",
        description: "충분한 답변이 수집되지 않았습니다.",
        image: null // 이미지가 없는 경우를 대비
    };
    return { mbtiType: calculatedMBTI, resultData: data };
  }, [finalAnswers]);
  
  const handleShare = () => {
    const shareText = `나의 소비 성향 MBTI는 ${mbtiType} (${resultData.title})! ${resultData.description} 결과를 확인해보세요!`;
    
    if (navigator.share) {
      navigator.share({
        title: '나의 소비 성향 MBTI 결과',
        text: shareText,
        url: window.location.href,
      }).catch(console.error);
    } else {
      const shareUrl = `${window.location.origin}/result?mbti=${mbtiType}`;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(`${shareText}\n링크: ${shareUrl}`);
        alert("결과가 클립보드에 복사되었습니다!");
      } else {
        alert("공유 기능을 지원하지 않는 브라우저입니다. (결과: " + mbtiType + ")");
      }
    }
  };

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
        <div style={{ color: "#888", fontSize: 16, marginBottom: 24 }}>
          당신의 성향을 분석한 결과입니다.
        </div>
        
        {/* MBTI 결과 이미지를 표시하는 부분 */}
        {resultData.image && (
          <div style={{ marginBottom: 24 }}>
            <img 
              src={resultData.image} 
              alt={resultData.title}
              style={{
                width: "80%",
                maxWidth: 260,
                borderRadius: 20,
                margin: "0 auto",
                boxShadow: "0 4px 16px #e0e0ff"
              }}
            />
          </div>
        )}
        
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
          {mbtiType}
        </div>
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
          <span role="img" aria-label="money">💸</span> {resultData.title}
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
          {resultData.description}
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
            onClick={() => navigate("/")}
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
            onClick={() => navigate("/analysis")}
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
            onClick={handleShare}
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