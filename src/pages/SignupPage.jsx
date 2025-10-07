import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import flexaiLogo from '../assets/flexai_logo.png';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    
    // 비밀번호 확인 검증
    if (formData.password !== formData.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    
    // 회원가입 로직은 나중에 구현
    console.log('Signup attempt:', formData);
    // 임시로 로그인 페이지로 이동
    navigate('/login');
  };



  return (
    <div className="min-h-screen bg-white flex">
      {/* 왼쪽 회원가입 폼 섹션 */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 relative overflow-hidden">
        {/* 메인 배경 로고 - 상단 로고를 크게 해서 배경으로 */}
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
        
        {/* 회원가입 폼 컨테이너 */}
        <div className="w-full max-w-md relative z-10">
          {/* Flex AI 로고 섹션 - 상단 작은 로고 */}
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
              계정을 만들어보세요.
            </h1>
            <p className="text-gray-500 text-sm">
              몇 초만에 가입하고 Flex AI와 함께 시작하세요.
            </p>
          </div>

          {/* 회원가입 폼 */}
          <form onSubmit={handleSignup} className="space-y-4">
            {/* 닉네임 입력 */}
            <div>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="닉네임"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10 bg-white/90 backdrop-blur-sm"
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* 이메일 입력 */}
            <div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
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
                <button
                  type="button"
                  onClick={() => {
                    // 중복확인 로직은 나중에 구현
                    console.log('Email duplicate check:', formData.email);
                    alert('이메일 중복확인 기능은 준비중입니다.');
                  }}
                  className="px-4 py-3 bg-gray-100 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 whitespace-nowrap"
                >
                  중복확인
                </button>
              </div>
            </div>

            {/* 비밀번호 입력 */}
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="비밀번호"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10 pr-10 bg-white/90 backdrop-blur-sm"
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {showPassword ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* 비밀번호 확인 입력 */}
            <div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="비밀번호 확인"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10 pr-10 bg-white/90 backdrop-blur-sm"
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {showConfirmPassword ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* 회원가입 버튼 */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              회원가입
            </button>

            {/* 로그인 링크 */}
            <div className="text-center pt-4">
              <p className="text-sm text-gray-600">
                이미 계정이 있으신가요?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-blue-600 hover:text-blue-800 font-medium hover:underline"
                >
                  로그인
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* 오른쪽 브랜딩 섹션 */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
        {/* 단일 배경 로고 - 심플하게 */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.08]">
          <img 
            src={flexaiLogo} 
            alt="Flex AI Background Logo" 
            className="w-80 h-80 object-contain transform rotate-12"
          />
        </div>
        
        <div className="flex flex-col justify-center items-center text-white p-12 relative z-10 w-full h-full">
          {/* 환영 메시지 */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 leading-tight">
              Flex AI와 함께<br />
              <span className="text-blue-200">스마트한 시작</span>
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed max-w-md whitespace-nowrap">
              개인 맞춤형 AI 서비스로 더 나은 경험을 시작하세요
            </p>
          </div>

          {/* 특징 리스트 */}
          <div className="space-y-6 max-w-sm">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-blue-100">개인 맞춤형 AI</h3>
                <p className="text-sm text-blue-200">당신만의 AI 어시스턴트</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-blue-100">안전한 보안</h3>
                <p className="text-sm text-blue-200">데이터 보호 최우선</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-blue-100">빠른 처리</h3>
                <p className="text-sm text-blue-200">실시간 AI 응답</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
