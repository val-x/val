import React from 'react';

interface SafariProps {
  width?: number;
  height?: number;
  url: string;
  src: string;
}

const Safari: React.FC<SafariProps> = ({ width = 1203, height = 753, url, src }) => {
  return (
    <div style={{ width, height, position: 'relative' }}>
      <svg width={width} height={height} viewBox="0 0 1203 753" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Safari SVG path here */}
      </svg>
      <div style={{
        position: 'absolute',
        top: '8%',
        left: '0.5%',
        width: '99%',
        height: '91.5%',
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px',
        overflow: 'hidden'
      }}>
        <iframe src={src} style={{ width: '100%', height: '100%', border: 'none' }} />
      </div>
      <div style={{
        position: 'absolute',
        top: '3.5%',
        left: '35%',
        width: '30%',
        textAlign: 'center',
        color: '#000',
        fontSize: '14px'
      }}>
        {url}
      </div>
    </div>
  );
};

export default Safari;