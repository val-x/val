import React from 'react';

interface HoverEffectProps {
  items: Array<{
    title: string;
    description: string;
    link: string;
  }>;
}

export const HoverEffect: React.FC<HoverEffectProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item, index) => (
        <div key={index} className="p-4 border rounded-lg hover:shadow-lg transition-shadow">
          <h3 className="font-bold">{item.title}</h3>
          <p>{item.description}</p>
          <a href={item.link} className="text-blue-500 hover:underline">Learn More</a>
        </div>
      ))}
    </div>
  );
};