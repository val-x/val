import React from 'react';
import { Slider } from '@/components/ui/slider';

interface NotebookGuideStatusProps {
  cpu: number;
  gpu: number;
  memory: number;
  storage: number;
  bandwidth: number;
  onUpdate: (resource: string, value: number) => void;
}

export const NotebookGuideStatus: React.FC<NotebookGuideStatusProps> = ({
  cpu,
  gpu,
  memory,
  storage,
  bandwidth,
  onUpdate,
}) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Resource Allocation</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">CPU: {cpu}%</label>
          <Slider value={[cpu]} onValueChange={(value) => onUpdate('cpu', value[0])} max={100} step={1} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">GPU: {gpu}%</label>
          <Slider value={[gpu]} onValueChange={(value) => onUpdate('gpu', value[0])} max={100} step={1} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Memory: {memory}GB</label>
          <Slider value={[memory]} onValueChange={(value) => onUpdate('memory', value[0])} max={64} step={1} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Storage: {storage}GB</label>
          <Slider value={[storage]} onValueChange={(value) => onUpdate('storage', value[0])} max={1000} step={10} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Bandwidth: {bandwidth}Mbps</label>
          <Slider value={[bandwidth]} onValueChange={(value) => onUpdate('bandwidth', value[0])} max={1000} step={10} />
        </div>
      </div>
    </div>
  );
};