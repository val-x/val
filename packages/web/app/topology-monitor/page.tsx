"use client"

import React, { useState, useEffect } from 'react';
import { TopologyMonitor } from '@/components/topology_monitor';

interface TopologyData {
  nodes: any[];
  partitions: any[];
  totalFlops: number;
  chatgptApiEndpoints: string[];
  webChatUrls: string[];
}

export default function TopologyMonitorPage() {
  const [topologyData, setTopologyData] = useState<TopologyData | null>(null);

  useEffect(() => {
    const fetchTopologyData = async () => {
      try {
        const response = await fetch('/api/topology');
        if (!response.ok) {
          throw new Error(`Failed to fetch topology data: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Fetched topology data:', data);
        setTopologyData(data);
      } catch (error) {
        console.error('Error fetching topology data:', error);
      }
    };

    fetchTopologyData();
  }, []);

  if (!topologyData) {
    return <div>Loading topology data...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Topology Monitor</h1>
      <TopologyMonitor initialData={topologyData} />
    </div>
  );
}