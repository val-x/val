import React, { useState, useEffect } from 'react';
import { Button, Table } from 'antd';

const TopologyMonitor = ({ onClose, fetchTopologyData }) => {
  const [topologyData, setTopologyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTopologyData();
      setTopologyData(data);
    };
    fetchData();
    const interval = setInterval(fetchData, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, [fetchTopologyData]);

  const columns = [
    {
      title: 'Node ID',
      dataIndex: 'nodeId',
      key: 'nodeId',
    },
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'Memory',
      dataIndex: 'memory',
      key: 'memory',
    },
    {
      title: 'TFLOPS',
      dataIndex: 'tflops',
      key: 'tflops',
    },
    {
      title: 'Partition',
      dataIndex: 'partition',
      key: 'partition',
    },
  ];

  return (
    <div>
      <h2>Topology Monitor</h2>
      <Table dataSource={topologyData} columns={columns} rowKey="nodeId" />
      <Button onClick={onClose}>Close</Button>
    </div>
  );
};

export default TopologyMonitor;