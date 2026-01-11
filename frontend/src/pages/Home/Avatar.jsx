import React from 'react';

export default function Avatar({ src, size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <img 
        src={src} 
        alt="Avatar"
        className="w-full h-full rounded-full border-2 border-white shadow-lg object-cover"
      />
    </div>
  );
}