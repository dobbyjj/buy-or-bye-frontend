import React from 'react';
import { useNavigate } from 'react-router-dom';

const SessionExpiredPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // 로그인 페이지로 이동
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center p-4">
      {/* 메인 컨테이너 */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
        {/* 아이콘 영역 */}
        <div className="mb-8">
          <div className="relative mx-auto w-24 h-24">
            {/* 브라우저 윈도우 아이콘 */}
            <div className="bg-blue-100 rounded-lg p-4 w-full h-full flex items-center justify-center relative">
              {/* 브라우저 상단 바 */}
              <div className="absolute top-2 left-2 right-2 flex items-center space-x-1">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
              
              {/* 브라우저 컨텐츠 영역 */}
              <div className="mt-3 flex flex-col items-center">
                {/* 얼굴 표정 */}
                <div className="text-blue-500 text-2xl mb-1">
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  </div>
                  <div className="w-4 h-0.5 bg-blue-500 rounded-full mt-1 mx-auto"></div>
                </div>
              </div>
            </div>
            
            {/* 시계 아이콘 (우상단) */}
            <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-2 shadow-lg">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12,6 12,12 16,14"></polyline>
              </svg>
            </div>
          </div>
        </div>

        {/* 텍스트 영역 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            세션이 만료되었습니다
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            다시 로그인해 주세요. 걱정하지 마세요,<br />
            모든 필터와 설정이 그대로 유지됩니다.
          </p>
        </div>

        {/* 버튼 영역 */}
        <button
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default SessionExpiredPage;
