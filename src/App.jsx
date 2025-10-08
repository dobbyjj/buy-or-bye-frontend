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
import ErrorReportPage from './pages/ErrorReportPage';
import ConfirmActionPage from './pages/ConfirmActionPage';
import GoalEditPage from './pages/GoalEditPage';
import LoginPage from './pages/LoginPage';
import SessionExpiredPage from './pages/SessionExpiredPage';
import SignupPage from './pages/SignupPage';
import PasswordResetPage from './pages/PasswordResetPage';
import LogoutCompletePage from './pages/LogoutCompletePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/error-report" element={<ErrorReportPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/password-reset" element={<PasswordResetPage />} />
        <Route path="/logout-complete" element={<LogoutCompletePage />} />
        <Route path="/session-expired" element={<SessionExpiredPage />} />

      
        {/* 💥 재무 분석 페이지 경로 추가 */}
        <Route path="/analysis" element={<AnalysisPage />} />
      
        {/* 대시보드는 임시로 남겨둡니다. */}
        <Route path="/dashboard" element={<DashboardPage />} /> 

        {/* 💥 하단 네비게이션 바 경로들 (LedgerPage/AssetPage/ChatbotPage에서 사용) */}
        <Route path="/mypage" element={<MyPage/>} />
        <Route path="/ledger" element={<LedgerPage />} />
        <Route path="/asset" element={<div>자산 수정 (하단3)</div>} />
        <Route path="/chatbot" element={<ChatbotPage />} />

        <Route path="/fixed-expense" element={<FixedExpense />} />
        <Route path="/confirm-action" element={<ConfirmActionPage />} />
        <Route path="/goal-edit" element={<GoalEditPage />} />

        {/* 404 페이지 */}
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
