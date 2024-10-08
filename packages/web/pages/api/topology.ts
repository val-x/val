import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const TOPOLOGY_API_URL = process.env.NEXT_PUBLIC_TOPOLOGY_API_URL || 'http://localhost:5000/api/topology';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      console.log('Fetching topology data from:', TOPOLOGY_API_URL);
      const response = await axios.get(TOPOLOGY_API_URL);
      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error fetching topology data:', error);
      res.status(500).json({ error: 'Unable to fetch topology data' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}