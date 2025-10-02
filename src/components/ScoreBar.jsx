// src/components/ScoreBar.jsx

import React from 'react';

/**
 * 분석 상세 그래프 막대 하나를 렌더링하는 컴포넌트
 */
const ScoreBar = ({ leftLabel, rightLabel, leftDesc, rightDesc, score, color }) => {
    // score: 오른쪽 성향의 우위 점수 (0~100)
    const leftDominance = 100 - score;

    return (
        <div className="analysis-section" style={{ marginBottom: '30px', width: '100%' }}>
            
            {/* 상단 레이블 (E vs I) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '18px', marginBottom: '8px' }}>
                <span>{leftLabel}</span>
                <span>{rightLabel}</span>
            </div>
            
            {/* 그래프 바 영역 */}
            <div style={{ display: 'flex', alignItems: 'center', height: '12px', backgroundColor: '#e0e0e0', borderRadius: '6px', overflow: 'hidden' }}>
                
                {/* 왼쪽 우세 부분의 빈 공간을 표시 */}
                <div 
                    style={{ 
                        width: `${leftDominance}%`, // 왼쪽 우세 비율
                        height: '100%', 
                        backgroundColor: leftDominance > score ? color : '#e0e0e0', // 더 우세할 때만 색상 표시
                        transition: 'width 0.5s ease-in-out',
                        borderTopLeftRadius: '6px',
                        borderBottomLeftRadius: '6px',
                        // score가 50 이하일 때만 왼쪽 성향이 우세하도록 표시
                    }}
                ></div>

                {/* 오른쪽 우세 부분의 색상 채우기 */}
                 <div 
                    style={{ 
                        width: `${score}%`, // 오른쪽 우세 비율
                        height: '100%', 
                        backgroundColor: score > leftDominance ? color : '#e0e0e0', // 더 우세할 때만 색상 표시
                        transition: 'width 0.5s ease-in-out',
                        borderTopRightRadius: '6px',
                        borderBottomRightRadius: '6px',
                        // score가 50 초과일 때만 오른쪽 성향이 우세하도록 표시
                    }}
                ></div>
            </div>

            {/* 하단 설명 영역 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#666', marginTop: '5px' }}>
                <span style={{ fontWeight: leftDominance > score ? 'bold' : 'normal', color: leftDominance > score ? '#333' : '#999' }}>{leftDesc}</span>
                <span style={{ fontWeight: score > leftDominance ? 'bold' : 'normal', color: score > leftDominance ? '#333' : '#999' }}>{rightDesc}</span>
            </div>
        </div>
    );
};

export default ScoreBar;