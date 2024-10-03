import React from 'react';

export const BackgroundGradient: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return <div className={`bg-gradient-to-r from-purple-400 to-pink-600 ${className}`}>{children}</div>;
};