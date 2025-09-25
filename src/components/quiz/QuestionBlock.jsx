// src/components/quiz/QuestionBlock.jsx
import React from 'react';

const QuestionBlock = ({ question }) => {
  return (
    <div className="bg-indigo-50 p-6 rounded-xl shadow-lg border-l-4 border-indigo-500 min-h-24 flex items-center">
      <h2 className="text-xl font-bold text-gray-800 leading-relaxed">
        {question}
      </h2>
    </div>
  );
};

export default QuestionBlock;