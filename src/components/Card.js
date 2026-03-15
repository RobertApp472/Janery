// Card.js
import React from 'react';

export default function Card({ children, className = '', style }) {
  return (
    <div
      className={`bg-white rounded-xl shadow-md p-6 font-sans ${className}`.trim()}
      style={style}
    >
      {children}
    </div>
  );
}
