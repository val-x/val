import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Node {
  id: string;
  model: string;
  memory: number;
  flops: number;
  isActive: boolean;
  isCurrentNode: boolean;
}

interface Partition {
  nodeId: string;
  start: number;
  end: number;
}

interface TopologyData {
  nodes: Node[];
  partitions: Partition[];
  totalFlops: number;
  chatgptApiEndpoints: string[];
  webChatUrls: string[];
}

interface TopologyMonitorProps {
  initialData: TopologyData;
}

export const TopologyMonitor: React.FC<TopologyMonitorProps> = ({ initialData }) => {
  const [topologyData, setTopologyData] = useState<TopologyData | null>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_TOPOLOGY_API_URL || '/api/topology';
        console.log('Fetching topology data from:', apiUrl);
        const response = await axios.get(apiUrl);
        setTopologyData(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching topology data:', error);
        setError('Failed to fetch topology data. Please try again later.');
        setTopologyData(null);
      } finally {
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchData();

    // Set up interval for periodic updates
    const intervalId = setInterval(fetchData, 30000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  if (isLoading && !topologyData) {
    return <div>Loading topology data...</div>;
  }

  if (error || !topologyData) {
    return <div className="text-red-500">{error || 'Topology data not available'}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Network Topology</h2>
      <div className="bg-secondary p-4 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg">Total FLOPS: {topologyData.totalFlops.toFixed(2)} TFLOPS</p>
          <p className="text-lg">Nodes: {topologyData.nodes.length}</p>
        </div>
        <GradientBar totalFlops={topologyData.totalFlops} />
        <TopologyViz nodes={topologyData.nodes} partitions={topologyData.partitions} />
        
        {/* Display ChatGPT API endpoints */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">ChatGPT API Endpoints:</h3>
          <ul className="list-disc list-inside">
            {topologyData.chatgptApiEndpoints.map((endpoint, index) => (
              <li key={index}>{endpoint}</li>
            ))}
          </ul>
        </div>
        
        {/* Display Web Chat URLs */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Web Chat URLs:</h3>
          <ul className="list-disc list-inside">
            {topologyData.webChatUrls.map((url, index) => (
              <li key={index}>{url}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const GradientBar: React.FC<{ totalFlops: number }> = ({ totalFlops }) => {
  const barWidth = 300;
  const barHeight = 20;
  const position = Math.min((Math.tanh(Math.cbrt(totalFlops)/2.5 - 2) + 1) * barWidth / 2, barWidth);

  return (
    <div className="relative w-full mb-8">
      <div className="text-sm mb-1 flex justify-between">
        <span>GPU poor</span>
        <span>GPU rich</span>
      </div>
      <div className="relative h-5">
        <div className="absolute w-full h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded"></div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-white"></div>
        </div>
        <div 
          className="absolute top-full transform -translate-x-1/2 mt-4 text-sm"
          style={{ left: `${position}px` }}
        >
          {totalFlops.toFixed(2)} TFLOPS
        </div>
      </div>
    </div>
  );
};

const TopologyViz: React.FC<{ nodes: Node[], partitions: Partition[] }> = ({ nodes, partitions }) => {
  const radius = 150;
  const centerX = 200;
  const centerY = 200;

  return (
    <svg width="400" height="400" viewBox="0 0 400 400">
      {nodes.map((node, index) => {
        const angle = (2 * Math.PI * index) / nodes.length;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        const partition = partitions.find(p => p.nodeId === node.id);

        return (
          <g key={node.id}>
            <circle
              cx={x}
              cy={y}
              r={10}
              fill={node.isActive ? 'red' : node.isCurrentNode ? 'green' : 'blue'}
            />
            <text x={x} y={y + 20} textAnchor="middle" fill="currentColor" fontSize="10">
              {node.model} {node.memory}GB
            </text>
            <text x={x} y={y + 32} textAnchor="middle" fill="currentColor" fontSize="10">
              {node.flops.toFixed(2)} TFLOPS
            </text>
            {partition && (
              <text x={x} y={y + 44} textAnchor="middle" fill="currentColor" fontSize="10">
                [{partition.start.toFixed(2)}-{partition.end.toFixed(2)}]
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};