// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';       // 👈 테스트 시작 화면
import QuizPage from './pages/QuizPage';       // 테스트 질문 페이지
import ResultPage from './pages/ResultPage';   // 테스트 결과 페이지
import DashboardPage from './pages/DashboardPage'; // 👈 가계부 대시보드
import ChatbotPage from './pages/ChatbotPage'; // 👈 챗봇 페이지

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 💥 루트 경로를 HomePage로 다시 연결 (이전처럼 테스트 시작 화면) 💥 */}
        <Route path="/" element={<HomePage />} /> 
        
        {/* 테스트 관련 경로 */}
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
        
        {/* 💥 대시보드는 /dashboard 경로로 이동 💥 */}
        <Route path="/dashboard" element={<DashboardPage />} /> 

        {/* 대시보드의 하단 내비게이션 바 임시 경로들 */}
        <Route path="/mypage" element={<div>My Page (하단1)</div>} />
        <Route path="/ledger" element={<div>가계부 수정 (하단2)</div>} />
        <Route path="/asset" element={<div>자산 수정 (하단3)</div>} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;