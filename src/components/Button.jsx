// Button.jsx
import React from 'react';

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base =
    'font-sans font-semibold px-6 py-2 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500';
  const variants = {
    primary:
      'bg-green-700 text-white hover:bg-green-600 shadow-sm hover:shadow-lg',
    secondary:
      'bg-gray-200 text-gray-800 hover:bg-gray-300',
  };
  return (
    <button
      className={`${base} ${variants[variant] || ''} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
