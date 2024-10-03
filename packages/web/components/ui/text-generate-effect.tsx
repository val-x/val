import React from 'react';

export const TextGenerateEffect: React.FC<{ words: string; className?: string }> = ({ words, className }) => {
  return <h1 className={className}>{words}</h1>;
};