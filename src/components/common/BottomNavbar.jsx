// src/components/common/BottomNavbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { name: 'My Page', path: '/mypage', icon: '👤' },
  { name: '가계부', path: '/ledger', icon: '📝' },
  { name: '자산', path: '/asset', icon: '💰' },
  { name: '챗봇', path: '/chatbot', icon: '🤖' },
];

const BottomNavbar = () => {
  return (
    // 하단 고정: fixed bottom-0, w-full
    // 반응형: MobileLayout과 동일하게 md:max-w-2xl (768px) 내에서 중앙 정렬
    <nav className="fixed bottom-0 left-0 right-0 z-10 w-full bg-white border-t border-gray-200 
                    md:max-w-2xl md:mx-auto md:shadow-2xl"> 
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => 
              `flex flex-col items-center justify-center p-2 text-sm font-medium transition duration-150 
               ${isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`
            }
          >
            <span className="text-xl mb-0.5">{item.icon}</span>
            <span className="text-xs">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavbar;