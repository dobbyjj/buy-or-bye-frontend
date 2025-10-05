import React, { useMemo, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FiRotateCw, FiBarChart2 } from "react-icons/fi";
import { RiKakaoTalkFill } from "react-icons/ri";
import BottomNavbar from "../components/common/BottomNavbar";
import { mbtiResultData } from "../data/resultData";
import ScoreBar from "../components/ScoreBar";

function ResultPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mbtiType = searchParams.get('mbti');

  const resultData = useMemo(() => {
    return mbtiResultData[mbtiType] || {
        type: "알 수 없음",
        title: "테스트를 다시 진행해주세요",
        description: "결과를 찾을 수 없습니다. 테스트를 다시 시작해주세요.",
        image: null
    };
  }, [mbtiType]);

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init('4a921df40e3e751ec082a72280112191');
    }
  }, []);

  // mbtiType이 없거나 유효하지 않은 경우의 처리
  if (!mbtiType || !mbtiResultData[mbtiType]) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>테스트 결과 오류</h2>
        <p>유효하지 않은 결과입니다. 테스트를 다시 시작해주세요.</p>
        <button onClick={() => navigate("/")}>테스트 다시 시작</button>
      </div>
    );
  }
  
  const AnalysisSection = () => {
    if (!resultData.E_score) return null;

    return (
      <div style={{ 
        marginTop: '40px', 
        padding: '20px', 
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        textAlign: 'left',
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
      }}>
        <h2 style={{ fontSize: '24px', marginBottom: '30px', textAlign: 'center', fontWeight: 700, color: '#4B4BFF' }}>분석 상세</h2>
        
        <h3 style={{ fontSize: '16px', fontWeight: 'normal', color: '#888' }}>WHO</h3>
        <p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>누구를 위해 소비하는지</p>
        <ScoreBar
          leftLabel="모임 E"
          rightLabel="자기만족 I"
          leftDesc="Event"
          rightDesc="Indulgence"
          score={100 - resultData.E_score}
          color="#4CAF50"
        />
        
        <h3 style={{ fontSize: '16px', fontWeight: 'normal', color: '#888' }}>WHEN</h3>
        <p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>언제 소비하는가?</p>
        <ScoreBar
          leftLabel="저평가 될 때 S"
          rightLabel="가치가 높을 때 N"
          leftDesc="Saver"
          rightDesc="Novelty"
          score={resultData.N_score}
          color="#2196F3"
        />

        <h3 style={{ fontSize: '16px', fontWeight: 'normal', color: '#888' }}>WHAT</h3>
        <p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>무엇을 위해 소비하는가</p>
        <ScoreBar
          leftLabel="스펙 중심 T"
          rightLabel="감성 중심 F"
          leftDesc="Tech"
          rightDesc="Feel"
          score={resultData.F_score}
          color="#FFC107"
        />
        
        <h3 style={{ fontSize: '16px', fontWeight: 'normal', color: '#888' }}>HOW</h3>
        <p style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>어떻게 소비하는가?</p>
        <ScoreBar
          leftLabel="계획적 소비 J"
          rightLabel="즉흥적 소비 P"
          leftDesc="Judge"
          rightDesc="Play"
          score={resultData.P_score}
          color="#9C27B0"
        />
      </div>
    );
  };
  
  const handleShare = () => {
    if (window.Kakao && window.Kakao.isInitialized()) {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: `나의 소비 성향: ${mbtiType}`,
          description: `${resultData.title.replace('\n', ' ')} - ${resultData.description}`,
          imageUrl: resultData.image ? resultData.image : undefined,
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: '결과 확인하기',
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    }
  };

  const titleLines = resultData.title.split('\n');
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start", // 상단에서부터 배치
        paddingBottom: 80,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 768, 
          margin: "0 auto",
          padding: "32px 16px",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#4B4BFF", fontWeight: 700, fontSize: 28, marginBottom: 8 }}>
          나의 소비 성향 MBTI는?
        </h2>
        <div style={{ color: "#888", fontSize: 18, marginBottom: 48 }}>
          당신의 성향을 분석한 결과입니다.
        </div>
        
        {/* 콘텐츠를 좌우로 나누는 Flex 컨테이너 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          
          {/* 1. MBTI 유형 및 설명 (가장 위에 배치) */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'center', gap: 48 }}>
            {/* 왼쪽 영역: 이미지와 MBTI 타입 */}
            <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24, maxWidth: 350 }}>
              {resultData.image && (
                <div>
                  <img 
                    src={resultData.image} 
                    alt={resultData.title}
                    style={{
                      width: "100%",
                      maxWidth: 300, 
                      borderRadius: "50%", 
                      margin: "0 auto",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.1)"
                    }}
                  />
                </div>
              )}
              <div
                style={{
                  background: "#4B4BFF",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 52, 
                  borderRadius: 20,
                  padding: "40px 0",
                  boxShadow: "0 4px 16px #e0e0ff",
                  width: "100%",
                  maxWidth: 300,
                }}
              >
                {mbtiType}
              </div>
            </div>

            {/* 오른쪽 영역: 설명과 버튼 */}
            <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 24, maxWidth: 350, textAlign: 'left' }}>
              <div style={{ marginBottom: 8 }}>
                <div style={{ fontSize: 24, fontWeight: 700 }}>
                  {titleLines[0]}
                </div>
                <div style={{ fontSize: 16, fontWeight: 500, color: '#4B4BFF' }}>
                  {titleLines[1]}
                </div>
              </div>
              <div
                style={{
                  background: "#F6F8FF",
                  color: "#333", // 텍스트 색상 변경
                  borderRadius: 12,
                  padding: "20px",
                  fontSize: 16, // 폰트 크기 변경
                  width: '100%',
                  lineHeight: 1.6,
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
                  width: '100%',
                }}
              >
                <button
                  style={{
                    ...buttonBaseStyle,
                    background: "#4B4BFF",
                    color: "#fff",
                    boxShadow: "0 4px 12px #e0e0ff",
                  }}
                  onClick={() => navigate("/")}
                >
                  <FiRotateCw size={22} />
                  테스트 다시 하기
                </button>
                <button
                  style={buttonSecondaryStyle}
                  onClick={() => navigate("/analysis")}
                >
                  <FiBarChart2 size={22} />
                  재무 분석 이어 하기
                </button>
                <button
                  style={{...buttonSecondaryStyle, background: '#FEE500', color: '#000', border: 'none' }}
                  onClick={handleShare}
                >
                  <RiKakaoTalkFill size={22} />
                  카카오톡으로 공유하기
                </button>
              </div>
            </div>
          </div>

          {/* 2. 분석 상세 그래프 영역 */}
          <AnalysisSection />
        </div>
      </div>
      <BottomNavbar />
      </div>
  );
}

// 버튼 기본 스타일 정의 (코드 가독성 향상)
const buttonBaseStyle = {
  width: "100%",
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
};

const buttonSecondaryStyle = {
  ...buttonBaseStyle,
  background: "#fff",
  color: "#4B4BFF",
  border: "2px solid #4B4BFF",
  boxShadow: "0 2px 8px #e0e0ff",
};

export default ResultPage;