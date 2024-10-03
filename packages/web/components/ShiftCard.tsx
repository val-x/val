import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IconPencil, IconX } from "@tabler/icons-react";
import { ShineBorder } from "@/components/ui/shine-border";
import { Button } from "@/components/ui/button"; // Replaced RainbowButton with Button
import { NotebookGuideStatus } from "@/components/notebook-guide-status";

interface ShiftCardProps {
  title: string;
  content: string;
  connectedNodes: number;
  modelHealth: 'good' | 'average' | 'poor';
  onSelect: () => void;
  resources: {
    cpu: number;
    gpu: number;
    memory: number;
    storage: number;
    bandwidth: number;
  };
  onResourceUpdate: (resource: string, value: number) => void;
}

const ShiftCard: React.FC<ShiftCardProps> = ({ 
  title, 
  content, 
  connectedNodes, 
  modelHealth, 
  onSelect, 
  resources, 
  onResourceUpdate 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const healthColors = {
    good: 'bg-green-500',
    average: 'bg-yellow-500',
    poor: 'bg-red-500'
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <ShineBorder>
      <motion.div
        className="bg-gray-800 rounded-xl p-4 w-64 relative overflow-hidden cursor-pointer"
        whileHover={{ scale: 1.05 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
          {connectedNodes} nodes
        </div>
        <h3 className="text-lg font-semibold mt-8 mb-2">{title}</h3>
        <motion.div
          className="text-sm"
          initial={{ height: "3.6em" }}
          animate={{ height: isHovered ? "auto" : "3.6em" }}
        >
          {content}
        </motion.div>
        <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
          <div className={`w-3 h-3 rounded-full ${healthColors[modelHealth]}`}></div>
          {isEditing ? (
            <IconX className="text-gray-400 cursor-pointer" onClick={toggleEdit} />
          ) : (
            <IconPencil className="text-gray-400 cursor-pointer" onClick={toggleEdit} />
          )}
        </div>
        <div className="mt-4">
          <Button onClick={onSelect}>
            Select Model
          </Button>
        </div>
        {isEditing && (
          <div className="mt-4">
            <NotebookGuideStatus {...resources} onUpdate={onResourceUpdate} />
          </div>
        )}
      </motion.div>
    </ShineBorder>
  );
};

export default ShiftCard;