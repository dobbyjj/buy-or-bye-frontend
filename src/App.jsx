import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import DashboardPage from './pages/DashboardPage';
import ChatbotPage from './pages/ChatbotPage';
import MyPage from './pages/MyPage';
import FixedExpense from './pages/FixedExpense'; // 추가
import LedgerPage from './pages/LedgerPage';
import AnalysisPage from './pages/AnalysisPage';

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
        <Route path="/chatbot" element={<ChatbotPage />} />

        {/* 404 페이지 */}
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;