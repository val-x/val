import React from 'react';

export const ShineBorder: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
      <div className="relative">
        {children}
      </div>
    </div>
  );
};