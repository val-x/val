import React from 'react';

interface Iphone15ProProps {
  width?: number;
  height?: number;
  src: string;
}

const Iphone15Pro: React.FC<Iphone15ProProps> = ({ width = 433, height = 882, src }) => {
  return (
    <div style={{ width, height, position: 'relative' }}>
      <svg width={width} height={height} viewBox="0 0 433 882" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* iPhone 15 Pro SVG path here */}
      </svg>
      <div style={{
        position: 'absolute',
        top: '3%',
        left: '6%',
        width: '88%',
        height: '94%',
        borderRadius: '40px',
        overflow: 'hidden'
      }}>
        <iframe src={src} style={{ width: '100%', height: '100%', border: 'none' }} />
      </div>
    </div>
  );
};

export default Iphone15Pro;