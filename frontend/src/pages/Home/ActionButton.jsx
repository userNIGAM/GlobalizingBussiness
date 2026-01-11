import React from 'react';

export default function ActionButton({ 
  icon, 
  activeIcon, 
  label, 
  isActive = false, 
  onClick, 
  activeColor = 'text-purple-600',
  count,
  className = ''
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all hover:bg-white hover:shadow-md ${
        isActive ? activeColor : 'text-gray-600'
      } ${className}`}
    >
      <span className="relative">
        {isActive && activeIcon ? activeIcon : icon}
        {count !== undefined && count > 0 && (
          <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {count}
          </span>
        )}
      </span>
      <span className={`font-medium ${isActive ? 'font-semibold' : ''}`}>
        {label}
      </span>
    </button>
  );
}