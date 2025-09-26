
// src/pages/ChatbotPage.jsx
import React, { useState } from 'react';
import MobileLayout from '../components/layout/MobileLayout';
import BottomNavbar from '../components/common/BottomNavbar';

const ChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // 백엔드 서버의 /api/chat 엔드포인트에 요청 전송
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error('서버 응답 오류');
      }

      const botMessage = await response.json();
      setMessages((prevMessages) => [...prevMessages, botMessage]);

    } catch (error) {
      console.error('챗봇 응답 에러:', error);
      const errorMessage = { role: 'assistant', content: '죄송합니다. 응답을 생성하는 중 오류가 발생했습니다.' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MobileLayout>
      <div className="flex flex-col h-[calc(100vh-120px)]">
        {/* 채팅 메시지 출력 영역 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.role === 'user' ? 'bg-indigo-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-2xl bg-gray-200 text-gray-800">
                ...
              </div>
            </div>
          )}
        </div>

        {/* 메시지 입력 영역 */}
        <div className="p-4 border-t">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="메시지를 입력하세요..."
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="px-5 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 disabled:bg-gray-400"
            >
              전송
            </button>
          </div>
        </div>
      </div>
      <BottomNavbar />
    </MobileLayout>
  );
};

export default ChatbotPage;
