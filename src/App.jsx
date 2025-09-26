import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import DashboardPage from './pages/DashboardPage';
import ChatbotPage from './pages/ChatbotPage';
import MyPage from './pages/MyPage';
import FixedExpense from './pages/FixedExpense'; // 추가

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/fixed-expense" element={<FixedExpense />} /> {/* 추가 */}
        <Route path="/ledger" element={<div>가계부 수정 (하단2)</div>} />
        <Route path="/asset" element={<div>자산 수정 (하단3)</div>} />
        <Route path="/chatbot" element={<ChatbotPage />} />
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;