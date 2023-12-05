import React from 'react';

const Button = ({ onClick, text, disabled, className }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${className}`}
  >
    {text}
  </button>
);

export default Button;
