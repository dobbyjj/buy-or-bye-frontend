// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage'; // 👈 이 경로가 맞나요?
import ResultPage from './pages/ResultPage'; // (결과 페이지 경로도 확인)

// src/App.jsx (수정된 Routes 부분)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        
        {/* 💥💥 이 줄을 추가해야 합니다! 💥💥 */}
        <Route path="/result" element={<ResultPage />} /> 

        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;