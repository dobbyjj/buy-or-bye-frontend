// src/App.jsx (Routes 부분)


import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';       // 👈 경로 확인
import QuizPage from './pages/QuizPage';       // 👈 경로 확인
import ResultPage from './pages/ResultPage';   // 👈 경로 확인
import AnalysisPage from './pages/AnalysisPage'; // 👈 경로 확인
import DashboardPage from './pages/DashboardPage'; // 👈 경로 확인
import LedgerPage from './pages/LedgerPage'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
        
        {/* 💥 재무 분석 페이지 경로 추가 💥 */}
        <Route path="/analysis" element={<AnalysisPage />} /> 
        
        {/* 대시보드는 임시로 남겨둡니다. */}
        <Route path="/dashboard" element={<DashboardPage />} /> 

        {/* 하단 내비게이션 바 임시 경로들 (AnalysisPage에서 사용) */}
        <Route path="/mypage" element={<div>My Page (하단1)</div>} />
         <Route path="/ledger" element={<LedgerPage />} /> 
        <Route path="/asset" element={<div>자산 수정 (하단3)</div>} />
        <Route path="/chatbot" element={<div>챗봇 (하단4)</div>} />
        
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;