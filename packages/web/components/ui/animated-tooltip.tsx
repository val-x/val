import React from 'react';
import Image from 'next/image';

interface AnimatedTooltipProps {
  items: Array<{
    id: number;
    name: string;
    designation: string;
    image: string;
  }>;
}

export const AnimatedTooltip: React.FC<AnimatedTooltipProps> = ({ items }) => {
  return (
    <div className="flex space-x-4">
      {items.map((item) => (
        <div key={item.id} className="relative group">
          <Image
            src={item.image}
            alt={item.name}
            width={50}
            height={50}
            className="rounded-full"
          />
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-white text-black p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
            <p className="font-bold">{item.name}</p>
            <p>{item.designation}</p>
          </div>
        </div>
      ))}
    </div>
  );
};