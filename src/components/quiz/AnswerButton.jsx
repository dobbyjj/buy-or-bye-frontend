// src/components/quiz/AnswerButton.jsx
import React from 'react';

const AnswerButton = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        w-full 
        p-5 
        text-base 
        font-medium 
        text-gray-800 
        bg-white 
        border-2 
        border-gray-200 
        rounded-xl 
        shadow-md 
        hover:bg-indigo-100 
        hover:border-indigo-500
        active:shadow-lg
        transition duration-150
      "
    >
      {text}
    </button>
  );
};

export default AnswerButton;