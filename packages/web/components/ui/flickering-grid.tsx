import React, { useEffect, useRef } from 'react';

interface FlickeringGridProps {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  maxOpacity?: number;
}

export const FlickeringGrid: React.FC<FlickeringGridProps> = ({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = 'rgb(0, 0, 0)',
  maxOpacity = 0.2,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const drawGrid = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let x = 0; x < canvas.width; x += squareSize + gridGap) {
        for (let y = 0; y < canvas.height; y += squareSize + gridGap) {
          if (Math.random() < flickerChance) {
            ctx.fillStyle = `${color.slice(0, -1)}, ${Math.random() * maxOpacity})`;
            ctx.fillRect(x, y, squareSize, squareSize);
          }
        }
      }
      
      requestAnimationFrame(drawGrid);
    };

    drawGrid();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [squareSize, gridGap, flickerChance, color, maxOpacity]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0" />;
};