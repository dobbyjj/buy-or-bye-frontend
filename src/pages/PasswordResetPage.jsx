import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import flexaiLogo from '../assets/flexai_logo.png';

const PasswordResetPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 비밀번호 리셋 이메일 발송 로직은 나중에 구현
    console.log('Password reset request for:', email);
    setIsSubmitted(true);
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex">
        {/* 왼쪽 확인 메시지 섹션 */}
        <div className="flex-1 flex items-center justify-center px-8 py-12 relative overflow-hidden">
          {/* 메인 배경 로고 */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.02]">
            <div className="flex items-center transform scale-[8] rotate-12">
              <img 
                src={flexaiLogo} 
                alt="Flex AI Background Logo" 
                className="w-16 h-16 mr-4"
              />
              <span className="text-4xl font-bold text-gray-900 whitespace-nowrap">Flex AI</span>
            </div>
          </div>
          
          {/* 확인 메시지 컨테이너 */}
          <div className="w-full max-w-md relative z-10 text-center">
            {/* Flex AI 로고 섹션 */}
            <div className="mb-8">
              <div className="flex items-center justify-center mb-6">
                <img 
                  src={flexaiLogo} 
                  alt="Flex AI Logo" 
                  className="w-10 h-10 mr-3"
                />
                <span className="text-xl font-semibold text-gray-900">Flex AI</span>
              </div>
              
              {/* 성공 아이콘 */}
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                이메일을 확인해주세요
              </h1>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {email}로 비밀번호 재설정 링크를 보내드렸습니다.<br />
                이메일을 확인하고 안내에 따라 비밀번호를 재설정해주세요.
              </p>
              <p className="text-xs text-gray-500 mb-8">
                이메일이 도착하지 않았다면 스팸함을 확인해주세요.
              </p>
            </div>

            {/* 버튼들 */}
            <div className="space-y-3">
              <button
                onClick={handleBackToLogin}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                로그인으로 돌아가기
              </button>
              
              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                다른 이메일로 재전송
              </button>
            </div>
          </div>
        </div>

        {/* 오른쪽 브랜딩 섹션 */}
        <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.08]">
            <img 
              src={flexaiLogo} 
              alt="Flex AI Background Logo" 
              className="w-80 h-80 object-contain transform rotate-12"
            />
          </div>
          
          <div className="flex flex-col justify-center items-center text-white p-12 relative z-10 w-full h-full">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-6 leading-tight">
                보안이 최우선
              </h2>
              <p className="text-xl text-blue-100 leading-relaxed max-w-md">
                안전한 비밀번호 재설정으로<br />
                계정을 보호합니다
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* 왼쪽 비밀번호 리셋 폼 섹션 */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 relative overflow-hidden">
        {/* 메인 배경 로고 */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02]">
          <div className="flex items-center transform scale-[8] rotate-12">
            <img 
              src={flexaiLogo} 
              alt="Flex AI Background Logo" 
              className="w-16 h-16 mr-4"
            />
            <span className="text-4xl font-bold text-gray-900 whitespace-nowrap">Flex AI</span>
          </div>
        </div>
        
        {/* 비밀번호 리셋 폼 컨테이너 */}
        <div className="w-full max-w-md relative z-10">
          {/* Flex AI 로고 섹션 */}
          <div className="mb-8">
            <div className="flex items-center mb-6">
              <img 
                src={flexaiLogo} 
                alt="Flex AI Logo" 
                className="w-10 h-10 mr-3"
              />
              <span className="text-xl font-semibold text-gray-900">Flex AI</span>
            </div>
            
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">
              비밀번호 재설정
            </h1>
            <p className="text-gray-500 text-sm">
              가입하신 이메일 주소를 입력해주세요.<br />
              비밀번호 재설정 링크를 보내드립니다.
            </p>
          </div>

          {/* 비밀번호 리셋 폼 */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 이메일 입력 */}
            <div>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일 주소"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10 bg-white/90 backdrop-blur-sm"
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
            </div>

            {/* 리셋 이메일 발송 버튼 */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-lg"
            >
              재설정 링크 보내기
            </button>

            {/* 로그인으로 돌아가기 */}
            <div className="text-center">
              <button
                type="button"
                onClick={handleBackToLogin}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline"
              >
                로그인으로 돌아가기
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 오른쪽 브랜딩 섹션 */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.08]">
          <img 
            src={flexaiLogo} 
            alt="Flex AI Background Logo" 
            className="w-80 h-80 object-contain transform rotate-12"
          />
        </div>
        
        <div className="flex flex-col justify-center items-center text-white p-12 relative z-10 w-full h-full">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6 leading-tight">
              계정 보안
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed max-w-md">
              걱정하지 마세요!<br />
              몇 번의 클릭으로 다시 시작할 수 있습니다
            </p>
          </div>

          {/* 보안 특징 */}
          <div className="mt-12 space-y-4 max-w-sm">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-blue-100 text-sm">안전한 이메일 인증</span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <span className="text-blue-100 text-sm">암호화된 데이터 전송</span>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-blue-100 text-sm">빠른 처리</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPage;
