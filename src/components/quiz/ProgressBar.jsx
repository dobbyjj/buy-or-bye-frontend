// src/components/quiz/ProgressBar.jsx
import React from 'react';

const ProgressBar = ({ current, total }) => {
  const progress = (current / total) * 100;

  return (
    <div className="mb-8">
      {/* 텍스트: 현재 질문 / 전체 질문 */}
      <p className="text-sm font-medium text-indigo-600 mb-2">
        {current} / {total}
      </p>
      {/* 바 영역 */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        {/* 진행된 부분 */}
        <div
          className="bg-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;