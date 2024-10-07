import express, { Request, Response } from 'express';
import { exec, ExecException } from 'child_process';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Server as SocketIOServer } from 'socket.io';
import http from 'http';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

interface CodeRunRequest {
  code: string;
  language: string;
  environment: 'docker' | 'cli';
  connectionId?: string;
}

const connections = new Map();

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('register', ({ connectionId }) => {
    connections.set(connectionId, socket);
    console.log(`Client registered with ID: ${connectionId}`);
    io.emit('clientConnected', { connectionId }); // Emit event when client connects
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    // Remove the disconnected client from the connections map
    for (const [id, sock] of connections.entries()) {
      if (sock === socket) {
        connections.delete(id);
        break;
      }
    }
  });
});

// Add this new route before your other routes
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Backend is running' });
});

app.post('/run-code', (req: Request<{}, {}, CodeRunRequest>, res: Response) => {
  const { code, language, environment, connectionId } = req.body;
  console.log('Received code execution request:', { language, environment, code, connectionId });

  if (environment === 'cli') {
    if (!connectionId) {
      return res.status(400).json({ error: 'ConnectionId is required for CLI execution' });
    }
    const socket = connections.get(connectionId);
    if (!socket) {
      return res.status(400).json({ error: 'CLI not connected' });
    }

    socket.emit('command', { command: code }, (response: any) => {
      if (response.error) {
        res.status(500).json({ error: response.error });
      } else {
        res.json({ output: response.output });
      }
    });
  } else {
    // Existing Docker execution logic
    // ...
  }
});

app.post('/generate-connection-command', (req, res) => {
  const connectionId = uuidv4();
  const command = `npx valen-cli connect ${connectionId}`;
  res.json({ command });
});

app.post('/check-connection', (req: Request, res: Response) => {
  const { connectionId } = req.body;
  const isConnected = connections.has(connectionId);
  res.json({ connected: isConnected });
});

function getDockerCommand(language: string, fileName: string): string {
  const dockerImage = getDockerImage(language);
  return `docker run --rm -v ${path.dirname(fileName)}:/app -w /app ${dockerImage} ${getRunCommand(language, path.basename(fileName))}`;
}

function getCliCommand(language: string, fileName: string): string {
  return getRunCommand(language, fileName);
}

function getDockerImage(language: string): string {
  switch (language) {
    case 'python':
      return 'python:3.9-slim';
    case 'javascript':
    case 'jsx':
      return 'node:14-alpine';
    // Add more languages as needed
    default:
      throw new Error(`Unsupported language: ${language}`);
  }
}

function getRunCommand(language: string, fileName: string): string {
  switch (language) {
    case 'python':
      return `python ${fileName}`;
    case 'javascript':
    case 'jsx':
      return `node ${fileName}`;
    // Add more languages as needed
    default:
      throw new Error(`Unsupported language: ${language}`);
  }
}

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Code execution endpoint: http://localhost:${PORT}/run-code`);
});