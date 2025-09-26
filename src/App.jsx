import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 페이지 컴포넌트 임포트
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage'; // (결과 페이지 경로도 확인)
import LedgerPage from './pages/LedgerPage';
import AnalysisPage from './pages/AnalysisPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
        
        {/* 💥 재무 분석 페이지 경로 추가 */}
        <Route path="/analysis" element={<AnalysisPage />} />
        
        {/* 대시보드는 임시로 남겨둡니다. */}
        <Route path="/dashboard" element={<DashboardPage />} /> 

        {/* 💥 하단 네비게이션 바 경로들 (LedgerPage/AssetPage/ChatbotPage에서 사용) */}
        <Route path="/mypage" element={<div>My Page (하단1)</div>} />
        <Route path="/ledger" element={<LedgerPage />} />
        <Route path="/asset" element={<div>자산 수정 (하단3)</div>} />
        <Route path="/chatbot" element={<div>챗봇 (하단4)</div>} />

        {/* 404 페이지 */}
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;