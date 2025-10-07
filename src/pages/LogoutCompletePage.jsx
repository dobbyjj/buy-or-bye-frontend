import React from 'react';
import { useNavigate } from 'react-router-dom';
import flexaiLogo from '../assets/flexai_logo.png';

const LogoutCompletePage = () => {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate('/login');
  };

  const handleGoToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center p-4">
      {/* 메인 컨테이너 */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
        {/* 로고 영역 */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <img 
              src={flexaiLogo} 
              alt="Flex AI Logo" 
              className="w-12 h-12 mr-3"
            />
            <span className="text-2xl font-bold text-gray-900">Flex AI</span>
          </div>

          {/* 성공 아이콘 */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* 텍스트 영역 */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            로그아웃 되었습니다
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            안전하게 로그아웃되었습니다.<br />
            이용해 주셔서 감사합니다.
          </p>
        </div>

        {/* 버튼 영역 */}
        <div className="space-y-3">
          <button
            onClick={handleGoToLogin}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            다시 로그인
          </button>
          
          <button
            onClick={handleGoToHome}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-8 py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            홈으로 이동
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutCompletePage;
